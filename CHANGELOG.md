# Changelog

Elke publicatie krijgt een versienummer. Eerdere versies blijven opvraagbaar onder `/api/versies/<versie>/`.

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
