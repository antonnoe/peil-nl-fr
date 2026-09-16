# Over Peil

## Wat Peil is

Peil is een openbaar register van parameters: de bedragen, percentages, drempels en termijnen die de Nederlandse en de Franse fiscaliteit, de sociale zekerheid, de overheidsgekaderde verzekeringen en de vastgoedtransactiepraktijk bepalen, aangevuld met de grensoverschrijdende grootheden die tussen beide stelsels liggen.

Elke grootheid staat er met haar waarde, haar primaire bron, de datum waarop die bron voor het laatst is geraadpleegd, haar geldigheidsperiode en haar status. Peil rekent niet en adviseert niet. Het legt vast wat een instantie heeft bepaald en waar dat te controleren is.

Peil is een uitgave van Communities Abroad.

## Voor wie

Voor wie een bedrag of een tarief nodig heeft en daar een verantwoording bij moet kunnen leggen: belastingadviseurs, notarissen, makelaars, financieel adviseurs, journalisten en kennisdelers die over Nederland en Frankrijk publiceren.

Peil is ook het toetsingsinstrument voor de rekeninstrumenten van Communities Abroad. Bij elke parameter staat welke van die tools ermee rekenen. Loopt de waarde in een tool uiteen met de waarde in het register, dan is dat op de parameterpagina zichtbaar.

## Hoe een waarde wordt geverifieerd

1. **Geen waarde zonder bron.** Een waarde komt alleen in het register als er een primaire bron bij staat: een wetsartikel, een arrêté, een officiële publicatie of een tabel van de instantie die de grootheid vaststelt.
2. **Geen bron zonder datum.** Bij elke bron staat de datum waarop hij is geraadpleegd. Zonder die datum is niet te zeggen of de waarde nog geldt.
3. **Een secundaire bron wordt nooit stilzwijgend primair.** Kwam een waarde langs een tussenstap binnen, dan staat die route erbij en blijft de waarde als secundair aangemerkt.
4. **Raming en vaststelling blijven gescheiden.** Een raming krijgt een eigen ingang met de status raming en wordt nooit met een vastgestelde waarde vermengd.
5. **Uitzonderingen worden benoemd, niet nagebootst.** Waar een regel een uitzondering kent, staat dat in woorden met de verwijzing naar een professional. Een register dat uitzonderingen nabootst, wekt de indruk advies te geven.

## Wat de statussen betekenen

- **Vastgesteld.** Er is een primaire bron en een verificatiedatum. Deze waarde mag worden overgenomen, met de bronregel erbij.
- **Raming.** Een raming van een waarde die nog niet officieel is vastgesteld. Niet geschikt om mee te rekenen.
- **Te verifiëren.** Peil heeft voor deze grootheid nog geen waarde met bron en datum. Er staat dan ook geen rekenwaarde; de grootheid is wel vastgelegd, zodat zichtbaar is dat zij bestaat en nog moet worden gecontroleerd.
- **Vervallen.** De grootheid bestaat niet meer. Waar een andere grootheid haar plaats heeft ingenomen, staat die erbij.

De kleuren op de pagina's volgen deze statussen en voegen er niets aan toe.

## Versies

Elke publicatie van Peil krijgt een versienummer en een peildatum. Beide staan onderaan elke pagina en in elk antwoord van de API.

Eerdere versies blijven opvraagbaar. De volledige API van elke uitgebrachte versie staat onder `/api/versies/<versie>/`, met dezelfde padstructuur als de huidige versie. Wie in een publicatie naar een waarde verwijst, kan dus altijd laten zien hoe die waarde er op dat moment uitzag. Een fout in een oude versie wordt gecorrigeerd in een nieuwe versie, niet met terugwerkende kracht in de oude.

De volledige lijst van publicaties staat op de pagina Changelog.

## Een correctie melden

Klopt een waarde niet, of ontbreekt er een bron, dan zijn er twee wegen.

Op elke parameterpagina staat de knop **Meld een correctie**. Die opent een formulier waarin de parameter al is ingevuld. Vermeld wat er volgens u moet staan, welke primaire bron dat zegt, waar die bron te vinden is en op welke datum u hem hebt geraadpleegd.

Wie zelf een wijziging wil aanleveren, kan dat via de broncode doen: pas de gegevens aan, vul de bron, het kenmerk, de bronsoort, de instantie, de verificatiedatum en de verificateur in, en zet de status pas op vastgesteld als bron en datum er allebei staan. De controles bij het bouwen weigeren een vastgestelde waarde zonder bron en datum.

Een melding zonder primaire bron wordt niet verwerkt. Dat is geen onwil: een register waarin waarden zonder bron terechtkomen, is niets waard.

## Licentie

De **gegevens** staan onder **CC BY 4.0**. Overnemen mag, met bronvermelding. Op elke parameterpagina staat een kant-en-klare bronregel en een knop om die met de waarde mee te kopiëren.

De **code** staat onder **MIT**.

## API

De API is statisch: er draait geen server, alles is een bestand. Elk antwoord bevat de versie, de versiedatum, de licentie en een kant-en-klare bronregel, zodat een overgenomen waarde altijd te herleiden is.

| Adres | Wat erin staat |
|---|---|
| `/api/v1/index.json` | Ingang, tellingen en alle beschikbare sleutels |
| `/api/v1/parameters.json` | Alle parameters, kort |
| `/api/v1/parameters/<id>.json` | Een parameter, volledig |
| `/api/v1/land/<code>.json` | NL, FR of XB |
| `/api/v1/lastensoort/<soort>.json` | fiscaal, sociaal, verzekering_overheidsgekaderd, overig_transactiekosten |
| `/api/v1/regeling/<slug>.json` | Per regeling |
| `/api/v1/tool/<sleutel>.json` | Per aangesloten tool; de sleutels staan in `/api/v1/index.json` |
| `/api/v1/rekenregels.json` | De rekenregels |
| `/api/v1/duidingsregels.json` | De duidingsregels |
| `/api/v1/documenten.json` | Het documentenregister |
| `/api/v1/ijkkalender.json` | Per maand de verwachte wijzigingen |
| `/api/v1/state.json` | De stand van het register in cijfers |
| `/api/v1/changelog.json` | Alle publicaties |
| `/api/v1/register.csv` | Het hele register als CSV |
| `/api/versies/<versie>/` | Dezelfde adressen voor een eerdere versie |

De adressen liggen vast en veranderen niet meer binnen versie 1: geen query's, geen hoofdletters en geen accenten in sleutels.

**Bronregel.** Elk antwoord draagt het veld `bronregel`. Neem die regel over bij elke waarde die u uit Peil overneemt. Voor deze uitgave luidt hij:

`Peil, parameterregister NL-FR, een uitgave van Communities Abroad, versie 1.0.2, peildatum 16 september 2026, https://antonnoe.github.io/peil-nl-fr/, CC BY 4.0`
