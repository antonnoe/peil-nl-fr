// Gedeelde bronconstanten voor de curatietabel.
export const VD_FKAI = '2026-09-15';
export const DOOR_FKAI = 'financieel-kompas-ai, config.json';
export const VD_VT = '2026-08-12';
export const DOOR_VT = 'Vastgoedtransactie, bronnen.json';
export const VD_ELEC = '2026-07-04';
export const DOOR_ELEC = 'dossier-elektriciteit-if, hoofdstukken en verificatie';
export const CAK_URL = 'https://www.hetcak.nl/zorgverzekering-buitenland/pensioen-uitkering/financiele-informatie/woonlandfactor-zvw-wlz-bijdragen/';
export const VT_EMOL_URL = 'https://www.economie.gouv.fr/particuliers/gerer-mon-argent/investir-dans-limmobilier/achat-dun-bien-immobilier-quels-frais-de-notaire-devez-vous-payer';
export const VT_PV_URL = 'https://www.impots.gouv.fr/particulier/questions/je-vends-mon-bien-immobilier-vais-je-payer-de-la-plus-value-immobiliere';
export const VT_DMTO_URL = 'https://www.impots.gouv.fr/sites/default/files/media/1_metier/3_partenaire/notaires/dmto/dmto_2026-06.pdf';
export const LEGI_1647 = 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054373998';
export const LEGI_150VB = 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051202577';
export const LEGI_CSI = 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000022335681';
export const LEGI_SURTAXE = 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048806252';
export const FK = 'financieel-kompas';

// wijzigingshistorie uit de voorganger financieel-kompas: niet aangesloten,
// waarden uitsluitend als historie, nooit als registerwaarde.
export const oud = (waarde, opmerking = '') => ([{
  waarde: String(waarde),
  geldig_jaar: '2025',
  herkomst: FK + ', config.json (voorganger, niet aangesloten)',
  opmerking,
}]);
