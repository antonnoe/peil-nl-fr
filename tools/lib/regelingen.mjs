// Taxonomie van regelingen. Per regeling de naam en de standaardtypering.
// Volgorde: naam, lastensoort, belastingtype, socialelastentype, transactionele_basis.
const R = (naam, lastensoort, belastingtype, socialelastentype, transactionele_basis) =>
  ({ naam, lastensoort, belastingtype, socialelastentype, transactionele_basis });

export const REGELINGEN = {
  // Nederland
  'nl.aow': R('Algemene Ouderdomswet', 'sociaal', null, 'premie_volksverzekering', 'inkomen'),
  'nl.anw': R('Algemene nabestaandenwet', 'sociaal', null, 'premie_volksverzekering', 'inkomen'),
  'nl.ib': R('Inkomstenbelasting box 1', 'fiscaal', 'inkomstenbelasting', null, 'inkomen'),
  'nl.box2': R('Inkomstenbelasting box 2', 'fiscaal', 'inkomstenbelasting', null, 'inkomen'),
  'nl.box3': R('Inkomstenbelasting box 3', 'fiscaal', 'vermogensbelasting', null, 'vermogen'),
  'nl.zvw': R('Zorgverzekeringswet, inkomensafhankelijke bijdrage', 'sociaal', null, 'zorgbijdrage', 'inkomen'),
  'nl.wlz': R('Wet langdurige zorg', 'sociaal', null, 'premie_volksverzekering', 'inkomen'),
  'nl.zorg': R('Zorgverzekering, nominale premie en eigen risico', 'verzekering_overheidsgekaderd', null, null, 'polis'),
  'nl.zorgtoeslag': R('Wet op de zorgtoeslag', 'fiscaal', null, null, 'inkomen'),
  'nl.erf': R('Successiewet 1956, erfbelasting', 'fiscaal', 'erf_en_schenkbelasting', null, 'nalatenschap'),
  'nl.schenk': R('Successiewet 1956, schenkbelasting', 'fiscaal', 'erf_en_schenkbelasting', null, 'schenking'),
  'nl.ovb': R('Wet op belastingen van rechtsverkeer, overdrachtsbelasting', 'fiscaal', 'overdrachtsbelasting', null, 'koopsom'),
  'nl.btw': R('Omzetbelasting', 'fiscaal', 'omzetbelasting', null, 'omzet'),
  'nl.leges': R('Consulaire leges', 'overig_transactiekosten', null, null, 'verrichting'),
  'nl.assur': R('Verzekeringsplicht Nederland', 'verzekering_overheidsgekaderd', null, null, 'polis'),

  // Frankrijk, fiscaal
  'fr.ir': R('Impot sur le revenu', 'fiscaal', 'inkomstenbelasting', null, 'inkomen'),
  'fr.micro': R('Regime micro-entreprise', 'fiscaal', 'inkomstenbelasting', null, 'omzet'),
  'fr.gite': R('Location meublee de tourisme', 'fiscaal', 'inkomstenbelasting', null, 'omzet'),
  'fr.ifi': R('Impot sur la fortune immobiliere', 'fiscaal', 'vermogensbelasting', null, 'vermogen'),
  'fr.pv': R('Plus-value immobiliere des particuliers', 'fiscaal', 'meerwaardeheffing', null, 'meerwaarde'),
  'fr.succ': R('Droits de succession', 'fiscaal', 'erf_en_schenkbelasting', null, 'nalatenschap'),
  'fr.don': R('Droits de donation', 'fiscaal', 'erf_en_schenkbelasting', null, 'schenking'),
  'fr.erf': R('Code civil, devolution successorale', 'fiscaal', null, null, 'nalatenschap'),
  'fr.av': R('Assurance vie, fiscalite', 'fiscaal', 'erf_en_schenkbelasting', null, 'polis'),
  'fr.tva': R('Taxe sur la valeur ajoutee', 'fiscaal', 'omzetbelasting', null, 'omzet'),
  'fr.efact': R('Facturation electronique obligatoire', 'fiscaal', 'omzetbelasting', null, 'omzet'),
  'fr.cvae': R('Cotisation sur la valeur ajoutee des entreprises', 'fiscaal', 'lokale_belasting', null, 'omzet'),
  'fr.cfe': R('Cotisation fonciere des entreprises', 'fiscaal', 'lokale_belasting', null, 'omzet'),
  'fr.th': R('Taxe d habitation sur les residences secondaires', 'fiscaal', 'lokale_belasting', null, 'vermogen'),
  'fr.tf': R('Taxe fonciere sur les proprietes baties', 'fiscaal', 'lokale_belasting', null, 'vermogen'),
  'fr.dmto': R('Droits de mutation a titre onereux', 'fiscaal', 'overdrachtsbelasting', null, 'koopsom'),
  'fr.vefa': R('Vente en l etat futur d achevement, taxe de publicite fonciere', 'fiscaal', 'overdrachtsbelasting', null, 'koopsom'),
  'fr.csi': R('Contribution de securite immobiliere', 'fiscaal', 'heffing_bijzonder', null, 'akte'),
  'fr.renov': R('Aides a la renovation energetique', 'fiscaal', null, null, 'verrichting'),

  // Frankrijk, sociaal
  'fr.ps': R('Prelevements sociaux sur les revenus du patrimoine', 'sociaal', null, 'prelevement_social', 'vermogen'),
  'fr.csg': R('CSG, CRDS et CASA sur les pensions', 'sociaal', null, 'csg_crds_casa', 'inkomen'),
  'fr.sociaal': R('Cotisations sociales par type de revenu', 'sociaal', null, 'zelfstandigenbijdrage', 'inkomen'),
  'fr.urssaf': R('Urssaf, seuils d affiliation', 'sociaal', null, 'zelfstandigenbijdrage', 'omzet'),
  'fr.retraite': R('Retraite de base du regime general', 'sociaal', null, 'premie_werknemersverzekering', 'inkomen'),
  'fr.acre': R('Aide a la creation ou reprise d entreprise', 'sociaal', null, 'zelfstandigenbijdrage', 'omzet'),
  'fr.lmp': R('Loueur en meuble professionnel, seuil d affiliation', 'sociaal', null, 'zelfstandigenbijdrage', 'omzet'),
  'fr.apa': R('Allocation personnalisee d autonomie', 'sociaal', null, null, 'inkomen'),
  'fr.aspa': R('Allocation de solidarite aux personnes agees', 'sociaal', null, null, 'inkomen'),

  // Frankrijk, verzekering en zorg
  'fr.secu': R('Assurance maladie, Securite sociale', 'verzekering_overheidsgekaderd', null, null, 'verrichting'),
  'fr.assur': R('Assurances obligatoires, Code des assurances', 'verzekering_overheidsgekaderd', null, null, 'polis'),
  'fr.mutuelle': R('Complementaire sante', 'verzekering_overheidsgekaderd', null, null, 'polis'),

  // Frankrijk, transactie en techniek
  'fr.notaris': R('Emoluments et debours du notaire', 'overig_transactiekosten', null, null, 'akte'),
  'fr.diagnostics': R('Diagnostics techniques obligatoires', 'overig_transactiekosten', null, null, 'verrichting'),
  'fr.vastgoed': R('Bewaking van vastgoedtarieven', 'overig_transactiekosten', null, null, 'akte'),
  'fr.markt': R('Marktgegevens vastgoed', 'overig_transactiekosten', null, null, 'koopsom'),
  'fr.elec': R('Raccordement et tarifs electricite', 'overig_transactiekosten', null, null, 'verrichting'),
  'fr.dpe': R('Diagnostic de performance energetique', 'overig_transactiekosten', null, null, 'verbruik'),
  'fr.energie': R('Energiekentallen en energieprijzen', 'overig_transactiekosten', null, null, 'verbruik'),
  'fr.huur': R('Loi 89-462, rapports locatifs', 'overig_transactiekosten', null, null, 'verrichting'),
  'fr.telecom': R('Code de la consommation, contrats telecom', 'overig_transactiekosten', null, null, 'verrichting'),
  'fr.handel': R('Retards de paiement entre professionnels', 'overig_transactiekosten', null, null, 'verrichting'),
  'fr.bouw': R('Code de l urbanisme, autorisations', 'overig_transactiekosten', null, null, 'oppervlakte'),
  'fr.zorg': R('Ouderenzorg, kosten en bescherming', 'overig_transactiekosten', null, null, 'verrichting'),

  // Grensoverschrijdend
  'xb.cak': R('CAK, verdragsbijdrage en woonlandfactor', 'sociaal', null, 'verdragsbijdrage', 'inkomen'),
  'xb.deruyter': R('Arrest De Ruyter, vrijstelling CSG en CRDS', 'sociaal', null, 'prelevement_social', 'meerwaarde'),
  'xb.verdrag': R('Belastingverdrag Nederland-Frankrijk 1973', 'fiscaal', 'inkomstenbelasting', null, 'inkomen'),
  'xb.vo883': R('Verordening (EG) 883/2004', 'sociaal', null, null, 'inkomen'),
  'xb.s1': R('Formulier S1, inschrijving in het woonland', 'verzekering_overheidsgekaderd', null, null, 'polis'),
  'xb.ehic': R('Europese ziekteverzekeringskaart', 'verzekering_overheidsgekaderd', null, null, 'polis'),
};
