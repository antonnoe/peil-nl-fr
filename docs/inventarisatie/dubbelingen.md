# Dubbele parameters

Peildatum 16 september 2026. Dezelfde grootheid in meer dan een repo. **Afwijkend bovenaan.**

33 dubbelingen, waarvan 18 met uiteenlopende waarden of rekenwijzen.

## Afwijkend

### D01 — Zvw inkomensafhankelijke bijdrage, laag percentage (NL)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `financieel-kompas` | `config.json` | 8 | 0,0526 |
| `financieel-kompas-ai` | `config.json` | 14 | 0,0485 |
| `financieel-kompas-ai` | `config.json` | 250 | 0,0485 |

Twee edities naast elkaar. De AI-versie noemt bron en verificatiedatum en meldt expliciet dat 0,0526 de waarde van 2025 was; de oude repo doet dat niet. Dezelfde grootheid staat in de AI-versie twee keer, in het NL-blok en in het CAK-blok.

### D02 — AOW bruto per jaar, alleenstaand en partner (NL)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `financieel-kompas` | `config.json` | 2-3 | 19500 en 13000 |
| `financieel-kompas-ai` | `config.json` | 7-8 | 19956 en 13296 |

Verschil van circa 2,3 procent. Geen van beide repo's noemt een bron of peildatum bij dit bedrag.

### D03 — Schijven impot sur le revenu (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `financieel-kompas` | `config.json` | 21 | 11497 / 29315 / 83823 / 180294 |
| `financieel-kompas-ai` | `config.json` | 157-177 | 11600 / 29579 / 84577 / 181917 |
| `cafeclaude` | `lib/domains/prompts/geld.ts` | 55 | 11600 / 29579 / 84577 / 181917 |

De AI-versie en Cafe Claude zijn onderling gelijk; de oude repo loopt een editie achter. De tarieven (0, 11, 30, 41 en 45 procent) zijn in alle drie gelijk.

### D04 — Structuur box 1 en box 3 (NL)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `financieel-kompas` | `config.json` | 10-15 | twee schijven (grens 75518), een forfaitair rendement 0,0617 |
| `financieel-kompas-ai` | `config.json` | 21-51 | drie schijven (38883 en 78426), drie rendementen (0,0128 / 0,06 / 0,027) |

Niet alleen de waarden maar ook de structuur verschilt. Een register moet hier kiezen welke vorm leidend is, anders is de grootheid niet vergelijkbaar.

### D05 — Heffingskortingen en afbouw (NL)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `financieel-kompas` | `config.json` | 11-12 | AHK 3362, arbeidskorting 5532, afbouw vanaf 24813 met factor 0,0663 |
| `financieel-kompas-ai` | `config.json` | 37-43 | AHK 3115, arbeidskorting 5685, afbouw vanaf 29736 met factor 0,06398 |

De AI-versie kent bovendien een afzonderlijke afbouw van de arbeidskorting (45592 en 0,0651) die in de oude repo ontbreekt.

### D06 — Heffingsvrij vermogen box 3 (NL)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `financieel-kompas` | `config.json` | 15 | 57684 en 115368 |
| `financieel-kompas-ai` | `config.json` | 46-47 | 59357 en 118714 |

Verschil van circa 2,9 procent, opnieuw een editieverschil.

### D07 — Abattement 65-plus en plafond gezinsquotient (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `financieel-kompas` | `config.json` | 22-24 | 17200 / 2746 / 27670 / 1373 en plafond 1759 |
| `financieel-kompas-ai` | `config.json` | 180-188 | 17510 / 2796 / 28170 / 1398 en plafond 1807 |

Editieverschil. Geen van beide noemt hier een bron.

### D08 — Forfait journalier hospitalier (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `zorgkompas-frankrijk` | `scenarios.js` | 100 en 155 | 20,00 euro per dag |
| `cafeclaude` | `lib/domains/prompts/verzekeren.ts` | 60 | 23 euro per dag ziekenhuis, 17 euro psychiatrie |

ZorgKompas gebruikt een tarief 2024/2025 en kent geen onderscheid tussen ziekenhuis en psychiatrie. Cafe Claude noemt 1 maart 2026 als ingangsdatum. De rekentool loopt dus achter op het handboek.

### D09 — Base de remboursement consult huisarts (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `zorgkompas-frankrijk` | `scenarios.js` | 19-21 | 30,00 euro |
| `cafeclaude` | `lib/domains/prompts/verzekeren.ts` | 59 | 26,50 euro, sinds november 2024 |

Twee verschillende bedragen voor dezelfde grootheid, allebei zonder primaire bronverwijzing. Dit is de meest directe tegenspraak tussen een rekentool en een handboek.

### D10 — Franchise medicale en participation forfaitaire (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `cafeclaude` | `lib/audit/prompts/zorg.ts` | 67-68 | 0,50 euro per medicijn, 2 euro per consult |
| `cafeclaude` | `lib/audit/prompts/zorg.ts` | 146-147 | oude waarden 1 euro consult en 0,50 euro per doosje, verdubbeld per 1 mei 2024 |
| `cafeclaude` | `lib/domains/prompts/verzekeren.ts` | 117 | 2,00 euro per artsbezoek |

Binnen een repo staan de franchise per doosje op 0,50 en op 1 euro. Regel 146-147 beschrijft de verdubbeling van 0,50 naar 1 euro, regel 67-68 hanteert nog 0,50. Een van beide is verouderd.

### D11 — Surtaxe hoge meerwaarden, rekenwijze (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `Vastgoedtransactie` | `calc.js` | 245-255 | tranches met afvlakkingsformule: 60000, 110000, 160000, 210000, 260000 |
| `Plus-Value-Calculator` | `generate_pdf.py` | 58-63 | rechte tranches zonder afvlakking: 50000, 100000, 150000, 200000, 250000 |

Zelfde heffing, twee verschillende implementaties. De afvlakkingsformule uit art. 1609 nonies G CGI ontbreekt in de Python-versie, waardoor de uitkomsten rond de tranchegrenzen uiteenlopen.

### D12 — Notariskosten bij aankoop bestaande bouw (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `cafeclaude` | `lib/domains/prompts/wonen.ts` | 46 | 7 tot 8 procent ancien, 2 tot 3 procent neuf |
| `if-tools-api` | `src/app/api/woning-analyse/route.ts` | 52 | circa 7 tot 8 procent bij bestaande bouw |
| `woningzoeker-frankrijk` | `components/steps/StepBudget.tsx` | 52 | circa 8 procent, zonder onderscheid |
| `Vastgoedtransactie` | `calc.js en dmto.json` | geheel | opgebouwd uit emolumenten, DMTO per departement, taxe communale en frais d'assiette |

Vier verschillende aanpakken voor dezelfde vraag. Vastgoedtransactie rekent de kosten daadwerkelijk op; de andere drie gebruiken een vuistregel. De vuistregel van 8 procent zonder onderscheid tussen nieuwbouw en bestaande bouw is de zwakste.

### D13 — Standaard energieprijs elektriciteit (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `energieportaal` | `engine/engine.js` | 26 | 0,25 EUR per kWh als invulwaarde |
| `energieportaal` | `api/prices.js` | 15 | 0,194 EUR per kWh, CRE TRV Base 6 kVA TTC, februari 2026 |

Binnen dezelfde repo staan een invulwaarde en een referentiewaarde met bron naast elkaar. Dat is verdedigbaar zolang duidelijk is welke waar geldt, maar een register moet ze uit elkaar houden.

### D14 — Standaard propaanprijs (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `energieportaal` | `engine/engine.js` | 26 | 1,80 EUR per liter |
| `energieportaal` | `api/prices.js` | 20 | 1,90 EUR per liter, DGEC Pegase GPL, Q1 2026 |
| `warmteverlies-calculator` | `engine/engine.js` | 26 | 1,80 EUR per liter |
| `Energiecalculator-Frankrijk-door-Nederlanders.fr` | `script.js` | 8 | 1,80 EUR per liter |

De referentiewaarde is bijgewerkt, de invulwaarden in drie repo's niet.

### D15 — U-waarden per isolatieniveau (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `energieportaal` | `engine/engine.js` | 62-66 | dak 3,0 / 0,5 / 0,25 / 0,15; vloer 2,2 / 1,2 / 0,8 / 0,3; raam 5,5 / 2,8 / 1,6 / 1,0 |
| `warmteverlies-calculator` | `engine/engine.js` | 63-66 | identiek aan energieportaal |
| `Energiecalculator-Frankrijk-door-Nederlanders.fr` | `script.js` | 15 | dak 3,0 / 0,5 / 0,2 / 0,1; vloer 1,2 / 0,5 / 0,3 / 0,18; raam 5,8 / 2,9 / 1,7 / 0,8 |

De oudste versie hanteert andere U-waarden voor dak, vloer en raam. Alleen de muurwaarden zijn in alle drie gelijk. Als de oude calculator nog ergens is ingebed, geeft hij andere uitkomsten.

### D16 — Apparaatverbruik per jaar (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `warmteverlies-calculator` | `engine/engine.js` | 17-23 | vaatwasser 160, tv 120, IT 150, verlichting 180 |
| `Energiecalculator-Frankrijk-door-Nederlanders.fr` | `script.js` | 6 | vaatwasser 180, tv 100, IT 100, verlichting 200, plus een aparte oven 120 |

Vier van de zeven posten wijken af en de indeling verschilt. Koelkast (250) en wassen (220) zijn gelijk.

### D17 — Plafond credit d'impot hulp aan huis (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `financieel-kompas-ai` | `config.json` | 246 | 12000 euro per jaar |
| `ouderenzorg-fr` | `if-dossier/dossier-skelet.md` | 127 | 6000 tot 10000 euro per jaar |

Het percentage (50) is gelijk, het plafond niet. Het wettelijke plafond kent verhogingen per kind of bij handicap; welke variant hier bedoeld is, staat er niet bij.

### D18 — Vrijstelling erfbelasting niet-verwanten en stiefkinderen (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `cafeclaude` | `lib/domains/prompts/wonen.ts` | 56 | niet-verwanten 60 procent na 1594 euro vrijstelling |
| `erfrecht-en-testament` | `index.html` | 351 | stiefkinderen verhoogd van 1594 naar 15932 euro |
| `erfrecht-en-testament` | `index.html` | 554 | partner zonder huwelijk of PACS: vrijstelling 1594 euro |

Twee bedragen voor wat op het eerste gezicht dezelfde categorie is. Het onderscheid tussen stiefkind en niet-verwante derde is bepalend en wordt niet overal gemaakt.

## Gelijk

### D19 — Prelevements sociaux op vermogen (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `financieel-kompas` | `config.json` | 19 | 0,172 |
| `financieel-kompas-ai` | `config.json` | 80 | 0,172 |
| `Vastgoedtransactie` | `calc.js` | 157 | 17,2 |
| `Plus-Value-Calculator` | `generate_pdf.py` | 87 | 0,172 |
| `cafeclaude` | `lib/domains/prompts/geld.ts` | 108 | 17,2 |
| `taalhulp-fr` | `begrippen.js` | 693 | 17,2 |

Zes repo's, dezelfde waarde. De meest verspreide parameter van het hele netwerk en daarmee de eerste kandidaat voor het register.

### D20 — Prelevement de solidarite (De Ruyter) (grensoverschrijdend)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `financieel-kompas-ai` | `config.json` | 82 | 0,075 |
| `Vastgoedtransactie` | `calc.js` | 158 | 7,5 |
| `cafeclaude` | `lib/domains/prompts/geld.ts` | 107-108 | 7,5 |
| `briefhulp-fr` | `cache/belasting/bezwaar/niveau-1.json` | 58 | 7,5 |

Vier repo's, dezelfde waarde. Alleen briefhulp-fr en cafeclaude noemen de juridische grondslag erbij.

### D21 — Tarief inkomstenbelasting plus-value en forfaits (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `Vastgoedtransactie` | `calc.js` | 153-156 | 19,0 procent; forfait aankoop 7,5; forfait verbouwing 15,0 |
| `Plus-Value-Calculator` | `generate_pdf.py` | 113-127 | 0,19; 0,075; 0,15 |
| `cafeclaude` | `lib/domains/prompts/wonen.ts` | 47 | 19 procent |

Gelijk. Alleen Vastgoedtransactie noemt de CGI-artikelen.

### D22 — Abattement plus-value per bezitsjaar (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `Vastgoedtransactie` | `calc.js` | 235-239 | IB 6,0 en 4,0 in jaar 22; PS 1,65 / 1,60 / 9,0 |
| `Plus-Value-Calculator` | `generate_pdf.py` | 51-53 | PS 1,65 / 1,6 / 9,0 |

Gelijk. De Python-versie rekent de inkomstenbelastingkant met een andere hulpfunctie maar komt op dezelfde volledige vrijstelling na 22 jaar uit.

### D23 — Micro-BIC abattements en plafonds verhuur (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `cafeclaude` | `lib/domains/prompts/geld.ts` | 67-69 | 15000 bij 30 procent; 77700 bij 50 procent |
| `gitekompas-fr` | `index.html` | 864-867 | 15000 bij 30 procent; 77700 bij 50 procent |
| `financieel-kompas-ai` | `config.json` | 185-186 | abattement 0,5 diensten en 0,3 verhuur, zonder plafond |

De eerste twee zijn gelijk. Financieel Kompas kent wel de abattements maar niet de omzetplafonds, waardoor het de grens niet bewaakt.

### D24 — Woonlandfactor Frankrijk en nominale Zvw-bijdrage (grensoverschrijdend)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `financieel-kompas-ai` | `config.json` | 248-249 | 0,8304 en 1884 euro per jaar |
| `cafeclaude` | `lib/domains/prompts/verzekeren.ts` | 79 | 0,8304 en 157,00 euro per maand |

Gelijk; 157,00 maal 12 is 1884. Alleen de AI-versie noemt de CAK-pagina en de raadpleegdatum.

### D25 — Klimaatzones, graaddagen en PV-opbrengst (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `energieportaal` | `engine/dpe.js en engine/engine.js` | 28-33 en 14 | HDD 1400 / 1900 / 2200 / 2500 / 2800 / 3400; PV 1450 / 1250 / 1150 / 1200 / 1150 / 1100 |
| `if-mobiel` | `engine/dpe.js en engine/engine.js` | idem | byte-identiek |
| `warmteverlies-calculator` | `engine/engine.js` | 6-14 | identiek |
| `Energiecalculator-Frankrijk-door-Nederlanders.fr` | `script.js` | 4-5 | identiek |

Vier repo's, identieke waarden. if-mobiel bevat een byte-identieke kopie van de hele engine van energieportaal; dat is een kopie, geen verwijzing.

### D26 — Omrekenfactoren naar kWh (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `energieportaal` | `engine/engine.js` | 28 | gas 10, fioul 10, pellet 5, hout 1800, propaan 7,1, petroleum 10 |
| `warmteverlies-calculator` | `engine/engine.js` | 28 | identiek |
| `Energiecalculator-Frankrijk-door-Nederlanders.fr` | `script.js` | 10 | identiek |
| `nlfr-ai-agent` | `knowledge/experts/energieportaal-ai-adviseur.md` | 156 | hout 1800 kWh per stere |

Gelijk. Het kennisbestand van de AI-adviseur herhaalt de waarde uit de engine en noemt die expliciet als de waarde die de tool gebruikt.

### D27 — Btw-tarief Frankrijk, algemeen (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `Vastgoedtransactie` | `calc.js` | 104 | 20,0 |
| `ca-btw-oss-tool` | `lib/regels.ts` | 62 en 180 | 20 |

Gelijk. Alleen de btw-tool noemt de bron en de datum waarop de regelset is vastgesteld.

### D28 — PFU, tarief inkomstenbelastingdeel (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `financieel-kompas` | `config.json` | 23 | 0,128 |
| `financieel-kompas-ai` | `config.json` | 187 | 0,128 |
| `cafeclaude` | `lib/domains/prompts/geld.ts` | 143 | 12,8 procent, totaal 30 procent |
| `taalhulp-fr` | `begrippen.js` | 692 | 30 procent |

Gelijk.

### D29 — IFI-drempel en schijven (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `financieel-kompas` | `config.json` | 28 | drempel 1300000; schijven 800000 tot 10000000 |
| `financieel-kompas-ai` | `config.json` | 217-242 | identiek |
| `cafeclaude` | `lib/domains/prompts/geld.ts` | 110 | drempel 1,3 miljoen |

Gelijk; het enige blok in Financieel Kompas dat tussen de twee edities niet is gewijzigd.

### D30 — Sociale lasten Frankrijk per inkomenssoort (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `financieel-kompas` | `config.json` | 19 | pensioen 0,091; salaris 0,22; winst 0,212 |
| `financieel-kompas-ai` | `config.json` | 76-79 | identiek |

Gelijk. De AI-versie splitst de 0,091 voor pensioen bovendien uit naar vier CSG-regimes; de oude versie kent alleen het normale tarief.

### D31 — Btw-tarief energetische renovatie (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `energiebesparing-subsidie-en-fiscale-regelingen` | `script.js` | 193-206 | 5,5 procent, naast 10 procent |
| `nlfr-ai-agent` | `knowledge/experts/energieportaal-ai-adviseur.md` | 234 | 5,5 procent bij RGE-installateur |

Gelijk.

### D32 — Successievrijstelling per kind per ouder (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `cafeclaude` | `lib/domains/prompts/wonen.ts` | 56 | 100000 euro |
| `erf-en-schenkingsrecht-nl-fr` | `app.js` | 1203 en 1219 | 100000 euro |
| `erfrecht-en-testament` | `index.html` | 369 | 100000 euro |

Gelijk. Alleen erf-en-schenkingsrecht noemt de bron en de verificatiedatum.

### D33 — Boete te late teruggave huurborg (FR)

| Repo | Bestand | Regel | Waarde |
|---|---|---|---|
| `briefhulp-fr` | `cache/verhuurder/borg/niveau-2.json` | 29 | 10 procent van de kale maandhuur per begonnen maand |
| `briefhulp-fr` | `cache/verhuurder/borg/niveau-3.json` | 33 en 83 | identiek |

Gelijk binnen dezelfde repo, met in beide gevallen art. 22 al. 5 loi 89-462 erbij.
