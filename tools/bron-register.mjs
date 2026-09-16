// Curatietabel voor data/register.json, afgeleid uit data/inventarisatie.json (taak 0)
// en uit de bronvelden van de aangesloten repo's zelf.
//
// Statusregel die hier strikt is toegepast:
//   vastgesteld  = de aangesloten repo noemt bij deze waarde een bron EN een verificatiedatum
//   te_verifieren = al het overige; de waarde van de tool staat dan alleen in gebruikt_in[].waarde_in_tool
//   raming       = een raming, apart vastgelegd, nooit vermengd met een vastgestelde waarde
//
// Velden: in = [repo, locatie, waarde_in_tool, afwijkend]

const VD_FKAI = '2026-09-15';
const DOOR_FKAI = 'financieel-kompas-ai, config.json';
const VD_VT = '2026-08-12';
const DOOR_VT = 'Vastgoedtransactie, bronnen.json';
const VD_ELEC = '2026-07-04';
const DOOR_ELEC = 'dossier-elektriciteit-if, hoofdstukken';
const CAK_URL = 'https://www.hetcak.nl/zorgverzekering-buitenland/pensioen-uitkering/financiele-informatie/woonlandfactor-zvw-wlz-bijdragen/';
const VT_EMOL_URL = 'https://www.economie.gouv.fr/particuliers/gerer-mon-argent/investir-dans-limmobilier/achat-dun-bien-immobilier-quels-frais-de-notaire-devez-vous-payer';
const VT_PV_URL = 'https://www.impots.gouv.fr/particulier/questions/je-vends-mon-bien-immobilier-vais-je-payer-de-la-plus-value-immobiliere';
const FK = 'financieel-kompas';

// wijzigingshistorie uit de voorganger financieel-kompas (niet aangesloten,
// waarden uitsluitend als historie, nooit als registerwaarde)
const oud = (waarde, opmerking = '') => ([{ waarde: String(waarde), geldig_jaar: '2025', herkomst: FK + ', config.json (voorganger, niet aangesloten)', opmerking }]);

export const PARAMETERS = [

// ----------------------------------------------------------------- NL, AOW
{ id: 'p.nl.aow.bruto_alleenstaand', nl: 'AOW bruto per jaar, alleenstaand', fr: 'Pension AOW brute annuelle, personne seule', off: 'AOW-bedrag alleenstaande, bruto per jaar',
  reg: 'nl.aow', klasse: 'overheid_vastgesteld', effect: 'bepaalt_grondslag', eh: 'EUR/jaar', jaar: '2026',
  freq: 'halfjaarlijks', pub: 'SVB en Rijksoverheid, half december en half juni bij de aanpassing van het wettelijk minimumloon',
  hist: oud(19500, 'editie 2025'),
  in: [[ 'financieel-kompas-ai', 'config.json:7', '19956', false ]],
  opm: 'Het bestand noemt alleen de editie 2026, geen bron en geen verificatiedatum. Daarom geen registerwaarde.' },

{ id: 'p.nl.aow.bruto_partner', nl: 'AOW bruto per jaar, per partner', fr: 'Pension AOW brute annuelle, par partenaire', off: 'AOW-bedrag gehuwd of samenwonend, per persoon, bruto per jaar',
  reg: 'nl.aow', klasse: 'overheid_vastgesteld', effect: 'bepaalt_grondslag', eh: 'EUR/jaar', jaar: '2026',
  freq: 'halfjaarlijks', pub: 'SVB en Rijksoverheid, half december en half juni',
  hist: oud(13000, 'editie 2025'),
  in: [[ 'financieel-kompas-ai', 'config.json:8', '13296', false ]],
  opm: 'Geen bron en geen verificatiedatum in het bestand.' },

// ------------------------------------------------------------- NL, box 1
{ id: 'p.nl.ib.tarieven_onder_aow', nl: 'Tarieven box 1 onder de AOW-leeftijd', fr: 'Taux box 1 avant l age AOW', off: 'Gecombineerd tarief inkomstenbelasting en premie volksverzekeringen',
  reg: 'nl.ib', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'fractie', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, half december bij het Belastingplan',
  hist: oud('0,3697 / 0,495', 'tweeschijvenstelsel in de voorganger'),
  in: [[ 'financieel-kompas-ai', 'config.json:21-25', '0,3575 / 0,3756 / 0,495', false ]] },

{ id: 'p.nl.ib.tarieven_boven_aow', nl: 'Tarieven box 1 boven de AOW-leeftijd', fr: 'Taux box 1 apres l age AOW', off: 'Gecombineerd tarief zonder AOW-premie',
  reg: 'nl.ib', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'fractie', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, half december',
  hist: oud('0,1907 / 0,495'),
  in: [[ 'financieel-kompas-ai', 'config.json:26-30', '0,1785 / 0,3756 / 0,495', false ]] },

{ id: 'p.nl.ib.grens_schijf_1', nl: 'Grens eerste schijf box 1', fr: 'Limite de la premiere tranche box 1', off: 'Einde eerste schijf box 1',
  reg: 'nl.ib', klasse: 'overheid_vastgesteld', effect: 'bepaalt_grondslag', vt: 'drempel', eh: 'EUR', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, half december',
  hist: oud(75518, 'de voorganger kende twee schijven, met een andere grens'),
  in: [[ 'financieel-kompas-ai', 'config.json:35', '38883', false ]] },

{ id: 'p.nl.ib.grens_schijf_2', nl: 'Grens tweede schijf box 1', fr: 'Limite de la deuxieme tranche box 1', off: 'Einde tweede schijf box 1',
  reg: 'nl.ib', klasse: 'overheid_vastgesteld', effect: 'bepaalt_grondslag', vt: 'drempel', eh: 'EUR', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, half december',
  in: [[ 'financieel-kompas-ai', 'config.json:36', '78426', false ]] },

{ id: 'p.nl.ib.algemene_heffingskorting_max', nl: 'Algemene heffingskorting, maximum', fr: 'Credit d impot general, maximum', off: 'Algemene heffingskorting',
  reg: 'nl.ib', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', vt: 'heffingskorting', eh: 'EUR', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, half december',
  hist: oud(3362),
  in: [[ 'financieel-kompas-ai', 'config.json:37', '3115', false ]] },

{ id: 'p.nl.ib.arbeidskorting_max', nl: 'Arbeidskorting, maximum', fr: 'Credit d impot sur le travail, maximum', off: 'Arbeidskorting',
  reg: 'nl.ib', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', vt: 'heffingskorting', eh: 'EUR', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, half december',
  hist: oud(5532),
  in: [[ 'financieel-kompas-ai', 'config.json:38', '5685', false ]] },

{ id: 'p.nl.ib.mkb_winstvrijstelling', nl: 'MKB-winstvrijstelling', fr: 'Exoneration des benefices PME', off: 'MKB-winstvrijstelling',
  reg: 'nl.ib', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', vt: 'vrijstelling', eh: 'fractie', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, half december',
  in: [[ 'financieel-kompas-ai', 'config.json:39', '0,127', false ]] },

{ id: 'p.nl.ib.hk_afbouw_start', nl: 'Startpunt afbouw algemene heffingskorting', fr: 'Debut de la degressivite du credit d impot general', off: 'Afbouwgrens algemene heffingskorting',
  reg: 'nl.ib', klasse: 'overheid_vastgesteld', effect: 'bepaalt_grondslag', vt: 'drempel', eh: 'EUR', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, half december',
  hist: oud(24813),
  in: [[ 'financieel-kompas-ai', 'config.json:40', '29736', false ]],
  opm: 'Gelijk aan het drempelinkomen van de zorgtoeslag, maar het is een eigen grootheid met een eigen grondslag.' },

{ id: 'p.nl.ib.hk_afbouw_factor', nl: 'Afbouwfactor algemene heffingskorting', fr: 'Taux de degressivite du credit d impot general', off: 'Afbouwpercentage algemene heffingskorting',
  reg: 'nl.ib', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'fractie', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, half december',
  hist: oud('0,0663'),
  in: [[ 'financieel-kompas-ai', 'config.json:41', '0,06398', false ]] },

{ id: 'p.nl.ib.ak_afbouw_start', nl: 'Startpunt afbouw arbeidskorting', fr: 'Debut de la degressivite du credit d impot sur le travail', off: 'Afbouwgrens arbeidskorting',
  reg: 'nl.ib', klasse: 'overheid_vastgesteld', effect: 'bepaalt_grondslag', vt: 'drempel', eh: 'EUR', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, half december',
  in: [[ 'financieel-kompas-ai', 'config.json:42', '45592', false ]],
  opm: 'Ontbreekt in de voorganger financieel-kompas; die kent geen afzonderlijke afbouw van de arbeidskorting.' },

{ id: 'p.nl.ib.ak_afbouw_factor', nl: 'Afbouwfactor arbeidskorting', fr: 'Taux de degressivite du credit d impot sur le travail', off: 'Afbouwpercentage arbeidskorting',
  reg: 'nl.ib', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'fractie', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, half december',
  in: [[ 'financieel-kompas-ai', 'config.json:43', '0,0651', false ]] },

// ------------------------------------------------------------- NL, box 3
{ id: 'p.nl.box3.heffingsvrij_alleenstaand', nl: 'Heffingsvrij vermogen box 3, alleenstaand', fr: 'Patrimoine exonere box 3, personne seule', off: 'Heffingsvrij vermogen',
  reg: 'nl.box3', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', vt: 'vrijstelling', eh: 'EUR', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, half december',
  hist: oud(57684),
  in: [[ 'financieel-kompas-ai', 'config.json:46', '59357', false ]] },

{ id: 'p.nl.box3.heffingsvrij_partners', nl: 'Heffingsvrij vermogen box 3, partners', fr: 'Patrimoine exonere box 3, couple', off: 'Heffingsvrij vermogen fiscale partners',
  reg: 'nl.box3', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', vt: 'vrijstelling', eh: 'EUR', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, half december',
  hist: oud(115368),
  in: [[ 'financieel-kompas-ai', 'config.json:47', '118714', false ]] },

{ id: 'p.nl.box3.tarief', nl: 'Tarief box 3', fr: 'Taux box 3', off: 'Tarief inkomstenbelasting box 3',
  reg: 'nl.box3', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'fractie', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, half december',
  in: [[ 'financieel-kompas-ai', 'config.json:48', '0,36', false ]] },

{ id: 'p.nl.box3.rendement_spaargeld', nl: 'Forfaitair rendement spaargeld', fr: 'Rendement forfaitaire sur l epargne', off: 'Forfaitair rendementspercentage banktegoeden',
  reg: 'nl.box3', klasse: 'overheid_vastgesteld', effect: 'bepaalt_grondslag', eh: 'fractie', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, definitief begin van het volgende jaar',
  hist: oud('0,0617', 'de voorganger kende een enkel forfaitair rendement in plaats van drie'),
  in: [[ 'financieel-kompas-ai', 'config.json:49', '0,0128', false ]] },

{ id: 'p.nl.box3.rendement_beleggingen', nl: 'Forfaitair rendement beleggingen', fr: 'Rendement forfaitaire sur les placements', off: 'Forfaitair rendementspercentage overige bezittingen',
  reg: 'nl.box3', klasse: 'overheid_vastgesteld', effect: 'bepaalt_grondslag', eh: 'fractie', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, half december',
  in: [[ 'financieel-kompas-ai', 'config.json:50', '0,06', false ]] },

{ id: 'p.nl.box3.rendement_schulden', nl: 'Forfaitair rendement schulden', fr: 'Rendement forfaitaire sur les dettes', off: 'Forfaitair rendementspercentage schulden',
  reg: 'nl.box3', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', eh: 'fractie', jaar: '2026',
  freq: 'jaarlijks', pub: 'Belastingdienst, definitief begin van het volgende jaar',
  in: [[ 'financieel-kompas-ai', 'config.json:51', '0,027', false ]] },

// ------------------------------------------------------------ NL, Zvw en Wlz
{ id: 'p.nl.zvw.percentage_laag', nl: 'Zvw inkomensafhankelijke bijdrage, lage percentage', fr: 'Cotisation Zvw dependante du revenu, taux reduit', off: 'Lage percentage inkomensafhankelijke bijdrage Zvw',
  reg: 'nl.zvw', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'fractie', jaar: '2026',
  st: 'vastgesteld', w: 0.0485, wv: '4,85 procent', van: '2026-01-01',
  kn: 'Regeling van 3 november 2025, kenmerk 4240020-1089850-Z, Ministerie van VWS, Staatscourant 2025, 38055',
  bs: 'primair', inst: 'Ministerie van VWS en Belastingdienst', vd: VD_FKAI, vdoor: DOOR_FKAI,
  freq: 'jaarlijks', lw: '2026-01-01', pub: 'Belastingdienst, percentages inkomensafhankelijke bijdrage, begin november',
  hist: oud('0,0526', 'waarde 2025'),
  in: [[ 'financieel-kompas-ai', 'config.json:14', '0,0485', false ], [ 'financieel-kompas-ai', 'config.json:250 (CAK-blok)', '0,0485', false ]],
  uitz: ['Loon valt niet onder het lage percentage: daarover draagt de werkgever de werkgeversheffing af. Welk percentage in een concreet geval geldt, is een vraag voor een belastingadviseur.'],
  test: { invoer: 'pensioeninkomen 30.000 euro', verwachte_uitkomst: '1.455 euro Zvw-bijdrage', toelichting: '30.000 maal 0,0485, onder het maximumbijdrage-inkomen.' } },

{ id: 'p.nl.zvw.max_bijdrage_inkomen', nl: 'Maximumbijdrage-inkomen Zvw', fr: 'Revenu maximal soumis a la cotisation Zvw', off: 'Maximum bijdrage-inkomen Zvw',
  reg: 'nl.zvw', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', vt: 'plafond', eh: 'EUR/jaar', jaar: '2026',
  st: 'vastgesteld', w: 79409, wv: '79.409 euro per jaar', van: '2026-01-01',
  kn: 'Regeling van 3 november 2025, kenmerk 4240020-1089850-Z, Ministerie van VWS, Staatscourant 2025, 38055',
  bs: 'primair', inst: 'Ministerie van VWS en Belastingdienst', vd: VD_FKAI, vdoor: DOOR_FKAI,
  freq: 'jaarlijks', lw: '2026-01-01', pub: 'Belastingdienst, begin november',
  in: [[ 'financieel-kompas-ai', 'config.json:15', '79409', false ], [ 'financieel-kompas-ai', 'config.json:252 (CAK-blok)', '79409', false ]],
  opm: 'Geldt per persoon.' },

{ id: 'p.nl.wlz.percentage', nl: 'Wlz-premiepercentage', fr: 'Taux de cotisation Wlz', off: 'Premiepercentage Wet langdurige zorg',
  reg: 'nl.wlz', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'fractie', jaar: '2026',
  st: 'vastgesteld', w: 0.0965, wv: '9,65 procent', van: '2026-01-01',
  url: CAK_URL, kn: 'Het CAK, pagina Woonlandfactor, Zvw- en Wlz-bijdragen', bs: 'secundair: pagina van het CAK, de onderliggende regeling niet zelf gelezen',
  inst: 'Het CAK', vd: VD_FKAI, vdoor: DOOR_FKAI,
  freq: 'jaarlijks', lw: '2026-01-01', pub: 'CAK, eind december',
  in: [[ 'financieel-kompas-ai', 'config.json:251', '0,0965', false ]] },

{ id: 'p.nl.wlz.max_bijdrage_inkomen', nl: 'Maximumbijdrage-inkomen Wlz', fr: 'Revenu maximal soumis a la cotisation Wlz', off: 'Maximum bijdrage-inkomen Wlz',
  reg: 'nl.wlz', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', vt: 'plafond', eh: 'EUR/jaar', jaar: '2026',
  st: 'vastgesteld', w: 38883, wv: '38.883 euro per jaar', van: '2026-01-01',
  url: CAK_URL, kn: 'Het CAK, pagina Woonlandfactor, Zvw- en Wlz-bijdragen', bs: 'secundair: pagina van het CAK, de onderliggende regeling niet zelf gelezen',
  inst: 'Het CAK', vd: VD_FKAI, vdoor: DOOR_FKAI,
  freq: 'jaarlijks', lw: '2026-01-01', pub: 'CAK, eind december',
  in: [[ 'financieel-kompas-ai', 'config.json:253', '38883', false ]],
  opm: 'Zvw en Wlz kennen verschillende maximumbijdrage-inkomens. Dit bedrag is toevallig gelijk aan de grens van de eerste schijf box 1, maar het is een eigen grootheid.' },

{ id: 'p.nl.wlz.max_bijdrage_inkomen_voor_1946', nl: 'Maximumbijdrage-inkomen Wlz, geboortejaar 1945 of eerder', fr: 'Revenu maximal Wlz, nes en 1945 ou avant', off: 'Maximum bijdrage-inkomen Wlz voor geboortejaren tot en met 1945',
  reg: 'nl.wlz', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', vt: 'plafond', eh: 'EUR/jaar', jaar: '2026',
  st: 'vastgesteld', w: 41123, wv: '41.123 euro per jaar', van: '2026-01-01',
  url: CAK_URL, kn: 'Het CAK, pagina Woonlandfactor, Zvw- en Wlz-bijdragen', bs: 'secundair: pagina van het CAK, de onderliggende regeling niet zelf gelezen',
  inst: 'Het CAK', vd: VD_FKAI, vdoor: DOOR_FKAI,
  freq: 'jaarlijks', lw: '2026-01-01', pub: 'CAK, eind december',
  in: [[ 'financieel-kompas-ai', 'config.json:254', '41123', false ]] },

// -------------------------------------------------------- NL, zorgpremie en zorgtoeslag
{ id: 'p.nl.zorg.nominale_premie', nl: 'Nominale zorgpremie per volwassene per jaar', fr: 'Prime nominale d assurance maladie par adulte et par an', off: 'Standaardpremie Wet op de zorgtoeslag',
  reg: 'nl.zorg', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'EUR/jaar', jaar: '2026',
  st: 'vastgesteld', w: 2119, wv: '2.119 euro per jaar', van: '2026-01-01',
  kn: 'Regeling vaststelling standaardpremie en bestuursrechtelijke premies 2026, Ministerie van VWS, in werking per 1 januari 2026',
  bs: 'primair', inst: 'Ministerie van VWS', vd: VD_FKAI, vdoor: DOOR_FKAI,
  freq: 'jaarlijks', lw: '2026-01-01', pub: 'Ministerie van VWS, regeling half december',
  in: [[ 'financieel-kompas-ai', 'config.json:54', '2119', false ]],
  uitz: ['Het verplicht eigen risico zit niet in dit bedrag. Wie de werkelijke jaarlast wil weten, telt het eigen risico erbij op; de omvang daarvan hangt af van het zorggebruik.'],
  opm: 'Er circuleert ook 2143. Dat is een raming uit de ontwerpbegroting VWS van september 2025 en staat in Peil apart, als p.nl.zorg.nominale_premie_raming.' },

{ id: 'p.nl.zorg.nominale_premie_raming', nl: 'Nominale zorgpremie, raming ontwerpbegroting', fr: 'Prime nominale, estimation du projet de budget', off: 'Geraamde nominale premie, ontwerpbegroting VWS',
  reg: 'nl.zorg', klasse: 'overheid_vastgesteld', effect: 'informatief', eh: 'EUR/jaar', jaar: '2026',
  st: 'raming', w: 2143, wv: '2.143 euro per jaar, raming',
  kn: 'Ontwerpbegroting VWS, september 2025', bs: 'secundair: raming in een begrotingsstuk, geen vastgestelde regeling',
  inst: 'Ministerie van VWS', vd: VD_FKAI, vdoor: DOOR_FKAI,
  freq: 'jaarlijks', pub: 'Prinsjesdag, derde dinsdag van september',
  kand: true,
  opm: 'Staat hier uitsluitend om raming en vaststelling uit elkaar te houden. Rekentools horen met de vastgestelde waarde te rekenen, niet met deze raming.' },

{ id: 'p.nl.zorgtoeslag.drempelinkomen', nl: 'Drempelinkomen zorgtoeslag', fr: 'Revenu de seuil pour l allocation sante', off: 'Drempelinkomen zorgtoeslag',
  reg: 'nl.zorgtoeslag', klasse: 'overheid_vastgesteld', effect: 'bepaalt_grondslag', vt: 'drempel', eh: 'EUR/jaar', jaar: '2026',
  st: 'vastgesteld', w: 29736, wv: '29.736 euro per jaar', van: '2026-01-01',
  kn: 'Besluit percentages drempel- en toetsingsinkomen zorgtoeslag, geldend per 1 januari 2026', bs: 'primair',
  inst: 'Ministerie van VWS en Belastingdienst Toeslagen', vd: VD_FKAI, vdoor: DOOR_FKAI,
  freq: 'jaarlijks', lw: '2026-01-01', pub: 'half december',
  in: [[ 'financieel-kompas-ai', 'config.json:61', '29736', false ]] },

{ id: 'p.nl.zorgtoeslag.normpercentage_zonder_partner', nl: 'Normpercentage zorgtoeslag zonder partner', fr: 'Taux normatif sans partenaire', off: 'Normpercentage drempelinkomen, alleenstaande',
  reg: 'nl.zorgtoeslag', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', eh: 'fractie', jaar: '2026',
  st: 'vastgesteld', w: 0.01912, wv: '1,912 procent', van: '2026-01-01',
  kn: 'Besluit percentages drempel- en toetsingsinkomen zorgtoeslag, geldend per 1 januari 2026', bs: 'primair',
  inst: 'Ministerie van VWS', vd: VD_FKAI, vdoor: DOOR_FKAI, freq: 'jaarlijks', lw: '2026-01-01', pub: 'half december',
  in: [[ 'financieel-kompas-ai', 'config.json:62', '0,01912', false ]] },

{ id: 'p.nl.zorgtoeslag.normpercentage_met_partner', nl: 'Normpercentage zorgtoeslag met partner', fr: 'Taux normatif avec partenaire', off: 'Normpercentage drempelinkomen, met toeslagpartner',
  reg: 'nl.zorgtoeslag', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', eh: 'fractie', jaar: '2026',
  st: 'vastgesteld', w: 0.04289, wv: '4,289 procent', van: '2026-01-01',
  kn: 'Besluit percentages drempel- en toetsingsinkomen zorgtoeslag, geldend per 1 januari 2026', bs: 'primair',
  inst: 'Ministerie van VWS', vd: VD_FKAI, vdoor: DOOR_FKAI, freq: 'jaarlijks', lw: '2026-01-01', pub: 'half december',
  in: [[ 'financieel-kompas-ai', 'config.json:63', '0,04289', false ]] },

{ id: 'p.nl.zorgtoeslag.afbouwpercentage', nl: 'Afbouwpercentage zorgtoeslag', fr: 'Taux de degressivite de l allocation sante', off: 'Afbouwpercentage boven het drempelinkomen',
  reg: 'nl.zorgtoeslag', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'fractie', jaar: '2026',
  st: 'vastgesteld', w: 0.1373, wv: '13,73 procent', van: '2026-01-01',
  kn: 'Besluit percentages drempel- en toetsingsinkomen zorgtoeslag, geldend per 1 januari 2026', bs: 'primair',
  inst: 'Ministerie van VWS', vd: VD_FKAI, vdoor: DOOR_FKAI, freq: 'jaarlijks', lw: '2026-01-01', pub: 'half december',
  in: [[ 'financieel-kompas-ai', 'config.json:64', '0,1373', false ]] },

{ id: 'p.nl.zorgtoeslag.vermogensgrens_zonder_partner', nl: 'Vermogensgrens zorgtoeslag zonder partner', fr: 'Plafond de patrimoine sans partenaire', off: 'Maximaal vermogen zorgtoeslag, alleenstaande',
  reg: 'nl.zorgtoeslag', klasse: 'overheid_vastgesteld', effect: 'bepaalt_toepasselijkheid', vt: 'plafond', eh: 'EUR', jaar: '2026',
  st: 'vastgesteld', w: 146011, wv: '146.011 euro', van: '2026-01-01',
  kn: 'Belastingdienst, Maximaal vermogen zorgtoeslag per jaar', bs: 'secundair: overzichtspagina van de Belastingdienst, de onderliggende regeling niet zelf gelezen',
  inst: 'Belastingdienst Toeslagen', vd: VD_FKAI, vdoor: DOOR_FKAI, freq: 'jaarlijks', lw: '2026-01-01', pub: 'half december',
  in: [[ 'financieel-kompas-ai', 'config.json:65', '146011', false ]],
  opm: 'Harde afkap: ligt het box 3-vermogen op de peildatum boven de grens, dan is er voor het hele jaar geen zorgtoeslag. Geen glijdende schaal.' },

{ id: 'p.nl.zorgtoeslag.vermogensgrens_met_partner', nl: 'Vermogensgrens zorgtoeslag met partner', fr: 'Plafond de patrimoine avec partenaire', off: 'Maximaal vermogen zorgtoeslag, met toeslagpartner',
  reg: 'nl.zorgtoeslag', klasse: 'overheid_vastgesteld', effect: 'bepaalt_toepasselijkheid', vt: 'plafond', eh: 'EUR', jaar: '2026',
  st: 'vastgesteld', w: 184633, wv: '184.633 euro', van: '2026-01-01',
  kn: 'Belastingdienst, Maximaal vermogen zorgtoeslag per jaar', bs: 'secundair: overzichtspagina van de Belastingdienst, de onderliggende regeling niet zelf gelezen',
  inst: 'Belastingdienst Toeslagen', vd: VD_FKAI, vdoor: DOOR_FKAI, freq: 'jaarlijks', lw: '2026-01-01', pub: 'half december',
  in: [[ 'financieel-kompas-ai', 'config.json:66', '184633', false ]] },

{ id: 'p.nl.leges.paspoort_verlengen_buitenland', nl: 'Nederlands paspoort verlengen in Frankrijk', fr: 'Renouvellement du passeport neerlandais en France', off: 'Consulaire leges paspoort',
  reg: 'nl.leges', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'EUR', jaar: '2025',
  freq: 'jaarlijks', pub: 'Ministerie van Buitenlandse Zaken, begin januari',
  in: [[ 'cafeclaude', 'lib/domains/prompts/bureaucratie.ts:44', '83,37', false ]],
  opm: 'Het handboek noemt 2025 als jaar. Voor 2026 is geen waarde vastgelegd.' },
];
