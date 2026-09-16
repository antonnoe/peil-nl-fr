// Bewaking van de diakritische tekens in weergavetekst.
//
// De lijst hieronder bevat veelvoorkomende Franse en Nederlandse woorden in de
// vorm zonder accent. Zo'n vorm hoort niet in tekst te staan die een lezer ziet:
// een naam, een omschrijving, een opmerking, een paginatekst of een regel uit de
// documentatie. In een id, een sleutel, een bestandsnaam, een API-pad of een URL
// blijft de vorm zonder accent juist wel staan, zodat geen permalink breekt.
// Daarom slaat de zoeker tokens over die op een sleutel lijken.

export const ZONDER_ACCENT = [
  // Frans
  'activite', 'agees', 'ajoutee', 'annee', 'annees', 'apres', 'arrete', 'arretes',
  'bareme', 'baremes', 'beneficier', 'categories', 'cout', 'couts', 'declaration',
  'decote', 'deduction', 'defaut', 'degressive', 'depenses', 'detention', 'duree',
  'electricite', 'electrique', 'emoluments', 'energetique', 'etat', 'etranger',
  'europeenne', 'exoneration', 'fiscalite', 'fonciere', 'foncieres', 'hereditaire',
  'hotes', 'immobiliere', 'immobilieres', 'impot', 'impots', 'infirmiere', 'interets',
  'legislation', 'medecin', 'medicale', 'medicaments', 'ministere', 'numero',
  'prelevement', 'prelevements', 'premiere', 'pret', 'proprietes', 'publicite',
  'reception', 'reduction', 'reduit', 'reference', 'renovation', 'residence',
  'residences', 'resiliation', 'sante', 'securite', 'solidarite', 'superieur',
  'supplementaire', 'temperature', 'validite',
  // Nederlands
  'belgie', 'cafe', 'categorieen', 'financiele', 'geidentificeerd', 'geindexeerd',
  'kopieren', 'ministeriele', 'officiele', 'reele', 'verifieren',
];

const WOORD_RE = new RegExp('\\b(' + ZONDER_ACCENT.join('|') + ')\\b', 'gi');

// Een token is een sleutel als het een liggend streepje onderaan, een schuine
// streep, een dubbele punt of een punt gevolgd door een letter bevat: p.fr.ir.taux,
// te_verifieren, api/v1/index.json, impots.gouv.fr.
const isSleutel = (t) => /[_/:]/.test(t) || /\.[A-Za-z]/.test(t);

// Vervangt URL s en sleutelachtige tokens door een spatie, zodat alleen echte
// weergavetekst overblijft.
export function alleenWeergave(tekst) {
  return String(tekst ?? '').replace(/https?:\/\/\S+|[A-Za-z0-9_.\-/]+/g,
    (m) => (/^https?:/.test(m) || isSleutel(m) ? ' ' : m));
}

// Geeft de gevonden woorden zonder accent, ontdubbeld en in kleine letters.
export function zoekZonderAccent(tekst) {
  const raak = alleenWeergave(tekst).match(WOORD_RE) || [];
  return [...new Set(raak.map((w) => w.toLowerCase()))];
}

// Haalt uit een HTML-pagina de tekst die een lezer werkelijk ziet: zonder
// scripts, zonder stijlen, zonder tags en dus ook zonder class- en href-waarden.
export function tekstUitHtml(html) {
  return String(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

// Haalt uit een markdownbestand de lopende tekst: zonder codeblokken, zonder
// code tussen accenten graves en zonder de URL van een link.
export function tekstUitMarkdown(md) {
  return String(md)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\]\([^)]*\)/g, '] ');
}

// De velden van het register en de andere gegevensbestanden die een lezer ziet.
export const WEERGAVEVELDEN = new Set([
  'titel', 'naam_nl', 'naam_fr', 'naam_officieel', 'naam', 'omschrijving', 'toelichting',
  'opmerkingen', 'uitzonderingen', 'instantie', 'bron_kenmerk', 'bronsoort',
  'waarde_weergave', 'publicatiemoment', 'aangekondigde_wijziging', 'beschrijving',
  'advies', 'rekenwijze', 'invoer', 'verwachte_uitkomst', 'werking', 'voorbehoud',
  'bronregel', 'samenvatting', 'wijzigingen', 'grootheid', 'motivering', 'scope',
  'methode', 'waarschuwing', 'label', 'reden', 'uitgever', 'kenmerk', 'gebruik',
]);

// Paden waar naam geen weergavetekst is maar de sleutel van een repo.
const GEEN_WEERGAVE = [/\.repos\[\d+\]\.naam$/, /\.aangesloten_repos\b/];

// Loopt een JSON-boom af en geeft [pad, tekst] voor elk weergaveveld.
export function weergaveTeksten(knoop, sleutel = '', pad = '$') {
  const uit = [];
  if (typeof knoop === 'string') {
    if (WEERGAVEVELDEN.has(sleutel) && !GEEN_WEERGAVE.some((re) => re.test(pad))) uit.push([pad, knoop]);
    return uit;
  }
  if (Array.isArray(knoop)) {
    knoop.forEach((x, i) => uit.push(...weergaveTeksten(x, sleutel, `${pad}[${i}]`)));
    return uit;
  }
  if (knoop && typeof knoop === 'object') {
    for (const [k, v] of Object.entries(knoop)) uit.push(...weergaveTeksten(v, k, `${pad}.${k}`));
  }
  return uit;
}
