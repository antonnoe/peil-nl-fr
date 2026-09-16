// Gedeelde hulpfuncties voor de build.

export const slug = (s) => String(s)
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const MAANDNAMEN = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

export function datumNl(iso) {
  if (!iso) return null;
  const [j, m, d] = iso.split('-').map(Number);
  return `${d} ${MAANDNAMEN[m - 1]} ${j}`;
}

export const STATUSLABEL = {
  vastgesteld: 'vastgesteld',
  raming: 'raming',
  te_verifieren: 'te verifiëren',
  vervallen: 'vervallen',
};

export const LASTENSOORTLABEL = {
  fiscaal: 'fiscaal',
  sociaal: 'sociaal',
  verzekering_overheidsgekaderd: 'verzekering, overheidsgekaderd',
  overig_transactiekosten: 'overig, transactiekosten',
};

export const LANDLABEL = { NL: 'Nederland', FR: 'Frankrijk', XB: 'grensoverschrijdend' };

export const KLASSELABEL = {
  overheid_vastgesteld: 'door de overheid vastgesteld',
  marktindex: 'marktindex',
  contractueel: 'contractueel',
  indicatief: 'indicatief',
  afgeleid: 'afgeleid',
  gebruikersinvoer: 'gebruikersinvoer',
};

export const EFFECTLABEL = {
  verhoogt_last: 'verhoogt de last',
  verlaagt_last: 'verlaagt de last',
  bepaalt_grondslag: 'bepaalt de grondslag',
  bepaalt_toepasselijkheid: 'bepaalt de toepasselijkheid',
  informatief: 'informatief',
};

// CSV volgens RFC 4180, met puntkomma als scheidingsteken zodat Excel in
// Nederland en Frankrijk het bestand direct in kolommen zet.
export function csvRegel(velden) {
  return velden.map((v) => {
    const s = v === null || v === undefined ? '' : String(v);
    return /[";\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }).join(';');
}

export function waardeTekst(p) {
  if (p.waarde_weergave) return p.waarde_weergave;
  if (p.waarde === null) return null;
  if (typeof p.waarde === 'object') return JSON.stringify(p.waarde);
  return String(p.waarde);
}
