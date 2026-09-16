#!/usr/bin/env node
// data/ijkkalender.json: per maand welke parameters normaal wijzigen.
// De twee vaste ijkmomenten zijn half december (NL en CAK) en half april (FR).

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { VERSIE, PEILDATUM, LICENTIE_DATA, BRONREGEL } from './lib/versie.mjs';

const WORTEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const register = JSON.parse(readFileSync(join(WORTEL, 'data', 'register.json'), 'utf8'));
const bestaat = new Set(register.parameters.map((p) => p.id));

const MAANDNAMEN = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

// Selectiehulpen op het register zelf, zodat de kalender meeloopt met het register.
const metRegeling = (...codes) => register.parameters.filter((p) => codes.includes(p.regeling.code)).map((p) => p.id);
const metPrefix = (...prefixen) => register.parameters.filter((p) => prefixen.some((v) => p.id.startsWith(v))).map((p) => p.id);

const ijkmomenten = [
  { sleutel: 'nl_december', naam: 'IJkmoment NL en CAK', maand: 12, dag: 15,
    domein: ['NL fiscaal', 'NL sociaal', 'CAK en woonlandfactor'],
    omschrijving: 'Half december staan het Belastingplan, de premiepercentages, de heffingskortingen, de zorgtoeslagpercentages en de woonlandfactor van het CAK vast voor het komende jaar. Alles wat per 1 januari ingaat, wordt hier geijkt.' },
  { sleutel: 'fr_april', naam: 'IJkmoment FR', maand: 4, dag: 15,
    domein: ['FR fiscaal', 'FR sociaal'],
    omschrijving: 'Half april zijn de fiches van service-public.fr en de aangiftecampagne van impots.gouv.fr bijgewerkt naar het lopende jaar. De Franse abattements, schijven, decote en CSG-grenzen worden hier geijkt.' },
];

const maanden = [
  { maand: 1, verwachte_wijzigingen: [
    { omschrijving: 'Ingangsdatum van vrijwel alle Nederlandse fiscale en sociale waarden', instantie: 'Belastingdienst en Ministerie van VWS', parameters: metPrefix('p.nl.') },
    { omschrijving: 'Ingangsdatum van de CAK-woonlandfactor en de verdragsbijdrage', instantie: 'Het CAK', parameters: metRegeling('xb.cak') },
    { omschrijving: 'Ingangsdatum van het Franse barema en de Franse abattements uit de loi de finances', instantie: 'DGFiP', parameters: metRegeling('fr.ir', 'fr.micro', 'fr.ifi') },
  ] },
  { maand: 2, verwachte_wijzigingen: [
    { omschrijving: 'Publicatie van de loi de finances en van aanpassingen in de plus-value-regeling', instantie: 'Legifrance en DGFiP', parameters: metRegeling('fr.pv') },
  ] },
  { maand: 3, verwachte_wijzigingen: [
    { omschrijving: 'Aanpassing van de forfait journalier en andere tarieven van de assurance maladie', instantie: 'Assurance maladie', parameters: metRegeling('fr.secu') },
  ] },
  { maand: 4, verwachte_wijzigingen: [
    { omschrijving: 'Bijwerking van de fiches van service-public.fr: abattements op pensioen en loon, decote, CSG-grenzen', instantie: 'service-public.fr en DGFiP', parameters: metRegeling('fr.csg').concat(['p.fr.ir.abattement_pensioen', 'p.fr.ir.abattement_loon', 'p.fr.ir.decote']) },
    { omschrijving: 'Publicatie van de eerste DVF-levering van het jaar', instantie: 'DGFiP via data.gouv.fr', parameters: ['p.fr.markt.dvf_transactieprijzen'] },
  ] },
  { maand: 5, verwachte_wijzigingen: [] },
  { maand: 6, verwachte_wijzigingen: [
    { omschrijving: 'Publicatie van de departementale DMTO-tarieven; departementen besluiten voor 30 april', instantie: 'DGFiP', parameters: metRegeling('fr.dmto') },
    { omschrijving: 'Halfjaarlijkse aanpassing van de AOW-bedragen bij het wettelijk minimumloon', instantie: 'SVB en Rijksoverheid', parameters: metRegeling('nl.aow') },
  ] },
  { maand: 7, verwachte_wijzigingen: [
    { omschrijving: 'Ingang van wijzigingen in de taxe de publicite fonciere en de frais d assiette', instantie: 'DGFiP', parameters: ['p.fr.vefa.tpf_tarief', 'p.fr.dmto.frais_assiette'] },
  ] },
  { maand: 8, verwachte_wijzigingen: [
    { omschrijving: 'Jaarlijkse bijstelling van het TURPE-tarief door de CRE', instantie: 'CRE en Enedis', parameters: ['p.fr.elec.beheerbijdrage_weigeren_linky', 'p.fr.elec.tariefoptiewissel_zonder_linky', 'p.fr.elec.wijziging_puissance_souscrite'] },
  ] },
  { maand: 9, verwachte_wijzigingen: [
    { omschrijving: 'Indexering van het Consuel-barema', instantie: 'Consuel', parameters: ['p.fr.elec.consuel_geel_elektronisch', 'p.fr.elec.consuel_overige_formulieren', 'p.fr.elec.consuel_contre_visite', 'p.fr.elec.consuel_indexering'] },
    { omschrijving: 'Prinsjesdag: ramingen in de ontwerpbegroting VWS, nog geen vastgestelde waarden', instantie: 'Ministerie van VWS', parameters: ['p.nl.zorg.nominale_premie_raming'] },
  ] },
  { maand: 10, verwachte_wijzigingen: [
    { omschrijving: 'Publicatie van de tweede DVF-levering van het jaar', instantie: 'DGFiP via data.gouv.fr', parameters: ['p.fr.markt.dvf_transactieprijzen'] },
  ] },
  { maand: 11, verwachte_wijzigingen: [
    { omschrijving: 'Vaststelling van de percentages van de inkomensafhankelijke bijdrage Zvw', instantie: 'Ministerie van VWS en Belastingdienst', parameters: metRegeling('nl.zvw') },
  ] },
  { maand: 12, verwachte_wijzigingen: [
    { omschrijving: 'Belastingplan definitief: tarieven, schijven, heffingskortingen en box 3', instantie: 'Belastingdienst', parameters: metRegeling('nl.ib', 'nl.box3') },
    { omschrijving: 'Vaststelling van de standaardpremie en van de zorgtoeslagpercentages', instantie: 'Ministerie van VWS en Belastingdienst Toeslagen', parameters: metRegeling('nl.zorg', 'nl.zorgtoeslag') },
    { omschrijving: 'Publicatie van de woonlandfactor en de Zvw- en Wlz-bijdragen voor het komende jaar', instantie: 'Het CAK', parameters: metRegeling('xb.cak', 'nl.wlz') },
    { omschrijving: 'Halfjaarlijkse aanpassing van de AOW-bedragen bij het wettelijk minimumloon', instantie: 'SVB en Rijksoverheid', parameters: metRegeling('nl.aow') },
  ] },
];

const onbekend = [];
for (const m of maanden) {
  for (const w of m.verwachte_wijzigingen) {
    w.parameters = [...new Set(w.parameters)].sort();
    for (const id of w.parameters) if (!bestaat.has(id)) onbekend.push(id);
  }
}
if (onbekend.length) { console.error('onbekende parameter-ids in de ijkkalender: ' + onbekend.join(', ')); process.exit(1); }

const kalender = {
  meta: {
    titel: 'Peil, ijkkalender',
    versie: VERSIE, versiedatum: PEILDATUM, peildatum: PEILDATUM,
    licentie: LICENTIE_DATA, bronregel: BRONREGEL,
    toelichting: 'Wat hier staat is het normale publicatieritme van de instanties, afgeleid uit het veld publicatiemoment in het register. Het is een verwachting, geen toezegging van een instantie.',
  },
  ijkmomenten,
  maanden: maanden.map((m) => ({
    maand: m.maand,
    naam: MAANDNAMEN[m.maand - 1],
    ijkmoment: ijkmomenten.find((i) => i.maand === m.maand)?.sleutel ?? null,
    verwachte_wijzigingen: m.verwachte_wijzigingen,
  })),
};

writeFileSync(join(WORTEL, 'data', 'ijkkalender.json'), JSON.stringify(kalender, null, 1) + '\n');
console.log('ijkkalender geschreven, geraakte parameters:',
  new Set(maanden.flatMap((m) => m.verwachte_wijzigingen.flatMap((w) => w.parameters))).size);
