# Peil

Openbaar parameterregister NL-FR van Communities Abroad. Elke waarde met een bron, een verificatiedatum en de tools die ermee rekenen.

Site: https://antonnoe.github.io/peil-nl-fr/
API: https://antonnoe.github.io/peil-nl-fr/api/v1/index.json

## Wat Peil is

Peil doet drie dingen tegelijk.

Het is het **rekenkundige toetsingsinstrument** voor de eigen rekentools van Communities Abroad. Bij elke parameter staat welke tool hem gebruikt, op welke regel, met welke waarde, en of die waarde afwijkt van wat andere tools gebruiken.

Het is een **openbare bron** voor belastingadviseurs, notarissen en kennisdelers. Bij elke waarde hoort een kant-en-klare bronregel, en de gegevens staan onder CC BY 4.0.

Het is een **meetbron** voor Anton's Cockpit. Peil stuurt geen mails, opent geen issues en slaat geen alarm. Alle signalen staan in `peil/state.json`.

## Drie lagen

| Laag | Prefix | Wat erin staat | Stand |
|---|---|---|---|
| 3, parameters | `p.` | Losse grootheden met waarde, bron en levensduur | 210 parameters |
| 2, rekenregels | `r.` | Hoe parameters tot een uitkomst leiden, en in welke volgorde | kiem, 8 regels met testvoorbeelden |
| 1, duidingsregels | `d.` | Welke situatie geldt voordat er gerekend wordt | alleen schema |

Een id ziet eruit als `p.fr.ps.taux_global`, `r.fr.pv.surtaxe` of `d.xb.s1_status`: laagprefix, land, regeling, grootheid. Rekenregels verwijzen naar parameter-id's, duidingsregels naar rekenregels en parameters. Alle drie de lagen kennen `gebruikt_in`.

## Datamodel

Elke parameter heeft vier assen:

1. **Land**: NL, FR of XB (grensoverschrijdend).
2. **Lastensoort**: fiscaal, sociaal, verzekering_overheidsgekaderd of overig_transactiekosten.
3. **Regeling**, met haar typering: belastingtype, socialelastentype, vrijstellingstype en transactionele basis. Velden die niet van toepassing zijn staan op `null`, niet weggelaten, zodat zichtbaar blijft dat de keuze is gemaakt.
4. **Variabiliteitsklasse**: overheid_vastgesteld, marktindex, contractueel, indicatief, afgeleid of gebruikersinvoer. Elke klasse buiten `overheid_vastgesteld` heeft een verantwoordelijke en een houdbaarheidsdatum.

Daarnaast: effect, waarde met eenheid en geldigheid, status, de bronvelden, het publicatiemoment, een aangekondigde wijziging, beide levensduren, `gebruikt_in`, een testvoorbeeld, uitzonderingen en opmerkingen.

De bronvelden volgen het feitenschema van **Klussen in Frankrijk** (KIF): bron, bronurl, bronsoort met het onderscheid primair of secundair zonder stilzwijgende opwaardering, geverifieerd en geldigVanaf. Peil hernoemt die velden en vult ze aan met instantie, verificatie_door en publicatiemoment.

De statussen zijn `vastgesteld`, `raming`, `te_verifieren` en `vervallen`. Alleen `vastgesteld` krijgt een registerwaarde; wat een tool gebruikt zonder bron en datum staat als `waarde_in_tool` bij `gebruikt_in`.

## Levensduur

Peil houdt twee levensduren bij, omdat het twee vragen zijn.

**A, hoe vaak de waarde verandert**: aanpassingsfrequentie, laatste wijziging en wijzigingshistorie. Dit bepaalt hoe snel een tool achterloopt.

**B, hoe lang de grootheid bestaat**: ingevoerd, vervallen en opgevolgd door. Dit bepaalt of een tool nog met iets rekent dat er niet meer is.

De analyse per categorie staat in [`docs/levensduur.md`](docs/levensduur.md).

## IJkkalender

`data/ijkkalender.json` legt per maand vast welke parameters normaal wijzigen en welke instantie dan publiceert. Er zijn twee vaste ijkmomenten:

- **Half december**, voor Nederland en het CAK. Belastingplan, premiepercentages, heffingskortingen, zorgtoeslagpercentages en de woonlandfactor liggen dan vast voor het komende jaar.
- **Half april**, voor Frankrijk. De fiches van service-public.fr en de aangiftecampagne van impots.gouv.fr zijn dan bijgewerkt.

## API

Statisch, onder `/api/v1/`. Elk antwoord bevat versie, versiedatum, licentie CC BY 4.0 en een kant-en-klare bronregel.

`index.json`, `parameters.json`, `parameters/<id>.json`, `land/<code>.json`, `lastensoort/<soort>.json`, `regeling/<slug>.json`, `tool/<repo>.json`, `rekenregels.json`, `duidingsregels.json`, `documenten.json`, `ijkkalender.json`, `state.json`, `changelog.json` en `register.csv`.

Elke publicatie krijgt een versienummer; eerdere versies blijven opvraagbaar onder `/api/versies/<versie>/` met dezelfde padstructuur. De bevroren kopie van een afgesloten versie staat in de repo onder `bevroren/<versie>/`, omdat GitHub Pages bij elke publicatie de hele site vervangt. De paden zijn zo gekozen dat een latere laag met sleutels ze ongewijzigd kan bedienen.

## Signalen voor de Cockpit

`peil/state.json` bevat per Cockpit-onderdeel de tellingen en de waarschuwingen. Vier soorten:

- `gaat_veranderen`: een aangekondigde wijziging binnen 90 dagen, een geldigheid die binnen 90 dagen afloopt, of een raming die klaarstaat naast een vastgestelde waarde.
- `verouderd`: een verificatiedatum voorbij de houdbaarheid, een gepasseerd ijkmoment zonder nieuwe verificatie, of een tool die rekent met een niet-vastgestelde of vervallen waarde.
- `afwijkend`: tools gebruiken verschillende waarden voor dezelfde parameter.
- `veranderd`: veld aanwezig maar leeg; de Peil-run vult het in een volgende taak.

Elke waarschuwing noemt de geraakte repo's en locaties. Niveau rood zodra een tool nu met een afwijkende, verouderde of niet-vastgestelde waarde rekent.

## Harde regels

1. Elke waarde heeft een primaire bron met vindplaats en verificatiedatum.
2. Status `vastgesteld` alleen voor waarden die in een aangesloten repo aantoonbaar bron en datum hebben.
3. Raming en vaststelling strikt gescheiden.
4. Geen dode regels: elke parameter heeft `gebruikt_in` of is `kandidaat`.
5. Uitzonderingen in tekst benoemen met verwijzing naar een professional, niet modelleren.
6. Een secundaire bron wordt nooit stilzwijgend opgewaardeerd tot primair.

## Een parameter toevoegen of corrigeren

Kort: open een issue met het sjabloon `correctie parameter`, of wijzig `data/register.json` en open een pull request. Zet de status pas op `vastgesteld` als bron en verificatiedatum er allebei staan. De volledige procedure staat in [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Bouwen en testen

```
npm test     # schemavalidatie, id's, verwijzingen, taal- en accentregels, hoogte van de startpagina
npm run bouw # site en API naar dist/
```

Geen afhankelijkheden, geen `npm install`. De validator en de build staan in `tools/`.

## Inhoud van de repo

| Pad | Wat erin staat |
|---|---|
| `schema/` | JSON-schema's voor de drie lagen, het documentenregister, de ijkkalender en het signaalbestand |
| `data/register.json` | Laag 3, de parameters. Bron van waarheid |
| `data/rekenregels.json` | Laag 2, kiem |
| `data/duidingsregels.json` | Laag 1, leeg |
| `data/documenten.json` | Documentenregister, leeg |
| `data/ijkkalender.json` | Per maand de verwachte wijzigingen |
| `data/inventarisatie.json` | De inventarisatie uit taak 0 |
| `peil/state.json` | Signalen voor de Cockpit |
| `tools/` | Afleiding, build, validator |
| `bevroren/` | De API van elke afgesloten versie, zoals die toen is uitgeleverd |
| `docs/volledigheid.md` | Welke grootheden nodig zijn, en de gatenlijst |
| `docs/levensduur.md` | Levensduur per categorie |
| `docs/over-peil.md` | Doel, harde regels, licentie, correctieprocedure, API |
| `docs/rapport-taak-1.md` | Eindrapport van de bouw van dit register |
| `docs/inventarisatie/` | De rapportage uit taak 0 |

## Licentie

Gegevens onder [CC BY 4.0](LICENSE-DATA). Code onder [MIT](LICENSE).

Peil geeft waarden met bron, geen advies. Controleer bij twijfel de primaire bron of raadpleeg een professional.
