# Changelog

Elke publicatie krijgt een versienummer. Eerdere versies blijven opvraagbaar onder `/api/versies/<versie>/`.

## 1.0.2, 16 september 2026

De openbare site is gescheiden van de interne administratie. Geen waarde, geen status en geen bron gewijzigd; alleen weergavetekst, labels en documentatie.

- `data/tools.json` toegevoegd: per repo de openbare toolnaam en, als hij aantoonbaar in die repo staat (homepage-veld, README of siteconfiguratie), het openbare adres met de vindplaats erbij. `tools/lib/tools.mjs` past die koppeling toe op de site.
- Parameterpagina: `gebruikt_in` toont alleen nog de openbare toolnaam, met een link naar het openbare adres waar dat bestaat. Repo, `cockpit_onderdeel`, `locatie` en `waarde_in_tool` staan niet meer op de pagina; in `/api/v1/` en `register.csv` staan ze onverkort.
- Parameterpagina: het blok "Signalen voor de Cockpit" is vervangen door "Let op", met neutrale zinnen per soort waarschuwing. Het niveau staat niet meer als woord in de tekst; de kleur van het blok volgt nog wel het zwaarste niveau.
- `verificatie_door`, `herkomst` en `aangekondigde_wijziging.bron` worden op de site door `openbareHerkomst()` teruggebracht tot de toolnaam; `verantwoordelijke` toont de uitgever in plaats van de persoon. De velden zelf zijn niet gewijzigd.
- Label `kandidaat` op de site vervangen door "nog niet in gebruik"; het veld heet in de gegevens nog steeds `kandidaat`.
- Tabel: het filter `tool` en de kolom "Gebruikt in" werken met openbare toolnamen, ontdubbeld op naam. Het `data-tools`-attribuut en de zoekindex op de startpagina gebruiken dezelfde namen.
- Startpagina: de teller "waarschuwingen rood" is "met een punt van aandacht" geworden en telt parameters, niet waarschuwingen. De regel onder de titel noemt het aantal aangesloten tools in plaats van het aantal repo's.
- `docs/over-peil.md` volledig herschreven voor een zakelijk publiek: wat Peil is, voor wie, verificatie, statussen, versies, correctieprocedure, licentie en API met de vaste adressen en de bronregel. De uitleg over de drie lagen is van de openbare pagina af.
- Voettekst op elke pagina uitgebreid met "Een uitgave van Communities Abroad, www.communitiesabroad.com".
- `UITGEVER` en `UITGEVER_URL` toegevoegd aan `tools/lib/versie.mjs`. De bronregel luidt nu "Peil, parameterregister NL-FR, een uitgave van Communities Abroad, versie ..."; elk API-antwoord draagt daarnaast de velden `uitgever` en `uitgever_url`.
- Interne verwijzingen uit de opmerkingen, `bronsoort` en de wijzigingshistorie in `tools/bron/` gehaald: repo-namen en bestandspaden vervangen door de openbare toolnaam. Geen waarde, status of bron geraakt.
- `data/duidingsregels.json` en `data/documenten.json`: het veld `stand` noemt geen taaknummer meer.
- Nieuwe test `geen interne aanduiding in de zichtbare tekst van de site`: wijst de gebouwde HTML af bij Anton, Cockpit, `peil/state.json`, Claude buiten Café Claude, repo of repository, een verwijzing naar broncode, een laagnummer, `kandidaat`, `gebruikt_in`, `waarde_in_tool`, `cockpit_onderdeel`, meetbron, een taaknummer of de naam van een repo uit `data/tools.json`. Alleen de zichtbare tekst telt, dus een `href` naar de broncode op GitHub blijft toegestaan.
- Versie 1.0.1 bevroren onder `bevroren/1.0.1/` en opvraagbaar onder `/api/versies/1.0.1/`; 1.0.0 blijft staan.

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
