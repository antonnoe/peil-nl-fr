# Over Peil

## Doel

Peil is het openbare parameterregister NL-FR van Communities Abroad. Het heeft drie taken tegelijk.

Het is het rekenkundige toetsingsinstrument voor de eigen rekentools. Elke waarde die een tool gebruikt staat hier naast de waarde die Peil heeft vastgesteld, met de vindplaats in de code erbij. Waar die twee uiteenlopen, is dat zichtbaar.

Het is een openbare bron voor professionals: belastingadviseurs, notarissen en kennisdelers die een bedrag willen overnemen en er een bronregel bij nodig hebben.

Het is een meetbron voor Anton's Cockpit. Peil stuurt zelf geen mails, opent geen issues en slaat geen alarm. Alles wat de Cockpit moet weten staat in `peil/state.json` en wordt daar opgehaald.

## Drie lagen

Peil kent drie lagen in een gedeelde id-ruimte, met een laagprefix in het id.

**Laag 3, parameters** (`p.`). Losse grootheden met een waarde, een bron en een levensduur. Bijvoorbeeld `p.fr.ps.taux_global`, het totaaltarief van de prélèvements sociaux.

**Laag 2, rekenregels** (`r.`). Hoe parameters tot een uitkomst leiden, en in welke volgorde. Bijvoorbeeld `r.fr.pv.surtaxe`. Rekenregels verwijzen naar parameter-id's. Deze laag is nu een kiem: de regels zijn beschreven en voorzien van testvoorbeelden, maar niet uitvoerbaar vastgelegd.

**Laag 1, duidingsregels** (`d.`). Welke situatie van toepassing is voordat er gerekend wordt: verdragstoewijzing, verzekeringsplicht, kwalificatie van een inkomensbestanddeel. Bijvoorbeeld `d.xb.s1_status`. Duidingsregels verwijzen naar rekenregels en naar parameters. Deze laag is nu alleen een schema; de vulling wordt later geïndexeerd over de handboeken van Café Claude.

Alle drie de lagen kennen `gebruikt_in`: de tools en de locaties waar de regel of de waarde daadwerkelijk wordt gebruikt.

## Harde regels

1. **Elke waarde heeft een primaire bron met vindplaats en verificatiedatum.** Zonder bron en datum is er geen registerwaarde.
2. **De status `vastgesteld` is alleen voor waarden die in een aangesloten repo aantoonbaar bron en datum hebben.** Alles wat een tool gebruikt zonder die twee, staat als `waarde_in_tool` bij `gebruikt_in` en niet als registerwaarde.
3. **Raming en vaststelling worden strikt gescheiden gehouden.** Een raming krijgt een eigen parameter met status `raming` en wordt nooit met een vastgestelde waarde vermengd.
4. **Geen dode regels.** Elke parameter heeft `gebruikt_in` of is `kandidaat`.
5. **Uitzonderingen worden in tekst benoemd met een verwijzing naar een professional, niet gemodelleerd.** Een register dat uitzonderingen namodelleert wekt de indruk advies te geven.
6. **Een secundaire bron wordt nooit stilzwijgend opgewaardeerd tot primair.** Het veld `bronsoort` staat op `primair` of beschrijft de secundaire route waarlangs de waarde binnenkwam.

## Kleuren en wat zij betekenen

- **Groen, vastgesteld.** Bron en verificatiedatum aanwezig in een aangesloten repo. Deze waarde mag worden overgenomen, met de bronregel erbij.
- **Oranje, raming.** Een raming, geen vastgestelde waarde. Niet mee rekenen.
- **Grijs, te verifiëren.** Geen rekenwaarde. Wat de tools gebruiken staat wel bij `gebruikt_in`, maar Peil stelt het niet vast.
- **Doorgestreept, vervallen.** De grootheid bestaat niet meer. Het veld `opgevolgd_door` wijst waar zij naartoe is gegaan.

## Correctieprocedure

Een fout of een ontbrekende bron meldt u op een van twee manieren.

Via een issue: op elke detailpagina staat de knop **Meld een correctie**. Die opent een issue-sjabloon waarin het parameter-id al is ingevuld. Vul in wat er volgens u moet staan en welke primaire bron dat zegt, met de vindplaats en de datum waarop u die hebt geraadpleegd.

Via een pull request: wijzig `data/register.json`, vul `bron_url`, `bron_kenmerk`, `bronsoort`, `instantie`, `verificatiedatum` en `verificatie_door` in, en zet de status pas op `vastgesteld` als bron en datum er allebei staan. `npm test` controleert dat voordat de wijziging erdoor kan.

Een melding zonder primaire bron wordt niet verwerkt. Dat is geen onwil: een register waarin waarden zonder bron terechtkomen is niets waard.

## API

De API is statisch: er draait geen server, alles zijn bestanden. Elk antwoord bevat `versie`, `versiedatum`, `licentie` en een kant-en-klare `bronregel`.

| Pad | Wat erin staat |
|---|---|
| `/api/v1/index.json` | Ingang, tellingen en alle beschikbare sleutels |
| `/api/v1/parameters.json` | Alle parameters, kort |
| `/api/v1/parameters/<id>.json` | Een parameter, volledig |
| `/api/v1/land/<code>.json` | NL, FR of XB |
| `/api/v1/lastensoort/<soort>.json` | fiscaal, sociaal, verzekering_overheidsgekaderd, overig_transactiekosten |
| `/api/v1/regeling/<slug>.json` | Per regeling |
| `/api/v1/tool/<repo>.json` | Per aangesloten repo, met de waarschuwingen die die repo raken |
| `/api/v1/rekenregels.json` | Laag 2 |
| `/api/v1/duidingsregels.json` | Laag 1 |
| `/api/v1/documenten.json` | Documentenregister |
| `/api/v1/ijkkalender.json` | Per maand de verwachte wijzigingen |
| `/api/v1/state.json` | Signalen voor de Cockpit |
| `/api/v1/changelog.json` | Alle publicaties |
| `/api/v1/register.csv` | Het hele register als CSV |

Elke publicatie krijgt een versienummer. Eerdere versies blijven opvraagbaar onder `/api/versies/<versie>/` met dezelfde padstructuur. De paden zijn zo gekozen dat een latere laag met sleutels er ongewijzigd voor kan worden gezet: geen query's, geen hoofdletters, geen accenten in sleutels.

## Licentie

De gegevens staan onder **CC BY 4.0**. Overnemen mag, met bronvermelding. Op elke detailpagina staat een kant-en-klare bronregel en een knop om die met de waarde mee te kopiëren.

De code staat onder **MIT**.
