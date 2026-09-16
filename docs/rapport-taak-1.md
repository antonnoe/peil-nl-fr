# Eindrapport taak 1, register, schema, openbare interface en statische API

Peildatum 16 september 2026. Versie 1.0.0. Alles op `main`.

## 1. Aantallen

**Per status**

| Status | Aantal |
|---|---|
| vastgesteld | 52 |
| raming | 1 |
| te verifieren | 156 |
| vervallen | 1 |
| **totaal** | **210** |

**Per land**

| Land | Aantal |
|---|---|
| Frankrijk | 148 |
| Nederland | 48 |
| grensoverschrijdend | 14 |

**Per lastensoort**

| Lastensoort | Aantal |
|---|---|
| fiscaal | 112 |
| overig, transactiekosten | 40 |
| sociaal | 36 |
| verzekering, overheidsgekaderd | 22 |

**Per variabiliteitsklasse**

| Klasse | Aantal |
|---|---|
| overheid_vastgesteld | 183 |
| indicatief | 19 |
| afgeleid | 4 |
| marktindex | 3 |
| gebruikersinvoer | 1 |
| contractueel | 0 |

**Overig**

| | Aantal |
|---|---|
| Parameters die een tool daadwerkelijk gebruikt | 162 |
| Kandidaten, nog door geen tool gebruikt | 48 |
| Afwijkend tussen tools | 10 |
| Rekenregels, laag 2 | 8 |
| Duidingsregels, laag 1 | 0 |
| Documenten | 0 |

**Waarschuwingen in `peil/state.json`**

| Niveau | Aantal |
|---|---|
| rood | 122 |
| oranje | 1 |
| grijs | 0, als losse waarschuwing |

| Soort | Aantal |
|---|---|
| verouderd | 112 |
| afwijkend | 10 |
| gaat_veranderen | 1 |
| veranderd | veld aanwezig, leeg |

Van de 112 verouderd-waarschuwingen komen er 110 doordat een tool rekent met een waarde die geen bron met verificatiedatum heeft. De overige twee zijn vastgestelde waarden waarvan de verificatie ouder is dan een jaar: het Franse successiebarema (31 juli 2025) en het schenkingsbarema (7 november 2024).

De waarschuwing `veranderd` is per parameter als leeg veld aanwezig in de API, maar staat niet als losse waarschuwing in `state.json`. Anders zouden 210 plaatshouders de 123 echte signalen wegdrukken. De Peil-run vult dit veld in taak 2.

## 2. De gatenlijst

Uit `docs/volledigheid.md`, in volgorde van gewicht.

1. **Vrijwel niets is geverifieerd.** 52 van de 210 parameters hebben status `vastgesteld`. De overige 156 hebben geen bron met verificatiedatum, en 110 daarvan worden op dit moment wel door een tool gebruikt.
2. **De Franse inkomstenbelasting is ongeverifieerd.** Het barema, het abattement voor 65-plussers, het plafond van het gezinsquotient, het PFU-tarief en de IFI staan zonder bron in de tools.
3. **De decote heeft een bron zonder datum.** Financieel Kompas noteert dat uitdrukkelijk zelf. Peil waardeert dat niet stilzwijgend op.
4. **De base de remboursement van een huisartsconsult klopt niet.** ZorgKompas rekent met 30,00 euro, Cafe Claude noemt 26,50 euro sinds november 2024.
5. **De forfait journalier loopt achter.** ZorgKompas gebruikt 20,00 euro, het handboek 23 euro sinds 1 maart 2026, met een apart bedrag voor psychiatrie.
6. **De surtaxe wordt in twee tools verschillend berekend.** Plus-Value-Calculator mist de afvlakkingsformule van art. 1609 nonies G CGI.
7. **De franchise medicale staat binnen een repo op twee waarden**, 0,50 en 1 euro.
8. **Het plafond van de credit d'impot hulp aan huis verschilt**, 12.000 tegenover 6.000 tot 10.000 euro.
9. **De energie-engine bestaat vier keer**, waarvan een byte-identieke kopie in `if-mobiel` en twee varianten met afwijkende U-waarden.
10. **De referentie-energieprijzen dragen per waarde een eigen datum**, van 2025 tot april 2026. De parameter moet worden gesplitst per energiedrager.
11. **Drie tools gebruiken een vuistregel voor de notariskosten** waar een opgebouwde berekening bestaat.
12. **De twee oudste verificaties** zijn het Franse successiebarema en het schenkingsbarema.
13. **Bij Calvados en Savoie staan bijzondere DMTO-regelingen** die uit de platte tekst van de DGFiP-tabel niet aan een kolom te koppelen zijn.
14. **Laag 1 is leeg en laag 2 is een kiem.** De negen grensoverschrijdende regels staan nu als parameter in laag 3.
15. **Het documentenregister is leeg.**
16. **Belgie is niet gedekt.** De afbakening is NL-FR.

Daarnaast zijn 46 ontbrekende grootheden aan het register toegevoegd als kandidaat met status `te_verifieren` en met een bron-URL of bronomschrijving. De zwaarste daarvan: de aanwijsregel van verordening 883/2004 en de verdragsartikelen van het verdrag NL-FR 1973, de AOW-leeftijd, de gesplitste premiepercentages volksverzekeringen, de Nederlandse erf- en schenkbelasting in haar geheel, de taxe fonciere en de taxe d habitation, de vrijstelling van de meerwaarde op het hoofdverblijf, de volledige vrijstelling van de langstlevende echtgenoot in Frankrijk, het PASS en de premie van de complementaire sante.

## 3. Tien parameters met de hoogste prioriteit voor verificatie

Berekend met `npm run rapport`. Alleen parameters met een rood signaal, gerangschikt op een score van het aantal tools plus 3 bij een afwijking, plus 2 bij fiscaal of sociaal, plus 1 wanneer de grootheid de last direct verhoogt of verlaagt.

| # | Parameter | Tools | Waarom |
|---|---|---|---|
| 1 | `p.fr.ir.credit_hulp_aan_huis_plafond` | financieel-kompas-ai, ouderenzorg-fr | 12.000 tegenover 6.000 tot 10.000 euro. Het percentage is gelijk, het plafond niet. Welke wettelijke variant bedoeld is, staat nergens |
| 2 | `p.fr.pv.surtaxe_barema` | Vastgoedtransactie, Plus-Value-Calculator | Twee implementaties van dezelfde heffing; rond de tranchegrenzen lopen de uitkomsten uiteen |
| 3 | `p.fr.succ.abattement_niet_verwanten` | cafeclaude, erfrecht-en-testament | 1.594 tegenover 15.932 euro. Het onderscheid tussen stiefkind en niet-verwante derde is bepalend en wordt niet overal gemaakt |
| 4 | `p.fr.energie.standaardprijzen_invoer` | energieportaal, if-mobiel, warmteverlies-calculator, Energiecalculator | Vier tools met invulwaarden die afwijken van de referentieprijzen met bron in dezelfde repo |
| 5 | `p.fr.energie.u_waarden_isolatieniveau` | dezelfde vier | De oudste calculator hanteert andere U-waarden voor dak, vloer en raam |
| 6 | `p.fr.notaris.vuistregel_kosten_ancien` | cafeclaude, if-tools-api, woningzoeker-frankrijk | Drie vuistregels naast een opgebouwde berekening die wel klopt |
| 7 | `p.fr.secu.forfait_journalier` | zorgkompas-frankrijk, cafeclaude | De rekentool loopt achter op het handboek en kent geen onderscheid tussen ziekenhuis en psychiatrie |
| 8 | `p.fr.secu.franchise_medicale` | cafeclaude, op twee plaatsen | Binnen een repo twee waarden voor dezelfde grootheid |
| 9 | `p.fr.energie.apparaatverbruik_per_jaar` | warmteverlies-calculator, Energiecalculator | Vier van de zeven posten wijken af en de indeling verschilt |
| 10 | `p.fr.energie.omrekenfactoren_kwh` | vijf tools | De breedst gebruikte energiegrootheid, zonder enige bron |

De score kijkt naar bereik en tegenspraak, niet naar geldbedrag. Drie parameters die de score daardoor te laag zet en die de chat er wat mij betreft bij pakt:

- `p.fr.ir.schijven`, het Franse barema. Twee tools, geen bron, en het raakt elke Franse berekening die er is.
- `p.fr.ir.decote`, met een bron zonder verificatiedatum en een rechtstreeks effect op de te betalen belasting.
- `p.fr.secu.brss_consult_medecin_traitant`, 30,00 tegenover 26,50 euro. Dit is de directste tegenspraak tussen een rekentool en een handboek van het hele register.

## 4. Site en API

De site en de API zijn gebouwd en getest. `npm test` geeft 40 geslaagde controles en 0 mislukte, waaronder schemavalidatie van alle gegevensbestanden, unieke id's, de verwijzingen tussen de drie lagen, de vier assen en beide levensduren per parameter, de regel dat er geen vastgestelde waarde zonder bron en datum bestaat, 218 pagina's op werkende interne links, 308 JSON-bestanden onder `/api/v1/` op geldigheid en op de aanwezigheid van versie, versiedatum, licentie en bronregel, de afwezigheid van externe scripts, stylesheets en fonts, en de taalregels.

**Wat nog aan moet.** GitHub Pages staat nog niet aan. De publicatieworkflow staat klaar in `.github/workflows/pages.yml` en publiceert vanuit Actions, niet vanuit een branch. Daarvoor is een instelling nodig die alleen de eigenaar van de repo kan zetten:

> GitHub, repository `antonnoe/peil-nl-fr`, **Settings**, **Pages**, onder **Build and deployment** bij **Source** kiezen voor **GitHub Actions**.

Meer is er niet nodig; de workflow doet de rest bij de eerstvolgende push naar `main` of via **Actions**, **Peil bouwen en publiceren**, **Run workflow**.

Zodra dat is gezet:

- Site: https://antonnoe.github.io/peil-nl-fr/
- API: https://antonnoe.github.io/peil-nl-fr/api/v1/index.json
- CSV: https://antonnoe.github.io/peil-nl-fr/api/v1/register.csv
- Signalen: https://antonnoe.github.io/peil-nl-fr/api/v1/state.json
- Bevroren versie 1.0.0: https://antonnoe.github.io/peil-nl-fr/api/versies/1.0.0/index.json

## 5. Wat bewust niet is gedaan, en de keuzes bij twijfel

**Niet gedaan, omdat het buiten de opdracht viel**

- De Peil-run met Haiku, de adapters per tool, de inventarisatie van de handboeken en PDF's van Cafe Claude, en de API met sleutels. Dat zijn taak 2 en taak 3. Het veld `veranderd` in `state.json` is wel aangemaakt en staat leeg klaar; de API-paden zijn zo gekozen dat er een laag met sleutels voor kan worden gezet zonder dat een pad verandert.
- Duidingsregels. Laag 1 is alleen als schema opgeleverd, zoals gevraagd. De negen grensoverschrijdende regels die eigenlijk in laag 1 horen, staan voorlopig als parameter in laag 3, met in de opmerkingen dat zij verhuizen zodra laag 1 wordt gevuld.
- Het documentenregister is leeg opgeleverd, met alleen het schema.

**Keuzes bij twijfel**

*De decote is niet vastgesteld.* Financieel Kompas noemt bij de decote een bron en zet in het veld `VERIFIE_LE` dat de bron geen datum van verificatie draagt. Dat is bron zonder datum. De harde regel zegt bron **en** datum, dus de status blijft `te_verifieren`. Dat kost een van de best onderbouwde Franse grootheden zijn groene vinkje, en dat is de bedoeling van de regel.

*"Geraadpleegd" telt als verificatiedatum, "editie 2026" niet.* Bij het CAK-blok staat `GERAADPLEEGD: 15 september 2026` met een volledige URL. Dat is een datum waarop iemand de bron heeft bekeken, dus een verificatiedatum. `EDITIE: 2026` bij de AOW-bedragen is dat niet: dat zegt alleen voor welk jaar de waarde bedoeld is.

*Waarden zonder bron zijn niet overgenomen als registerwaarde.* Van de 234 gevonden waarden staan er 156 zonder waarde in het register, met alleen de waarde die de tool gebruikt in `gebruikt_in[].waarde_in_tool`. Het register ziet er daardoor leger uit dan het aanvoelt. Dat is juist: wat er staat, klopt aantoonbaar; de rest is zichtbaar open.

*De 101 departementale DMTO-tarieven staan niet als 101 waarden.* Peil legt de verdeling vast (5,00 procent in 89 departementen, 4,50 in 11, 3,80 in 1), de bron, de peildatum en de granulariteit. De volledige tabel staat in `Vastgoedtransactie/dmto.json` en hoeft niet te worden gedupliceerd; dupliceren zou juist een tweede plek maken die kan verouderen.

*De referentie-energieprijzen zijn niet vastgesteld, ondanks een bron.* De parameter bundelt zeven energiedragers met elk een eigen peildatum, van 2025 tot april 2026. Aan zo'n bundel is geen enkele verificatiedatum te hangen zonder te doen alsof. De parameter staat op `te_verifieren` met de datums in de opmerkingen en het splitsen staat in de gatenlijst.

*Een raming staat als eigen parameter, niet als veld.* De geraamde zorgpremie van 2.143 euro heeft een eigen id, `p.nl.zorg.nominale_premie_raming`, met status `raming` en `kandidaat` op waar. Het signaal `gaat_veranderen` koppelt hem aan de vastgestelde waarde via het achtervoegsel `_raming`. Zo blijven raming en vaststelling gescheiden zonder dat het verband verloren gaat.

*Een vervallen grootheid is bewaard.* De oude forfaitaire CAK-benadering van 4.500 euro per jaar staat in het register met status `vervallen` en `opgevolgd_door` naar de opgebouwde berekening. Zo blijft zichtbaar dat de grootheid is opgevolgd en niet stilletjes verdwenen.

*De afwijking bij de surtaxe is bij een tool gemarkeerd, niet bij twee.* Vastgoedtransactie volgt de wet, Plus-Value-Calculator niet. Beide markeren zou suggereren dat het onduidelijk is welke klopt. De test controleert daarom dat een enkele markering alleen mag bij een parameter met een vastgestelde registerwaarde om van af te wijken.

*Peil houdt een bovengrens van een jaar aan op elke verificatie.* Ongeacht de aanpassingsfrequentie geldt een verificatie ouder dan een jaar als verouderd. Zonder die bovengrens zouden de twee erfrechtbaremes, met verificaties uit 2024 en 2025, groen blijven staan omdat hun tarieven zelden veranderen. Voor een openbaar register is dat te ruim.

*De build is afhankelijkheidsvrij.* De JSON Schema-validator is zelf geschreven, in `tools/lib/valideer.mjs`. Dat is meer werk dan `npm install ajv`, maar het betekent dat `npm test` en `npm run bouw` in een lege omgeving werken en dat er geen afhankelijkheid is die zelf kan verouderen. De validator dekt de deelverzameling die de schema's van Peil gebruiken; hij is met tegenvoorbeelden getest en een van die tegenvoorbeelden staat als vaste test in de suite.

*De afleiding blijft controleerbaar.* `data/register.json` is de bron van waarheid en correcties gaan daarheen. De curatietabel waaruit het bestand eenmalig is afgeleid staat in `tools/bron/`, en de workflow controleert bij elke push dat de afleiding niets verandert. Loopt dat uit de pas, dan faalt de build in plaats van dat er stilletjes twee waarheden ontstaan.
