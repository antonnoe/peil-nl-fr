# Parameters per repo

Peildatum 16 september 2026. Per repo met oordeel **ja** of **mogelijk** staat hieronder wat er aan bedragen, percentages, drempels en termijnen in staat.

Waarden zijn letterlijk overgenomen. Er is niets gecorrigeerd en niets tegen een primaire bron getoetst; of een waarde klopt, is met deze inventarisatie niet vastgesteld.

Variabiliteitsklassen: `overheid_vastgesteld`, `marktindex`, `contractueel`, `indicatief`, `afgeleid`, `gebruikersinvoer`.

## `financieel-kompas-ai`, ja (59 parameters)

Volledig parameterbestand config.json met NL- en FR-belasting-, zorg- en CAK-waarden, inclusief bron en verificatiedatum per grootheid.  
Vermoedelijk Cockpit-onderdeel: CC / IF, Financieel Kompas (AI-versie)

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P001 | `config.json` | 7 | AOW bruto alleenstaand per jaar | 19956 | EUR/jaar | NL | nee | editie 2026 in bestand | `overheid_vastgesteld` |  |
| P002 | `config.json` | 8 | AOW bruto per partner per jaar | 13296 | EUR/jaar | NL | nee | editie 2026 in bestand | `overheid_vastgesteld` |  |
| P003 | `config.json` | 9 | Frans gemiddeld salaris voor pensioenberekening | 40000 | EUR/jaar | FR | nee | nee | `indicatief` |  |
| P004 | `config.json` | 10 | Vereiste pensioenjaren Frankrijk | 43 | jaren | FR | nee | nee | `overheid_vastgesteld` |  |
| P005 | `config.json` | 11 | Pensioenopbouwpercentage Frankrijk | 0,5 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P006 | `config.json` | 14 | Zvw inkomensafhankelijke bijdrage, laag percentage | 0,0485 | fractie | NL | ja | geverifieerd 15 september 2026 | `overheid_vastgesteld` | bron: Regeling 3 november 2025, Stcrt 2025, 38055 |
| P007 | `config.json` | 15 | Maximumbijdrage-inkomen Zvw | 79409 | EUR/jaar | NL | ja | geverifieerd 15 september 2026 | `overheid_vastgesteld` |  |
| P008 | `config.json` | 21-25 | Tarieven box 1 onder AOW-leeftijd | 0,3575 / 0,3756 / 0,495 | fractie | NL | nee | nee | `overheid_vastgesteld` |  |
| P009 | `config.json` | 26-30 | Tarieven box 1 boven AOW-leeftijd | 0,1785 / 0,3756 / 0,495 | fractie | NL | nee | nee | `overheid_vastgesteld` |  |
| P010 | `config.json` | 35 | Grens eerste schijf box 1 | 38883 | EUR | NL | nee | nee | `overheid_vastgesteld` |  |
| P011 | `config.json` | 36 | Grens tweede schijf box 1 | 78426 | EUR | NL | nee | nee | `overheid_vastgesteld` |  |
| P012 | `config.json` | 37 | Algemene heffingskorting maximum | 3115 | EUR | NL | nee | nee | `overheid_vastgesteld` |  |
| P013 | `config.json` | 38 | Arbeidskorting maximum | 5685 | EUR | NL | nee | nee | `overheid_vastgesteld` |  |
| P014 | `config.json` | 39 | MKB-winstvrijstelling | 0,127 | fractie | NL | nee | nee | `overheid_vastgesteld` |  |
| P015 | `config.json` | 40 | Startpunt afbouw heffingskorting | 29736 | EUR | NL | nee | nee | `overheid_vastgesteld` |  |
| P016 | `config.json` | 41 | Afbouwfactor heffingskorting | 0,06398 | fractie | NL | nee | nee | `overheid_vastgesteld` |  |
| P017 | `config.json` | 42 | Startpunt afbouw arbeidskorting | 45592 | EUR | NL | nee | nee | `overheid_vastgesteld` |  |
| P018 | `config.json` | 43 | Afbouwfactor arbeidskorting | 0,0651 | fractie | NL | nee | nee | `overheid_vastgesteld` |  |
| P019 | `config.json` | 46 | Heffingsvrij vermogen box 3, alleenstaand | 59357 | EUR | NL | nee | nee | `overheid_vastgesteld` |  |
| P020 | `config.json` | 47 | Heffingsvrij vermogen box 3, partners | 118714 | EUR | NL | nee | nee | `overheid_vastgesteld` |  |
| P021 | `config.json` | 48 | Tarief box 3 | 0,36 | fractie | NL | nee | nee | `overheid_vastgesteld` |  |
| P022 | `config.json` | 49 | Forfaitair rendement spaargeld | 0,0128 | fractie | NL | nee | nee | `overheid_vastgesteld` |  |
| P023 | `config.json` | 50 | Forfaitair rendement beleggingen | 0,06 | fractie | NL | nee | nee | `overheid_vastgesteld` |  |
| P024 | `config.json` | 51 | Forfaitair rendement schulden | 0,027 | fractie | NL | nee | nee | `overheid_vastgesteld` |  |
| P025 | `config.json` | 54 | Nominale zorgpremie per volwassene per jaar | 2119 | EUR/jaar | NL | ja | geverifieerd 15 september 2026 | `overheid_vastgesteld` | bestand meldt expliciet dat 2143 een raming is en niet het vastgestelde bedrag |
| P026 | `config.json` | 61 | Drempelinkomen zorgtoeslag | 29736 | EUR/jaar | NL | ja | geverifieerd 15 september 2026 | `overheid_vastgesteld` |  |
| P027 | `config.json` | 62 | Normpercentage zorgtoeslag zonder partner | 0,01912 | fractie | NL | ja | geverifieerd 15 september 2026 | `overheid_vastgesteld` |  |
| P028 | `config.json` | 63 | Normpercentage zorgtoeslag met partner | 0,04289 | fractie | NL | ja | geverifieerd 15 september 2026 | `overheid_vastgesteld` |  |
| P029 | `config.json` | 64 | Afbouwpercentage zorgtoeslag | 0,1373 | fractie | NL | ja | geverifieerd 15 september 2026 | `overheid_vastgesteld` |  |
| P030 | `config.json` | 65 | Vermogensgrens zorgtoeslag zonder partner | 146011 | EUR | NL | ja | geverifieerd 15 september 2026 | `overheid_vastgesteld` |  |
| P031 | `config.json` | 66 | Vermogensgrens zorgtoeslag met partner | 184633 | EUR | NL | ja | geverifieerd 15 september 2026 | `overheid_vastgesteld` |  |
| P032 | `config.json` | 76 | Sociale lasten Frans pensioen, totaal | 0,091 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P033 | `config.json` | 77 | Sociale lasten salaris Frankrijk | 0,22 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P034 | `config.json` | 78 | Sociale lasten winst uit diensten | 0,212 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P035 | `config.json` | 79 | Sociale lasten winst uit verhuur | 0,212 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P036 | `config.json` | 80 | Prelevements sociaux onroerend | 0,172 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P037 | `config.json` | 81 | Prelevements sociaux roerend | 0,186 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P038 | `config.json` | 82 | Prelevement de solidarite | 0,075 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P039 | `config.json` | 87-116 | CSG-CRDS-CASA per regime pensioen | 0 / 0,043 / 0,074 / 0,091 | fractie | FR | ja | verifie le 01 juni 2026 | `overheid_vastgesteld` | bron: service-public.fr fiche F2971 |
| P040 | `config.json` | 119-147 | RFR-grenzen per part voor CSG-regime | 13048 / 17057 / 26472 (1 part) tot 26984 / 35277 / 54736 (3 parts) | EUR | FR | ja | verifie le 01 juni 2026 | `overheid_vastgesteld` |  |
| P041 | `config.json` | 148-152 | Opslag per halve part boven 3 | 3484 / 4555 / 7066 | EUR | FR | ja | verifie le 01 juni 2026 | `overheid_vastgesteld` |  |
| P042 | `config.json` | 157-177 | Schijven impot sur le revenu | 11600 / 29579 / 84577 / 181917 bij 0 / 11 / 30 / 41 / 45 procent | EUR en fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P043 | `config.json` | 180-183 | Abattement 65-plus, drempels en aftrek | 17510 / 2796 / 28170 / 1398 | EUR | FR | nee | nee | `overheid_vastgesteld` |  |
| P044 | `config.json` | 185 | Abattement micro winst uit diensten | 0,5 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P045 | `config.json` | 186 | Abattement micro winst uit verhuur | 0,3 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P046 | `config.json` | 187 | PFU-tarief inkomstenbelastingdeel | 0,128 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P047 | `config.json` | 188 | Plafond gezinsquotient per halve part | 1807 | EUR | FR | nee | nee | `overheid_vastgesteld` |  |
| P048 | `config.json` | 190-192 | Abattement pensioen: tarief, minimum, maximum | 0,1 / 454 / 4439 | fractie en EUR | FR | ja | verifie le 15 april 2026 | `overheid_vastgesteld` | bron: service-public.fr fiche F415 |
| P049 | `config.json` | 198-200 | Abattement loon: tarief, minimum, maximum | 0,1 / 509 / 14555 | fractie en EUR | FR | ja | verifie le 15 april 2026 | `overheid_vastgesteld` | bron: service-public.fr fiche F1989 |
| P050 | `config.json` | 206-210 | Decote: drempels, forfaits, percentage | 1982 / 3277 / 897 / 1483 / 0,4525 | EUR en fractie | FR | ja | geen verifie-le-datum op de bron, gegevens aangeleverd 15 september 2026 | `overheid_vastgesteld` | art. 197 CGI |
| P051 | `config.json` | 217 | IFI-drempel | 1300000 | EUR | FR | nee | nee | `overheid_vastgesteld` |  |
| P052 | `config.json` | 218-242 | IFI-schijven | 800000 / 1300000 / 2570000 / 5000000 / 10000000 bij 0 tot 1,5 procent | EUR en fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P053 | `config.json` | 245 | Credit d'impot hulp aan huis | 0,5 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P054 | `config.json` | 246 | Plafond hulp aan huis | 12000 | EUR/jaar | FR | nee | nee | `overheid_vastgesteld` |  |
| P055 | `config.json` | 248 | Woonlandfactor Frankrijk | 0,8304 | factor | grensoverschrijdend | ja | bron bijgewerkt 29 december 2025, geraadpleegd 15 september 2026 | `overheid_vastgesteld` | CAK; 2025 was 0,8251 |
| P056 | `config.json` | 249 | Nominale Zvw-bijdrage per jaar (CAK) | 1884 | EUR/jaar | grensoverschrijdend | ja | geraadpleegd 15 september 2026 | `overheid_vastgesteld` | 157,00 per maand |
| P057 | `config.json` | 251 | Wlz-percentage | 0,0965 | fractie | NL | ja | geraadpleegd 15 september 2026 | `overheid_vastgesteld` |  |
| P058 | `config.json` | 253 | Maximumbijdrage-inkomen Wlz | 38883 | EUR/jaar | NL | ja | geraadpleegd 15 september 2026 | `overheid_vastgesteld` |  |
| P059 | `config.json` | 254 | Maximumbijdrage-inkomen Wlz geboortejaar t/m 1945 | 41123 | EUR/jaar | NL | ja | geraadpleegd 15 september 2026 | `overheid_vastgesteld` |  |

## `cafeclaude`, ja (34 parameters)

Domein- en auditprompts bevatten harde 2026-bedragen en tarieven die de AI als handboek gebruikt (IR-schijven, décote, micro-BIC, BRSS, successierechten).  
Vermoedelijk Cockpit-onderdeel: CC, Cafe Claude

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P107 | `lib/domains/prompts/geld.ts` | 55 | Schijven impot sur le revenu 2026 (inkomsten 2025) | 0 tot 11600; 11 procent tot 29579; 30 procent tot 84577; 41 procent tot 181917; 45 procent daarboven | EUR en procent | FR | nee | editie 2026 in de tekst | `overheid_vastgesteld` |  |
| P108 | `lib/domains/prompts/geld.ts` | 55 | Decote drempels en formule | celibataire 1982 (897 min 45,25 procent), couple 3277 (1483 min 45,25 procent) | EUR en procent | FR | nee | nee | `overheid_vastgesteld` |  |
| P109 | `lib/domains/prompts/geld.ts` | 67-69 | Micro-BIC plafonds en abattements | meuble de tourisme niet geclassificeerd 15000 bij 30 procent; geclassificeerd en chambres d'hotes 77700 bij 50 procent; autres locations meublees 77700 bij 50 procent | EUR en procent | FR | nee | nee | `overheid_vastgesteld` |  |
| P110 | `lib/domains/prompts/geld.ts` | 75-76 | Urssaf-drempels verhuur | 23000 euro bruto (meuble de tourisme) en 6123 euro belastbaar (chambres d'hotes, 13 procent PASS 2025) | EUR | FR | nee | PASS-jaar 2025 genoemd | `overheid_vastgesteld` |  |
| P111 | `lib/domains/prompts/geld.ts` | 84-85 | Urssaf-tariefwijziging prestations de services | van 12,3 naar 21,2 procent per 1 januari 2026 | procent | FR | nee | 1-1-2026 | `overheid_vastgesteld` |  |
| P112 | `lib/domains/prompts/geld.ts` | 85 | Abattement micro per categorie | 71 procent ventes/logement, 50 procent prestations de services, 30 procent meuble non classe | procent | FR | nee | nee | `overheid_vastgesteld` |  |
| P113 | `lib/domains/prompts/geld.ts` | 107 | De Ruyter: totaaltarief verkoop Frans huis door NL-ingezetene | 26,5 procent (19 procent IR plus 7,5 procent solidarite) in plaats van 36,2 procent | procent | grensoverschrijdend | ja | nee | `overheid_vastgesteld` | HvJ-EU C-623/13 |
| P114 | `lib/domains/prompts/geld.ts` | 108 | Prelevements sociaux, opbouw | CSG 9,2 plus CRDS 0,5 plus solidarite 7,5 is 17,2 procent | procent | FR | nee | 2025 in de tekst | `overheid_vastgesteld` |  |
| P115 | `lib/domains/prompts/geld.ts` | 110 | IFI-drempel | 1,3 miljoen euro | EUR | FR | nee | nee | `overheid_vastgesteld` |  |
| P116 | `lib/domains/prompts/geld.ts` | 143 | PFU totaal | 30 procent (12,8 IR plus 17,2 sociaal) | procent | FR | nee | nee | `overheid_vastgesteld` |  |
| P117 | `lib/domains/prompts/geld.ts` | 10 | Boete niet-aangifte buitenlandse rekening (formulier 3916) | 1500 euro per jaar | EUR/jaar | FR | nee | nee | `overheid_vastgesteld` |  |
| P118 | `lib/domains/prompts/verzekeren.ts` | 59 | Base de remboursement consult medecin traitant secteur 1 | 26,50 euro, vergoeding 70 procent is 18,55, ticket moderateur 7,95 | EUR en procent | FR | nee | sinds november 2024 | `overheid_vastgesteld` |  |
| P119 | `lib/domains/prompts/verzekeren.ts` | 60 | Forfait journalier hospitalier | 23 euro per dag ziekenhuis, 17 euro per dag psychiatrie | EUR/dag | FR | nee | sinds 1 maart 2026 | `overheid_vastgesteld` |  |
| P120 | `lib/domains/prompts/verzekeren.ts` | 79 | Woonlandfactor Frankrijk en nominale Zvw-bijdrage | 0,8304 en 157,00 euro per maand | factor en EUR | grensoverschrijdend | nee | 2026 | `overheid_vastgesteld` |  |
| P121 | `lib/domains/prompts/verzekeren.ts` | 86 | Bonus-malus auto (CRM) | start 1,00; min 5 procent per schadevrij jaar tot 0,50; plus 25 procent per ongeval tot 3,50 | factor en procent | FR | nee | nee | `overheid_vastgesteld` |  |
| P122 | `lib/domains/prompts/verzekeren.ts` | 117 | Participation forfaitaire en franchise medisch transport | 2,00 euro per artsbezoek, 4,00 euro transport | EUR | FR | nee | 2026 | `overheid_vastgesteld` |  |
| P123 | `lib/domains/prompts/wonen.ts` | 46 | Frais de notaire | 7 tot 8 procent bestaande bouw, 2 tot 3 procent nieuwbouw | procent | FR | nee | nee | `indicatief` |  |
| P124 | `lib/domains/prompts/wonen.ts` | 47 | Plus-value tweede woning | 19 procent IR plus 17,2 procent sociaal, degressieve aftrek na 6 jaar, vrij na 22 respectievelijk 30 jaar | procent en jaren | FR | nee | nee | `overheid_vastgesteld` |  |
| P125 | `lib/domains/prompts/wonen.ts` | 54 | Reserve hereditaire | 1 kind 50 procent, 2 kinderen twee derde, 3 of meer kinderen drie kwart | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P126 | `lib/domains/prompts/wonen.ts` | 56 | Droits de succession, vrijstellingen en tarieven | kinderen 100000 per ouder, tarief 5 tot 45 procent; broers en zussen 15932 bij 35 tot 45 procent; niet-verwanten 1594 bij 60 procent | EUR en procent | FR | nee | nee | `overheid_vastgesteld` |  |
| P127 | `lib/domains/prompts/wonen.ts` | 57 | Hernieuwingstermijn schenkingsvrijstelling | 15 jaar | jaren | FR | nee | nee | `overheid_vastgesteld` |  |
| P128 | `lib/domains/prompts/zorg.ts` | 88 | Vergoeding zonder medecin traitant | 30 procent in plaats van 70 procent | procent | FR | nee | nee | `overheid_vastgesteld` |  |
| P129 | `lib/domains/prompts/zorg.ts` | 112-113 | Vergoeding HAD en infirmiere liberale | HAD 80 procent of 100 procent bij ALD; infirmiere 70 procent Secu plus 30 procent mutuelle | procent | FR | nee | nee | `overheid_vastgesteld` |  |
| P130 | `lib/domains/prompts/zorg.ts` | 115 | Teleassistentie, maandprijs | 20 tot 40 euro per maand | EUR/maand | FR | nee | nee | `indicatief` |  |
| P131 | `lib/domains/prompts/zorg.ts` | 146 | Mandat de protection future, kosten | sous seing prive gratis tot 100 euro; notarie 300 tot 500 euro | EUR | FR | nee | nee | `indicatief` |  |
| P132 | `lib/domains/prompts/zorg.ts` | 151 | Rechterlijke beschermingsmaatregel: doorlooptijd en kosten | 3 tot 6 maanden, 200 tot 500 euro | maanden en EUR | FR | nee | nee | `indicatief` |  |
| P133 | `lib/domains/prompts/bureaucratie.ts` | 43 | Frans rijbewijs halen, gemiddelde kosten | 1500 tot 2000 euro | EUR | FR | nee | nee | `indicatief` |  |
| P134 | `lib/domains/prompts/bureaucratie.ts` | 44 | NL paspoort verlengen in Frankrijk | 83,37 euro | EUR | NL | nee | 2025 | `overheid_vastgesteld` |  |
| P135 | `lib/audit/prompts/ondernemen.ts` | 89 | Micro-plafonds per categorie | ventes 188700, prestations de services BIC 77700, BNC 77700 | EUR | FR | nee | nee | `overheid_vastgesteld` |  |
| P136 | `lib/audit/prompts/ondernemen.ts` | 98-100 | ACRE: reductie en duur | 50 procent gedurende 12 maanden; wijziging per 1 juli 2026 mogelijk naar 25 procent | procent en maanden | FR | nee | 1 juli 2026 | `overheid_vastgesteld` |  |
| P137 | `lib/audit/prompts/ondernemen.ts` | 103 | LMP-drempel | 23000 euro | EUR | FR | nee | nee | `overheid_vastgesteld` |  |
| P138 | `lib/audit/prompts/verzekeren.ts` | 62-65 | Assurance vie: abattements | 152500 per begunstigde tot 70 jaar (art. 990 I); 30500 globaal na 70 jaar (art. 757 B); IR-abattement 4600 alleen of 9200 paar na 8 jaar (art. 125-0 A) | EUR | FR | ja | nee | `overheid_vastgesteld` |  |
| P139 | `lib/audit/prompts/zorg.ts` | 67-68 | Franchise medicale en participation forfaitaire | 0,50 euro per medicijn, 2 euro per consult | EUR | FR | nee | verdubbeling per 1 mei 2024 genoemd | `overheid_vastgesteld` | regel 146-147 meldt de oude waarden 1 euro en 0,50 euro |
| P140 | `lib/audit/prompts/ondernemen.ts` | 72 | CVAE-drempel | 152500 euro omzet | EUR | FR | nee | afschaffing uitgesteld naar 2030 | `overheid_vastgesteld` |  |

## `financieel-kompas`, ja (20 parameters)

Oudere config.json met dezelfde structuur maar afwijkende waarden (editie 2025) plus een Belgisch blok.  
Vermoedelijk Cockpit-onderdeel: IF, Financieel Kompas (voorganger)

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P060 | `config.json` | 2 | AOW bruto alleenstaand per jaar | 19500 | EUR/jaar | NL | nee | nee | `overheid_vastgesteld` | oudere editie |
| P061 | `config.json` | 3 | AOW bruto per partner per jaar | 13000 | EUR/jaar | NL | nee | nee | `overheid_vastgesteld` |  |
| P062 | `config.json` | 8 | Zvw-percentage | 0,0526 | fractie | NL | nee | nee | `overheid_vastgesteld` | 2025-waarde |
| P063 | `config.json` | 10 | Tarieven box 1 onder AOW | 0,3697 / 0,495 | fractie | NL | nee | nee | `overheid_vastgesteld` | tweeschijvenstelsel |
| P064 | `config.json` | 10 | Tarieven box 1 boven AOW | 0,1907 / 0,495 | fractie | NL | nee | nee | `overheid_vastgesteld` |  |
| P065 | `config.json` | 11 | Grens eerste schijf box 1 | 75518 | EUR | NL | nee | nee | `overheid_vastgesteld` |  |
| P066 | `config.json` | 11 | Algemene heffingskorting maximum | 3362 | EUR | NL | nee | nee | `overheid_vastgesteld` |  |
| P067 | `config.json` | 11 | Arbeidskorting maximum | 5532 | EUR | NL | nee | nee | `overheid_vastgesteld` |  |
| P068 | `config.json` | 12 | Startpunt afbouw heffingskorting | 24813 | EUR | NL | nee | nee | `overheid_vastgesteld` |  |
| P069 | `config.json` | 12 | Afbouwfactor heffingskorting | 0,0663 | fractie | NL | nee | nee | `overheid_vastgesteld` |  |
| P070 | `config.json` | 15 | Heffingsvrij vermogen box 3, alleenstaand | 57684 | EUR | NL | nee | nee | `overheid_vastgesteld` |  |
| P071 | `config.json` | 15 | Heffingsvrij vermogen box 3, partners | 115368 | EUR | NL | nee | nee | `overheid_vastgesteld` |  |
| P072 | `config.json` | 15 | Forfaitair rendement box 3, enkelvoudig | 0,0617 | fractie | NL | nee | nee | `overheid_vastgesteld` | een enkel rendement in plaats van drie |
| P073 | `config.json` | 19 | Prelevements sociaux (PFU) | 0,172 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P074 | `config.json` | 21 | Schijven impot sur le revenu | 11497 / 29315 / 83823 / 180294 | EUR | FR | nee | nee | `overheid_vastgesteld` | oudere editie |
| P075 | `config.json` | 22 | Abattement 65-plus | 17200 / 2746 / 27670 / 1373 | EUR | FR | nee | nee | `overheid_vastgesteld` |  |
| P076 | `config.json` | 24 | Plafond gezinsquotient per halve part | 1759 | EUR | FR | nee | nee | `overheid_vastgesteld` |  |
| P077 | `config.json` | 30 | CAK-bijdrage gemiddeld | 4500 | EUR/jaar | grensoverschrijdend | nee | nee | `indicatief` | vervangen door een opgebouwde CAK-berekening in de AI-versie |
| P078 | `config.json` | 35 | Belgische zelfstandigenbijdrage, schijven | 73447,52 bij 20,5 procent; 108238,40 bij 14,16 procent | EUR en fractie | BE | nee | nee | `overheid_vastgesteld` | Belgisch blok, buiten NL-FR-scope |
| P079 | `config.json` | 45 | Belgische inkomstenbelastingschijven 2025 | 16320 / 28800 / 49840 bij 25 tot 50 procent | EUR en fractie | BE | nee | 2025 in sleutelnaam | `overheid_vastgesteld` |  |

## `Vastgoedtransactie`, ja (20 parameters)

Rekenkern calc.js met emolumenten, TPF, plus-value-abattements en surtaxe, plus dmto.json met 101 departementale tarieven en bronnen.json.  
Vermoedelijk Cockpit-onderdeel: Vastgoedtransacties, transactiekostentool

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P080 | `calc.js` | 96-100 | Emolumenten notaris, trancheschaal | 6500 bij 3,870 procent; 17000 bij 1,596 procent; 60000 bij 1,064 procent; daarboven 0,799 procent | EUR en fractie | FR | ja | arrete 25 februari 2026, geldig tot 29 februari 2028 | `overheid_vastgesteld` | art. A444-91 Code de commerce, tabel 5 nr. 17 |
| P081 | `calc.js` | 104 | TVA-tarief | 20,0 | procent | FR | nee | nee | `overheid_vastgesteld` |  |
| P082 | `calc.js` | 110-111 | Contribution de securite immobiliere en minimum | 0,10 procent, minimaal 15,00 euro | procent en EUR | FR | ja | nee | `overheid_vastgesteld` |  |
| P083 | `calc.js` | 127-129 | Taxe de publicite fonciere VEFA | 0,715 procent (0,70 basis maal 2,14 procent frais d'assiette) | procent | FR | ja | Legifrance, vigerend sinds 1 juli 2026 | `overheid_vastgesteld` | art. 1594 F quinquies en 1647 V-b CGI |
| P084 | `calc.js` | 134 | Debours, forfaitair | 1200,0 | EUR | FR | nee | nee | `indicatief` |  |
| P085 | `calc.js` | 139-140 | Remise notaris: drempel en maximum | vanaf 100000 euro, maximaal 20 procent | EUR en procent | FR | ja | nee | `overheid_vastgesteld` | wettelijke korting, notaris niet verplicht |
| P086 | `calc.js` | 153 | Forfait aankoopkosten plus-value | 7,5 | procent | FR | ja | nee | `overheid_vastgesteld` | art. 150 VB II 3 CGI |
| P087 | `calc.js` | 154 | Forfait verbouwing plus-value | 15,0 | procent | FR | ja | nee | `overheid_vastgesteld` | art. 150 VB II 4 CGI, vanaf 5 jaar bezit |
| P088 | `calc.js` | 156 | Tarief inkomstenbelasting plus-value | 19,0 | procent | FR | ja | nee | `overheid_vastgesteld` | art. 200 B CGI |
| P089 | `calc.js` | 157 | Tarief prelevements sociaux | 17,2 | procent | FR | nee | nee | `overheid_vastgesteld` |  |
| P090 | `calc.js` | 158 | Tarief prelevements sociaux bij De Ruyter | 7,5 | procent | FR | nee | nee | `overheid_vastgesteld` |  |
| P091 | `calc.js` | 235-239 | Abattement plus-value per bezitsjaar | IB 6,0 per jaar en 4,0 in jaar 22; PS 1,65 per jaar, 1,60 in jaar 22 en 9,0 in jaar 23 t/m 30 | procent per jaar | FR | nee | nee | `overheid_vastgesteld` |  |
| P092 | `calc.js` | 245-255 | Surtaxe hoge meerwaarden: drempel en barema | drempel 50000 euro; 2 tot 6 procent met afvlakking per tranche | EUR en procent | FR | ja | Legifrance, in werking sinds 1 januari 2024 | `overheid_vastgesteld` | art. 1609 nonies G CGI |
| P093 | `calc.js` | 275 | Terugname afschrijvingen vanaf | 2025-02-15 | datum | FR | ja | nee | `overheid_vastgesteld` | art. 84 wet 2025-127 |
| P094 | `calc.js` | 61-62 | Houdbaarheidstermijn tarieven, actueel en controleren | 2 en 6 | maanden | grensoverschrijdend | nee | nee | `afgeleid` | eigen bewaking van de tool |
| P095 | `dmto.json` | _meta | Taxe communale | 1,20 | procent | FR | ja | peildatum 2026-06-01 | `overheid_vastgesteld` | art. 1584 CGI |
| P096 | `dmto.json` | _meta | Frais d'assiette over departementaal deel | 2,37 | procent | FR | ja | peildatum 2026-06-01 | `overheid_vastgesteld` | art. 1647 V-a CGI |
| P097 | `dmto.json` | departementen | Departementaal DMTO-tarief standaard, 101 departementen | 5,00 procent (89 dep.), 4,50 procent (11 dep.), 3,80 procent (1 dep.) | procent | FR | ja | DGFiP, tarieven per 1 juni 2026 | `overheid_vastgesteld` | art. 1594 D CGI en art. 116 II wet 2025-127 |
| P098 | `dmto.json` | departementen | Departementaal DMTO-tarief primo-accedant, 101 departementen | 4,50 procent (99 dep.), 3,80 procent (2 dep.) | procent | FR | ja | DGFiP, tarieven per 1 juni 2026 | `overheid_vastgesteld` |  |
| P099 | `bronnen.json` | 136 | Vrijstelling plus-value EU/EER-onderdanen | 150000 | EUR | FR | ja | nee | `overheid_vastgesteld` | art. 150 U II 2 CGI |

## `energieportaal`, ja (10 parameters)

Rekenengine met klimaatzones, DPE-coefficienten, U-waarden en een prijsmodule met actuele Franse energieprijzen.  
Vermoedelijk Cockpit-onderdeel: IF, EnergiePortaal

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P141 | `engine/dpe.js` | 28-33 | Graaddagen en referentietemperatuur per klimaatzone | med 1400/12, ouest 1900/10, paris 2200/7, centre 2500/6, est 2800/5, mont 3400/2 | HDD en graden C | FR | nee | nee | `indicatief` |  |
| P142 | `engine/dpe.js` | 47 | Primaire-energiefactor elektriciteit | 1,9 | factor | FR | ja | per 1 januari 2026, arrete du 13 aout 2025 | `overheid_vastgesteld` |  |
| P143 | `engine/dpe.js` | 63-64 | CO2-emissiefactoren per energiedrager | elec 0,079; gas 0,227; fioul 0,324; propaan 0,272; pellet en hout 0,030; petroleum 0,324 | kg CO2 per kWh | FR | nee | nee | `overheid_vastgesteld` |  |
| P144 | `engine/dpe.js` | 73-88 | DPE-klassegrenzen energie en CO2 | energie A 70 t/m F 420 kWh per m2; CO2 A 6 t/m F 100 kg per m2 | kWh/m2 en kg CO2/m2 | FR | nee | nee | `overheid_vastgesteld` |  |
| P145 | `engine/engine.js` | 14 | PV-opbrengst per klimaatzone | med 1450, ouest 1250, paris 1150, centre 1200, est 1150, mont 1100 | kWh per kWp per jaar | FR | nee | nee | `indicatief` |  |
| P146 | `engine/engine.js` | 26 | Standaard energieprijzen gebruikersinvoer | elec 0,25 EUR/kWh; gas 1,20 EUR/m3; fioul 1,15 EUR/L; pellet 0,60 EUR/kg; hout 85 EUR/stere; propaan 1,80 EUR/L; petroleum 2,00 EUR/L | EUR per eenheid | FR | nee | nee | `gebruikersinvoer` | defaults, overschrijfbaar |
| P147 | `engine/engine.js` | 28 | Omrekening naar kWh per eenheid | gas 10, fioul 10, pellet 5, hout 1800, propaan 7,1, petroleum 10 | kWh per eenheid | FR | nee | nee | `afgeleid` |  |
| P148 | `engine/engine.js` | 62-66 | U-waarden per isolatieniveau | muur 2,0 tot 0,25; dak 3,0 tot 0,15; vloer 2,2 tot 0,3; raam 5,5 tot 1,0 | W/m2K | FR | nee | nee | `indicatief` |  |
| P149 | `api/prices.js` | 15-22 | Referentie-energieprijzen met peildatum | elec 0,194 EUR/kWh (CRE, feb 2026); gas 0,1051 EUR/kWh PCI (CRE, apr 2026); fioul 1,19 EUR/L (mrt 2026); pellet 0,60 EUR/kg (Q1 2026); hout 85 EUR/stere (2025); propaan 1,90 EUR/L; petroleum 2,00 EUR/L | EUR per eenheid | FR | ja | refDate per waarde | `marktindex` | elektriciteit en gas worden live opgehaald bij CRE, de rest is vast |
| P150 | `api/prices.js` | 7 | Verouderingsdrempel prijzen | 120 | dagen | FR | nee | nee | `afgeleid` |  |

## `dossier-elektriciteit-if`, ja (9 parameters)

Hoofdstukken bevatten geverifieerde Consuel- en Enedis-tarieven met bron en verificatiedatum.  
Vermoedelijk Cockpit-onderdeel: IF, dossier Elektriciteit

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P187 | `hoofdstukken/h8.md` | 12, 51 en 99 | Consuel-tarief attestation geel, elektronisch | 144,67 | EUR | FR | ja | barema bij arrete 04-08-2015, plus 0,64 procent per 02-09-2025; geverifieerd 04-07-2026 | `overheid_vastgesteld` |  |
| P188 | `hoofdstukken/h8.md` | 51 | Consuel-tarieven overige formulieren | geel papier 146,15; groen 76,37; blauw 201,17; violet 230,32 | EUR | FR | ja | geverifieerd 04-07-2026 | `overheid_vastgesteld` |  |
| P189 | `hoofdstukken/h8.md` | 51 en 99 | Consuel contre-visite | 232,13 | EUR | FR | ja | geverifieerd 04-07-2026 | `overheid_vastgesteld` |  |
| P190 | `hoofdstukken/h8.md` | 48 en 99 | Indexering Consuel-barema | 0,64 procent per 02-09-2025 | procent | FR | ja | 02-09-2025 | `overheid_vastgesteld` |  |
| P191 | `hoofdstukken/h1.md` | 120 | Tariefoptiewissel zonder Linky | 56,72 | EUR | FR | ja | geverifieerd 04-07-2026 | `overheid_vastgesteld` | met Linky gratis |
| P192 | `hoofdstukken/h1.md` | 125 | Beheerbijdrage bij weigeren Linky | 6,48 EUR HT per twee maanden, plus 4,14 EUR HT bij meer dan een jaar geen meterstand | EUR | FR | ja | sinds 01-08-2025, TURPE 7 | `overheid_vastgesteld` | CRE-deliberatie 2025-78 |
| P193 | `hoofdstukken/h1.md` | 126 | Administratieve wijziging puissance souscrite | circa 4,28 EUR TTC | EUR | FR | ja | nee | `overheid_vastgesteld` |  |
| P194 | `hoofdstukken/h1.md` | 63 en 67 | Vermogenstrappen en aansluitgrenzen | abonnement 3-6-9-12 kVA; monophase maximaal 12 kVA; triphase tot 36 kVA | kVA | FR | ja | geverifieerd 04-07-2026 | `overheid_vastgesteld` |  |
| P195 | `verificatie/normverificatie.md` | V9 | Geldigheid diagnostic electrique | 3 jaar bij verkoop, 6 jaar bij verhuur; verplicht bij installatie ouder dan 15 jaar | jaren | FR | ja | service-public.gouv.fr F18692, geverifieerd 04-07-2026 | `overheid_vastgesteld` |  |

## `briefhulp-fr`, ja (8 parameters)

Brieftemplates rekenen met wettelijke termijnen en boetepercentages (borg, telecom, belastingbezwaar).  
Vermoedelijk Cockpit-onderdeel: IF, Briefhulp

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P179 | `cache/verhuurder/borg/niveau-2.json` | 29 | Boete te late teruggave huurborg | 10 procent van de kale maandhuur per begonnen maand | procent | FR | ja | nee | `overheid_vastgesteld` | art. 22 al. 5 loi 89-462 |
| P180 | `cache/telecom/opzeg/niveau-1.json` | 25 | Maximale verbrekingsvergoeding telecom | 25 procent van het restant | procent | FR | ja | nee | `overheid_vastgesteld` | art. L224-39 Code de la consommation |
| P181 | `cache/telecom/opzeg/niveau-1.json` | 25 | Minimale looptijd voor opzegging met binding | 12 maanden | maanden | FR | ja | nee | `overheid_vastgesteld` |  |
| P182 | `cache/werkgever/factuur/niveau-3.json` | 32 | Forfaitaire incassokosten | 40 | EUR | FR | nee | nee | `overheid_vastgesteld` |  |
| P183 | `cache/belasting/bezwaar/niveau-1.json` | 58 | Prelevement de solidarite bij De Ruyter | 7,5 procent | procent | grensoverschrijdend | ja | nee | `overheid_vastgesteld` | art. 26 LFSS 2019, HvJ-EU C-623/13 en C-372/18 |
| P184 | `cache/buur/erfgrens/niveau-1.json` | 39 | Kosten bornage amiable | 500 tot 1500 euro | EUR | FR | nee | nee | `indicatief` |  |
| P185 | `KLIKSTROMEN.md` | 233 | Boete per maand vertraging | 10 procent | procent | FR | nee | nee | `overheid_vastgesteld` |  |
| P186 | `ARGUMENTATIE.md` | 19 | CSG en CRDS geschrapt voor EU-verzekerden | CSG 9,2 procent en CRDS 0,5 procent | procent | FR | ja | LFSS 2019 | `overheid_vastgesteld` |  |

## `Plus-Value-Calculator`, ja (7 parameters)

Python-rekenkern met abattementsreeksen, surtaxe-barema, forfaits en tarieven voor de Franse meerwaardeheffing.  
Vermoedelijk Cockpit-onderdeel: Vastgoedtransacties, plus-value

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P100 | `generate_pdf.py` | 51-53 | Abattement prelevements sociaux per jaar | 1,65 (jaar 6-21), 1,6 (jaar 22), 9,0 (jaar 23-30) | procent per jaar | FR | nee | nee | `overheid_vastgesteld` |  |
| P101 | `generate_pdf.py` | 43-45 | Abattement inkomstenbelasting, volledige vrijstelling | 100,0 na 22 jaar | procent | FR | nee | nee | `overheid_vastgesteld` |  |
| P102 | `generate_pdf.py` | 58-63 | Surtaxe-barema hoge meerwaarden | 0 tot 50000: 0 procent; daarna 2, 3, 4, 5 en 6 procent per tranche van 50000 | EUR en fractie | FR | nee | nee | `overheid_vastgesteld` | rechte tranches, zonder afvlakkingsformule |
| P103 | `generate_pdf.py` | 87 | Standaardtarief prelevements sociaux | 0,172 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P104 | `generate_pdf.py` | 113 | Forfait aankoopkosten | 0,075 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P105 | `generate_pdf.py` | 119 | Forfait verbouwing, vanaf 5 jaar bezit | 0,15 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P106 | `generate_pdf.py` | 127 | Tarief inkomstenbelasting plus-value | 0,19 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |

## `zorgkompas-frankrijk`, ja (7 parameters)

Scenariodatabase met BRSS-tarieven en vergoedingspercentages van de Securite sociale.  
Vermoedelijk Cockpit-onderdeel: IF, ZorgKompas

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P169 | `scenarios.js` | 19-21 | Base de remboursement consult huisarts | 30,00 | EUR | FR | nee | 2025 in de kop van het bestand | `overheid_vastgesteld` | het bestand meldt zelf tarieven 2024/2025 |
| P170 | `scenarios.js` | 62 en 106 | Base de remboursement kinesitherapie per sessie | 16,13 | EUR | FR | nee | 2025 | `overheid_vastgesteld` |  |
| P171 | `scenarios.js` | 81 | Base de remboursement specialist (APC) | 55,00 | EUR | FR | nee | 2025 | `overheid_vastgesteld` |  |
| P172 | `scenarios.js` | 100 en 155 | Forfait journalier ziekenhuis | 20,00 | EUR/dag | FR | nee | 2025 | `overheid_vastgesteld` | cafeclaude noemt 23 euro sinds 1 maart 2026 |
| P173 | `scenarioEngine.js` | 80 | Standaard vergoedingspercentage Secu | 0,70 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P174 | `scenarioEngine.js` | 89-90 | Vergoeding kine en medicatie | 0,60 respectievelijk 0,65 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |
| P175 | `scenarioEngine.js` | 96 | Vergoeding zonder parcours de soins | 0,30 | fractie | FR | nee | nee | `overheid_vastgesteld` |  |

## `Energiecalculator-Frankrijk-door-Nederlanders.fr`, ja (5 parameters)

Vroege versie van de energie-engine met dezelfde HDD- en PV-waarden maar deels afwijkende U-presets.  
Vermoedelijk Cockpit-onderdeel: NLFR, energiecalculator (oud)

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P157 | `script.js` | 4 | Graaddagen en zwembadtemperatuur per zone | identiek aan warmteverlies-calculator | HDD en graden C | FR | nee | nee | `indicatief` |  |
| P158 | `script.js` | 5 | PV-opbrengst per zone | identiek aan energieportaal | kWh per kWp per jaar | FR | nee | nee | `indicatief` |  |
| P159 | `script.js` | 6 | Apparaatverbruik per jaar | koelkast 250, wassen 220, vaatwasser 180, oven 120, tv 100, IT 100, verlichting 200 | kWh/jaar | FR | nee | nee | `indicatief` | wijkt af van de latere versies |
| P160 | `script.js` | 8 en 10 | Standaardprijzen en omrekenfactoren | identiek aan energieportaal | EUR en kWh | FR | nee | nee | `gebruikersinvoer` |  |
| P161 | `script.js` | 15 | U-waarden per isolatieniveau | muur 2,0 tot 0,25; dak 3,0 tot 0,1; vloer 1,2 tot 0,18; raam 5,8 tot 0,8 | W/m2K | FR | nee | nee | `indicatief` | dak, vloer en raam wijken af van de latere versies |

## `warmteverlies-calculator`, ja (5 parameters)

Oudere variant van dezelfde energie-engine met dezelfde klimaat-, prijs- en U-waardeconstanten.  
Vermoedelijk Cockpit-onderdeel: IF, warmteverlies

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P152 | `engine/engine.js` | 6-11 | Graaddagen, koeldagen, zwembadtemperatuur per zone | med 1400/700/22, ouest 1900/350/20, paris 2200/250/19, centre 2500/200/19, est 2800/150/18, mont 3400/50/17 | HDD, CDD en graden C | FR | nee | nee | `indicatief` |  |
| P153 | `engine/engine.js` | 14 | PV-opbrengst per zone | identiek aan energieportaal | kWh per kWp per jaar | FR | nee | nee | `indicatief` |  |
| P154 | `engine/engine.js` | 17-23 | Apparaatverbruik per jaar | koelkast 250, wassen 220, vaatwasser 160, IT 150, tv 120, klein 150, verlichting 180 | kWh/jaar | FR | nee | nee | `indicatief` |  |
| P155 | `engine/engine.js` | 26 en 28 | Standaardprijzen en omrekenfactoren | identiek aan energieportaal | EUR en kWh | FR | nee | nee | `gebruikersinvoer` |  |
| P156 | `engine/engine.js` | 63-66 | U-waarden per isolatieniveau | identiek aan energieportaal | W/m2K | FR | nee | nee | `indicatief` |  |

## `erf-en-schenkingsrecht-nl-fr`, ja (4 parameters)

Franse successie- en schenkingsbaremes met tarieven en abattements in app.js, met bronregister en verificatiedata.  
Vermoedelijk Cockpit-onderdeel: IF, erf- en schenkingsrecht

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P162 | `app.js` | 62-68 | Barema successie in lijn directe | 8072 bij 5 procent; 12109 bij 10; 15932 bij 15; 552324 bij 20; 902838 bij 30; 1805677 bij 40; daarboven 45 procent | EUR en fractie | FR | ja | verifie le 31 juli 2025 (F35794) | `overheid_vastgesteld` |  |
| P163 | `app.js` | 72-78 | Barema schenking in lijn directe | 8072 bij 5 procent; 15932 bij 10; 31865 bij 15; 552324 bij 20; 902838 bij 30; 1805677 bij 40; daarboven 45 procent | EUR en fractie | FR | ja | verifie le 07 november 2024 (F14203) | `overheid_vastgesteld` |  |
| P164 | `app.js` | 1203 en 1219 | Abattement per kind per ouder | 100000 | EUR | FR | ja | impots.gouv.fr, 18 december 2025 | `overheid_vastgesteld` | hernieuwbaar per 15 jaar |
| P165 | `app.js` | 1222-1223 | Extra vrijstelling geldschenking | 31865 | EUR | FR | nee | nee | `overheid_vastgesteld` | in de code aangeduid als indicatief |

## `ca-btw-oss-tool`, ja (3 parameters)

Regelset met btw-tarieven NL en FR en een rekenmodule voor aangifterubrieken en OSS.  
Vermoedelijk Cockpit-onderdeel: CA intern, btw/OSS

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P176 | `lib/regels.ts` | 56 en 179 | Btw-tarief NL-klanten | 21 | procent | NL | ja | regelset vastgesteld 2026-07-07 | `overheid_vastgesteld` | bron: Belastingdienst |
| P177 | `lib/regels.ts` | 62 en 180 | Btw-tarief FR-particulieren via OSS | 20 | procent | FR | ja | regelset vastgesteld 2026-07-07 | `overheid_vastgesteld` |  |
| P178 | `lib/bereken.ts` | 126 | Voorbelastingtarief inkoop NL | 0,21 | fractie | NL | ja | 2026-07-07 | `overheid_vastgesteld` |  |

## `e-facturatie-frankrijk`, ja (3 parameters)

Feitenobjecten met wettelijke invoeringsdata en ondernemingsgroottegrenzen, elk met bron en controledatum.  
Vermoedelijk Cockpit-onderdeel: IF / CA, e-facturatie

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P196 | `data/rules.ts` | 44-49 | Invoeringsdatum ontvangstplicht en uitgifteplicht grote ondernemingen | 1 september 2026 | datum | FR | ja | gecontroleerd 8 juli 2026 | `overheid_vastgesteld` | bron: impots.gouv.fr |
| P197 | `data/rules.ts` | 54-56 | Invoeringsdatum uitgifteplicht PME en TPE | 1 september 2027 | datum | FR | ja | gecontroleerd 8 juli 2026 | `overheid_vastgesteld` |  |
| P198 | `data/rules.ts` | 103 | Grens TPE | minder dan 10 medewerkers en maximaal 2 miljoen euro omzet of balanstotaal | EUR en aantal | FR | ja | gecontroleerd 8 juli 2026 | `overheid_vastgesteld` | bron: INSEE categorieen |

## `energiebesparing-subsidie-en-fiscale-regelingen`, ja (3 parameters)

Beslislogica met btw-tarieven voor renovatie en voorwaardendrempels voor Eco-PTZ.  
Vermoedelijk Cockpit-onderdeel: IF, subsidiewijzer

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P199 | `script.js` | 193-206 | Btw-tarief energetische renovatiewerken | 5,5 procent, naast 10 procent | procent | FR | nee | simple mention sinds 1 maart 2025 | `overheid_vastgesteld` |  |
| P200 | `script.js` | 193 | Ouderdomsgrens woning voor verlaagd tarief en Eco-PTZ | 2 jaar | jaren | FR | nee | nee | `overheid_vastgesteld` |  |
| P201 | `index.html` | 35 | MaPrimeRenov-bedrag in de tekst | 24500 | EUR | FR | nee | 2026 in de pagina | `overheid_vastgesteld` | als plafondbedrag in de pagina genoemd |

## `gitekompas-fr`, ja (3 parameters)

Micro-BIC-parameters (abattement en omzetplafond per activiteitstype), degressieve reeks en niet-residentbandbreedte.  
Vermoedelijk Cockpit-onderdeel: IF, GiteKompas

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P166 | `index.html` | 864-867 | Micro-BIC per activiteitstype | meuble non classe 30 procent bij 15000; meuble classe 50 procent bij 77700; chambre d'hotes 50 procent bij 77700; verhuur eigen woning 30 procent bij 15000 | procent en EUR | FR | nee | nee | `overheid_vastgesteld` | in de tekst aangeduid als V1 en indicatief |
| P167 | `index.html` | 1177-1179 | Degressieve reeks per bezitsjaar | jaar 6: 75 procent; jaar 7: 50 procent; jaar 8: 25 procent | procent | FR | nee | nee | `indicatief` |  |
| P168 | `index.html` | 1226-1227 | Minimumheffing niet-residenten, bandbreedte | 20 tot 30 procent | procent | FR | nee | nee | `indicatief` | in de tool als bandbreedte getoond |

## `if-mobiel`, ja (1 parameters)

Bevat een byte-identieke kopie van de engine van energieportaal (engine.js, dpe.js, archetypes.js).  
Vermoedelijk Cockpit-onderdeel: IF, mobiele schil

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P151 | `engine/dpe.js en engine/engine.js` | alle | Identieke kopie van de energie-engine van energieportaal | zie energieportaal | divers | FR | nee | nee | `afgeleid` | byte-identiek aan energieportaal op 16 september 2026 |

## `woningzoeker-frankrijk`, ja (1 parameters)

Budgetstap rekent notariskosten als vast percentage over de aankoopprijs.  
Vermoedelijk Cockpit-onderdeel: IF, Woningzoeker

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P202 | `components/steps/StepBudget.tsx` | 52, 129 en 146 | Notariskosten als percentage van de aankoopprijs | circa 8 procent | procent | FR | nee | nee | `indicatief` |  |

## `nlfr-ai-agent`, mogelijk (5 parameters)

Kennisbestand voor de AI-adviseur bevat richtprijzen, subsidiebedragen en energiekentallen zonder bronregel per waarde.  
Vermoedelijk Cockpit-onderdeel: NLFR, AI-agent

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P204 | `knowledge/experts/energieportaal-ai-adviseur.md` | 156 | Energie-inhoud hout per stere | 1800 kWh droog hardhout, 1400 kWh zachthout | kWh/stere | FR | nee | nee | `indicatief` |  |
| P205 | `knowledge/experts/energieportaal-ai-adviseur.md` | 233-234 | Eco-PTZ maximum en btw-tarief renovatie | tot 50000 euro renteloos; TVA 5,5 procent bij RGE-installateur | EUR en procent | FR | nee | nee | `overheid_vastgesteld` |  |
| P206 | `knowledge/experts/energieportaal-ai-adviseur.md` | 237 | MaPrimeRenov budget en achterstand | 3,6 miljard euro budget 2026, 83000 onbehandelde dossiers uit 2025 | EUR en aantal | FR | nee | 2026 | `overheid_vastgesteld` |  |
| P207 | `knowledge/experts/energieportaal-ai-adviseur.md` | 272-279 | Richtprijzen renovatiemaatregelen | dakisolatie 25-50 EUR/m2; ITI 50-90 EUR/m2; ITE 100-200 EUR/m2; vloerisolatie 30-60 EUR/m2; raam HR++ 400-800 per stuk; warmtepomp lucht-water 8000-15000; geothermisch 15000-25000; PV 3 kWp 5000-8000 | EUR | FR | nee | nee | `indicatief` |  |
| P208 | `knowledge/experts/energieportaal-ai-adviseur.md` | 286 | Besparing per graad lagere binnentemperatuur | circa 7 procent | procent | FR | nee | nee | `indicatief` |  |

## `dossierfrankrijk`, mogelijk (4 parameters)

Beslisboom noemt kostenindicaties en een rekenvoorbeeld; alleen code en configuratie beoordeeld, geen gebruikersdata.  
Vermoedelijk Cockpit-onderdeel: DossierFrankrijk

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P215 | `lib/embedTree.ts` | 284 | Mandat de protection future, kosten | sous seing prive gratis tot 100 euro; notarie 300 tot 500 euro | EUR | FR | nee | nee | `indicatief` |  |
| P216 | `lib/embedTree.ts` | 294 | Rechterlijke beschermingsmaatregel, kosten | 200 tot 500 euro, doorlooptijd 3 tot 6 maanden | EUR en maanden | FR | nee | nee | `indicatief` |  |
| P217 | `lib/embedTree.ts` | 330 | Repatriering naar Nederland | 3000 tot 8000 euro | EUR | grensoverschrijdend | nee | nee | `indicatief` |  |
| P218 | `lib/embedTree.ts` | 396 | Rekenvoorbeeld ouderenzorg | inkomen 1800, kosten 1624 per maand, restant circa 325 euro | EUR/maand | FR | nee | nee | `afgeleid` | expliciet indicatief genoemd |

## `ouderenzorg-fr`, mogelijk (4 parameters)

Dossierskelet met een tabel van Franse zorgtoeslagen en plafonds, aangeduid als indicatief.  
Vermoedelijk Cockpit-onderdeel: IF, Ouderenzorg

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P209 | `if-dossier/dossier-skelet.md` | 124 | APA-bedrag per maand | 811 tot 2080 euro | EUR/maand | FR | nee | indicatief 2026 | `overheid_vastgesteld` |  |
| P210 | `if-dossier/dossier-skelet.md` | 126 | ASPA maximum alleenstaand | tot 1012 euro per maand | EUR/maand | FR | nee | indicatief 2026 | `overheid_vastgesteld` |  |
| P211 | `if-dossier/dossier-skelet.md` | 127 | Credit d'impot hulp aan huis en plafond | 50 procent, maximaal 6000 tot 10000 euro per jaar | procent en EUR | FR | nee | indicatief 2026 | `overheid_vastgesteld` |  |
| P212 | `if-dossier/dossier-skelet.md` | 128 | MaPrimeAdapt maximum | tot 70 procent van de kosten | procent | FR | nee | indicatief 2026 | `overheid_vastgesteld` |  |

## `erfrecht-en-testament`, mogelijk (3 parameters)

Artikel met harde successietarieven en vrijstellingen, zonder rekenfunctie.  
Vermoedelijk Cockpit-onderdeel: IF, erfrecht (artikel)

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P223 | `index.html` | 346 en 360 | Tarief erfbelasting stiefkind | 60 procent boven de vrijstelling | procent | FR | nee | nee | `overheid_vastgesteld` |  |
| P224 | `index.html` | 351 | Vrijstelling stiefkinderen | verhoogd van 1594 naar 15932 euro | EUR | FR | nee | nee | `overheid_vastgesteld` | geldt bij overlijden, niet bij schenking |
| P225 | `index.html` | 369 | Barema en abattement bij adoption simple | 5 tot 45 procent, abattement 100000 euro | procent en EUR | FR | nee | nee | `overheid_vastgesteld` |  |

## `bouwvergunningwijzer-frankrijk`, mogelijk (2 parameters)

Regelmatrix met oppervlaktedrempels voor DP en PC; nog niet gekoppeld aan Legifrance-artikelen.  
Vermoedelijk Cockpit-onderdeel: IF, Bouwvergunningwijzer

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P219 | `docs/rule-matrix-v0.1.md` | 22-24 | Oppervlaktedrempels vrijstaand bijgebouw | tot 5 m2 geen formaliteit; 5 tot 20 m2 declaration prealable; boven 20 m2 permis de construire | m2 | FR | nee | nee | `overheid_vastgesteld` | document meldt dat koppeling aan Legifrance-artikelen nog moet gebeuren |
| P220 | `docs/rule-matrix-v0.1.md` | 27-29 | Oppervlaktedrempels uitbreiding | buiten zone U tot 20 m2 DP; in zone U tot 40 m2 DP; boven 20 tot 40 m2 architectenplicht toetsen | m2 | FR | nee | nee | `overheid_vastgesteld` |  |

## `infofrankrijk-routecontrole`, mogelijk (2 parameters)

Reiskostenraming met brandstofverbruik, literprijs en huurbandbreedtes als vaste aannames.  
Vermoedelijk Cockpit-onderdeel: IF, Routecontrole

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P221 | `components/vervoershub.tsx` | 178 | Aannames reiskostenraming | 7 liter per 100 km en 1,80 euro per liter | L/100km en EUR/L | FR | nee | nee | `marktindex` |  |
| P222 | `components/passport-wizard.tsx` | 340 | Huurbandbreedte 9-persoonsbus | 100 tot 190 euro per dag en 0,25 tot 0,40 euro per extra kilometer | EUR | FR | nee | nee | `marktindex` |  |

## `taalhulp-fr`, mogelijk (2 parameters)

Begrippenlijst bevat losse tarieven als toelichting bij een term, niet als rekenparameter.  
Vermoedelijk Cockpit-onderdeel: IF, Taalhulp

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P213 | `begrippen.js` | 692 | PFU als vlaktaks | 30 procent | procent | FR | nee | nee | `overheid_vastgesteld` | toelichting bij een begrip, geen rekenparameter |
| P214 | `begrippen.js` | 693 | Prelevements sociaux over beleggingsinkomsten | 17,2 procent | procent | FR | nee | nee | `overheid_vastgesteld` |  |

## `verenigings-dashboard`, mogelijk (2 parameters)

Rekent kosten met API-tarieven per miljoen tokens, met bron en raadpleegdatum; buiten het fiscale en sociale domein.  
Vermoedelijk Cockpit-onderdeel: Verenigings-dashboard

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P226 | `lib/tarieven.ts` | 22-27 | API-tarief claude-sonnet-5 | 2,00 USD invoer en 10,00 USD uitvoer per miljoen tokens | USD per 1M tokens | grensoverschrijdend | ja | geraadpleegd 2026-09-11 | `contractueel` | buiten het fiscale en sociale domein |
| P227 | `lib/tarieven.ts` | 35-39 | Wisselkoers USD naar EUR | null, bron niet bereikbaar | koers | grensoverschrijdend | ja | nee | `marktindex` | bewust leeg gelaten in plaats van geschat |

## `Aankoop-kompas-voor-franse-huizen-in-frankrijk`, mogelijk (1 parameters)

Rekent technische waarde en adviesbod uit gebruikersinvoer; geen vaste fiscale parameters.  
Vermoedelijk Cockpit-onderdeel: IF, Aankoopkompas

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P233 | `src/App.jsx` | 367 en 489 | Marktprijs per m2 en technische waarde | gebruikersinvoer | EUR/m2 | FR | nee | nee | `gebruikersinvoer` |  |

## `bouwgrond-frankrijk-check`, mogelijk (1 parameters)

Analyse op basis van externe API's met een vaste zoekradius; geen fiscale parameters.  
Vermoedelijk Cockpit-onderdeel: IF, bouwgrondcheck

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P234 | `api/analyze.js` | 93-110 | Zoekradius risicoanalyse | 1000 | meter | FR | ja | georisques.gouv.fr | `afgeleid` |  |

## `gasdossier-stillewille`, mogelijk (1 parameters)

Historisch dossier met bedragen en percentages uit een concreet gasgeschil; geen herbruikbare parameters.  
Vermoedelijk Cockpit-onderdeel: overig, gasdossier

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P229 | `gas-historie.html` | 106-117 | Historische gasprijzen en verbruikscijfers uit een individueel dossier | 0,10 en 0,43 EUR per eenheid; 20,4 en 15 procent | EUR en procent | FR | nee | nee | `indicatief` | dossiergegevens, niet herbruikbaar als parameter |

## `if-tools-api`, mogelijk (1 parameters)

AI-prompt geeft een vast percentage voor frais de notaire mee aan de woninganalyse.  
Vermoedelijk Cockpit-onderdeel: IF, tools-API

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P203 | `src/app/api/woning-analyse/route.ts` | 52 | Frais de notaire in de AI-prompt | circa 7 tot 8 procent bij bestaande bouw | procent | FR | nee | nee | `indicatief` |  |

## `klussen-in-frankrijk`, mogelijk (1 parameters)

Bevat een feitenlaag-schema dat expliciet voor bedragen en tarieven is ontworpen (met bron, bronsoort, geverifieerd, geldigVanaf), maar het enige feitenbestand is nog leeg; wel losse bedragen in de brontekst.  
Vermoedelijk Cockpit-onderdeel: KIF, hoofdrepo

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P228 | `source/facts/schema.json en source/facts/README.md` | geheel | Schema voor een feitenlaag met bedragen en tarieven | velden: id, onderwerp, feit, categorie, bron, bronurl, bronsoort, geverifieerd, geldigVanaf, nlfr | schema | grensoverschrijdend | ja | ja | `afgeleid` | energie.json is leeg; het schema is het meest bruikbare bestaande ontwerp voor Peil |

## `klussen-in-frankrijk-christian-von-klosterlein`, mogelijk (1 parameters)

Artikeldata met technische percentages en maten; geen fiscale of sociale parameters aangetroffen.  
Vermoedelijk Cockpit-onderdeel: KIF, artikelen

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P230 | `app/artikelen/water-riool-batch-data.json` | 33-42 | Technische percentages water en riool | 20 tot 95 procent | procent | FR | nee | nee | `indicatief` | technisch, buiten het fiscale en sociale domein |

## `vastgoed-analyse`, mogelijk (1 parameters)

Rekent met marktprijzen per m2 uit DVF; geen eigen vastgelegde parameters.  
Vermoedelijk Cockpit-onderdeel: IF, vastgoedanalyse

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P231 | `api/dvf.js en api/dpe.js` | geheel | Marktprijzen per m2 uit DVF en DPE-gegevens | opgehaald bij .gouv-API's | EUR/m2 | FR | ja | per transactie | `marktindex` | geen eigen vastgelegde waarden |

## `vastgoed-in-frankrijk`, mogelijk (1 parameters)

Analysetool op .gouv-API's; rekenwerk zit in de AI-prompt, geen vastgelegde parameters.  
Vermoedelijk Cockpit-onderdeel: IF, vastgoed in Frankrijk

| # | Bestand | Regel | Naam | Waarde | Eenheid | Land | Bron | Datum | Klasse | Opmerking |
|---|---|---|---|---|---|---|---|---|---|---|
| P232 | `api/dvf.js en api/analyse.js` | geheel | Marktprijzen per m2 uit DVF | opgehaald bij .gouv-API's | EUR/m2 | FR | ja | per transactie | `marktindex` | geen eigen vastgelegde waarden |

## Parameters zonder bron of zonder datum

Van de 234 genoteerde parameters hebben er **167 geen bronverwijzing** op de plaats waar de waarde staat, **156 geen datum of jaar**, en **141 geen van beide**.

| # | Repo | Bestand | Naam | Bron | Datum |
|---|---|---|---|---|---|
| P001 | `financieel-kompas-ai` | `config.json` | AOW bruto alleenstaand per jaar | nee | editie 2026 in bestand |
| P002 | `financieel-kompas-ai` | `config.json` | AOW bruto per partner per jaar | nee | editie 2026 in bestand |
| P003 | `financieel-kompas-ai` | `config.json` | Frans gemiddeld salaris voor pensioenberekening | nee | nee |
| P004 | `financieel-kompas-ai` | `config.json` | Vereiste pensioenjaren Frankrijk | nee | nee |
| P005 | `financieel-kompas-ai` | `config.json` | Pensioenopbouwpercentage Frankrijk | nee | nee |
| P008 | `financieel-kompas-ai` | `config.json` | Tarieven box 1 onder AOW-leeftijd | nee | nee |
| P009 | `financieel-kompas-ai` | `config.json` | Tarieven box 1 boven AOW-leeftijd | nee | nee |
| P010 | `financieel-kompas-ai` | `config.json` | Grens eerste schijf box 1 | nee | nee |
| P011 | `financieel-kompas-ai` | `config.json` | Grens tweede schijf box 1 | nee | nee |
| P012 | `financieel-kompas-ai` | `config.json` | Algemene heffingskorting maximum | nee | nee |
| P013 | `financieel-kompas-ai` | `config.json` | Arbeidskorting maximum | nee | nee |
| P014 | `financieel-kompas-ai` | `config.json` | MKB-winstvrijstelling | nee | nee |
| P015 | `financieel-kompas-ai` | `config.json` | Startpunt afbouw heffingskorting | nee | nee |
| P016 | `financieel-kompas-ai` | `config.json` | Afbouwfactor heffingskorting | nee | nee |
| P017 | `financieel-kompas-ai` | `config.json` | Startpunt afbouw arbeidskorting | nee | nee |
| P018 | `financieel-kompas-ai` | `config.json` | Afbouwfactor arbeidskorting | nee | nee |
| P019 | `financieel-kompas-ai` | `config.json` | Heffingsvrij vermogen box 3, alleenstaand | nee | nee |
| P020 | `financieel-kompas-ai` | `config.json` | Heffingsvrij vermogen box 3, partners | nee | nee |
| P021 | `financieel-kompas-ai` | `config.json` | Tarief box 3 | nee | nee |
| P022 | `financieel-kompas-ai` | `config.json` | Forfaitair rendement spaargeld | nee | nee |
| P023 | `financieel-kompas-ai` | `config.json` | Forfaitair rendement beleggingen | nee | nee |
| P024 | `financieel-kompas-ai` | `config.json` | Forfaitair rendement schulden | nee | nee |
| P032 | `financieel-kompas-ai` | `config.json` | Sociale lasten Frans pensioen, totaal | nee | nee |
| P033 | `financieel-kompas-ai` | `config.json` | Sociale lasten salaris Frankrijk | nee | nee |
| P034 | `financieel-kompas-ai` | `config.json` | Sociale lasten winst uit diensten | nee | nee |
| P035 | `financieel-kompas-ai` | `config.json` | Sociale lasten winst uit verhuur | nee | nee |
| P036 | `financieel-kompas-ai` | `config.json` | Prelevements sociaux onroerend | nee | nee |
| P037 | `financieel-kompas-ai` | `config.json` | Prelevements sociaux roerend | nee | nee |
| P038 | `financieel-kompas-ai` | `config.json` | Prelevement de solidarite | nee | nee |
| P042 | `financieel-kompas-ai` | `config.json` | Schijven impot sur le revenu | nee | nee |
| P043 | `financieel-kompas-ai` | `config.json` | Abattement 65-plus, drempels en aftrek | nee | nee |
| P044 | `financieel-kompas-ai` | `config.json` | Abattement micro winst uit diensten | nee | nee |
| P045 | `financieel-kompas-ai` | `config.json` | Abattement micro winst uit verhuur | nee | nee |
| P046 | `financieel-kompas-ai` | `config.json` | PFU-tarief inkomstenbelastingdeel | nee | nee |
| P047 | `financieel-kompas-ai` | `config.json` | Plafond gezinsquotient per halve part | nee | nee |
| P051 | `financieel-kompas-ai` | `config.json` | IFI-drempel | nee | nee |
| P052 | `financieel-kompas-ai` | `config.json` | IFI-schijven | nee | nee |
| P053 | `financieel-kompas-ai` | `config.json` | Credit d'impot hulp aan huis | nee | nee |
| P054 | `financieel-kompas-ai` | `config.json` | Plafond hulp aan huis | nee | nee |
| P060 | `financieel-kompas` | `config.json` | AOW bruto alleenstaand per jaar | nee | nee |
| P061 | `financieel-kompas` | `config.json` | AOW bruto per partner per jaar | nee | nee |
| P062 | `financieel-kompas` | `config.json` | Zvw-percentage | nee | nee |
| P063 | `financieel-kompas` | `config.json` | Tarieven box 1 onder AOW | nee | nee |
| P064 | `financieel-kompas` | `config.json` | Tarieven box 1 boven AOW | nee | nee |
| P065 | `financieel-kompas` | `config.json` | Grens eerste schijf box 1 | nee | nee |
| P066 | `financieel-kompas` | `config.json` | Algemene heffingskorting maximum | nee | nee |
| P067 | `financieel-kompas` | `config.json` | Arbeidskorting maximum | nee | nee |
| P068 | `financieel-kompas` | `config.json` | Startpunt afbouw heffingskorting | nee | nee |
| P069 | `financieel-kompas` | `config.json` | Afbouwfactor heffingskorting | nee | nee |
| P070 | `financieel-kompas` | `config.json` | Heffingsvrij vermogen box 3, alleenstaand | nee | nee |
| P071 | `financieel-kompas` | `config.json` | Heffingsvrij vermogen box 3, partners | nee | nee |
| P072 | `financieel-kompas` | `config.json` | Forfaitair rendement box 3, enkelvoudig | nee | nee |
| P073 | `financieel-kompas` | `config.json` | Prelevements sociaux (PFU) | nee | nee |
| P074 | `financieel-kompas` | `config.json` | Schijven impot sur le revenu | nee | nee |
| P075 | `financieel-kompas` | `config.json` | Abattement 65-plus | nee | nee |
| P076 | `financieel-kompas` | `config.json` | Plafond gezinsquotient per halve part | nee | nee |
| P077 | `financieel-kompas` | `config.json` | CAK-bijdrage gemiddeld | nee | nee |
| P078 | `financieel-kompas` | `config.json` | Belgische zelfstandigenbijdrage, schijven | nee | nee |
| P079 | `financieel-kompas` | `config.json` | Belgische inkomstenbelastingschijven 2025 | nee | 2025 in sleutelnaam |
| P081 | `Vastgoedtransactie` | `calc.js` | TVA-tarief | nee | nee |
| P084 | `Vastgoedtransactie` | `calc.js` | Debours, forfaitair | nee | nee |
| P089 | `Vastgoedtransactie` | `calc.js` | Tarief prelevements sociaux | nee | nee |
| P090 | `Vastgoedtransactie` | `calc.js` | Tarief prelevements sociaux bij De Ruyter | nee | nee |
| P091 | `Vastgoedtransactie` | `calc.js` | Abattement plus-value per bezitsjaar | nee | nee |
| P094 | `Vastgoedtransactie` | `calc.js` | Houdbaarheidstermijn tarieven, actueel en controleren | nee | nee |
| P100 | `Plus-Value-Calculator` | `generate_pdf.py` | Abattement prelevements sociaux per jaar | nee | nee |
| P101 | `Plus-Value-Calculator` | `generate_pdf.py` | Abattement inkomstenbelasting, volledige vrijstelling | nee | nee |
| P102 | `Plus-Value-Calculator` | `generate_pdf.py` | Surtaxe-barema hoge meerwaarden | nee | nee |
| P103 | `Plus-Value-Calculator` | `generate_pdf.py` | Standaardtarief prelevements sociaux | nee | nee |
| P104 | `Plus-Value-Calculator` | `generate_pdf.py` | Forfait aankoopkosten | nee | nee |
| P105 | `Plus-Value-Calculator` | `generate_pdf.py` | Forfait verbouwing, vanaf 5 jaar bezit | nee | nee |
| P106 | `Plus-Value-Calculator` | `generate_pdf.py` | Tarief inkomstenbelasting plus-value | nee | nee |
| P107 | `cafeclaude` | `lib/domains/prompts/geld.ts` | Schijven impot sur le revenu 2026 (inkomsten 2025) | nee | editie 2026 in de tekst |
| P108 | `cafeclaude` | `lib/domains/prompts/geld.ts` | Decote drempels en formule | nee | nee |
| P109 | `cafeclaude` | `lib/domains/prompts/geld.ts` | Micro-BIC plafonds en abattements | nee | nee |
| P110 | `cafeclaude` | `lib/domains/prompts/geld.ts` | Urssaf-drempels verhuur | nee | PASS-jaar 2025 genoemd |
| P111 | `cafeclaude` | `lib/domains/prompts/geld.ts` | Urssaf-tariefwijziging prestations de services | nee | 1-1-2026 |
| P112 | `cafeclaude` | `lib/domains/prompts/geld.ts` | Abattement micro per categorie | nee | nee |
| P114 | `cafeclaude` | `lib/domains/prompts/geld.ts` | Prelevements sociaux, opbouw | nee | 2025 in de tekst |
| P115 | `cafeclaude` | `lib/domains/prompts/geld.ts` | IFI-drempel | nee | nee |
| P116 | `cafeclaude` | `lib/domains/prompts/geld.ts` | PFU totaal | nee | nee |
| P117 | `cafeclaude` | `lib/domains/prompts/geld.ts` | Boete niet-aangifte buitenlandse rekening (formulier 3916) | nee | nee |
| P118 | `cafeclaude` | `lib/domains/prompts/verzekeren.ts` | Base de remboursement consult medecin traitant secteur 1 | nee | sinds november 2024 |
| P119 | `cafeclaude` | `lib/domains/prompts/verzekeren.ts` | Forfait journalier hospitalier | nee | sinds 1 maart 2026 |
| P120 | `cafeclaude` | `lib/domains/prompts/verzekeren.ts` | Woonlandfactor Frankrijk en nominale Zvw-bijdrage | nee | 2026 |
| P121 | `cafeclaude` | `lib/domains/prompts/verzekeren.ts` | Bonus-malus auto (CRM) | nee | nee |
| P122 | `cafeclaude` | `lib/domains/prompts/verzekeren.ts` | Participation forfaitaire en franchise medisch transport | nee | 2026 |
| P123 | `cafeclaude` | `lib/domains/prompts/wonen.ts` | Frais de notaire | nee | nee |
| P124 | `cafeclaude` | `lib/domains/prompts/wonen.ts` | Plus-value tweede woning | nee | nee |
| P125 | `cafeclaude` | `lib/domains/prompts/wonen.ts` | Reserve hereditaire | nee | nee |
| P126 | `cafeclaude` | `lib/domains/prompts/wonen.ts` | Droits de succession, vrijstellingen en tarieven | nee | nee |
| P127 | `cafeclaude` | `lib/domains/prompts/wonen.ts` | Hernieuwingstermijn schenkingsvrijstelling | nee | nee |
| P128 | `cafeclaude` | `lib/domains/prompts/zorg.ts` | Vergoeding zonder medecin traitant | nee | nee |
| P129 | `cafeclaude` | `lib/domains/prompts/zorg.ts` | Vergoeding HAD en infirmiere liberale | nee | nee |
| P130 | `cafeclaude` | `lib/domains/prompts/zorg.ts` | Teleassistentie, maandprijs | nee | nee |
| P131 | `cafeclaude` | `lib/domains/prompts/zorg.ts` | Mandat de protection future, kosten | nee | nee |
| P132 | `cafeclaude` | `lib/domains/prompts/zorg.ts` | Rechterlijke beschermingsmaatregel: doorlooptijd en kosten | nee | nee |
| P133 | `cafeclaude` | `lib/domains/prompts/bureaucratie.ts` | Frans rijbewijs halen, gemiddelde kosten | nee | nee |
| P134 | `cafeclaude` | `lib/domains/prompts/bureaucratie.ts` | NL paspoort verlengen in Frankrijk | nee | 2025 |
| P135 | `cafeclaude` | `lib/audit/prompts/ondernemen.ts` | Micro-plafonds per categorie | nee | nee |
| P136 | `cafeclaude` | `lib/audit/prompts/ondernemen.ts` | ACRE: reductie en duur | nee | 1 juli 2026 |
| P137 | `cafeclaude` | `lib/audit/prompts/ondernemen.ts` | LMP-drempel | nee | nee |
| P139 | `cafeclaude` | `lib/audit/prompts/zorg.ts` | Franchise medicale en participation forfaitaire | nee | verdubbeling per 1 mei 2024 genoemd |
| P140 | `cafeclaude` | `lib/audit/prompts/ondernemen.ts` | CVAE-drempel | nee | afschaffing uitgesteld naar 2030 |
| P141 | `energieportaal` | `engine/dpe.js` | Graaddagen en referentietemperatuur per klimaatzone | nee | nee |
| P143 | `energieportaal` | `engine/dpe.js` | CO2-emissiefactoren per energiedrager | nee | nee |
| P144 | `energieportaal` | `engine/dpe.js` | DPE-klassegrenzen energie en CO2 | nee | nee |
| P145 | `energieportaal` | `engine/engine.js` | PV-opbrengst per klimaatzone | nee | nee |
| P146 | `energieportaal` | `engine/engine.js` | Standaard energieprijzen gebruikersinvoer | nee | nee |
| P147 | `energieportaal` | `engine/engine.js` | Omrekening naar kWh per eenheid | nee | nee |
| P148 | `energieportaal` | `engine/engine.js` | U-waarden per isolatieniveau | nee | nee |
| P150 | `energieportaal` | `api/prices.js` | Verouderingsdrempel prijzen | nee | nee |
| P151 | `if-mobiel` | `engine/dpe.js en engine/engine.js` | Identieke kopie van de energie-engine van energieportaal | nee | nee |
| P152 | `warmteverlies-calculator` | `engine/engine.js` | Graaddagen, koeldagen, zwembadtemperatuur per zone | nee | nee |
| P153 | `warmteverlies-calculator` | `engine/engine.js` | PV-opbrengst per zone | nee | nee |
| P154 | `warmteverlies-calculator` | `engine/engine.js` | Apparaatverbruik per jaar | nee | nee |
| P155 | `warmteverlies-calculator` | `engine/engine.js` | Standaardprijzen en omrekenfactoren | nee | nee |
| P156 | `warmteverlies-calculator` | `engine/engine.js` | U-waarden per isolatieniveau | nee | nee |
| P157 | `Energiecalculator-Frankrijk-door-Nederlanders.fr` | `script.js` | Graaddagen en zwembadtemperatuur per zone | nee | nee |
| P158 | `Energiecalculator-Frankrijk-door-Nederlanders.fr` | `script.js` | PV-opbrengst per zone | nee | nee |
| P159 | `Energiecalculator-Frankrijk-door-Nederlanders.fr` | `script.js` | Apparaatverbruik per jaar | nee | nee |
| P160 | `Energiecalculator-Frankrijk-door-Nederlanders.fr` | `script.js` | Standaardprijzen en omrekenfactoren | nee | nee |
| P161 | `Energiecalculator-Frankrijk-door-Nederlanders.fr` | `script.js` | U-waarden per isolatieniveau | nee | nee |
| P165 | `erf-en-schenkingsrecht-nl-fr` | `app.js` | Extra vrijstelling geldschenking | nee | nee |
| P166 | `gitekompas-fr` | `index.html` | Micro-BIC per activiteitstype | nee | nee |
| P167 | `gitekompas-fr` | `index.html` | Degressieve reeks per bezitsjaar | nee | nee |
| P168 | `gitekompas-fr` | `index.html` | Minimumheffing niet-residenten, bandbreedte | nee | nee |
| P169 | `zorgkompas-frankrijk` | `scenarios.js` | Base de remboursement consult huisarts | nee | 2025 in de kop van het bestand |
| P170 | `zorgkompas-frankrijk` | `scenarios.js` | Base de remboursement kinesitherapie per sessie | nee | 2025 |
| P171 | `zorgkompas-frankrijk` | `scenarios.js` | Base de remboursement specialist (APC) | nee | 2025 |
| P172 | `zorgkompas-frankrijk` | `scenarios.js` | Forfait journalier ziekenhuis | nee | 2025 |
| P173 | `zorgkompas-frankrijk` | `scenarioEngine.js` | Standaard vergoedingspercentage Secu | nee | nee |
| P174 | `zorgkompas-frankrijk` | `scenarioEngine.js` | Vergoeding kine en medicatie | nee | nee |
| P175 | `zorgkompas-frankrijk` | `scenarioEngine.js` | Vergoeding zonder parcours de soins | nee | nee |
| P182 | `briefhulp-fr` | `cache/werkgever/factuur/niveau-3.json` | Forfaitaire incassokosten | nee | nee |
| P184 | `briefhulp-fr` | `cache/buur/erfgrens/niveau-1.json` | Kosten bornage amiable | nee | nee |
| P185 | `briefhulp-fr` | `KLIKSTROMEN.md` | Boete per maand vertraging | nee | nee |
| P199 | `energiebesparing-subsidie-en-fiscale-regelingen` | `script.js` | Btw-tarief energetische renovatiewerken | nee | simple mention sinds 1 maart 2025 |
| P200 | `energiebesparing-subsidie-en-fiscale-regelingen` | `script.js` | Ouderdomsgrens woning voor verlaagd tarief en Eco-PTZ | nee | nee |
| P201 | `energiebesparing-subsidie-en-fiscale-regelingen` | `index.html` | MaPrimeRenov-bedrag in de tekst | nee | 2026 in de pagina |
| P202 | `woningzoeker-frankrijk` | `components/steps/StepBudget.tsx` | Notariskosten als percentage van de aankoopprijs | nee | nee |
| P203 | `if-tools-api` | `src/app/api/woning-analyse/route.ts` | Frais de notaire in de AI-prompt | nee | nee |
| P204 | `nlfr-ai-agent` | `knowledge/experts/energieportaal-ai-adviseur.md` | Energie-inhoud hout per stere | nee | nee |
| P205 | `nlfr-ai-agent` | `knowledge/experts/energieportaal-ai-adviseur.md` | Eco-PTZ maximum en btw-tarief renovatie | nee | nee |
| P206 | `nlfr-ai-agent` | `knowledge/experts/energieportaal-ai-adviseur.md` | MaPrimeRenov budget en achterstand | nee | 2026 |
| P207 | `nlfr-ai-agent` | `knowledge/experts/energieportaal-ai-adviseur.md` | Richtprijzen renovatiemaatregelen | nee | nee |
| P208 | `nlfr-ai-agent` | `knowledge/experts/energieportaal-ai-adviseur.md` | Besparing per graad lagere binnentemperatuur | nee | nee |
| P209 | `ouderenzorg-fr` | `if-dossier/dossier-skelet.md` | APA-bedrag per maand | nee | indicatief 2026 |
| P210 | `ouderenzorg-fr` | `if-dossier/dossier-skelet.md` | ASPA maximum alleenstaand | nee | indicatief 2026 |
| P211 | `ouderenzorg-fr` | `if-dossier/dossier-skelet.md` | Credit d'impot hulp aan huis en plafond | nee | indicatief 2026 |
| P212 | `ouderenzorg-fr` | `if-dossier/dossier-skelet.md` | MaPrimeAdapt maximum | nee | indicatief 2026 |
| P213 | `taalhulp-fr` | `begrippen.js` | PFU als vlaktaks | nee | nee |
| P214 | `taalhulp-fr` | `begrippen.js` | Prelevements sociaux over beleggingsinkomsten | nee | nee |
| P215 | `dossierfrankrijk` | `lib/embedTree.ts` | Mandat de protection future, kosten | nee | nee |
| P216 | `dossierfrankrijk` | `lib/embedTree.ts` | Rechterlijke beschermingsmaatregel, kosten | nee | nee |
| P217 | `dossierfrankrijk` | `lib/embedTree.ts` | Repatriering naar Nederland | nee | nee |
| P218 | `dossierfrankrijk` | `lib/embedTree.ts` | Rekenvoorbeeld ouderenzorg | nee | nee |
| P219 | `bouwvergunningwijzer-frankrijk` | `docs/rule-matrix-v0.1.md` | Oppervlaktedrempels vrijstaand bijgebouw | nee | nee |
| P220 | `bouwvergunningwijzer-frankrijk` | `docs/rule-matrix-v0.1.md` | Oppervlaktedrempels uitbreiding | nee | nee |
| P221 | `infofrankrijk-routecontrole` | `components/vervoershub.tsx` | Aannames reiskostenraming | nee | nee |
| P222 | `infofrankrijk-routecontrole` | `components/passport-wizard.tsx` | Huurbandbreedte 9-persoonsbus | nee | nee |
| P223 | `erfrecht-en-testament` | `index.html` | Tarief erfbelasting stiefkind | nee | nee |
| P224 | `erfrecht-en-testament` | `index.html` | Vrijstelling stiefkinderen | nee | nee |
| P225 | `erfrecht-en-testament` | `index.html` | Barema en abattement bij adoption simple | nee | nee |
| P229 | `gasdossier-stillewille` | `gas-historie.html` | Historische gasprijzen en verbruikscijfers uit een individueel dossier | nee | nee |
| P230 | `klussen-in-frankrijk-christian-von-klosterlein` | `app/artikelen/water-riool-batch-data.json` | Technische percentages water en riool | nee | nee |
| P233 | `Aankoop-kompas-voor-franse-huizen-in-frankrijk` | `src/App.jsx` | Marktprijs per m2 en technische waarde | nee | nee |
