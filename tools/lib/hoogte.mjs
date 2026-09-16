// Headless meting van de paginahoogte op een smal scherm.
//
// Geen afhankelijkheden: de meting praat rechtstreeks met het devtoolsprotocol
// van een Chromium die al op de machine staat. Staat er geen browser, dan geeft
// meetHoogte null terug en valt de aanroeper terug op een structurele controle.

import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const KANDIDATEN = [
  process.env.CHROME_PATH,
  '/opt/pw-browsers/chromium',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
];

export function vindChromium() {
  if (process.env.PEIL_ZONDER_BROWSER) return null;
  for (const pad of KANDIDATEN) {
    if (pad && existsSync(pad)) return pad;
  }
  return null;
}

// Meet de hoogte van een lokale HTML-pagina bij een gegeven vensterbreedte.
// Geeft { hoogte, breedte } terug, of null als er geen browser beschikbaar is.
export async function meetHoogte(bestandspad, breedte = 390, wachtMs = 1500) {
  const chroom = vindChromium();
  if (!chroom) return null;
  if (typeof WebSocket === 'undefined') return null;

  const profiel = mkdtempSync(join(tmpdir(), 'peil-hoogte-'));
  const kind = spawn(chroom, [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
    '--disable-dev-shm-usage', '--remote-debugging-port=0',
    '--user-data-dir=' + profiel, 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });

  const opruimen = () => {
    try { kind.kill('SIGKILL'); } catch { /* al weg */ }
    try { rmSync(profiel, { recursive: true, force: true }); } catch { /* al weg */ }
  };

  try {
    const adres = await new Promise((klaar, mis) => {
      let buffer = '';
      const klok = setTimeout(() => mis(new Error('de browser meldde geen devtools-adres')), 20000);
      kind.on('error', (e) => { clearTimeout(klok); mis(e); });
      kind.stderr.on('data', (brok) => {
        buffer += brok;
        const raak = buffer.match(/ws:\/\/[^\s]+/);
        if (raak) { clearTimeout(klok); klaar(raak[0]); }
      });
    });

    const sok = new WebSocket(adres);
    await new Promise((klaar, mis) => {
      sok.addEventListener('open', klaar, { once: true });
      sok.addEventListener('error', () => mis(new Error('geen verbinding met de browser')), { once: true });
    });

    let teller = 0;
    const wachtenden = new Map();
    sok.addEventListener('message', (bericht) => {
      const m = JSON.parse(bericht.data);
      if (m.id && wachtenden.has(m.id)) { wachtenden.get(m.id)(m); wachtenden.delete(m.id); }
    });
    const stuur = (method, params = {}, sessionId) => new Promise((klaar) => {
      teller += 1;
      wachtenden.set(teller, klaar);
      sok.send(JSON.stringify({ id: teller, method, params, sessionId }));
    });

    const doel = await stuur('Target.createTarget', { url: 'about:blank' });
    const targetId = doel.result.targetId;
    const zitting = await stuur('Target.attachToTarget', { targetId, flatten: true });
    const sessionId = zitting.result.sessionId;

    await stuur('Page.enable', {}, sessionId);
    await stuur('Emulation.setDeviceMetricsOverride',
      { width: breedte, height: 844, deviceScaleFactor: 1, mobile: true }, sessionId);
    await stuur('Page.navigate', { url: 'file://' + bestandspad }, sessionId);
    await new Promise((klaar) => { setTimeout(klaar, wachtMs); });

    const uitkomst = await stuur('Runtime.evaluate', {
      expression: 'JSON.stringify({hoogte:document.documentElement.scrollHeight,breedte:document.documentElement.scrollWidth})',
      returnByValue: true,
    }, sessionId);
    sok.close();
    return JSON.parse(uitkomst.result.result.value);
  } catch {
    return null;
  } finally {
    opruimen();
  }
}
