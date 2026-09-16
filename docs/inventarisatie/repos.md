# Inventarisatie repo's, rekenfunctie ja, nee of mogelijk

Peildatum 16 september 2026. Alle 120 repo's onder het account antonnoe, lezend beoordeeld.

`Rekenfunctie` is het oordeel uit de inventarisatie. `Par.` is het aantal parameters dat in die repo is gevonden en genoteerd in `parameters.md`. `Besluit Anton` is de uitkomst: **ja** betekent aangesloten op Peil, **nee** betekent niet aangesloten. 22 repo's zijn aangesloten; `klussen-in-frankrijk` is aangesloten als leverancier van het feitenschema en levert zelf geen parameters. `cafeclaude` wordt alleen gelezen. `financieel-kompas` is niet aangesloten: de waarden uit die voorganger staan in het register uitsluitend als wijzigingshistorie.

Motiveringen zijn ingekort tot ten hoogste 60 tekens; de volledige onderbouwing staat in `rapport.md` en `parameters.md`.

| Repo | Rekenfunctie | Par. | Vermoedelijk Cockpit-onderdeel | Motivering | Besluit Anton |
|---|---|---|---|---|---|
| `financieel-kompas-ai` | **ja** | 59 | CC / IF, Financieel Kompas (AI-versie) | Volledig parameterbestand config.json met NL- | **ja** |
| `cafeclaude` | **ja** | 34 | CC, Cafe Claude | Domein- en auditprompts bevatten harde 2026-bedragen | **ja** |
| `financieel-kompas` | **ja** | 20 | IF, Financieel Kompas (voorganger) | Oudere config.json met dezelfde structuur maar afwijkende | **nee** |
| `Vastgoedtransactie` | **ja** | 20 | Vastgoedtransacties, transactiekostentool | Rekenkern calc.js met emolumenten | **ja** |
| `energieportaal` | **ja** | 10 | IF, EnergiePortaal | Rekenengine met klimaatzones | **ja** |
| `dossier-elektriciteit-if` | **ja** | 9 | IF, dossier Elektriciteit | Hoofdstukken bevatten geverifieerde Consuel- | **ja** |
| `briefhulp-fr` | **ja** | 8 | IF, Briefhulp | Brieftemplates rekenen met wettelijke termijnen | **ja** |
| `Plus-Value-Calculator` | **ja** | 7 | Vastgoedtransacties, plus-value | Python-rekenkern met abattementsreeksen | **ja** |
| `zorgkompas-frankrijk` | **ja** | 7 | IF, ZorgKompas | Scenariodatabase met BRSS-tarieven en vergoedingspercentages | **ja** |
| `Energiecalculator-Frankrijk-door-Nederlanders.fr` | **ja** | 5 | NLFR, energiecalculator (oud) | Vroege versie van de energie-engine met dezelfde HDD- | **ja** |
| `warmteverlies-calculator` | **ja** | 5 | IF, warmteverlies | Oudere variant van dezelfde energie-engine met dezelfde | **ja** |
| `erf-en-schenkingsrecht-nl-fr` | **ja** | 4 | IF, erf- en schenkingsrecht | Franse successie- en schenkingsbaremes met tarieven | **ja** |
| `ca-btw-oss-tool` | **ja** | 3 | CA intern, btw/OSS | Regelset met btw-tarieven NL en FR en een rekenmodule | **nee** |
| `e-facturatie-frankrijk` | **ja** | 3 | IF / CA, e-facturatie | Feitenobjecten met wettelijke invoeringsdata | **ja** |
| `energiebesparing-subsidie-en-fiscale-regelingen` | **ja** | 3 | IF, subsidiewijzer | Beslislogica met btw-tarieven voor renovatie | **ja** |
| `gitekompas-fr` | **ja** | 3 | IF, GiteKompas | Micro-BIC-parameters (abattement en omzetplafond | **ja** |
| `if-mobiel` | **ja** | 1 | IF, mobiele schil | Bevat een byte-identieke kopie van de engine | **ja** |
| `woningzoeker-frankrijk` | **ja** | 1 | IF, Woningzoeker | Budgetstap rekent notariskosten als vast percentage over | **ja** |
| `nlfr-ai-agent` | **mogelijk** | 5 | NLFR, AI-agent | Kennisbestand voor de AI-adviseur bevat richtprijzen | **ja** |
| `dossierfrankrijk` | **mogelijk** | 4 | DossierFrankrijk | Beslisboom noemt kostenindicaties en een rekenvoorbeeld | **nee** |
| `ouderenzorg-fr` | **mogelijk** | 4 | IF, Ouderenzorg | Dossierskelet met een tabel van Franse zorgtoeslagen | **ja** |
| `erfrecht-en-testament` | **mogelijk** | 3 | IF, erfrecht (artikel) | Artikel met harde successietarieven en vrijstellingen | **ja** |
| `bouwvergunningwijzer-frankrijk` | **mogelijk** | 2 | IF, Bouwvergunningwijzer | Regelmatrix met oppervlaktedrempels voor DP en PC | **ja** |
| `infofrankrijk-routecontrole` | **mogelijk** | 2 | IF, Routecontrole | Reiskostenraming met brandstofverbruik | **nee** |
| `taalhulp-fr` | **mogelijk** | 2 | IF, Taalhulp | Begrippenlijst bevat losse tarieven als toelichting | **nee** |
| `verenigings-dashboard` | **mogelijk** | 2 | Verenigings-dashboard | Rekent kosten met API-tarieven per miljoen tokens | **nee** |
| `Aankoop-kompas-voor-franse-huizen-in-frankrijk` | **mogelijk** | 1 | IF, Aankoopkompas | Rekent technische waarde en adviesbod uit gebruikersinvoer | **nee** |
| `bouwgrond-frankrijk-check` | **mogelijk** | 1 | IF, bouwgrondcheck | Analyse op basis van externe API's met een vaste zoekradius | **nee** |
| `gasdossier-stillewille` | **mogelijk** | 1 | overig, gasdossier | Historisch dossier met bedragen en percentages | **nee** |
| `if-tools-api` | **mogelijk** | 1 | IF, tools-API | AI-prompt geeft een vast percentage voor frais de notaire | **ja** |
| `klussen-in-frankrijk` | **mogelijk** | 1 | KIF, hoofdrepo | Bevat een feitenlaag-schema dat expliciet voor bedragen | **ja** |
| `klussen-in-frankrijk-christian-von-klosterlein` | **mogelijk** | 1 | KIF, artikelen | Artikeldata met technische percentages en maten | **nee** |
| `vastgoed-analyse` | **mogelijk** | 1 | IF, vastgoedanalyse | Rekent met marktprijzen per m2 uit DVF | **nee** |
| `vastgoed-in-frankrijk` | **mogelijk** | 1 | IF, vastgoed in Frankrijk | Analysetool op .gouv-API's | **nee** |
| `2knoppen_onder_menu` | **nee** | 0 | overig, knoppen | Knoppenblok | **nee** |
| `3knoppen` | **nee** | 0 | overig, knoppen | Knoppenblok | **nee** |
| `4-knoppen-v2` | **nee** | 0 | overig, knoppen | Knoppenblok | **nee** |
| `adressen-van-.gouv-tot-nl-verenigingen` | **nee** | 0 | IF, adressen | Adressenlijst | **nee** |
| `afbeeldingen` | **nee** | 0 | overig, beeld | Beeldbank | **nee** |
| `anton-ai-werkwijze` | **nee** | 0 | overig, werkwijze | Werkwijze-, rollen- en inventarisatiedocumenten | **nee** |
| `anton-ui-blocks` | **nee** | 0 | overig, UI | UI-blokken | **nee** |
| `antonnoe-antons-cockpit---private` | **nee** | 0 | Anton's Cockpit | Beheertool met operationele drempels (betaalmuur | **nee** |
| `antonnoe-communities-abroad-style-studio` | **nee** | 0 | CA, Style Studio | Huisstijl- en componentenbibliotheek | **nee** |
| `antonnoe-redactie-tool` | **nee** | 0 | CA, redactietool | Redactiehulp, markdown naar HTML | **nee** |
| `api-catalog-france` | **nee** | 0 | overig, API-catalogus | Catalogus van Franse open API's | **nee** |
| `baolse-bierdrinkers` | **nee** | 0 | overig, privé | Privéproject | **nee** |
| `Begrippen-NL-FR-vertaalmodule` | **nee** | 0 | overig, begrippen | Vertaalmodule met begrippen, geen bedragen | **nee** |
| `bosbranden` | **nee** | 0 | IF, bosbranden | Kaart- en informatietoepassing over bosbranden | **nee** |
| `ca-dossierguide` | **nee** | 0 | CA, dossierguide | Dossierbegeleiding zonder rekenfunctie | **nee** |
| `cafe-claude-lexicon` | **nee** | 0 | CC, lexicon | Leeg, geen default branch | **nee** |
| `Cafe-Jeudi-Banner` | **nee** | 0 | NLFR, banner | Banner | **nee** |
| `communities-abroad-seo-agent` | **nee** | 0 | CA, SEO-agent | SEO-agent op Search Console-data | **nee** |
| `communitiesabroad` | **nee** | 0 | CA, corporate | Bedrijfssite | **nee** |
| `controle-technique-zoeker` | **nee** | 0 | IF, controle technique | Zoeker met prijsfilters | **nee** |
| `dashboard-admin` | **nee** | 0 | overig, dashboard | Statische beheerpagina | **nee** |
| `data` | **nee** | 0 | NLFR / IF, forumdata | WordPress-export van forumdraden | **nee** |
| `De-rechtspersoon-checker` | **nee** | 0 | IF, rechtspersoon | Checker rechtsvormen | **nee** |
| `desert` | **nee** | 0 | overig | Losse pagina's | **nee** |
| `devisdossier-frankrijk` | **nee** | 0 | IF, devisdossier | Eén pagina over offertes; de getallen zijn opmaakcodes | **nee** |
| `dossier-ouderenzorg` | **nee** | 0 | IF, Ouderenzorg (schil) | Dossierschil zonder bedragen in code | **nee** |
| `emigreren-naar-frankrijk-beslisboom` | **nee** | 0 | IF, beslisboom | Beslisboom zonder bedragen | **nee** |
| `energiekompas-frankrijk` | **nee** | 0 | IF, redirect | Alleen een permanente redirect naar energieportaal | **nee** |
| `evenementenkaart` | **nee** | 0 | NLFR, evenementen | Evenementenkaart | **nee** |
| `fr-auto-import-tool` | **nee** | 0 | IF, import | Importtool voor artikelen | **nee** |
| `france-M2` | **nee** | 0 | IF, M2 | Eén pagina | **nee** |
| `france-newsdesk` | **nee** | 0 | NLFR / IF, newsdesk | Nieuwsverwerking en RSS-uitvoer | **nee** |
| `Frankrijk-legal` | **nee** | 0 | IF, legal | Juridische pagina's zonder bedragen | **nee** |
| `frankrijknieuws` | **nee** | 0 | IF, nieuws | Nieuwsfeed | **nee** |
| `franse-huizen-checker` | **nee** | 0 | IF, huizenchecker | Checker zonder rekenparameters | **nee** |
| `Franse-taal-in-contextuele-module` | **nee** | 0 | IF, taalmodule | Taalmodule; percentages zijn opmaak of voorbeelden | **nee** |
| `GEODIRECTORY` | **nee** | 0 | overig, gearchiveerd | Gearchiveerd, alleen een licentiebestand | **nee** |
| `Gite-admin` | **nee** | 0 | IF, gite | Alleen een licentiebestand | **nee** |
| `ict-vocabulaire` | **nee** | 0 | overig, vocabulaire | Woordenlijst ICT | **nee** |
| `if-ai-blocks` | **nee** | 0 | IF, AI-blokken | AI-blokken voor artikelen | **nee** |
| `if-autoverzekering` | **nee** | 0 | IF, autoverzekering | Bronnen en artikel over autoverzekering | **nee** |
| `IF-Funnel-en-Tabel-Generator` | **nee** | 0 | IF, generator (oud) | Oudere generator | **nee** |
| `if-funnel-en-tabel-generator-v2` | **nee** | 0 | IF, generator | Generator voor funnels en tabellen | **nee** |
| `ifr-banner` | **nee** | 0 | IF, banner | Banner | **nee** |
| `infofrankrijk-en-nederlandersfr` | **nee** | 0 | overig, uitleg | Toelichtingspagina over beide platforms | **nee** |
| `infofrankrijk-klussen-archief` | **nee** | 0 | IF, klussenarchief | Archiefpagina | **nee** |
| `Infofrankrijk-klussen-en-verbouwen` | **nee** | 0 | IF, klussen | Artikelpagina | **nee** |
| `infofrankrijk-regioportretten` | **nee** | 0 | IF, regioportretten | Regioportretten in markdown | **nee** |
| `infographic-ouderenzorg` | **nee** | 0 | IF, infographic | Infographic met audio | **nee** |
| `internet-opties` | **nee** | 0 | IF, internet | Informatiepagina | **nee** |
| `internetverbinding` | **nee** | 0 | IF, internet | Informatiepagina over internetopties | **nee** |
| `kerstbanner2025` | **nee** | 0 | overig, banner | Banner | **nee** |
| `kluis` | **nee** | 0 | overig, kluis | Eén pagina, geen rekenwerk | **nee** |
| `KvK-beroep-zoeker` | **nee** | 0 | IF, beroepen | Beroepenzoeker | **nee** |
| `Module-naar-school-in-Frankrijk` | **nee** | 0 | IF, school | Informatiemodule | **nee** |
| `moestuin-fr` | **nee** | 0 | IF, moestuin | Moestuinsite; het enige bedrag is een abonnementsprijs | **nee** |
| `navigation` | **nee** | 0 | overig, navigatie | Navigatiecomponenten | **nee** |
| `Nedergids-v2` | **nee** | 0 | Nedergids | Gids met aanbiedingen | **nee** |
| `nienhuys-deli-familiekroniek` | **nee** | 0 | overig, privé | Familiekroniek | **nee** |
| `nl-verenigingen-in-frankrijk` | **nee** | 0 | NLFR, verenigingen | Overzichtspagina verenigingen | **nee** |
| `nlers-in-de-lavendelvelden` | **nee** | 0 | NLFR, special | Redactionele site zonder berekening | **nee** |
| `nlfr-banners` | **nee** | 0 | NLFR, banners | Banners | **nee** |
| `nlfr-berichten` | **nee** | 0 | NLFR, berichten | Serverless doorgifte van berichten | **nee** |
| `nlfr-if-distributie` | **nee** | 0 | NLFR / IF, distributie | Distributie van artikelen tussen platforms | **nee** |
| `nlfr-if-zoek` | **nee** | 0 | NLFR / IF, zoek | Zoekfunctie; getallen komen uit voorbeeldpagina's | **nee** |
| `nlfr-m` | **nee** | 0 | NLFR, mobiel | Eén statische pagina | **nee** |
| `nlfr-menu` | **nee** | 0 | NLFR, menu | Menu- en persmeetlogica met operationele drempels | **nee** |
| `nlfr-nieuwsbrief` | **nee** | 0 | NLFR, nieuwsbrief | Nieuwsbriefgeneratie | **nee** |
| `nlfr-v2` | **nee** | 0 | NLFR, v2 | Platformvernieuwing, Supabase en SQL; geen rekenfunctie | **nee** |
| `nlfr-verblijven-bij-leden` | **nee** | 0 | NLFR, verblijven | Verblijfsaanbod van leden | **nee** |
| `NLverenigingen-enquete-2021` | **nee** | 0 | NLFR, enquete | Enqueteverslag | **nee** |
| `Ouderenzorg` | **nee** | 0 | IF, ouderenzorg | Componentschil zonder bedragen | **nee** |
| `peil-nl-fr` | **nee** | 0 | Peil | Deze repo; nog leeg op het register na | **nee** |
| `platform-monitor` | **nee** | 0 | overig, monitoring | Monitoringpagina met repo-overzicht en statuscontroles | **nee** |
| `poll-engine` | **nee** | 0 | NLFR, polls | Pollmodule | **nee** |
| `savoirfrance` | **nee** | 0 | savoirfrance | Redactionele site, hardgecodeerde JSX zonder rekenwerk | **nee** |
| `Soins-Palliatifs-USP-beschikbaar` | **nee** | 0 | IF, palliatieve zorg | Overzichtspagina | **nee** |
| `tom-polak-taalarchief` | **nee** | 0 | overig, archief | Taalarchief | **nee** |
| `tool-templates` | **nee** | 0 | overig, templates | Sjablonen | **nee** |
| `verenigingen-kalender` | **nee** | 0 | NLFR, kalender | Agendadata van verenigingen | **nee** |
| `Verhalenbundel-Hans-vd-Bij` | **nee** | 0 | overig, archief | Alleen een licentiebestand | **nee** |
| `vervoersgroep` | **nee** | 0 | NLFR, vervoersgroep | Vervoersgroep met Apps Script, geen bedragen aangetroffen | **nee** |
| `Werk-in-Frankrijk-platform` | **nee** | 0 | IF, werk | Beroepenplatform | **nee** |
| `wishlist` | **nee** | 0 | overig, wishlist | Wensenlijst-applicatie | **nee** |
| `wp-snippets` | **nee** | 0 | overig, WordPress | Leeskopie van WordPress-snippets en redirects | **nee** |
| `zorglexicon-frankrijk` | **nee** | 0 | IF, zorglexicon | Begrippenlijst zorg | **nee** |

## Telling

| | Aantal |
|---|---|
| Repo's totaal | 120 |
| Rekenfunctie ja | 18 |
| Rekenfunctie mogelijk | 16 |
| Rekenfunctie nee | 86 |
| Parameters genoteerd | 234 |
| Besluit Anton, aangesloten | 22 |
| Besluit Anton, niet aangesloten | 98 |
