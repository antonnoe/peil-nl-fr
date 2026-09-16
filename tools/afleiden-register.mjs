#!/usr/bin/env node
// Eenmalige afleiding van data/register.json uit de curatietabel in tools/bron/
// en uit data/inventarisatie.json (taak 0).
//
// Na deze afleiding is data/register.json de bron van waarheid. Correcties gaan
// via een issue of een pull request op dat bestand, niet meer via dit script.
// Het script blijft staan zodat de afleiding controleerbaar is.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { REGELINGEN } from './lib/regelingen.mjs';
import { AANGESLOTEN, ALLEEN_SCHEMA } from './lib/aangesloten.mjs';
import { VERSIE, PEILDATUM, LICENTIE_DATA, BRONREGEL, VOORBEHOUD } from './lib/versie.mjs';
import { NL } from './bron/nl.mjs';
import { XB } from './bron/xb.mjs';
import { FR_FISCAAL } from './bron/fr-fiscaal.mjs';
import { FR_VASTGOED } from './bron/fr-vastgoed.mjs';
import { FR_ZORG } from './bron/fr-zorg.mjs';
import { FR_ENERGIE } from './bron/fr-energie.mjs';
import { GATEN } from './bron/gaten.mjs';

const WORTEL = join(dirname(fileURLToPath(import.meta.url)), '..');

const inventarisatie = JSON.parse(readFileSync(join(WORTEL, 'data', 'inventarisatie.json'), 'utf8'));
const COCKPIT = new Map(inventarisatie.repos.map((r) => [r.naam, (r.cockpit_onderdeel || '').replace(/\s*—\s*/g, ', ')]));

const maandenErbij = (isoDatum, maanden) => {
  const d = new Date(isoDatum + 'T00:00:00Z');
  d.setUTCMonth(d.getUTCMonth() + maanden);
  return d.toISOString().slice(0, 10);
};

const HOUDBAARHEID_MAANDEN = {
  marktindex: 3, contractueel: 12, indicatief: 12, afgeleid: 12, gebruikersinvoer: 12,
};

const fouten = [];

function bouwParameter(bron) {
  const land = bron.id.split('.')[1].toUpperCase();
  const regeling = REGELINGEN[bron.reg];
  if (!regeling) { fouten.push(`onbekende regeling ${bron.reg} bij ${bron.id}`); return null; }
  if (!bron.id.startsWith('p.' + bron.reg + '.')) {
    fouten.push(`id ${bron.id} past niet bij regeling ${bron.reg}`);
  }

  const klasse = bron.klasse;
  const status = bron.st || 'te_verifieren';
  const gebruiktIn = (bron.in || []).map(([repo, locatie, waardeInTool, afwijkend]) => {
    if (!AANGESLOTEN.includes(repo)) fouten.push(`niet-aangesloten repo ${repo} bij ${bron.id}`);
    if (ALLEEN_SCHEMA.includes(repo)) fouten.push(`${repo} levert alleen het schema, geen parameters (${bron.id})`);
    return {
      repo,
      cockpit_onderdeel: COCKPIT.get(repo) || 'onbekend',
      locatie,
      waarde_in_tool: waardeInTool === undefined ? null : waardeInTool,
      afwijkend: Boolean(afwijkend),
    };
  });

  const p = {
    id: bron.id,
    naam_nl: bron.nl,
    naam_fr: bron.fr ?? null,
    naam_officieel: bron.off ?? null,
    land,
    lastensoort: bron.ls || regeling.lastensoort,
    regeling: {
      code: bron.reg,
      naam: regeling.naam,
      belastingtype: 'bt' in bron ? bron.bt : regeling.belastingtype,
      socialelastentype: 'sot' in bron ? bron.sot : regeling.socialelastentype,
      vrijstellingstype: bron.vt ?? null,
      transactionele_basis: 'tb' in bron ? bron.tb : regeling.transactionele_basis,
    },
    variabiliteitsklasse: klasse,
    effect: bron.effect,
    waarde: status === 'te_verifieren' ? null : (bron.w ?? null),
    waarde_weergave: status === 'te_verifieren' ? null : (bron.wv ?? null),
    eenheid: bron.eh ?? null,
    geldig_jaar: bron.jaar ?? null,
    geldig_van: bron.van ?? null,
    geldig_tot: bron.tot ?? null,
    status,
    bron_url: bron.url ?? null,
    bron_kenmerk: bron.kn ?? null,
    bronsoort: bron.bs ?? null,
    instantie: bron.inst ?? null,
    verificatiedatum: bron.vd ?? null,
    verificatie_door: bron.vdoor ?? null,
    publicatiemoment: bron.pub ?? null,
    aangekondigde_wijziging: bron.aank ?? null,
    levensduur_a: {
      aanpassingsfrequentie: bron.freq || 'onbekend',
      laatste_wijziging: bron.lw ?? null,
      wijzigingshistorie: bron.hist ?? [],
    },
    levensduur_b: {
      ingevoerd: bron.ingev ?? null,
      vervallen: bron.verv ?? (status === 'vervallen' ? (bron.tot ?? null) : null),
      opgevolgd_door: bron.opgv ?? null,
    },
    gebruikt_in: gebruiktIn,
    testvoorbeeld: bron.test ?? null,
    uitzonderingen: bron.uitz ?? [],
    opmerkingen: bron.opm ?? null,
    kandidaat: bron.kand === true || gebruiktIn.length === 0,
  };

  if (klasse !== 'overheid_vastgesteld') {
    p.verantwoordelijke = bron.resp || 'Anton Noe, Communities Abroad';
    p.houdbaarheidsdatum = bron.houd || maandenErbij(bron.vd || PEILDATUM, HOUDBAARHEID_MAANDEN[klasse] ?? 12);
  }

  if (p.status === 'vastgesteld' && (!p.verificatiedatum || !(p.bron_url || p.bron_kenmerk))) {
    fouten.push(`${p.id}: status vastgesteld zonder bron of verificatiedatum`);
  }
  if (p.status === 'vastgesteld' && p.waarde === null) {
    fouten.push(`${p.id}: status vastgesteld zonder waarde`);
  }
  return p;
}

const alles = [...NL, ...XB, ...FR_FISCAAL, ...FR_VASTGOED, ...FR_ZORG, ...FR_ENERGIE, ...GATEN];
const parameters = alles.map(bouwParameter).filter(Boolean);

const gezien = new Set();
for (const p of parameters) {
  if (gezien.has(p.id)) fouten.push(`dubbel id: ${p.id}`);
  gezien.add(p.id);
}
for (const p of parameters) {
  if (p.levensduur_b.opgevolgd_door && !gezien.has(p.levensduur_b.opgevolgd_door)) {
    fouten.push(`${p.id}: opgevolgd_door verwijst naar onbekend id ${p.levensduur_b.opgevolgd_door}`);
  }
}

if (fouten.length) {
  console.error('Afleiding afgebroken:');
  for (const f of fouten) console.error('  ' + f);
  process.exit(1);
}

parameters.sort((a, b) => a.id.localeCompare(b.id));

const register = {
  meta: {
    titel: 'Peil, openbaar parameterregister NL-FR',
    versie: VERSIE,
    versiedatum: PEILDATUM,
    peildatum: PEILDATUM,
    licentie: LICENTIE_DATA,
    bronregel: BRONREGEL,
    laag: '3, parameters',
    afgeleid_uit: 'data/inventarisatie.json (taak 0) en de bronvelden van de aangesloten repo\'s',
    aangesloten_repos: AANGESLOTEN,
    voorbehoud: VOORBEHOUD,
  },
  parameters,
};

writeFileSync(join(WORTEL, 'data', 'register.json'), JSON.stringify(register, null, 1) + '\n');

const tel = (veld) => parameters.reduce((acc, p) => { const k = typeof veld === 'function' ? veld(p) : p[veld]; acc[k] = (acc[k] || 0) + 1; return acc; }, {});
console.log('parameters:', parameters.length);
console.log('status:', tel('status'));
console.log('land:', tel('land'));
console.log('lastensoort:', tel('lastensoort'));
console.log('klasse:', tel('variabiliteitsklasse'));
console.log('kandidaat:', parameters.filter((p) => p.kandidaat).length);
console.log('afwijkend:', parameters.filter((p) => p.gebruikt_in.some((g) => g.afwijkend)).length);
