// Opbouw van de statische API onder /api/v1/.
// De paden zijn zo gekozen dat een latere laag met sleutels dezelfde paden kan
// bedienen: /api/v1/<verzameling>/<sleutel>.json, zonder query's en zonder
// afhankelijkheid van hoofdletters of accenten in de sleutel.

import { slug, csvRegel, waardeTekst } from './hulp.mjs';
import { VERSIE, PEILDATUM, LICENTIE_DATA, BRONREGEL, VOORBEHOUD, SITE_URL, UITGEVER, UITGEVER_URL } from './versie.mjs';

const omslag = (extra) => ({
  versie: VERSIE,
  versiedatum: PEILDATUM,
  peildatum: PEILDATUM,
  licentie: LICENTIE_DATA,
  uitgever: UITGEVER,
  uitgever_url: UITGEVER_URL,
  bronregel: BRONREGEL,
  voorbehoud: VOORBEHOUD,
  ...extra,
});

export function bouwApi({ register, rekenregels, duidingsregels, documenten, ijkkalender, state, changelog }) {
  const bestanden = new Map();
  const zet = (pad, inhoud) => bestanden.set(pad, typeof inhoud === 'string' ? inhoud : JSON.stringify(inhoud, null, 1) + '\n');
  const ps = register.parameters;

  const kort = (p) => ({
    id: p.id, naam_nl: p.naam_nl, naam_fr: p.naam_fr,
    land: p.land, lastensoort: p.lastensoort, regeling: p.regeling.code,
    variabiliteitsklasse: p.variabiliteitsklasse, status: p.status,
    waarde_weergave: p.waarde_weergave, eenheid: p.eenheid, geldig_jaar: p.geldig_jaar,
    verificatiedatum: p.verificatiedatum, bron_url: p.bron_url,
    gebruikt_in: p.gebruikt_in.map((g) => g.repo),
    afwijkend: p.gebruikt_in.some((g) => g.afwijkend),
    pad: `/api/v1/parameters/${p.id}.json`,
  });

  const landen = [...new Set(ps.map((p) => p.land))].sort();
  const lastensoorten = [...new Set(ps.map((p) => p.lastensoort))].sort();
  const regelingen = [...new Set(ps.map((p) => p.regeling.code))].sort();
  const tools = [...new Set(ps.flatMap((p) => p.gebruikt_in.map((g) => g.repo)))].sort();

  zet('api/v1/index.json', omslag({
    titel: 'Peil, openbaar parameterregister NL-FR',
    beheerder: UITGEVER + ', Anton Noe',
    site: SITE_URL,
    lagen: {
      '3_parameters': ps.length,
      '2_rekenregels': rekenregels.rekenregels.length,
      '1_duidingsregels': duidingsregels.duidingsregels.length,
    },
    tellingen: {
      status: telling(ps, (p) => p.status),
      land: telling(ps, (p) => p.land),
      lastensoort: telling(ps, (p) => p.lastensoort),
      variabiliteitsklasse: telling(ps, (p) => p.variabiliteitsklasse),
      afwijkend: ps.filter((p) => p.gebruikt_in.some((g) => g.afwijkend)).length,
      kandidaat: ps.filter((p) => p.kandidaat).length,
    },
    paden: {
      parameters: '/api/v1/parameters/<id>.json',
      parameterlijst: '/api/v1/parameters.json',
      land: '/api/v1/land/<code>.json',
      lastensoort: '/api/v1/lastensoort/<soort>.json',
      regeling: '/api/v1/regeling/<slug>.json',
      tool: '/api/v1/tool/<repo>.json',
      rekenregels: '/api/v1/rekenregels.json',
      duidingsregels: '/api/v1/duidingsregels.json',
      documenten: '/api/v1/documenten.json',
      ijkkalender: '/api/v1/ijkkalender.json',
      state: '/api/v1/state.json',
      changelog: '/api/v1/changelog.json',
      csv: '/api/v1/register.csv',
      eerdere_versies: '/api/versies/<versie>/',
    },
    sleutels: { land: landen, lastensoort: lastensoorten, regeling: regelingen, tool: tools },
  }));

  zet('api/v1/parameters.json', omslag({ aantal: ps.length, parameters: ps.map(kort) }));
  for (const p of ps) zet(`api/v1/parameters/${p.id}.json`, omslag({ parameter: p }));
  for (const code of landen) zet(`api/v1/land/${code}.json`, omslag({ land: code, aantal: tel(ps, (p) => p.land === code), parameters: ps.filter((p) => p.land === code).map(kort) }));
  for (const s of lastensoorten) zet(`api/v1/lastensoort/${s}.json`, omslag({ lastensoort: s, aantal: tel(ps, (p) => p.lastensoort === s), parameters: ps.filter((p) => p.lastensoort === s).map(kort) }));
  for (const r of regelingen) {
    const lijst = ps.filter((p) => p.regeling.code === r);
    zet(`api/v1/regeling/${slug(r)}.json`, omslag({ regeling: lijst[0].regeling, aantal: lijst.length, parameters: lijst.map(kort) }));
  }
  for (const t of tools) {
    const lijst = ps.filter((p) => p.gebruikt_in.some((g) => g.repo === t));
    zet(`api/v1/tool/${slug(t)}.json`, omslag({
      tool: t,
      cockpit_onderdeel: lijst[0].gebruikt_in.find((g) => g.repo === t).cockpit_onderdeel,
      aantal: lijst.length,
      waarschuwingen: state.waarschuwingen.filter((w) => w.geraakt.some((g) => g.repo === t)),
      parameters: lijst.map((p) => ({ ...kort(p), locaties: p.gebruikt_in.filter((g) => g.repo === t) })),
    }));
  }

  zet('api/v1/rekenregels.json', omslag({ aantal: rekenregels.rekenregels.length, rekenregels: rekenregels.rekenregels, stand: rekenregels.meta.stand }));
  zet('api/v1/duidingsregels.json', omslag({ aantal: duidingsregels.duidingsregels.length, duidingsregels: duidingsregels.duidingsregels, stand: duidingsregels.meta.stand }));
  zet('api/v1/documenten.json', omslag({ aantal: documenten.documenten.length, documenten: documenten.documenten, stand: documenten.meta.stand }));
  zet('api/v1/ijkkalender.json', omslag({ ijkmomenten: ijkkalender.ijkmomenten, maanden: ijkkalender.maanden, toelichting: ijkkalender.meta.toelichting }));
  zet('api/v1/state.json', omslag({ totalen: state.totalen, per_cockpit_onderdeel: state.per_cockpit_onderdeel, waarschuwingen: state.waarschuwingen, soorten: state.meta.soorten, niveaus: state.meta.niveaus }));
  zet('api/v1/changelog.json', omslag({ versies: changelog }));

  const kop = ['id', 'naam_nl', 'naam_fr', 'naam_officieel', 'land', 'lastensoort', 'regeling', 'belastingtype', 'socialelastentype', 'vrijstellingstype', 'transactionele_basis', 'variabiliteitsklasse', 'effect', 'waarde', 'eenheid', 'geldig_jaar', 'geldig_van', 'geldig_tot', 'status', 'bron_url', 'bron_kenmerk', 'bronsoort', 'instantie', 'verificatiedatum', 'verificatie_door', 'aanpassingsfrequentie', 'ingevoerd', 'vervallen', 'gebruikt_in', 'afwijkend', 'kandidaat'];
  const regels = [csvRegel(kop)];
  for (const p of ps) {
    regels.push(csvRegel([
      p.id, p.naam_nl, p.naam_fr, p.naam_officieel, p.land, p.lastensoort, p.regeling.code,
      p.regeling.belastingtype, p.regeling.socialelastentype, p.regeling.vrijstellingstype, p.regeling.transactionele_basis,
      p.variabiliteitsklasse, p.effect, waardeTekst(p), p.eenheid, p.geldig_jaar, p.geldig_van, p.geldig_tot,
      p.status, p.bron_url, p.bron_kenmerk, p.bronsoort, p.instantie, p.verificatiedatum, p.verificatie_door,
      p.levensduur_a.aanpassingsfrequentie, p.levensduur_b.ingevoerd, p.levensduur_b.vervallen,
      p.gebruikt_in.map((g) => g.repo).join(' | '), p.gebruikt_in.some((g) => g.afwijkend) ? 'ja' : 'nee', p.kandidaat ? 'ja' : 'nee',
    ]));
  }
  zet('api/v1/register.csv', '﻿' + regels.join('\r\n') + '\r\n');

  return bestanden;
}

const telling = (lijst, f) => lijst.reduce((a, p) => { const k = f(p); a[k] = (a[k] || 0) + 1; return a; }, {});
const tel = (lijst, f) => lijst.filter(f).length;
