// De changelog zoals het publiek hem leest. Hij staat op changelog.html en in
// /api/v1/changelog.json. De technische aantekeningen bij een uitgave staan in
// CHANGELOG.md en blijven daar.
export const CHANGELOG = [
  {
    versie: '1.0.2',
    datum: '2026-09-16',
    samenvatting: 'De openbare pagina\'s zijn geschoond van interne aanduidingen en de aangesloten tools worden bij hun openbare naam genoemd. Geen waarde, status of bron gewijzigd.',
    wijzigingen: [
      'De pagina Over Peil is herschreven voor een zakelijk publiek: wat Peil is, voor wie het bedoeld is, hoe een waarde wordt geverifieerd, wat de vier statussen betekenen, hoe versies werken en tot wanneer zij opvraagbaar blijven, hoe u een correctie meldt, onder welke licentie de gegevens en de code staan, en welke vaste adressen de API kent.',
      'Bij Gebruikt in staat voortaan alleen de openbare naam van de tool, met een verwijzing naar het openbare adres waar dat adres aantoonbaar vastligt. De vindplaats in de code en de waarde per tool staan niet meer op de site; zij blijven in de API beschikbaar voor wie het register machinaal leest.',
      'Het blok met meldingen op een parameterpagina heet nu Let op en is in gewone taal gesteld: afwijkende waarden in omloop, een aangekondigde wijziging, een verificatie die haar houdbaarheid voorbij is, of een waarde die nog niet is geverifieerd.',
      'Veldlabels in gewone taal. Een parameter die door geen enkele aangesloten tool wordt gebruikt, heet nu ook zo.',
      'Het filter op tool in de volledige tabel werkt met de openbare toolnamen, waarbij tools die naar buiten dezelfde naam dragen zijn samengevoegd.',
      'Onderaan elke pagina en in de bronregel van elk API-antwoord staat de uitgever: Communities Abroad, www.communitiesabroad.com.',
      'Nieuwe controle die de gebouwde pagina\'s afwijst zodra er een interne aanduiding in de zichtbare tekst staat.',
      'De versies 1.0.0 en 1.0.1 blijven bevroren opvraagbaar onder /api/versies/1.0.0/ en /api/versies/1.0.1/.',
    ],
  },
  {
    versie: '1.0.1',
    datum: '2026-09-16',
    samenvatting: 'Herstel van de diakritische tekens in alle weergavetekst en een inklapbare startpagina. Geen waarde, status of bron gewijzigd.',
    wijzigingen: [
      'Diakritische tekens hersteld in namen, omschrijvingen, opmerkingen, uitzonderingen, instantienamen, paginateksten en documentatie: Café Claude, crédit d\'impôt, Sécurité sociale, taux réduit, revenu fiscal de référence, décote, taxe foncière, franchise médicale, te verifiëren, België.',
      'Weggevallen apostrofs in Franse elisies teruggezet, zoals crédit d\'impôt, chambres d\'hôtes en Ministère de l\'économie, en de Nederlandse meervouden id\'s en pagina\'s.',
      'Identificatiecodes, bestandsnamen, API-adressen en webadressen zijn niet gewijzigd, zodat geen enkele permalink breekt; de pagina\'s tonen de woorden wel goed gespeld.',
      'Controle toegevoegd die weergavetekst afwijst waarin een veelvoorkomend Frans of Nederlands woord zonder accent staat, en die de tekencodering van de site, de API en de CSV controleert.',
      'De verdelingen per land, per lastensoort en per regeling op de startpagina staan nu in een uitklapbaar blok, standaard dicht, met het aantal parameters in de samenvatting. Open- en dichtklappen werkt zonder JavaScript.',
      'De startpagina is op een telefoonscherm van 390 px breed teruggebracht van ruim 21.000 px naar ongeveer 1.800 px. Zoekveld, tellers en voorbehoud staan onveranderd bovenaan.',
      'Versie 1.0.0 blijft bevroren opvraagbaar onder /api/versies/1.0.0/.',
    ],
  },
  {
    versie: '1.0.0',
    datum: '2026-09-16',
    samenvatting: 'Eerste publicatie van het register: datamodel, 210 parameters, ijkkalender, statische API en site.',
    wijzigingen: [
      'Vaste opzet voor parameters, rekenregels en duidingsregels, met een gedeelde reeks identificatiecodes en bronvelden die het feitenschema van Klussen in Frankrijk volgen.',
      '210 parameters afgeleid uit de inventarisatie van de aangesloten tools; dezelfde grootheid op meer dan een plaats is samengevoegd tot een parameter die naar al die tools verwijst.',
      '52 parameters met de status vastgesteld, alle met een bron en een verificatiedatum.',
      '46 grootheden uit de volledigheidslijst toegevoegd met de status te verifiëren, zodat zichtbaar is dat zij bestaan en nog moeten worden gecontroleerd.',
      'Waarden uit de voorganger van het Financieel Kompas opgenomen als wijzigingshistorie, nooit als registerwaarde.',
      'Een parameter voor de Franse transactieprijzen, met de rekenwijze en de granulariteit in de opmerkingen en zonder prijzen.',
      'Documentenregister: alleen de opzet, nog zonder documenten.',
      'IJkkalender met de twee vaste ijkmomenten, half december voor Nederland en half april voor Frankrijk.',
      'Statische API onder /api/v1/ met parameters, land, lastensoort, regeling, tool, documenten, ijkkalender, changelog en het hele register als CSV.',
      'Statische site, mobiel eerst, zonder frameworks en zonder externe scripts of lettertypen.',
    ],
  },
];
