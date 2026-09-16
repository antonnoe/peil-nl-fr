# Changelog

Elke publicatie krijgt een versienummer. Eerdere versies blijven opvraagbaar onder `/api/versies/<versie>/`.

## 1.0.1, 16 september 2026

Herstel van de diakritische tekens in alle weergavetekst en een inklapbare startpagina. Geen waarde, geen status en geen bron gewijzigd.

- Diakritische tekens hersteld in namen, omschrijvingen, opmerkingen, uitzonderingen, instantienamen, paginateksten en documentatie: Café Claude, crédit d'impôt, Sécurité sociale, taux réduit, revenu fiscal de référence, décote, taxe foncière, franchise médicale, te verifiëren, België.
- Weggevallen apostrofs in Franse elisies teruggezet, zoals crédit d'impôt, chambres d'hôtes en Ministère de l'économie, en de Nederlandse meervouden repo's, id's en pagina's.
- Id's, statussleutels, bestandsnamen, API-paden en URL's zijn ongewijzigd gebleven, zodat geen permalink breekt. De interface toont ze wel goed gespeld: bij de sleutel `te_verifieren` staat op het scherm "te verifiëren".
- Nieuwe test die weergavetekst afwijst waarin een veelvoorkomend Frans of Nederlands woord zonder accent staat, plus controles op de UTF-8-codering van de site, de API en de CSV met BOM.
- De kantelingen per land, per lastensoort en per regeling op de startpagina staan nu in `details` en `summary`, standaard dicht, met het aantal parameters in de samenvatting. Open- en dichtklappen werkt zonder JavaScript.
- De startpagina is op 390 px breed teruggebracht van ruim 21.000 px naar ongeveer 1.800 px. Zoekveld, tellers en voorbehoud staan onveranderd bovenaan.
- Headless controle van de hoogte van de startpagina op 390 px, die faalt boven 3.000 px, met een structurele terugval als er geen browser beschikbaar is.
- Versie 1.0.0 blijft bevroren opvraagbaar onder `/api/versies/1.0.0/`; de bevroren kopie staat in de repo onder `bevroren/1.0.0/`.

## 1.0.0, 16 september 2026

Eerste publicatie van het register: datamodel, schema voor drie lagen, 210 parameters, ijkkalender, signaalbestand, statische API en site.

- Schema voor laag 3 (parameters), laag 2 (rekenregels) en laag 1 (duidingsregels), met een gedeelde id-ruimte en bronvelden die het feitenschema van Klussen in Frankrijk volgen.
- 210 parameters afgeleid uit de inventarisatie van taak 0, voor de 22 aangesloten repo's. Dubbelingen samengevoegd tot een parameter met meerdere `gebruikt_in`; waar tools verschillen staat `afwijkend` op waar en is de waarde per tool vastgelegd.
- 52 parameters met status `vastgesteld`, alle met bron en verificatiedatum uit een aangesloten repo.
- 46 grootheden uit de volledigheidslijst toegevoegd als kandidaat met status `te_verifieren`, met bron-URL of bronomschrijving en zonder waarde.
- Waarden uit de voorganger `financieel-kompas` opgenomen als wijzigingshistorie, nooit als registerwaarde.
- Een parameter voor DVF met rekenwijze en granulariteit in de opmerkingen, zonder prijzen.
- Documentenregister: alleen het schema, met een leeg `data/documenten.json`.
- IJkkalender met de ijkmomenten half december (NL en CAK) en half april (FR).
- Signaalbestand `peil/state.json` voor de Cockpit, met de soorten `gaat_veranderen`, `verouderd`, `afwijkend` en `veranderd`.
- Statische API onder `/api/v1/` met een versienummer per publicatie en eerdere versies onder `/api/versies/<versie>/`.
- Statische site, mobiel eerst, zonder frameworks en zonder externe scripts of fonts.
- Opschoning van taak 0: motiveringen ingekort, lange liggende streepjes vervangen door komma's, kolom `Besluit Anton` toegevoegd.

## 0.1.0, 16 september 2026

Taak 0: inventarisatie van 120 repo's, 234 gevonden parameters en 33 dubbelingen. Zie `docs/inventarisatie/`.
