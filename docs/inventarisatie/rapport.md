# Eindrapport taak 0, inventarisatie van rekeninstrumenten en hun parameters

Peildatum 16 september 2026. Alle 120 repositories onder het GitHub-account `antonnoe` zijn lezend beoordeeld. Er is buiten `peil-nl-fr` niets gewijzigd.

## Aantallen

| | Aantal |
|---|---|
| Repo's totaal | 120 |
| Met rekenfunctie (ja) | 18 |
| Mogelijk een rekenfunctie | 16 |
| Geen rekenfunctie (nee) | 86 |
| Parameters genoteerd | 234 |
| Dubbele grootheden | 33 |
| waarvan afwijkend | 18 |
| Parameters zonder bronverwijzing | 167 van 234 |
| Parameters zonder datum of jaar | 156 van 234 |
| Parameters zonder bron én zonder datum | 141 van 234 |

De verhouding is de kern van de uitkomst: van elke tien parameters hebben er zeven geen bron en zes geen datum. Zes van de tien hebben geen van beide.

## De tien belangrijkste bevindingen

**1. Twee generaties Financieel Kompas staan naast elkaar en spreken elkaar op dertien grootheden tegen.**
`financieel-kompas` en `financieel-kompas-ai` hebben dezelfde structuur maar andere waarden: Zvw 0,0526 tegen 0,0485, AOW 19500 tegen 19956, IR-schijven een editie uit elkaar, box 3 met één forfaitair rendement tegen drie. Box 1 verschilt zelfs in structuur: twee schijven tegen drie. Zolang beide repo's bestaan, is niet uit de code af te leiden welke leidend is.

**2. De rekentool en het handboek geven verschillende zorgtarieven.**
`zorgkompas-frankrijk` rekent met een consult van 30,00 euro en een forfait journalier van 20,00 euro. `cafeclaude` noemt 26,50 euro respectievelijk 23 euro (en 17 voor psychiatrie, met 1 maart 2026 als ingangsdatum). Twee eigen instrumenten geven een lezer dus verschillende bedragen voor dezelfde vraag. Geen van beide verwijst naar een primaire bron op de plaats van de waarde.

**3. Café Claude spreekt zichzelf tegen over de franchise médicale.**
In `lib/audit/prompts/zorg.ts` staat op regel 67-68 nog 0,50 euro per doosje, terwijl regel 146-147 de verdubbeling naar 1 euro per 1 mei 2024 beschrijft. Beide regels sturen dezelfde auditor aan.

**4. Notariskosten worden op vier manieren berekend.**
`Vastgoedtransactie` rekent ze werkelijk op uit emolumenten, DMTO per departement, taxe communale en frais d'assiette. `cafeclaude` en `if-tools-api` gebruiken de vuistregel 7 tot 8 procent met onderscheid tussen nieuwbouw en bestaande bouw. `woningzoeker-frankrijk` gebruikt één vast percentage van 8 procent zonder dat onderscheid. Dat is de zwakste van de vier en tegelijk de enige die de gebruiker een concreet bedrag voorschotelt.

**5. De plus-value wordt door twee eigen tools verschillend gerekend.**
`Vastgoedtransactie` bouwt de surtaxe met de afvlakkingsformule uit art. 1609 nonies G CGI; `Plus-Value-Calculator` gebruikt rechte tranches. De tarieven en abattements zijn gelijk, de uitkomst rond de tranchegrenzen niet.

**6. De energie-engine bestaat vier keer, waarvan drie keer als kopie.**
`energieportaal` en `if-mobiel` hebben byte-identieke `engine.js`, `dpe.js` en `archetypes.js`. `warmteverlies-calculator` is een oudere variant met dezelfde constanten. `Energiecalculator-Frankrijk-door-Nederlanders.fr` is de oudste en wijkt af op U-waarden voor dak, vloer en raam en op vier van de zeven apparaatverbruiken. Vier kopieën zonder gedeelde bron is precies het probleem dat Peil moet oplossen.

**7. Binnen `energieportaal` staan invulwaarden en referentiewaarden door elkaar.**
De engine vult 0,25 euro per kWh in, de prijsmodule haalt 0,194 euro per kWh bij de CRE op, met bron en peildatum. Propaan staat op 1,80 in de engine en op 1,90 in de prijsmodule. Dat is verdedigbaar zolang hun rol verschilt, maar het register moet ze als verschillende klassen behandelen: `gebruikersinvoer` tegenover `marktindex`.

**8. Er bestaat al een goed ontwerp voor een parameterregister, in KIF.**
`klussen-in-frankrijk/source/facts/schema.json` beschrijft een feitenlaag met precies de velden die Peil nodig heeft: `id`, `onderwerp`, `feit`, `categorie`, `bron`, `bronurl`, `bronsoort`, `geverifieerd`, `geldigVanaf` en `nlfr`. Het onderscheid primair tegenover secundair, met de eis dat `bronsoort` nooit stilzwijgend van secundair naar primair schuift, is strenger dan wat de meeste rekentools nu doen. Het enige feitenbestand (`energie.json`) is nog leeg.

**9. Drie repo's doen het al goed en kunnen als norm dienen.**
`financieel-kompas-ai` zet per grootheid bron, verificatiedatum en toelichting in de config, inclusief de expliciete melding dat 2143 een raming is en 2119 het vastgestelde bedrag. `Vastgoedtransactie` heeft een apart `bronnen.json` met wetsartikel en publicatiedatum per grootheid, plus een eigen houdbaarheidstermijn van twee en zes maanden. `dossier-elektriciteit-if` markeert elke harde claim als `[GEVERIFIEERD: bron, datum]` of `[NIET GEVERIFIEERD]`. Deze drie werkwijzen samen dekken zo goed als alles wat Peil nodig heeft.

**10. Eén parameter komt in zes repo's voor: de prélèvements sociaux van 17,2 procent.**
`financieel-kompas`, `financieel-kompas-ai`, `Vastgoedtransactie`, `Plus-Value-Calculator`, `cafeclaude` en `taalhulp-fr` hanteren alle dezelfde waarde. Het bijbehorende prélèvement de solidarité van 7,5 procent staat in vier repo's. Dit is de duidelijkste eerste vulling van het register, en meteen de test of zes plaatsen echt op één bron zijn aan te sluiten.

## Wat ik niet kon beoordelen, en waarom

- **`data`.** Een WordPress-export van forumdraden, 88 MB, uitsluitend gebruikersinhoud. Geen code en geen configuratie. Conform de opdracht is de inhoud niet gelezen en niet doorzocht op parameters. Het oordeel `nee` slaat dus op de afwezigheid van code, niet op de inhoud.
- **`dossierfrankrijk`.** Alleen code en configuratie beoordeeld. De opgeslagen gebruikersdossiers zitten in Supabase, buiten de repo, en zijn niet benaderd.
- **`dossier-elektriciteit-if` en `klussen-in-frankrijk`.** Deze bevatten forumdumps met berichten van gebruikers (`oogst/forumdump/`). Bedragen daarin zijn uitspraken van forumleden over hun eigen situatie, geen parameters. Ik heb die niet opgenomen; alleen de geverifieerde tarieven uit de redactionele hoofdstukken staan in de lijst.
- **`if-autoverzekering`.** De polisvoorwaarden zitten in een PDF (`Dispositions Générales Auto`). Die is niet uitgelezen; er zijn geen parameters in code of configuratie. Het oordeel is daarom `nee`, met het voorbehoud dat de PDF contractuele parameters kan bevatten.
- **Of een waarde klopt.** Deze inventarisatie stelt uitsluitend vast wat er staat. De primaire bronnen (Belastingdienst, Légifrance, BOFiP, service-public.fr, CAK, CRE, Consuel) zijn niet geraadpleegd. Waar twee repo's uiteenlopen, staat in `dubbelingen.md` niet welke gelijk heeft.
- **De Cockpit-onderdelen zijn een inschatting.** Anton's Cockpit werkt met onderdelen, niet met repo's, en die koppeling is nergens in de repo's vastgelegd. Ik heb hem afgeleid uit reponaam, README en de eerdere inventarisatie in `anton-ai-werkwijze/inventarisatie/2026-08-if-inventarisatie.md`. De kolom in `repos.md` is bedoeld om te bevestigen of te corrigeren, niet om over te nemen.

## Keuzes die ik bij twijfel heb gemaakt

- **Regelnummers uit de lokale clone.** Alle verwijzingen komen uit een shallow clone van de standaardbranch op 16 september 2026. Bij een latere commit kunnen ze verschuiven; bestandsnaam en parameternaam blijven bruikbaar.
- **`verenigings-dashboard` staat op `mogelijk`, niet op `nee`.** De repo rekent kosten met API-tarieven per miljoen tokens, met bron en raadpleegdatum, en laat de wisselkoers bewust op `null` staan omdat de bron onbereikbaar was. Dat is een rekenfunctie met bedragen, maar buiten het fiscale, sociale, verzekerings- en vastgoeddomein. Ik heb hem opgenomen zodat u zelf kunt beslissen of Peil ook bedrijfsvoeringsparameters draagt.
- **`controle-technique-zoeker` staat op `nee`.** De bedragen van 50 tot 100 euro zijn keuzes in een prijsfilter, geen parameter waarmee gerekend wordt.
- **`erfrecht-en-testament` en `ouderenzorg-fr` staan op `mogelijk`, niet op `ja`.** Zij bevatten harde tarieven en bedragen maar rekenen er niet mee. Voor Peil zijn zij wel relevant: een verkeerd getal in een artikel bereikt evenveel lezers als een verkeerd getal in een tool.
- **Technische normen zijn buiten de lijst gehouden.** Elektrotechnische en bouwkundige waarden (NF C 15-100, kabeldoorsneden, U-waarden van bouwdelen) vallen buiten de vier genoemde domeinen. Uitzondering: de Consuel- en Enedis-tarieven in `dossier-elektriciteit-if`, want dat zijn bij arrêté vastgestelde bedragen.
- **De `Infinity`-grens in schijventabellen** is als bovengrens genoteerd en niet als afzonderlijke parameter geteld.

## Aanbeveling voor taak 1

De volgorde die uit de cijfers volgt: begin bij de 18 afwijkende dubbelingen, want die zijn nu aantoonbaar fout in minstens één van de twee plaatsen. Neem als schema het feitenlaag-ontwerp uit KIF, aangevuld met de variabiliteitsklasse en de houdbaarheidstermijn uit `Vastgoedtransactie`. Vul eerst de grootheden die in drie of meer repo's voorkomen: prélèvements sociaux, prélèvement de solidarité, plus-value-tarieven en -forfaits, IFI, PFU, successievrijstellingen en de klimaatzones. Dat zijn ongeveer twintig grootheden die samen meer dan zestig vindplaatsen dekken.
