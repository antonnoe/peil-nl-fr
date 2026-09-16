// Frankrijk: assurance maladie, overheidsgekaderde verzekeringen, ouderenzorg.
export const FR_ZORG = [

{ id: 'p.fr.secu.brss_consult_medecin_traitant', nl: 'Base de remboursement consult huisarts', fr: 'Base de remboursement, consultation du medecin traitant', off: 'Tarif conventionnel secteur 1',
  reg: 'fr.secu', klasse: 'overheid_vastgesteld', effect: 'bepaalt_grondslag', eh: 'EUR', jaar: '2026',
  freq: 'onregelmatig',
  in: [[ 'zorgkompas-frankrijk', 'scenarios.js:19-21', '30,00', true ],
       [ 'cafeclaude', 'lib/domains/prompts/verzekeren.ts:59', '26,50 sinds november 2024', true ]],
  opm: 'De directste tegenspraak van het hele register: de rekentool en het handboek noemen verschillende bedragen voor dezelfde grootheid, allebei zonder primaire bronverwijzing. Zolang dit niet is geverifieerd, rekent ZorgKompas met een bedrag dat het handboek tegenspreekt.' },

{ id: 'p.fr.secu.brss_specialist_apc', nl: 'Base de remboursement specialist, APC', fr: 'Base de remboursement, avis ponctuel de consultant', off: 'Tarif APC',
  reg: 'fr.secu', klasse: 'overheid_vastgesteld', effect: 'bepaalt_grondslag', eh: 'EUR', jaar: '2025',
  freq: 'onregelmatig',
  in: [[ 'zorgkompas-frankrijk', 'scenarios.js:81', '55,00', false ]] },

{ id: 'p.fr.secu.brss_kine_per_sessie', nl: 'Base de remboursement kinesitherapie per sessie', fr: 'Base de remboursement, seance de kinesitherapie', off: null,
  reg: 'fr.secu', klasse: 'overheid_vastgesteld', effect: 'bepaalt_grondslag', eh: 'EUR', jaar: '2025',
  freq: 'onregelmatig',
  in: [[ 'zorgkompas-frankrijk', 'scenarios.js:62 en 106', '16,13', false ]] },

{ id: 'p.fr.secu.vergoedingspercentage_standaard', nl: 'Standaard vergoedingspercentage Securite sociale', fr: 'Taux de remboursement de droit commun', off: null,
  reg: 'fr.secu', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', eh: 'fractie', jaar: '2026',
  freq: 'zelden',
  in: [[ 'zorgkompas-frankrijk', 'scenarioEngine.js:80', '0,70', false ]] },

{ id: 'p.fr.secu.vergoeding_zonder_medecin_traitant', nl: 'Vergoeding buiten het parcours de soins', fr: 'Taux de remboursement hors parcours de soins', off: null,
  reg: 'fr.secu', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'fractie', jaar: '2026',
  freq: 'zelden',
  in: [[ 'zorgkompas-frankrijk', 'scenarioEngine.js:96', '0,30', false ],
       [ 'cafeclaude', 'lib/domains/prompts/zorg.ts:88', '30 procent in plaats van 70 procent', false ]] },

{ id: 'p.fr.secu.vergoeding_kine_en_medicatie', nl: 'Vergoeding kinesitherapie en medicatie', fr: 'Taux de remboursement, kinesitherapie et medicaments', off: null,
  reg: 'fr.secu', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', eh: 'fractie', jaar: '2026',
  freq: 'onregelmatig',
  in: [[ 'zorgkompas-frankrijk', 'scenarioEngine.js:89-90', '0,60 respectievelijk 0,65', false ]] },

{ id: 'p.fr.secu.vergoeding_had_en_infirmiere', nl: 'Vergoeding thuisziekenhuis en verpleging aan huis', fr: 'Taux de remboursement, HAD et infirmiere liberale', off: null,
  reg: 'fr.secu', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', eh: 'procent', jaar: '2026',
  freq: 'onregelmatig',
  in: [[ 'cafeclaude', 'lib/domains/prompts/zorg.ts:112-113', 'HAD 80 procent of 100 procent bij ALD; infirmiere 70 procent Secu plus 30 procent mutuelle', false ]] },

{ id: 'p.fr.secu.forfait_journalier', nl: 'Forfait journalier hospitalier', fr: 'Forfait journalier hospitalier', off: 'Art. L174-4 CSS',
  reg: 'fr.secu', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'EUR/dag', jaar: '2026',
  freq: 'onregelmatig', lw: '2026-03-01',
  in: [[ 'zorgkompas-frankrijk', 'scenarios.js:100 en 155', '20,00 euro per dag, tarief 2024/2025', true ],
       [ 'cafeclaude', 'lib/domains/prompts/verzekeren.ts:60', '23 euro ziekenhuis en 17 euro psychiatrie sinds 1 maart 2026', true ]],
  opm: 'De rekentool loopt achter op het handboek en kent bovendien geen onderscheid tussen ziekenhuis en psychiatrie.' },

{ id: 'p.fr.secu.participation_forfaitaire', nl: 'Participation forfaitaire per consult', fr: 'Participation forfaitaire', off: 'Art. L160-13 II CSS',
  reg: 'fr.secu', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'EUR', jaar: '2026',
  freq: 'onregelmatig', lw: '2024-05-01',
  in: [[ 'cafeclaude', 'lib/domains/prompts/verzekeren.ts:117', '2,00 euro per artsbezoek', false ],
       [ 'cafeclaude', 'lib/audit/prompts/zorg.ts:67-68', '2 euro per consult', false ]] },

{ id: 'p.fr.secu.franchise_medicale', nl: 'Franchise medicale per medicijn', fr: 'Franchise medicale par boite de medicaments', off: 'Art. L160-13 III CSS',
  reg: 'fr.secu', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'EUR', jaar: '2026',
  freq: 'onregelmatig', lw: '2024-05-01',
  in: [[ 'cafeclaude', 'lib/audit/prompts/zorg.ts:67-68', '0,50 euro per medicijn', true ],
       [ 'cafeclaude', 'lib/audit/prompts/zorg.ts:146-147', '1 euro per doosje, verdubbeld per 1 mei 2024', true ]],
  opm: 'Binnen dezelfde repo staan twee waarden naast elkaar. Regel 146 en 147 beschrijven de verdubbeling van 0,50 naar 1 euro, regel 67 en 68 hanteren nog 0,50. Een van beide is verouderd.' },

{ id: 'p.fr.secu.franchise_transport', nl: 'Franchise medisch transport', fr: 'Franchise sur le transport sanitaire', off: 'Art. L160-13 III CSS',
  reg: 'fr.secu', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'EUR', jaar: '2026',
  freq: 'onregelmatig',
  in: [[ 'cafeclaude', 'lib/domains/prompts/verzekeren.ts:117', '4,00 euro per transport', false ]] },

{ id: 'p.fr.assur.bonus_malus_auto', nl: 'Bonus-malus autoverzekering', fr: 'Coefficient de reduction-majoration', off: 'Annexe a l art. A121-1 Code des assurances',
  reg: 'fr.assur', klasse: 'overheid_vastgesteld', effect: 'verhoogt_last', eh: 'factor en procent', jaar: '2026',
  freq: 'zelden',
  in: [[ 'cafeclaude', 'lib/domains/prompts/verzekeren.ts:86', 'start 1,00; min 5 procent per schadevrij jaar tot 0,50; plus 25 procent per ongeval tot 3,50', false ]],
  opm: 'Wettelijk gekaderd in het Code des assurances; de verzekeraar mag er niet van afwijken.' },

{ id: 'p.fr.apa.bedrag_per_maand', nl: 'APA-bedrag per maand', fr: 'Montant de l APA par mois', off: 'Allocation personnalisee d autonomie, plafonds par GIR',
  reg: 'fr.apa', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', eh: 'EUR/maand', jaar: '2026',
  freq: 'jaarlijks',
  in: [[ 'ouderenzorg-fr', 'if-dossier/dossier-skelet.md:124', '811 tot 2080 euro', false ]],
  opm: 'Het dossierskelet noemt de bandbreedte zelf indicatief. De plafonds verschillen per GIR-niveau en dat onderscheid is niet vastgelegd.' },

{ id: 'p.fr.aspa.maximum_alleenstaand', nl: 'ASPA maximum voor een alleenstaande', fr: 'ASPA, montant maximal pour une personne seule', off: 'Allocation de solidarite aux personnes agees',
  reg: 'fr.aspa', klasse: 'overheid_vastgesteld', effect: 'verlaagt_last', eh: 'EUR/maand', jaar: '2026',
  freq: 'jaarlijks',
  in: [[ 'ouderenzorg-fr', 'if-dossier/dossier-skelet.md:126', 'tot 1012 euro per maand', false ]] },

{ id: 'p.fr.zorg.teleassistentie_maandprijs', nl: 'Teleassistentie, maandprijs', fr: 'Teleassistance, prix mensuel', off: null,
  reg: 'fr.zorg', klasse: 'indicatief', effect: 'verhoogt_last', eh: 'EUR/maand', jaar: '2026',
  freq: 'onbekend',
  in: [[ 'cafeclaude', 'lib/domains/prompts/zorg.ts:115', '20 tot 40 euro per maand', false ]] },

{ id: 'p.fr.zorg.mandat_protection_future_kosten', nl: 'Mandat de protection future, kosten', fr: 'Mandat de protection future, cout', off: null,
  reg: 'fr.zorg', klasse: 'indicatief', effect: 'verhoogt_last', eh: 'EUR', jaar: '2026',
  freq: 'onbekend',
  in: [[ 'cafeclaude', 'lib/domains/prompts/zorg.ts:146', 'sous seing prive gratis tot 100 euro; notarie 300 tot 500 euro', false ]],
  opm: 'De niet-aangesloten repo dossierfrankrijk noemt dezelfde bandbreedte.' },

{ id: 'p.fr.zorg.beschermingsmaatregel_kosten', nl: 'Rechterlijke beschermingsmaatregel, doorlooptijd en kosten', fr: 'Mesure de protection judiciaire, delai et cout', off: null,
  reg: 'fr.zorg', klasse: 'indicatief', effect: 'verhoogt_last', eh: 'maanden en EUR', jaar: '2026',
  freq: 'onbekend',
  in: [[ 'cafeclaude', 'lib/domains/prompts/zorg.ts:151', '3 tot 6 maanden, 200 tot 500 euro', false ]] },
];
