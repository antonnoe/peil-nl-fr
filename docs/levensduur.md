# Levensduur van parameters

Peil houdt per grootheid twee levensduren bij, omdat het twee verschillende vragen zijn.

**Levensduur A** is hoe vaak de waarde verandert: de aanpassingsfrequentie, de datum van de laatste wijziging en de wijzigingshistorie. Dit bepaalt hoe snel een tool achterloopt.

**Levensduur B** is hoe lang de grootheid als zodanig bestaat: wanneer zij is ingevoerd, of zij is vervallen en door welke grootheid zij is opgevolgd. Dit bepaalt of een tool nog met iets rekent dat er niet meer is.

Een grootheid kan lang bestaan en toch elk jaar veranderen, zoals het heffingsvrij vermogen in box 3. Een grootheid kan ook kort bestaan en nooit veranderen, zoals een eenmalige overgangsdrempel. Een enkel begrip houdbaarheid dekt die twee gevallen niet.

## Wat uit het register zelf komt

De cijfers hieronder zijn geteld over de 210 parameters in `data/register.json` op peildatum 16 september 2026. Zij zeggen iets over wat Peil weet, niet over de werkelijkheid: de aanpassingsfrequentie is per parameter ingevuld op grond van de regeling waaronder de grootheid valt, en die invulling is zelf nog niet tegen een primaire bron getoetst.

| Categorie | Parameters | Jaarlijks of vaker aangepast | Invoeringsdatum bekend | Vervallen |
|---|---|---|---|---|
| NL fiscaal | 36 | 35, 97 procent | 0 | 0 |
| NL sociaal | 8 | 8, 100 procent | 0 | 0 |
| FR fiscaal | 71 | 20, 28 procent | 6 | 0 |
| FR sociaal | 21 | 11, 52 procent | 1 | 0 |
| Grensoverschrijdend | 14 | 3, 21 procent | 1 | 1 |
| Vastgoedtransactiekosten | 40 | 9, 23 procent | 0 | 0 |
| Overheidsgekaderde verzekeringen | 22 | 4, 18 procent | 0 | 0 |

Van 24 parameters is een eerdere waarde vastgelegd, vrijwel allemaal uit de voorganger `financieel-kompas`. Van 36 parameters is een datum van laatste wijziging bekend die binnen de laatste vijf jaar valt. Van 8 parameters is een invoeringsdatum bekend. Van 1 parameter is vastgelegd dat zij is vervallen en door welke grootheid zij is opgevolgd: de oude forfaitaire CAK-benadering van 4.500 euro per jaar, opgevolgd door de opgebouwde berekening met woonlandfactor.

## Wat het register nog niet weet

De gemiddelde en mediane bestaansduur per categorie kan Peil niet uit zijn eigen gegevens berekenen. Daarvoor is van te weinig grootheden een invoeringsdatum bekend: 8 van de 210, en die acht liggen allemaal in Frankrijk. Een gemiddelde over acht waarnemingen uit een enkel land zegt niets over de zeven categorieën. Peil publiceert dat getal daarom niet.

Hetzelfde geldt voor het aandeel geboren en gestorven in de laatste vijf jaar. Uit de gegevens blijkt alleen dat er in die periode twee grootheden zijn bijgekomen, de terugname van afschrijvingen bij gemeubileerde verhuur per 15 februari 2025 en het prélèvement de solidarité in zijn huidige vorm per 2019, en dat er een is vervallen. Dat is geen steekproef maar een toevallige vangst van wat in de repo's stond.

## Indicatief beeld, te verifiëren

Wat volgt is een inschatting uit eigen kennis van het gebied. Het staat hier omdat de opdracht om een beeld per categorie vraagt, en het staat er nadrukkelijk als **indicatief, te verifiëren**. In het register zelf staan geen aannames: daar heeft iedere waarde een bron of geen waarde.

- **NL fiscaal.** Indicatief, te verifiëren: vrijwel alles verandert jaarlijks per 1 januari, de bestaansduur van de grootheden zelf is lang, orde tien tot dertig jaar. Box 3 is de uitzondering: de forfaitaire rendementen zijn sinds 2023 meermalen van vorm veranderd en de hele grondslag staat op de nominatie om te worden vervangen. De voorganger `financieel-kompas` rekende nog met een enkel forfaitair rendement, de huidige versie met drie. Dat is binnen twee edities een structuurwijziging, geen tariefwijziging.
- **NL sociaal.** Indicatief, te verifiëren: percentages en maximumbijdrage-inkomens veranderen jaarlijks, de grootheden zelf bestaan sinds de invoering van de Zvw in 2006 en de Wlz in 2015. De AOW-bedragen veranderen twee keer per jaar, met het wettelijk minimumloon.
- **FR fiscaal.** Indicatief, te verifiëren: het barema van de impôt sur le revenu wordt jaarlijks geïndexeerd, maar de tarieven zelf, 0, 11, 30, 41 en 45 procent, liggen al sinds 2015 vast. De abattements bewegen mee met de indexatie. De vastgoedgerelateerde heffingen bewegen nauwelijks: het tarief van 19 procent op de meerwaarde staat sinds 2011 en de degressieve aftrek sinds 2013. De IFI bestaat sinds 2018 en verving de ISF; dat is de duidelijkste sterfte en geboorte van het gebied.
- **FR sociaal.** Indicatief, te verifiëren: de CSG-tarieven bewegen zelden, de RFR-grenzen die bepalen welk tarief geldt bewegen jaarlijks. De cotisations voor micro-entrepreneurs zijn het meest beweeglijk: het tarief voor prestations de services ging per 1 januari 2026 van 12,3 naar 21,2 procent, een verhoging van bijna driekwart in een keer.
- **Grensoverschrijdend.** Indicatief, te verifiëren: de woonlandfactor verandert jaarlijks en beweegt in de orde van een half procent per jaar, van 0,8251 in 2025 naar 0,8304 in 2026. De verdragsartikelen zelf bestaan sinds 1973 en zijn nooit gewijzigd; de kans dat dat in de komende jaren wel gebeurt is reeel, want er wordt over een opvolger onderhandeld. Dat is de langste levensduur B van het hele register en tegelijk het grootste risico, omdat een enkel nieuw verdrag in een klap alle grensoverschrijdende rekenregels raakt.
- **Vastgoedtransactiekosten.** Indicatief, te verifiëren: de emolumenten van de notaris worden per arrêté vastgesteld en gelden telkens twee jaar; de huidige reeks loopt tot 29 februari 2028. De départementale DMTO-tarieven veranderen jaarlijks, maar de verhoging die 89 departementen in 2025 hebben doorgevoerd is tijdelijk en loopt af op 31 maart 2028. Dat is een ongewoon harde einddatum en tegelijk de grootste voorspelbare kanteling in dit deel van het register.
- **Overheidsgekaderde verzekeringen.** Indicatief, te verifiëren: de tarieven van de assurance maladie bewegen onregelmatig, bij een nieuwe convention médicale, en dan in stappen van enkele euro's. De franchises en participations forfaitaires zijn in 2024 verdubbeld; dat was de eerste wijziging in jaren.

## Wat dit betekent voor de ijkmomenten

Uit de tabel volgt de indeling van de ijkkalender. Het Nederlandse deel van het register verandert bijna volledig per 1 januari en is half december bekend: daar hoort een ijkmoment half december. Het Franse deel verandert voor een kwart jaarlijks, maar de fiches waarin die wijzigingen leesbaar worden verschijnen pas in het voorjaar: daar hoort een ijkmoment half april.

De categorieën die daarbuiten vallen, vastgoedtransactiekosten en overheidsgekaderde verzekeringen, bewegen onregelmatig. Voor die twee is een ijkmoment weinig waard; daar werkt Peil met de aangekondigde wijziging en met de einddatum van de geldigheid. Beide velden staan in het schema en beide voeden de waarschuwing `gaat_veranderen` zodra de datum binnen negentig dagen ligt.
