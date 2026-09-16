// De brug tussen binnen en buiten.
//
// Binnen werkt Peil met de naam van de repository waarin een waarde is
// aangetroffen. Buiten hoort die naam niet thuis: een lezer van het register
// heeft niets aan een repositorynaam, een bestandspad of een regelnummer.
// data/tools.json legt per repository vast onder welke naam de tool naar buiten
// heet en, als dat adres aantoonbaar in die repository staat, op welk adres zij
// te vinden is. Alleen naam en adres komen op een pagina terecht.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const WORTEL = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const BESTAND = JSON.parse(readFileSync(join(WORTEL, 'data', 'tools.json'), 'utf8'));

const PER_REPO = new Map(BESTAND.tools.map((t) => [t.repo, t]));

// De openbare naam en het openbare adres van een tool. Een repository die niet
// in data/tools.json staat, levert alleen een naam op en nooit een adres: dan is
// er niets aantoonbaar en toont de site liever te weinig dan te veel.
export function openbareTool(repo) {
  const t = PER_REPO.get(repo);
  if (!t) return { naam: String(repo), url: null };
  return { naam: t.naam, url: t.url || null };
}

// De tools achter een lijst gebruikt_in, ontdubbeld op openbare naam en
// alfabetisch. Twee repositories die naar buiten dezelfde tool zijn, worden hier
// dus één regel.
export function openbareTools(gebruiktIn) {
  const perNaam = new Map();
  for (const g of gebruiktIn || []) {
    const t = openbareTool(g.repo);
    const staand = perNaam.get(t.naam);
    if (!staand) perNaam.set(t.naam, { ...t });
    else if (!staand.url && t.url) staand.url = t.url;
  }
  return [...perNaam.values()].sort((a, b) => a.naam.localeCompare(b.naam, 'nl'));
}

// Alleen de namen, voor een zoekveld of een filter.
export const openbareNamen = (gebruiktIn) => openbareTools(gebruiktIn).map((t) => t.naam);

// Velden als verificatie_door en herkomst staan in het register genoteerd als
// "repository, vindplaats". Naar buiten blijft daarvan de toolnaam over; de
// vindplaats is een interne aanwijzing en verdwijnt.
export function openbareHerkomst(tekst) {
  if (!tekst) return tekst;
  const s = String(tekst);
  const repo = [...PER_REPO.keys()]
    .filter((r) => s === r || s.startsWith(r + ','))
    .sort((a, b) => b.length - a.length)[0];
  if (!repo) return s;
  const t = PER_REPO.get(repo);
  return t.voorganger || /voorganger/i.test(s) ? `${t.naam} (voorganger)` : t.naam;
}

// De verantwoordelijke voor een waarde is naar buiten de uitgever, niet een
// persoon.
export function openbareVerantwoordelijke(tekst, uitgever) {
  if (!tekst) return tekst;
  return String(tekst).includes(uitgever) ? uitgever : String(tekst);
}

export const ALLE_TOOLS = BESTAND.tools;
