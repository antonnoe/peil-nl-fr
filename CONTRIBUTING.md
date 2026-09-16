# Bijdragen aan Peil

Peil is een register, geen verzameling meningen. Een bijdrage wordt beoordeeld op een ding: staat er een primaire bron bij, met een vindplaats en een datum.

## Een correctie melden

Het snelst gaat het via een issue. Op elke detailpagina van de site staat de knop **Meld een correctie**; die opent het sjabloon `correctie parameter` met het parameter-id al ingevuld. Meld:

- welk parameter-id het betreft,
- wat er volgens u moet staan,
- welke primaire bron dat zegt, met de volledige URL of het wetsartikel,
- op welke datum u die bron hebt geraadpleegd.

Een melding zonder primaire bron wordt niet verwerkt.

## Een wijziging voorstellen

Wijzig `data/register.json` en open een pull request.

1. Zoek de parameter op zijn id. De parameters staan op id gesorteerd.
2. Vul `bron_url`, `bron_kenmerk`, `bronsoort`, `instantie`, `verificatiedatum` en `verificatie_door` in.
3. `bronsoort` is precies `primair` wanneer u de wettekst of de officiele publicatie zelf hebt gelezen. In elk ander geval beschrijft u de route, bijvoorbeeld `secundair: samenvattende fiche van service-public.fr, het wetsartikel niet zelf gelezen`. Een secundaire route wordt nooit stilzwijgend tot primair opgewaardeerd.
4. Zet `status` pas op `vastgesteld` als bron en verificatiedatum er allebei staan en `waarde` gevuld is.
5. Een raming komt nooit in een vastgestelde parameter. Maak er een eigen parameter voor met status `raming` en het achtervoegsel `_raming` in het id.
6. Vul bij een wijziging de oude waarde bij in `levensduur_a.wijzigingshistorie` en zet `levensduur_a.laatste_wijziging` op de ingangsdatum van de nieuwe waarde.
7. Draai `npm test`. De test weigert onder meer een vastgestelde waarde zonder bron of datum, een dubbel id, een parameter zonder `gebruikt_in` die niet `kandidaat` is, een verwijzing naar een niet-aangesloten repo en een verwijzing tussen lagen die nergens heen wijst.

## Een parameter toevoegen

1. Kies een id volgens `p.<land>.<regeling>.<grootheid>`, met land `nl`, `fr` of `xb`. De regelingcode moet in `tools/lib/regelingen.mjs` staan; bestaat zij nog niet, voeg haar daar toe met haar standaardtypering.
2. Vul alle verplichte velden. Het schema staat in `schema/parameter.schema.json` en `npm test` controleert het.
3. Vul de vier assen: land, lastensoort, regeling met haar typering, en variabiliteitsklasse.
4. Vul beide levensduren: A met de aanpassingsfrequentie en B met invoering en eventuele vervanging.
5. Vult u een klasse buiten `overheid_vastgesteld` in, dan zijn `verantwoordelijke` en `houdbaarheidsdatum` verplicht. Zonder eigenaar en zonder einddatum blijft zo'n waarde eeuwig staan.
6. Gebruikt nog geen tool de grootheid, zet dan `kandidaat` op `true`. Dode regels worden geweigerd.

## Taal en vorm

Nederlands, zakelijk. Geen lange liggende streepjes in lopende tekst; gebruik komma's. Voor het geheel van de platforms geldt een vast woord: `netwerk van platforms`. Het verzamelwoord uit de biologie dat daar elders voor wordt gebruikt, is niet toegestaan. Het werk van Christian von Klosterlein heet `Klussen in Frankrijk`, afgekort KIF, en nooit anders. `npm test` controleert deze regels op de documentatie en op de gegenereerde site.

## Wat niet wordt overgenomen

- Waarden uit eigen kennis of uit een taalmodel, zonder bron.
- Waarden uit een niet-aangesloten repo. De lijst van 22 aangesloten repo's staat in `tools/lib/aangesloten.mjs`.
- Uitzonderingen als rekenregel. Uitzonderingen worden in tekst benoemd, met een verwijzing naar een professional.
