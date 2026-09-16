#!/usr/bin/env node
// npm test. Geen afhankelijkheden: de validator staat in tools/lib/valideer.mjs.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, extname } from 'node:path';
import { laadSchemas } from '../tools/lib/valideer.mjs';
import { AANGESLOTEN, ALLEEN_SCHEMA } from '../tools/lib/aangesloten.mjs';
import { REGELINGEN } from '../tools/lib/regelingen.mjs';
import { VERSIE, PEILDATUM, LICENTIE_DATA } from '../tools/lib/versie.mjs';
import { ZONDER_ACCENT, zoekZonderAccent, tekstUitHtml, tekstUitMarkdown, weergaveTeksten } from '../tools/lib/accenten.mjs';
import { meetHoogte, vindChromium } from '../tools/lib/hoogte.mjs';

const WORTEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const lees = (...p) => JSON.parse(readFileSync(join(WORTEL, ...p), 'utf8'));

let mislukt = 0;
let gelukt = 0;
const groepen = [];
function toets(naam, fn) {
  try {
    const melding = fn();
    gelukt++;
    groepen.push(`  ok   ${naam}${melding ? ' (' + melding + ')' : ''}`);
  } catch (e) {
    mislukt++;
    groepen.push(`  FOUT ${naam}\n       ${e.message.split('\n').join('\n       ')}`);
  }
}
const eis = (voorwaarde, melding) => { if (!voorwaarde) throw new Error(melding); };
const eisLeeg = (lijst, kop) => { if (lijst.length) throw new Error(kop + ':\n' + lijst.slice(0, 20).join('\n') + (lijst.length > 20 ? `\n... en nog ${lijst.length - 20}` : '')); };

const valideerder = laadSchemas(WORTEL);
const register = lees('data', 'register.json');
const rekenregels = lees('data', 'rekenregels.json');
const duidingsregels = lees('data', 'duidingsregels.json');
const documenten = lees('data', 'documenten.json');
const ijkkalender = lees('data', 'ijkkalender.json');
const state = lees('peil', 'state.json');
const ps = register.parameters;

console.log('\nPeil, testen\n');
console.log('Schemavalidatie');

toets('register voldoet aan register.schema.json', () => {
  eisLeeg(valideerder.valideer('register.schema.json', register), 'schemafouten');
  return ps.length + ' parameters';
});
toets('rekenregels voldoen aan rekenregel.schema.json', () => {
  const fouten = rekenregels.rekenregels.flatMap((r, i) => valideerder.valideer('rekenregel.schema.json', r, `$.rekenregels[${i}]`));
  eisLeeg(fouten, 'schemafouten');
  return rekenregels.rekenregels.length + ' rekenregels';
});
toets('duidingsregels voldoen aan duidingsregel.schema.json', () => {
  const fouten = duidingsregels.duidingsregels.flatMap((d, i) => valideerder.valideer('duidingsregel.schema.json', d, `$.duidingsregels[${i}]`));
  eisLeeg(fouten, 'schemafouten');
  return duidingsregels.duidingsregels.length + ' duidingsregels';
});
toets('documenten voldoen aan document.schema.json', () => {
  const fouten = documenten.documenten.flatMap((d, i) => valideerder.valideer('document.schema.json', d, `$.documenten[${i}]`));
  eisLeeg(fouten, 'schemafouten');
  return documenten.documenten.length + ' documenten';
});
toets('ijkkalender voldoet aan ijkkalender.schema.json', () => {
  eisLeeg(valideerder.valideer('ijkkalender.schema.json', ijkkalender), 'schemafouten');
});
toets('state voldoet aan state.schema.json', () => {
  eisLeeg(valideerder.valideer('state.schema.json', state), 'schemafouten');
  return state.waarschuwingen.length + ' waarschuwingen';
});
toets('de validator weigert een vastgestelde waarde zonder bron', () => {
  const kopie = JSON.parse(JSON.stringify(register));
  const p = kopie.parameters.find((x) => x.status === 'te_verifieren');
  p.status = 'vastgesteld';
  eis(valideerder.valideer('register.schema.json', kopie).length > 0, 'de validator liet een vastgestelde waarde zonder bron en datum door');
});

console.log('\nId\'s en verwijzingen');

toets('alle parameter-id\'s zijn uniek', () => {
  const gezien = new Set(); const dubbel = [];
  for (const p of ps) { if (gezien.has(p.id)) dubbel.push(p.id); gezien.add(p.id); }
  eisLeeg(dubbel, 'dubbele id\'s');
});
toets('alle rekenregel-id\'s zijn uniek en botsen niet met parameter-id\'s', () => {
  const ids = rekenregels.rekenregels.map((r) => r.id);
  eis(new Set(ids).size === ids.length, 'dubbele rekenregel-id\'s');
  const alle = new Set([...ps.map((p) => p.id), ...ids, ...duidingsregels.duidingsregels.map((d) => d.id)]);
  eis(alle.size === ps.length + ids.length + duidingsregels.duidingsregels.length, 'id\'s botsen tussen de lagen');
});
toets('het id past bij land en regeling', () => {
  const fout = ps.filter((p) => p.id !== `p.${p.regeling.code}.${p.id.split('.').slice(3).join('.')}`
    || p.id.split('.')[1].toUpperCase() !== p.land).map((p) => p.id);
  eisLeeg(fout, 'id past niet bij land of regeling');
});
toets('elke regelingcode bestaat in de taxonomie', () => {
  const fout = [...new Set(ps.map((p) => p.regeling.code))].filter((c) => !REGELINGEN[c]);
  eisLeeg(fout, 'onbekende regelingcodes');
  return Object.keys(REGELINGEN).length + ' regelingen gedefinieerd';
});
toets('rekenregels verwijzen naar bestaande parameters', () => {
  const ids = new Set(ps.map((p) => p.id));
  const fout = rekenregels.rekenregels.flatMap((r) => r.gebruikt_parameters.filter((id) => !ids.has(id)).map((id) => `${r.id} verwijst naar ${id}`));
  eisLeeg(fout, 'onbekende verwijzingen van laag 2 naar laag 3');
});
toets('rekenregels verwijzen naar bestaande rekenregels', () => {
  const ids = new Set(rekenregels.rekenregels.map((r) => r.id));
  const fout = rekenregels.rekenregels.flatMap((r) => r.gebruikt_rekenregels.filter((id) => !ids.has(id)).map((id) => `${r.id} verwijst naar ${id}`));
  eisLeeg(fout, 'onbekende verwijzingen binnen laag 2');
});
toets('duidingsregels verwijzen naar bestaande rekenregels en parameters', () => {
  const pIds = new Set(ps.map((p) => p.id));
  const rIds = new Set(rekenregels.rekenregels.map((r) => r.id));
  const fout = duidingsregels.duidingsregels.flatMap((d) => [
    ...d.gebruikt_rekenregels.filter((id) => !rIds.has(id)),
    ...d.gebruikt_parameters.filter((id) => !pIds.has(id)),
  ].map((id) => `${d.id} verwijst naar ${id}`));
  eisLeeg(fout, 'onbekende verwijzingen van laag 1');
});
toets('opgevolgd_door wijst naar een bestaande parameter', () => {
  const ids = new Set(ps.map((p) => p.id));
  const fout = ps.filter((p) => p.levensduur_b.opgevolgd_door && !ids.has(p.levensduur_b.opgevolgd_door)).map((p) => p.id);
  eisLeeg(fout, 'onbekende opvolgers');
});
toets('de ijkkalender verwijst naar bestaande parameters', () => {
  const ids = new Set(ps.map((p) => p.id));
  const fout = ijkkalender.maanden.flatMap((m) => m.verwachte_wijzigingen.flatMap((w) => w.parameters.filter((id) => !ids.has(id))));
  eisLeeg([...new Set(fout)], 'onbekende parameters in de ijkkalender');
});
toets('state verwijst naar bestaande parameters', () => {
  const ids = new Set(ps.map((p) => p.id));
  const fout = state.waarschuwingen.filter((w) => !ids.has(w.parameter)).map((w) => w.sleutel);
  eisLeeg(fout, 'onbekende parameters in state.json');
});

console.log('\nInhoudelijke regels');

toets('elke parameter heeft de vier assen', () => {
  const fout = ps.filter((p) => !p.land || !p.lastensoort || !p.regeling?.code || !p.variabiliteitsklasse).map((p) => p.id);
  eisLeeg(fout, 'ontbrekende assen');
});
toets('elke parameter heeft beide levensduurdefinities', () => {
  const fout = ps.filter((p) => !p.levensduur_a || !p.levensduur_b
    || !p.levensduur_a.aanpassingsfrequentie
    || !('laatste_wijziging' in p.levensduur_a) || !Array.isArray(p.levensduur_a.wijzigingshistorie)
    || !('ingevoerd' in p.levensduur_b) || !('vervallen' in p.levensduur_b) || !('opgevolgd_door' in p.levensduur_b)).map((p) => p.id);
  eisLeeg(fout, 'onvolledige levensduur');
});
toets('een parameter heeft of een waarde met bron en datum, of status te_verifieren', () => {
  const fout = ps.filter((p) => {
    if (p.status === 'te_verifieren') return p.waarde !== null;
    if (p.status === 'vervallen') return false;
    return p.waarde === null || !p.verificatiedatum || !(p.bron_url || p.bron_kenmerk);
  }).map((p) => `${p.id} (${p.status})`);
  eisLeeg(fout, 'parameters die aan geen van beide voldoen');
});
toets('geen vastgestelde waarde zonder bron en verificatiedatum', () => {
  const fout = ps.filter((p) => p.status === 'vastgesteld' && (!p.verificatiedatum || !(p.bron_url || p.bron_kenmerk) || p.waarde === null)).map((p) => p.id);
  eisLeeg(fout, 'vastgesteld zonder bron of datum');
  return ps.filter((p) => p.status === 'vastgesteld').length + ' vastgesteld';
});
toets('geen dode regels: gebruikt_in of kandidaat', () => {
  const fout = [...ps, ...rekenregels.rekenregels, ...duidingsregels.duidingsregels]
    .filter((x) => !x.kandidaat && x.gebruikt_in.length === 0).map((x) => x.id);
  eisLeeg(fout, 'dode regels');
});
toets('gebruikt_in verwijst alleen naar aangesloten repo\'s', () => {
  const fout = [...new Set([...ps, ...rekenregels.rekenregels].flatMap((x) => x.gebruikt_in.map((g) => g.repo)))]
    .filter((r) => !AANGESLOTEN.includes(r) || ALLEEN_SCHEMA.includes(r));
  eisLeeg(fout, 'niet-aangesloten repo\'s in gebruikt_in');
  return AANGESLOTEN.length + ' aangesloten repo\'s';
});
toets('klassen buiten overheid_vastgesteld hebben verantwoordelijke en houdbaarheidsdatum', () => {
  const fout = ps.filter((p) => p.variabiliteitsklasse !== 'overheid_vastgesteld'
    && (!p.verantwoordelijke || !p.houdbaarheidsdatum)).map((p) => p.id);
  eisLeeg(fout, 'ontbrekende verantwoordelijke of houdbaarheidsdatum');
});
toets('raming en vaststelling blijven gescheiden', () => {
  const fout = ps.filter((p) => p.status === 'raming' && !p.id.endsWith('_raming')).map((p) => p.id);
  eisLeeg(fout, 'ramingen zonder het achtervoegsel _raming');
});
toets('een afwijking is controleerbaar gemarkeerd', () => {
  // Of twee of meer tools zijn als afwijkend gemarkeerd, en dan wijken zij van
  // elkaar af; of er is een vastgestelde registerwaarde waarvan de gemarkeerde
  // tool afwijkt. Een enkele markering zonder ijkpunt zegt niets.
  const fout = ps.filter((p) => {
    const merk = p.gebruikt_in.filter((g) => g.afwijkend);
    if (merk.length === 0) return false;
    if (p.gebruikt_in.length < 2) return true;
    if (merk.length >= 2) return false;
    return p.status !== 'vastgesteld';
  }).map((p) => p.id);
  eisLeeg(fout, 'afwijkingen zonder ijkpunt');
  return ps.filter((p) => p.gebruikt_in.some((g) => g.afwijkend)).length + ' afwijkende parameters';
});
toets('versie, versiedatum en licentie zijn overal gelijk', () => {
  for (const [naam, m] of [['register', register.meta], ['rekenregels', rekenregels.meta], ['duidingsregels', duidingsregels.meta], ['documenten', documenten.meta], ['ijkkalender', ijkkalender.meta], ['state', state.meta]]) {
    eis(m.versie === VERSIE, `${naam}: versie ${m.versie} in plaats van ${VERSIE}`);
    eis(m.versiedatum === PEILDATUM, `${naam}: versiedatum ${m.versiedatum} in plaats van ${PEILDATUM}`);
    eis(m.licentie === LICENTIE_DATA, `${naam}: licentie ${m.licentie} in plaats van ${LICENTIE_DATA}`);
  }
});

console.log('\nTaal en vorm');

const teksten = [];
const verzamel = (map, filter) => {
  for (const naam of readdirSync(join(WORTEL, map))) {
    const pad = join(WORTEL, map, naam);
    if (statSync(pad).isDirectory()) { verzamel(join(map, naam), filter); continue; }
    if (filter(naam)) teksten.push([relative(WORTEL, pad), readFileSync(pad, 'utf8')]);
  }
};
verzamel('docs', (n) => n.endsWith('.md'));
for (const n of ['README.md', 'CONTRIBUTING.md', 'CHANGELOG.md', 'LICENSE-DATA']) teksten.push([n, readFileSync(join(WORTEL, n), 'utf8')]);
if (existsSync(join(WORTEL, 'dist'))) verzamel('dist', (n) => extname(n) === '.html' || extname(n) === '.css');

toets('geen lange liggende streepjes in docs en site', () => {
  const fout = teksten.filter(([, t]) => /[\u2014\u2013]/.test(t)).map(([n, t]) => `${n} (${(t.match(/[\u2014\u2013]/g) || []).length}x)`);
  eisLeeg(fout, 'bestanden met een lang liggend streepje');
  return teksten.length + ' bestanden gecontroleerd';
});
toets('het woord ecosysteem komt niet voor in docs en site', () => {
  const fout = teksten.filter(([, t]) => /ecosyste/i.test(t)).map(([n]) => n);
  eisLeeg(fout, 'bestanden met het woord ecosysteem');
});
toets('het werk van Christian von Klosterlein heet Klussen in Frankrijk', () => {
  const fout = teksten.filter(([, t]) => /\bcorpus\b/i.test(t) && /kl(o|ö)sterlein|klussen in frankrijk/i.test(t)).map(([n]) => n);
  eisLeeg(fout, 'bestanden die het KIF-werk een corpus noemen');
});

toets('geen weergaveveld in de gegevens mist een diakritisch teken', () => {
  const fout = [];
  for (const [naam, data] of [['data/register.json', register], ['data/rekenregels.json', rekenregels],
    ['data/duidingsregels.json', duidingsregels], ['data/documenten.json', documenten],
    ['data/ijkkalender.json', ijkkalender], ['peil/state.json', state],
    ['data/inventarisatie.json', lees('data', 'inventarisatie.json')]]) {
    for (const [pad, tekst] of weergaveTeksten(data)) {
      const raak = zoekZonderAccent(tekst);
      if (raak.length) fout.push(`${naam} ${pad}: ${raak.join(', ')}`);
    }
  }
  eisLeeg(fout, 'weergavetekst zonder accent');
  return ZONDER_ACCENT.length + ' woorden bewaakt';
});

toets('geen lopende tekst in de documentatie mist een diakritisch teken', () => {
  const fout = [];
  for (const [naam, t] of teksten) {
    if (!naam.endsWith('.md')) continue;
    const raak = zoekZonderAccent(tekstUitMarkdown(t));
    if (raak.length) fout.push(`${naam}: ${raak.join(', ')}`);
  }
  eisLeeg(fout, 'documentatie zonder accent');
  return teksten.filter(([n]) => n.endsWith('.md')).length + ' documenten gecontroleerd';
});

if (existsSync(join(WORTEL, 'dist'))) {
  console.log('\nBuild');
  const distBestanden = [];
  const loop = (map) => {
    for (const naam of readdirSync(join(WORTEL, map))) {
      const pad = join(WORTEL, map, naam);
      if (statSync(pad).isDirectory()) loop(join(map, naam));
      else distBestanden.push(relative(join(WORTEL, 'dist'), pad).split('\\').join('/'));
    }
  };
  loop('dist');
  const bestaat = new Set(distBestanden);

  toets('alle JSON onder /api/v1/ is geldige JSON met omslag', () => {
    const jsons = distBestanden.filter((p) => p.startsWith('api/v1/') && p.endsWith('.json'));
    const fout = [];
    for (const p of jsons) {
      try {
        const d = JSON.parse(readFileSync(join(WORTEL, 'dist', p), 'utf8'));
        for (const veld of ['versie', 'versiedatum', 'licentie', 'bronregel']) {
          if (!d[veld]) fout.push(`${p}: veld ${veld} ontbreekt`);
        }
        if (d.licentie !== LICENTIE_DATA) fout.push(`${p}: licentie ${d.licentie}`);
      } catch (e) { fout.push(`${p}: ${e.message}`); }
    }
    eisLeeg(fout, 'fouten in de API');
    return jsons.length + ' JSON-bestanden';
  });
  toets('elke parameter heeft een JSON- en een HTML-pagina', () => {
    const fout = ps.flatMap((p) => [
      bestaat.has(`api/v1/parameters/${p.id}.json`) ? null : `api/v1/parameters/${p.id}.json ontbreekt`,
      bestaat.has(`parameter/${p.id}.html`) ? null : `parameter/${p.id}.html ontbreekt`,
    ].filter(Boolean));
    eisLeeg(fout, 'ontbrekende bestanden');
  });
  toets('de vaste API-paden bestaan', () => {
    const verplicht = ['api/v1/index.json', 'api/v1/parameters.json', 'api/v1/documenten.json', 'api/v1/ijkkalender.json',
      'api/v1/state.json', 'api/v1/changelog.json', 'api/v1/register.csv', 'api/versies/index.json',
      `api/versies/${VERSIE}/index.json`, 'index.html', 'tabel.html', 'over.html', 'peil.css', '.nojekyll', 'sitemap.xml'];
    eisLeeg(verplicht.filter((p) => !bestaat.has(p)), 'ontbrekende paden');
  });
  toets('alle interne links in de HTML werken', () => {
    const fout = [];
    for (const p of distBestanden.filter((x) => x.endsWith('.html'))) {
      const html = readFileSync(join(WORTEL, 'dist', p), 'utf8');
      const map = dirname(p) === '.' ? '' : dirname(p);
      for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
        let doel = m[1];
        if (/^(https?:|mailto:|data:|#)/.test(doel)) continue;
        doel = doel.split('#')[0].split('?')[0];
        if (!doel) continue;
        const opgelost = join(map, doel).split('\\').join('/');
        const kandidaten = [opgelost, opgelost.replace(/\/$/, '') + '/index.html', opgelost + 'index.html', 'index.html'];
        if (opgelost === '' || opgelost === '.') continue;
        if (!kandidaten.some((k) => bestaat.has(k.replace(/^\.\//, '')))) fout.push(`${p} verwijst naar ${m[1]}`);
      }
    }
    eisLeeg([...new Set(fout)], 'gebroken interne links');
    return distBestanden.filter((x) => x.endsWith('.html')).length + ' pagina\'s gecontroleerd';
  });
  toets('geen externe scripts, stylesheets of fonts', () => {
    const fout = [];
    for (const p of distBestanden.filter((x) => x.endsWith('.html'))) {
      const html = readFileSync(join(WORTEL, 'dist', p), 'utf8');
      for (const m of html.matchAll(/<(script|link)\b[^>]*>/gi)) {
        const tag = m[0];
        const bron = tag.match(/(?:src|href)="([^"]+)"/i);
        if (!bron) continue;
        if (/^https?:|^\/\//.test(bron[1])) fout.push(`${p}: ${tag.slice(0, 90)}`);
      }
      if (/@import\s+url|fonts\.googleapis|fonts\.gstatic/i.test(html)) fout.push(`${p}: extern font`);
    }
    eisLeeg([...new Set(fout)], 'externe bronnen in de site');
  });
  toets('geen horizontale overloop in de HTML-structuur', () => {
    const fout = [];
    for (const p of distBestanden.filter((x) => x.endsWith('.html'))) {
      const html = readFileSync(join(WORTEL, 'dist', p), 'utf8');
      if (!/<meta name="viewport" content="width=device-width,initial-scale=1">/.test(html)) fout.push(`${p}: geen viewport-meta`);
      for (const m of html.matchAll(/<table\b[^>]*>/gi)) {
        const voor = html.slice(0, m.index);
        const huls = voor.lastIndexOf('<div class="tabelhuls">');
        const sluit = voor.lastIndexOf('</div>');
        if (huls === -1 || huls < sluit) fout.push(`${p}: tabel zonder scrollbare huls`);
        if (!/class="[^"]*kaartbaar/.test(m[0])) fout.push(`${p}: tabel zonder kaartweergave op smal scherm`);
      }
      for (const m of html.matchAll(/(?:width|min-width)\s*:\s*(\d+)px/gi)) {
        if (Number(m[1]) > 360) fout.push(`${p}: vaste breedte van ${m[1]}px`);
      }
    }
    eisLeeg([...new Set(fout)], 'structuur die op 360 px overloopt');
  });
  toets('de stylesheet dekt 360 px af zonder vaste breedtes', () => {
    const css = readFileSync(join(WORTEL, 'dist', 'peil.css'), 'utf8');
    eis(/box-sizing:border-box/.test(css), 'geen border-box');
    eis(/overflow-wrap:break-word/.test(css), 'geen overflow-wrap op body');
    eis(/@media \(max-width:760px\)/.test(css), 'geen breekpunt voor smalle schermen');
    eis(/system-ui/.test(css) && !/@font-face|fonts\.googleapis/.test(css), 'geen systeemfont of toch een extern font');
    const vast = [...css.matchAll(/(?:^|[;{])\s*(?:width|min-width)\s*:\s*(\d+)px/gi)].map((m) => Number(m[1])).filter((n) => n > 360);
    eis(vast.length === 0, 'vaste breedtes groter dan 360px: ' + vast.join(', '));
  });
  toets('elke pagina draagt peildatum, versie en de voorbehoudsregel', () => {
    const fout = [];
    for (const p of distBestanden.filter((x) => x.endsWith('.html'))) {
      const html = readFileSync(join(WORTEL, 'dist', p), 'utf8');
      if (!html.includes('versie ' + VERSIE)) fout.push(`${p}: geen versienummer`);
      if (!html.includes('16 september 2026')) fout.push(`${p}: geen peildatum`);
      if (!html.includes('Peil geeft waarden met bron, geen advies')) fout.push(`${p}: geen voorbehoudsregel`);
    }
    eisLeeg([...new Set(fout)], 'pagina\'s zonder verplichte regels');
  });
  toets('geen zichtbare tekst op de site mist een diakritisch teken', () => {
    const fout = [];
    for (const p of distBestanden.filter((x) => x.endsWith('.html'))) {
      const raak = zoekZonderAccent(tekstUitHtml(readFileSync(join(WORTEL, 'dist', p), 'utf8')));
      if (raak.length) fout.push(`${p}: ${raak.join(', ')}`);
    }
    eisLeeg(fout, 'zichtbare tekst zonder accent');
    return distBestanden.filter((x) => x.endsWith('.html')).length + ' pagina\'s gecontroleerd';
  });
  toets('de CSV draagt een BOM en levert de accenten in UTF-8', () => {
    const ruw = readFileSync(join(WORTEL, 'dist', 'api', 'v1', 'register.csv'));
    eis(ruw[0] === 0xef && ruw[1] === 0xbb && ruw[2] === 0xbf, 'geen UTF-8-BOM, Excel leest de accenten dan verkeerd');
    const csv = ruw.toString('utf8');
    eis(csv.includes('impôt') && csv.includes('Sécurité'), 'de accenten komen niet door in de CSV');
  });
  toets('de API levert de accenten letterlijk in UTF-8', () => {
    const json = readFileSync(join(WORTEL, 'dist', 'api', 'v1', 'parameters.json'), 'utf8');
    eis(json.includes('impôt'), 'geen letterlijke accenten in /api/v1/parameters.json');
    eis(!/\\u00[0-9a-f]{2}/i.test(json), 'accenten staan als escape in plaats van als UTF-8');
  });
  toets('elke pagina verklaart zich als UTF-8', () => {
    const fout = distBestanden.filter((x) => x.endsWith('.html'))
      .filter((p) => !readFileSync(join(WORTEL, 'dist', p), 'utf8').includes('<meta charset="utf-8">'));
    eisLeeg(fout, 'pagina\'s zonder charset utf-8');
  });
  toets('de CSV heeft evenveel regels als er parameters zijn', () => {
    const csv = readFileSync(join(WORTEL, 'dist', 'api', 'v1', 'register.csv'), 'utf8');
    const regels = csv.replace(/^\ufeff/, '').trim().split('\r\n');
    eis(regels.length === ps.length + 1, `${regels.length - 1} regels tegenover ${ps.length} parameters`);
    return regels.length - 1 + ' regels';
  });
  const startHtml = readFileSync(join(WORTEL, 'dist', 'index.html'), 'utf8');
  toets('de kantelingen op de startpagina staan in een details en zijn dicht', () => {
    const vouwen = startHtml.match(/<details class="kanteling"[^>]*>/g) || [];
    eis(vouwen.length === 3, `${vouwen.length} kantelingen in plaats van 3`);
    eisLeeg(vouwen.filter((v) => /\bopen\b/.test(v)), 'kantelingen die open beginnen');
    const samenvattingen = startHtml.match(/<summary>[\s\S]*?<\/summary>/g) || [];
    eisLeeg(samenvattingen.filter((t) => !/\d+ parameters/.test(t)), 'samenvattingen zonder aantal parameters');
    return vouwen.length + ' kantelingen, dicht, met het aantal parameters in de samenvatting';
  });

  const meting = await meetHoogte(join(WORTEL, 'dist', 'index.html'), 390);
  toets('de startpagina blijft op 390 px onder 3.000 px', () => {
    if (!meting) {
      // Geen bruikbare browser: terugvallen op de structurele eis die de hoogte bepaalt.
      const dicht = (startHtml.match(/<details class="kanteling"(?![^>]*\bopen\b)/g) || []).length;
      eis(dicht === 3, `zonder browser gemeten: ${dicht} gesloten kantelingen in plaats van 3`);
      return 'niet gemeten (geen browser' + (vindChromium() ? ' bruikbaar' : ' aanwezig') + '), structureel gecontroleerd';
    }
    eis(meting.breedte <= 390, `de pagina is ${meting.breedte} px breed en loopt dus horizontaal over`);
    eis(meting.hoogte <= 3000, `de startpagina is ${meting.hoogte} px hoog op 390 px breed`);
    return meting.hoogte + ' px hoog op 390 px breed';
  });

  toets('elke versie uit de changelog blijft opvraagbaar', () => {
    const versies = JSON.parse(readFileSync(join(WORTEL, 'dist', 'api', 'versies', 'index.json'), 'utf8'));
    eis(versies.huidig === VERSIE, `de versie-index noemt ${versies.huidig} als huidig in plaats van ${VERSIE}`);
    const fout = [];
    for (const v of versies.versies) {
      const pad = `api/versies/${v.versie}/index.json`;
      if (!bestaat.has(pad)) { fout.push(pad + ' ontbreekt'); continue; }
      const d = JSON.parse(readFileSync(join(WORTEL, 'dist', ...pad.split('/')), 'utf8'));
      if (d.versie !== v.versie) fout.push(`${pad} draagt versie ${d.versie}`);
    }
    eisLeeg(fout, 'ontbrekende of verkeerde bevroren versies');
    return versies.versies.map((v) => v.versie).join(', ');
  });
  toets('de bevroren versie is gelijk aan de huidige', () => {
    const nu = readFileSync(join(WORTEL, 'dist', 'api', 'v1', 'index.json'), 'utf8');
    const toen = readFileSync(join(WORTEL, 'dist', 'api', 'versies', VERSIE, 'index.json'), 'utf8');
    eis(nu === toen, 'de bevroren kopie wijkt af van /api/v1/index.json');
  });
} else {
  groepen.push('  ---  build niet gecontroleerd: dist ontbreekt, draai eerst npm run bouw');
}

console.log(groepen.join('\n'));
console.log(`\n${gelukt} geslaagd, ${mislukt} mislukt\n`);
process.exit(mislukt ? 1 : 0);
