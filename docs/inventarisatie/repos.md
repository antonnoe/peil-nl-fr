# Inventarisatie repo's — rekenfunctie ja, nee of mogelijk

Peildatum 16 september 2026. Alle 120 repo's onder het account antonnoe, lezend beoordeeld.

Zeg per regel ja of nee op de kolom **Rekenfunctie**. `Par.` is het aantal parameters dat ik in die repo heb gevonden en genoteerd in `parameters.md`.

| Repo | Rekenfunctie | Par. | Vermoedelijk Cockpit-onderdeel | Motivering |
|---|---|---|---|---|
| `financieel-kompas-ai` | **ja** | 59 | CC / IF — Financieel Kompas (AI-versie) | Volledig parameterbestand config.json met NL- en FR-belasting-, zorg- en CAK-waarden, inclusief bron en verificatiedatum per grootheid. |
| `cafeclaude` | **ja** | 34 | CC — Cafe Claude | Domein- en auditprompts bevatten harde 2026-bedragen en tarieven die de AI als handboek gebruikt (IR-schijven, décote, micro-BIC, BRSS, successierechten). |
| `financieel-kompas` | **ja** | 20 | IF — Financieel Kompas (voorganger) | Oudere config.json met dezelfde structuur maar afwijkende waarden (editie 2025) plus een Belgisch blok. |
| `Vastgoedtransactie` | **ja** | 20 | Vastgoedtransacties — transactiekostentool | Rekenkern calc.js met emolumenten, TPF, plus-value-abattements en surtaxe, plus dmto.json met 101 departementale tarieven en bronnen.json. |
| `energieportaal` | **ja** | 10 | IF — EnergiePortaal | Rekenengine met klimaatzones, DPE-coefficienten, U-waarden en een prijsmodule met actuele Franse energieprijzen. |
| `dossier-elektriciteit-if` | **ja** | 9 | IF — dossier Elektriciteit | Hoofdstukken bevatten geverifieerde Consuel- en Enedis-tarieven met bron en verificatiedatum. |
| `briefhulp-fr` | **ja** | 8 | IF — Briefhulp | Brieftemplates rekenen met wettelijke termijnen en boetepercentages (borg, telecom, belastingbezwaar). |
| `Plus-Value-Calculator` | **ja** | 7 | Vastgoedtransacties — plus-value | Python-rekenkern met abattementsreeksen, surtaxe-barema, forfaits en tarieven voor de Franse meerwaardeheffing. |
| `zorgkompas-frankrijk` | **ja** | 7 | IF — ZorgKompas | Scenariodatabase met BRSS-tarieven en vergoedingspercentages van de Securite sociale. |
| `Energiecalculator-Frankrijk-door-Nederlanders.fr` | **ja** | 5 | NLFR — energiecalculator (oud) | Vroege versie van de energie-engine met dezelfde HDD- en PV-waarden maar deels afwijkende U-presets. |
| `warmteverlies-calculator` | **ja** | 5 | IF — warmteverlies | Oudere variant van dezelfde energie-engine met dezelfde klimaat-, prijs- en U-waardeconstanten. |
| `erf-en-schenkingsrecht-nl-fr` | **ja** | 4 | IF — erf- en schenkingsrecht | Franse successie- en schenkingsbaremes met tarieven en abattements in app.js, met bronregister en verificatiedata. |
| `ca-btw-oss-tool` | **ja** | 3 | CA intern — btw/OSS | Regelset met btw-tarieven NL en FR en een rekenmodule voor aangifterubrieken en OSS. |
| `e-facturatie-frankrijk` | **ja** | 3 | IF / CA — e-facturatie | Feitenobjecten met wettelijke invoeringsdata en ondernemingsgroottegrenzen, elk met bron en controledatum. |
| `energiebesparing-subsidie-en-fiscale-regelingen` | **ja** | 3 | IF — subsidiewijzer | Beslislogica met btw-tarieven voor renovatie en voorwaardendrempels voor Eco-PTZ. |
| `gitekompas-fr` | **ja** | 3 | IF — GiteKompas | Micro-BIC-parameters (abattement en omzetplafond per activiteitstype), degressieve reeks en niet-residentbandbreedte. |
| `if-mobiel` | **ja** | 1 | IF — mobiele schil | Bevat een byte-identieke kopie van de engine van energieportaal (engine.js, dpe.js, archetypes.js). |
| `woningzoeker-frankrijk` | **ja** | 1 | IF — Woningzoeker | Budgetstap rekent notariskosten als vast percentage over de aankoopprijs. |
| `nlfr-ai-agent` | **mogelijk** | 5 | NLFR — AI-agent | Kennisbestand voor de AI-adviseur bevat richtprijzen, subsidiebedragen en energiekentallen zonder bronregel per waarde. |
| `dossierfrankrijk` | **mogelijk** | 4 | DossierFrankrijk | Beslisboom noemt kostenindicaties en een rekenvoorbeeld; alleen code en configuratie beoordeeld, geen gebruikersdata. |
| `ouderenzorg-fr` | **mogelijk** | 4 | IF — Ouderenzorg | Dossierskelet met een tabel van Franse zorgtoeslagen en plafonds, aangeduid als indicatief. |
| `erfrecht-en-testament` | **mogelijk** | 3 | IF — erfrecht (artikel) | Artikel met harde successietarieven en vrijstellingen, zonder rekenfunctie. |
| `bouwvergunningwijzer-frankrijk` | **mogelijk** | 2 | IF — Bouwvergunningwijzer | Regelmatrix met oppervlaktedrempels voor DP en PC; nog niet gekoppeld aan Legifrance-artikelen. |
| `infofrankrijk-routecontrole` | **mogelijk** | 2 | IF — Routecontrole | Reiskostenraming met brandstofverbruik, literprijs en huurbandbreedtes als vaste aannames. |
| `taalhulp-fr` | **mogelijk** | 2 | IF — Taalhulp | Begrippenlijst bevat losse tarieven als toelichting bij een term, niet als rekenparameter. |
| `verenigings-dashboard` | **mogelijk** | 2 | Verenigings-dashboard | Rekent kosten met API-tarieven per miljoen tokens, met bron en raadpleegdatum; buiten het fiscale en sociale domein. |
| `Aankoop-kompas-voor-franse-huizen-in-frankrijk` | **mogelijk** | 1 | IF — Aankoopkompas | Rekent technische waarde en adviesbod uit gebruikersinvoer; geen vaste fiscale parameters. |
| `bouwgrond-frankrijk-check` | **mogelijk** | 1 | IF — bouwgrondcheck | Analyse op basis van externe API's met een vaste zoekradius; geen fiscale parameters. |
| `gasdossier-stillewille` | **mogelijk** | 1 | overig — gasdossier | Historisch dossier met bedragen en percentages uit een concreet gasgeschil; geen herbruikbare parameters. |
| `if-tools-api` | **mogelijk** | 1 | IF — tools-API | AI-prompt geeft een vast percentage voor frais de notaire mee aan de woninganalyse. |
| `klussen-in-frankrijk` | **mogelijk** | 1 | KIF — hoofdrepo | Bevat een feitenlaag-schema dat expliciet voor bedragen en tarieven is ontworpen (met bron, bronsoort, geverifieerd, geldigVanaf), maar het enige feitenbestand is nog leeg; wel losse bedragen in de brontekst. |
| `klussen-in-frankrijk-christian-von-klosterlein` | **mogelijk** | 1 | KIF — artikelen | Artikeldata met technische percentages en maten; geen fiscale of sociale parameters aangetroffen. |
| `vastgoed-analyse` | **mogelijk** | 1 | IF — vastgoedanalyse | Rekent met marktprijzen per m2 uit DVF; geen eigen vastgelegde parameters. |
| `vastgoed-in-frankrijk` | **mogelijk** | 1 | IF — vastgoed in Frankrijk | Analysetool op .gouv-API's; rekenwerk zit in de AI-prompt, geen vastgelegde parameters. |
| `2knoppen_onder_menu` | **nee** | 0 | overig — knoppen | Knoppenblok. |
| `3knoppen` | **nee** | 0 | overig — knoppen | Knoppenblok. |
| `4-knoppen-v2` | **nee** | 0 | overig — knoppen | Knoppenblok. |
| `adressen-van-.gouv-tot-nl-verenigingen` | **nee** | 0 | IF — adressen | Adressenlijst. |
| `afbeeldingen` | **nee** | 0 | overig — beeld | Beeldbank. |
| `anton-ai-werkwijze` | **nee** | 0 | overig — werkwijze | Werkwijze-, rollen- en inventarisatiedocumenten; bevat een eerdere repo-inventarisatie maar geen rekenparameters. |
| `anton-ui-blocks` | **nee** | 0 | overig — UI | UI-blokken. |
| `antonnoe-antons-cockpit---private` | **nee** | 0 | Anton's Cockpit | Beheertool met operationele drempels (betaalmuur, alarmen), geen domeinparameters. |
| `antonnoe-communities-abroad-style-studio` | **nee** | 0 | CA — Style Studio | Huisstijl- en componentenbibliotheek. |
| `antonnoe-redactie-tool` | **nee** | 0 | CA — redactietool | Redactiehulp, markdown naar HTML. |
| `api-catalog-france` | **nee** | 0 | overig — API-catalogus | Catalogus van Franse open API's. |
| `baolse-bierdrinkers` | **nee** | 0 | overig — privé | Privéproject. |
| `Begrippen-NL-FR-vertaalmodule` | **nee** | 0 | overig — begrippen | Vertaalmodule met begrippen, geen bedragen. |
| `bosbranden` | **nee** | 0 | IF — bosbranden | Kaart- en informatietoepassing over bosbranden. |
| `ca-dossierguide` | **nee** | 0 | CA — dossierguide | Dossierbegeleiding zonder rekenfunctie. |
| `cafe-claude-lexicon` | **nee** | 0 | CC — lexicon | Leeg, geen default branch. |
| `Cafe-Jeudi-Banner` | **nee** | 0 | NLFR — banner | Banner. |
| `communities-abroad-seo-agent` | **nee** | 0 | CA — SEO-agent | SEO-agent op Search Console-data. |
| `communitiesabroad` | **nee** | 0 | CA — corporate | Bedrijfssite. |
| `controle-technique-zoeker` | **nee** | 0 | IF — controle technique | Zoeker met prijsfilters; de bedragen zijn filterwaarden, geen parameters. |
| `dashboard-admin` | **nee** | 0 | overig — dashboard | Statische beheerpagina. |
| `data` | **nee** | 0 | NLFR / IF — forumdata | WordPress-export van forumdraden; uitsluitend gebruikersinhoud, geen code of configuratie. Inhoud niet beoordeeld. |
| `De-rechtspersoon-checker` | **nee** | 0 | IF — rechtspersoon | Checker rechtsvormen. |
| `desert` | **nee** | 0 | overig | Losse pagina's. |
| `devisdossier-frankrijk` | **nee** | 0 | IF — devisdossier | Eén pagina over offertes; de getallen zijn opmaakcodes. |
| `dossier-ouderenzorg` | **nee** | 0 | IF — Ouderenzorg (schil) | Dossierschil zonder bedragen in code. |
| `emigreren-naar-frankrijk-beslisboom` | **nee** | 0 | IF — beslisboom | Beslisboom zonder bedragen. |
| `energiekompas-frankrijk` | **nee** | 0 | IF — redirect | Alleen een permanente redirect naar energieportaal. |
| `evenementenkaart` | **nee** | 0 | NLFR — evenementen | Evenementenkaart. |
| `fr-auto-import-tool` | **nee** | 0 | IF — import | Importtool voor artikelen. |
| `france-M2` | **nee** | 0 | IF — M2 | Eén pagina. |
| `france-newsdesk` | **nee** | 0 | NLFR / IF — newsdesk | Nieuwsverwerking en RSS-uitvoer. |
| `Frankrijk-legal` | **nee** | 0 | IF — legal | Juridische pagina's zonder bedragen. |
| `frankrijknieuws` | **nee** | 0 | IF — nieuws | Nieuwsfeed. |
| `franse-huizen-checker` | **nee** | 0 | IF — huizenchecker | Checker zonder rekenparameters. |
| `Franse-taal-in-contextuele-module` | **nee** | 0 | IF — taalmodule | Taalmodule; percentages zijn opmaak of voorbeelden. |
| `GEODIRECTORY` | **nee** | 0 | overig — gearchiveerd | Gearchiveerd, alleen een licentiebestand. |
| `Gite-admin` | **nee** | 0 | IF — gite | Alleen een licentiebestand. |
| `ict-vocabulaire` | **nee** | 0 | overig — vocabulaire | Woordenlijst ICT. |
| `if-ai-blocks` | **nee** | 0 | IF — AI-blokken | AI-blokken voor artikelen. |
| `if-autoverzekering` | **nee** | 0 | IF — autoverzekering | Bronnen en artikel over autoverzekering; polisvoorwaarden als PDF, geen vastgelegde parameters in code of configuratie. |
| `IF-Funnel-en-Tabel-Generator` | **nee** | 0 | IF — generator (oud) | Oudere generator. |
| `if-funnel-en-tabel-generator-v2` | **nee** | 0 | IF — generator | Generator voor funnels en tabellen. |
| `ifr-banner` | **nee** | 0 | IF — banner | Banner. |
| `infofrankrijk-en-nederlandersfr` | **nee** | 0 | overig — uitleg | Toelichtingspagina over beide platforms. |
| `infofrankrijk-klussen-archief` | **nee** | 0 | IF — klussenarchief | Archiefpagina. |
| `Infofrankrijk-klussen-en-verbouwen` | **nee** | 0 | IF — klussen | Artikelpagina. |
| `infofrankrijk-regioportretten` | **nee** | 0 | IF — regioportretten | Regioportretten in markdown. |
| `infographic-ouderenzorg` | **nee** | 0 | IF — infographic | Infographic met audio. |
| `internet-opties` | **nee** | 0 | IF — internet | Informatiepagina. |
| `internetverbinding` | **nee** | 0 | IF — internet | Informatiepagina over internetopties. |
| `kerstbanner2025` | **nee** | 0 | overig — banner | Banner. |
| `kluis` | **nee** | 0 | overig — kluis | Eén pagina, geen rekenwerk. |
| `KvK-beroep-zoeker` | **nee** | 0 | IF — beroepen | Beroepenzoeker. |
| `Module-naar-school-in-Frankrijk` | **nee** | 0 | IF — school | Informatiemodule. |
| `moestuin-fr` | **nee** | 0 | IF — moestuin | Moestuinsite; het enige bedrag is een abonnementsprijs. |
| `navigation` | **nee** | 0 | overig — navigatie | Navigatiecomponenten. |
| `Nedergids-v2` | **nee** | 0 | Nedergids | Gids met aanbiedingen; bedragen zijn aanbodgegevens, geen parameters. |
| `nienhuys-deli-familiekroniek` | **nee** | 0 | overig — privé | Familiekroniek. |
| `nl-verenigingen-in-frankrijk` | **nee** | 0 | NLFR — verenigingen | Overzichtspagina verenigingen. |
| `nlers-in-de-lavendelvelden` | **nee** | 0 | NLFR — special | Redactionele site zonder berekening. |
| `nlfr-banners` | **nee** | 0 | NLFR — banners | Banners. |
| `nlfr-berichten` | **nee** | 0 | NLFR — berichten | Serverless doorgifte van berichten. |
| `nlfr-if-distributie` | **nee** | 0 | NLFR / IF — distributie | Distributie van artikelen tussen platforms. |
| `nlfr-if-zoek` | **nee** | 0 | NLFR / IF — zoek | Zoekfunctie; getallen komen uit voorbeeldpagina's. |
| `nlfr-m` | **nee** | 0 | NLFR — mobiel | Eén statische pagina. |
| `nlfr-menu` | **nee** | 0 | NLFR — menu | Menu- en persmeetlogica met operationele drempels, geen fiscale of sociale grootheden. |
| `nlfr-nieuwsbrief` | **nee** | 0 | NLFR — nieuwsbrief | Nieuwsbriefgeneratie. |
| `nlfr-v2` | **nee** | 0 | NLFR — v2 | Platformvernieuwing, Supabase en SQL; geen rekenfunctie. |
| `nlfr-verblijven-bij-leden` | **nee** | 0 | NLFR — verblijven | Verblijfsaanbod van leden. |
| `NLverenigingen-enquete-2021` | **nee** | 0 | NLFR — enquete | Enqueteverslag. |
| `Ouderenzorg` | **nee** | 0 | IF — ouderenzorg | Componentschil zonder bedragen. |
| `peil-nl-fr` | **nee** | 0 | Peil | Deze repo; nog leeg op het register na. |
| `platform-monitor` | **nee** | 0 | overig — monitoring | Monitoringpagina met repo-overzicht en statuscontroles. |
| `poll-engine` | **nee** | 0 | NLFR — polls | Pollmodule. |
| `savoirfrance` | **nee** | 0 | savoirfrance | Redactionele site, hardgecodeerde JSX zonder rekenwerk. |
| `Soins-Palliatifs-USP-beschikbaar` | **nee** | 0 | IF — palliatieve zorg | Overzichtspagina. |
| `tom-polak-taalarchief` | **nee** | 0 | overig — archief | Taalarchief. |
| `tool-templates` | **nee** | 0 | overig — templates | Sjablonen. |
| `verenigingen-kalender` | **nee** | 0 | NLFR — kalender | Agendadata van verenigingen. |
| `Verhalenbundel-Hans-vd-Bij` | **nee** | 0 | overig — archief | Alleen een licentiebestand. |
| `vervoersgroep` | **nee** | 0 | NLFR — vervoersgroep | Vervoersgroep met Apps Script, geen bedragen aangetroffen. |
| `Werk-in-Frankrijk-platform` | **nee** | 0 | IF — werk | Beroepenplatform; de aangetroffen getallen zijn opmaakwaarden. |
| `wishlist` | **nee** | 0 | overig — wishlist | Wensenlijst-applicatie. |
| `wp-snippets` | **nee** | 0 | overig — WordPress | Leeskopie van WordPress-snippets en redirects. |
| `zorglexicon-frankrijk` | **nee** | 0 | IF — zorglexicon | Begrippenlijst zorg. |

## Telling

| | Aantal |
|---|---|
| Repo's totaal | 120 |
| Rekenfunctie ja | 18 |
| Rekenfunctie mogelijk | 16 |
| Rekenfunctie nee | 86 |
| Parameters genoteerd | 234 |
