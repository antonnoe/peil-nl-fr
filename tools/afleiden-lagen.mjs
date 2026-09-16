#!/usr/bin/env node
// Laag 2 (rekenregels, kiem) en laag 1 (duidingsregels, alleen schema),
// plus het lege documentenregister. Eenmalige afleiding; daarna zijn de
// bestanden in data/ de bron van waarheid.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { REGELINGEN } from './lib/regelingen.mjs';
import { PEILDATUM, VERSIE, LICENTIE_DATA, BRONREGEL } from './lib/versie.mjs';

const WORTEL = join(dirname(fileURLToPath(import.meta.url)), '..');

const COCKPIT = {
  'Vastgoedtransactie': 'Vastgoedtransacties, transactiekostentool',
  'Plus-Value-Calculator': 'Vastgoedtransacties, plus-value',
  'financieel-kompas-ai': 'CC / IF, Financieel Kompas (AI-versie)',
  'cafeclaude': 'CC, Café Claude',
  'zorgkompas-frankrijk': 'IF, ZorgKompas',
};

const regelingVan = (code) => {
  const r = REGELINGEN[code];
  return { code, naam: r.naam, belastingtype: r.belastingtype, socialelastentype: r.socialelastentype, vrijstellingstype: null, transactionele_basis: r.transactionele_basis };
};

const R = (o) => ({
  id: o.id,
  naam_nl: o.nl,
  naam_fr: o.fr ?? null,
  land: o.id.split('.')[1].toUpperCase(),
  lastensoort: o.ls || REGELINGEN[o.reg].lastensoort,
  regeling: regelingVan(o.reg),
  status: o.st || 'te_verifieren',
  omschrijving: o.omschrijving,
  gebruikt_parameters: o.params || [],
  gebruikt_rekenregels: o.regels || [],
  volgorde: o.volgorde ?? null,
  bron_url: o.url ?? null,
  bron_kenmerk: o.kn ?? null,
  bronsoort: o.bs ?? null,
  instantie: o.inst ?? null,
  verificatiedatum: o.vd ?? null,
  verificatie_door: o.vdoor ?? null,
  levensduur_b: { ingevoerd: o.ingev ?? null, vervallen: null, opgevolgd_door: null },
  gebruikt_in: (o.in || []).map(([repo, locatie, waarde, afwijkend]) => ({
    repo, cockpit_onderdeel: COCKPIT[repo] || 'onbekend', locatie,
    waarde_in_tool: waarde ?? null, afwijkend: Boolean(afwijkend),
  })),
  testvoorbeelden: o.tests || [],
  uitzonderingen: o.uitz || [],
  opmerkingen: o.opm ?? null,
  kandidaat: o.kand === true || !(o.in && o.in.length),
});

const rekenregels = [
  R({
    id: 'r.fr.pv.belastbare_meerwaarde', reg: 'fr.pv',
    nl: 'Belastbare meerwaarde bij verkoop van Frans onroerend goed',
    fr: 'Plus-value imposable sur la cession d\'un bien immobilier',
    omschrijving: 'Verkoopprijs min verkoopkosten, min de aankoopprijs verhoogd met het forfait aankoopkosten en het forfait werkzaamheden, geeft de bruto meerwaarde. Daarop wordt per bezitsjaar de aftrek toegepast, voor de inkomstenbelasting en voor de prélèvements sociaux afzonderlijk, wat twee verschillende belastbare bedragen oplevert.',
    volgorde: 'eerste stap; de uitkomst is de grondslag voor r.fr.pv.heffing en r.fr.pv.surtaxe',
    params: ['p.fr.pv.forfait_aankoopkosten', 'p.fr.pv.forfait_werkzaamheden', 'p.fr.pv.abattement_ir_per_jaar', 'p.fr.pv.abattement_ps_per_jaar', 'p.fr.pv.terugname_afschrijvingen_vanaf'],
    kn: 'art. 150 V tot 150 VD CGI', bs: 'primair', inst: 'DGFiP',
    in: [['Vastgoedtransactie', 'calc.js:230-280', null, false], ['Plus-Value-Calculator', 'generate_pdf.py:40-130', null, false]],
    tests: [{ invoer: 'aankoop 200.000 euro in 2010, verkoop 320.000 euro in 2026, geen werkelijke kosten opgevoerd', verwachte_uitkomst: 'bruto meerwaarde 75.000 euro, daarna 16 volle bezitsjaren aftrek', toelichting: '200.000 plus 7,5 procent forfait aankoopkosten plus 15 procent forfait werkzaamheden geeft een aanschafwaarde van 245.000 euro.' }],
    uitz: ['Bij verkrijging om niet bestaat het forfait aankoopkosten niet. Bij gemeubileerde verhuur worden afgetrokken afschrijvingen teruggenomen. Beide gevallen horen bij de notaris.'],
    opm: 'Kiem: de regel is beschreven en verwijst naar bestaande parameters, maar is niet uitvoerbaar vastgelegd. De formule zelf komt in taak 2.',
  }),
  R({
    id: 'r.fr.pv.heffing', reg: 'fr.pv',
    nl: 'Heffing over de belastbare meerwaarde',
    fr: 'Imposition de la plus-value',
    omschrijving: 'Over de voor de inkomstenbelasting belastbare meerwaarde wordt het vaste tarief geheven. Over de voor de sociale lasten belastbare meerwaarde worden de prélèvements sociaux geheven, tenzij het arrest De Ruyter van toepassing is; dan blijft alleen het prélèvement de solidarité over.',
    volgorde: 'na r.fr.pv.belastbare_meerwaarde',
    params: ['p.fr.pv.tarief_ir', 'p.fr.ps.taux_global', 'p.xb.deruyter.prelevement_solidarite'],
    regels: ['r.fr.pv.belastbare_meerwaarde'],
    kn: 'art. 200 B CGI en art. L136-6 CSS', bs: 'primair', inst: 'DGFiP',
    in: [['Vastgoedtransactie', 'calc.js:156-160', null, false], ['Plus-Value-Calculator', 'generate_pdf.py:87-130', null, false]],
    tests: [{ invoer: 'belastbare meerwaarde 100.000 euro, geen De Ruyter', verwachte_uitkomst: '19.000 euro inkomstenbelasting en 17.200 euro sociale lasten, samen 36.200 euro', toelichting: 'Zonder surtaxe.' },
            { invoer: 'belastbare meerwaarde 100.000 euro, wel De Ruyter', verwachte_uitkomst: '19.000 euro inkomstenbelasting en 7.500 euro prélèvement de solidarité, samen 26.500 euro', toelichting: 'Dit is de 26,5 procent die Café Claude noemt tegenover 36,2 procent.' }],
  }),
  R({
    id: 'r.fr.pv.surtaxe', reg: 'fr.pv',
    nl: 'Surtaxe op hoge meerwaarden',
    fr: 'Taxe sur les plus-values élevées',
    omschrijving: 'Boven een belastbare meerwaarde van 50.000 euro komt een extra heffing van 2 tot 6 procent, per verkoper, met een afvlakkingsformule rond elke tranchegrens.',
    volgorde: 'na r.fr.pv.belastbare_meerwaarde, naast r.fr.pv.heffing',
    params: ['p.fr.pv.surtaxe_barema'],
    regels: ['r.fr.pv.belastbare_meerwaarde'],
    kn: 'art. 1609 nonies G CGI', bs: 'primair', inst: 'DGFiP',
    in: [['Vastgoedtransactie', 'calc.js:245-255', null, false], ['Plus-Value-Calculator', 'generate_pdf.py:58-63', null, true]],
    tests: [{ invoer: 'belastbare meerwaarde 120.000 euro', verwachte_uitkomst: 'heffing volgens de tranche 110.000 tot 160.000 met afvlakking', toelichting: 'De twee tools geven hier verschillende uitkomsten: de Python-versie mist de afvlakkingsformule.' }],
    uitz: ['Geldt niet bij bouwgrond en wordt per verkoper toegepast.'],
  }),
  R({
    id: 'r.fr.notaris.transactiekosten', reg: 'fr.notaris',
    nl: 'Totale transactiekosten bij aankoop van bestaande bouw',
    fr: 'Frais totaux d\'acquisition dans l\'ancien',
    omschrijving: 'De som van de emolumenten van de notaris met btw, de droits de mutation (departementaal deel plus frais d\'assiette, plus taxe communale), de contribution de sécurité immobilière en de débours. Eventueel verminderd met de wettelijke korting op de emolumenten.',
    volgorde: 'zelfstandige regel; vervangt de vuistregel van 7 tot 8 procent',
    params: ['p.fr.notaris.emolumenten_schaal', 'p.fr.notaris.remise_drempel_en_maximum', 'p.fr.notaris.debours_forfait', 'p.fr.dmto.departementaal_standaard', 'p.fr.dmto.departementaal_primo', 'p.fr.dmto.taxe_communale', 'p.fr.dmto.frais_assiette', 'p.fr.csi.tarief_en_minimum', 'p.fr.tva.tarief_algemeen'],
    kn: 'art. A444-91 Code de commerce, art. 1584, 1594 D, 1647 en 879 CGI', bs: 'primair', inst: 'DGFiP en Conseil supérieur du notariat',
    vd: '2026-08-12', vdoor: 'Vastgoedtransactie, bronnen.json',
    in: [['Vastgoedtransactie', 'calc.js, kernberekening', null, false]],
    tests: [{ invoer: 'bestaande woning, 250.000 euro, departement met 5,00 procent, geen primo-accédant', verwachte_uitkomst: 'kosten koper van ongeveer 7,4 procent van de koopsom', toelichting: 'De vuistregel van 7 tot 8 procent klopt hier ruwweg, maar niet in een departement met 4,50 procent en niet bij een primo-accédant.' }],
    opm: 'Drie aangesloten tools gebruiken in plaats hiervan een vuistregel. Zie p.fr.notaris.vuistregel_kosten_ancien.',
  }),
  R({
    id: 'r.nl.zorgtoeslag.bedrag', reg: 'nl.zorgtoeslag',
    nl: 'Hoogte van de zorgtoeslag',
    fr: 'Montant de l\'allocation santé',
    omschrijving: 'De standaardpremie min de normpremie. De normpremie is het normpercentage maal het drempelinkomen, plus het afbouwpercentage maal het inkomen boven het drempelinkomen. De uitkomst kan niet negatief zijn. Ligt het box 3-vermogen op de peildatum boven de vermogensgrens, dan is de zorgtoeslag nul voor het hele jaar.',
    volgorde: 'na vaststelling van het toetsingsinkomen',
    params: ['p.nl.zorg.nominale_premie', 'p.nl.zorgtoeslag.drempelinkomen', 'p.nl.zorgtoeslag.normpercentage_zonder_partner', 'p.nl.zorgtoeslag.normpercentage_met_partner', 'p.nl.zorgtoeslag.afbouwpercentage', 'p.nl.zorgtoeslag.vermogensgrens_zonder_partner', 'p.nl.zorgtoeslag.vermogensgrens_met_partner'],
    kn: 'Wet op de zorgtoeslag en het Besluit percentages drempel- en toetsingsinkomen zorgtoeslag', bs: 'primair', inst: 'Belastingdienst Toeslagen',
    vd: '2026-09-15', vdoor: 'financieel-kompas-ai, config.json',
    in: [['financieel-kompas-ai', 'config.json:56-70 en de rekenkern', null, false]],
    tests: [{ invoer: 'alleenstaande, toetsingsinkomen 25.000 euro, vermogen onder de grens', verwachte_uitkomst: 'zorgtoeslag 2.119 min de normpremie over 25.000 euro', toelichting: 'Het inkomen ligt onder het drempelinkomen, dus het afbouwdeel is nul.' }],
    uitz: ['Het toetsingsinkomen is niet hetzelfde als het door een rekentool berekende bruto inkomen. Voor een exact bedrag geldt de beschikking van de Belastingdienst.'],
  }),
  R({
    id: 'r.xb.cak.verdragsbijdrage', reg: 'xb.cak',
    nl: 'Verdragsbijdrage aan het CAK',
    fr: 'Cotisation conventionnelle au CAK',
    omschrijving: 'De nominale Zvw-bijdrage plus de inkomensafhankelijke Zvw-bijdrage plus de Wlz-bijdrage, elk begrensd door het eigen maximumbijdrage-inkomen, en het geheel vermenigvuldigd met de woonlandfactor van het woonland.',
    volgorde: 'in plaats van de Nederlandse premie en in plaats van de Franse CSG, voor wie een S1 heeft',
    params: ['p.xb.cak.woonlandfactor_fr', 'p.xb.cak.nominale_zvw_bijdrage_jaar', 'p.nl.zvw.percentage_laag', 'p.nl.zvw.max_bijdrage_inkomen', 'p.nl.wlz.percentage', 'p.nl.wlz.max_bijdrage_inkomen', 'p.nl.wlz.max_bijdrage_inkomen_voor_1946'],
    kn: 'Zorgverzekeringswet, art. 69; Vo. (EG) 883/2004', bs: 'secundair: pagina van het CAK, de regeling niet zelf gelezen', inst: 'Het CAK',
    vd: '2026-09-15', vdoor: 'financieel-kompas-ai, config.json',
    in: [['financieel-kompas-ai', 'config.json:247-256 en de CAK-rekenkern', null, false]],
    tests: [{ invoer: 'nominale bijdrage 157,00 euro per maand, woonlandfactor Frankrijk', verwachte_uitkomst: '130,37 euro per maand', toelichting: 'Exact het maandbedrag dat het CAK voor Frankrijk publiceert.' }],
    opm: 'De volgorde waarin het CAK de bestanddelen toepast staat in geen enkele repo vast. Zie p.xb.cak.rekenwijze_verdragsbijdrage in de gatenlijst.',
  }),
  R({
    id: 'r.fr.ir.belasting_na_decote', reg: 'fr.ir',
    nl: 'Impôt sur le revenu na plafonnering en décote',
    fr: 'Impôt sur le revenu après plafonnement et décote',
    omschrijving: 'Het belastbaar inkomen wordt gedeeld door het aantal parts, door het barema gehaald en weer vermenigvuldigd met het aantal parts. Het voordeel van de extra halve parts wordt geplafonneerd. Daarna volgt de décote en pas daarna komen belastingkortingen en belastingkredieten.',
    volgorde: 'na de abattements, voor de belastingkredieten',
    params: ['p.fr.ir.schijven', 'p.fr.ir.quotient_plafond_per_halve_part', 'p.fr.ir.decote', 'p.fr.ir.abattement_pensioen', 'p.fr.ir.abattement_loon', 'p.fr.ir.abattement_65plus'],
    kn: 'art. 197 CGI', bs: 'secundair: de volgorde is uit de toelichting van de tool overgenomen, art. 197 CGI niet zelf gelezen', inst: 'DGFiP',
    in: [['financieel-kompas-ai', 'config.json:155-212 en de FR-rekenkern', null, false], ['cafeclaude', 'lib/domains/prompts/geld.ts:55', null, false]],
    tests: [{ invoer: 'echtpaar, 2 parts, belastbaar inkomen 40.000 euro', verwachte_uitkomst: 'belasting volgens het barema over 20.000 euro per part, maal 2, daarna de décote toetsen', toelichting: 'De volgorde is bepalend: de décote pas na de plafonnering.' }],
    uitz: ['Voor een niet-resident geldt bovendien het minimumtarief van art. 197 A CGI. Dat staat nog niet in het register.'],
  }),
  R({
    id: 'r.fr.csg.regime_bepalen', reg: 'fr.csg',
    nl: 'Bepalen welk CSG-regime geldt',
    fr: 'Détermination du taux de CSG applicable',
    omschrijving: 'Het revenu fiscal de référence van twee jaar terug wordt vergeleken met de grenzen die horen bij het aantal parts. Boven drie parts komt er per halve part een opslag bij. De uitkomst wijst een van de vier regimes aan.',
    volgorde: 'voor de heffing van CSG, CRDS en CASA',
    params: ['p.fr.csg.tarief_per_regime', 'p.fr.csg.rfr_grenzen_per_part', 'p.fr.csg.opslag_per_halve_part'],
    url: 'https://www.service-public.fr/particuliers/vosdroits/F2971',
    kn: 'service-public.fr, fiche F2971', bs: 'secundair: samenvattende fiche van service-public.fr', inst: 'Urssaf',
    vd: '2026-06-01', vdoor: 'financieel-kompas-ai, config.json',
    in: [['financieel-kompas-ai', 'config.json:85-152', null, false]],
    tests: [{ invoer: 'RFR 2024 van 18.000 euro, 1 part', verwachte_uitkomst: 'taux médian, 7,4 procent', toelichting: '18.000 ligt tussen 17.057 en 26.472 euro.' }],
    uitz: ['Overgang naar een hoger tarief geldt pas na twee opeenvolgende jaren overschrijding. Die regel is in geen enkele tool ingebouwd.'],
  }),
];

const meta = (laag, extra = {}) => ({
  titel: 'Peil, openbaar parameterregister NL-FR',
  versie: VERSIE, versiedatum: PEILDATUM, peildatum: PEILDATUM,
  licentie: LICENTIE_DATA, bronregel: BRONREGEL, laag, ...extra,
});

writeFileSync(join(WORTEL, 'data', 'rekenregels.json'), JSON.stringify({
  meta: meta('2, rekenregels', { stand: 'kiem: de regels zijn beschreven en verwijzen naar bestaande parameters, met testvoorbeelden. Uitvoerbare formules komen in een volgende taak.' }),
  rekenregels,
}, null, 1) + '\n');

writeFileSync(join(WORTEL, 'data', 'duidingsregels.json'), JSON.stringify({
  meta: meta('1, duidingsregels', { stand: 'leeg: in taak 1 is alleen het schema opgeleverd. De vulling wordt later geïndexeerd over de handboeken van Café Claude.' }),
  duidingsregels: [],
}, null, 1) + '\n');

writeFileSync(join(WORTEL, 'data', 'documenten.json'), JSON.stringify({
  meta: meta('documentenregister', { stand: 'leeg: in taak 1 is alleen het schema opgeleverd. De inventarisatie van de handboeken en PDF\'s van Café Claude valt buiten deze taak.' }),
  documenten: [],
}, null, 1) + '\n');

console.log('rekenregels:', rekenregels.length, 'duidingsregels: 0, documenten: 0');
