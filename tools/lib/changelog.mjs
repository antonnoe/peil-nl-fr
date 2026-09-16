export const CHANGELOG = [
  {
    versie: '1.0.0',
    datum: '2026-09-16',
    samenvatting: 'Eerste publicatie van het register: datamodel, schema voor drie lagen, 210 parameters, ijkkalender, signaalbestand, statische API en site.',
    wijzigingen: [
      'Schema voor laag 3 (parameters), laag 2 (rekenregels) en laag 1 (duidingsregels), met een gedeelde id-ruimte en bronvelden die het feitenschema van Klussen in Frankrijk volgen.',
      '210 parameters afgeleid uit de inventarisatie van taak 0, voor de 22 aangesloten repo s; dubbelingen samengevoegd tot een parameter met meerdere gebruikt_in.',
      '52 parameters met status vastgesteld, alle met bron en verificatiedatum uit een aangesloten repo.',
      '46 grootheden uit de volledigheidslijst toegevoegd als kandidaat met status te_verifieren.',
      'Waarden uit de voorganger financieel-kompas opgenomen als wijzigingshistorie, nooit als registerwaarde.',
      'Een parameter voor DVF, met rekenwijze en granulariteit in de opmerkingen en zonder prijzen.',
      'Documentenregister: alleen het schema, met een leeg data/documenten.json.',
      'IJkkalender met de ijkmomenten half december en half april.',
      'Signaalbestand peil/state.json voor de Cockpit, met de soorten gaat_veranderen, verouderd, afwijkend en veranderd.',
      'Statische API onder /api/v1/ met parameters, land, lastensoort, regeling, tool, documenten, ijkkalender, state, changelog en register.csv.',
      'Statische site, mobiel eerst, zonder frameworks en zonder externe scripts of fonts.',
    ],
  },
];
