// Grootheden uit de volledigheidslijst die nog door geen aangesloten tool worden gebruikt.
// Allemaal status te_verifieren, zonder waarde, met bron-URL of bronomschrijving.
// Zie docs/volledigheid.md voor de redenering en de gatenlijst.

const G = (id, nl, fr, off, reg, eh, effect, url, kn, inst, freq, opm, extra = {}) => ({
  id, nl, fr, off, reg, eh, effect, klasse: 'overheid_vastgesteld',
  url, kn, bs: 'nog niet geraadpleegd', inst, freq, opm, kand: true, jaar: '2026', ...extra,
});

const SP = (f) => 'https://www.service-public.fr/particuliers/vosdroits/' + f;

export const GATEN = [

// ------------------------------------------------------------------- NL fiscaal
G('p.nl.ib.aow_leeftijd', 'AOW-leeftijd', 'Age de la retraite AOW', 'AOW-leeftijd per geboortejaar', 'nl.ib', 'jaren en maanden', 'bepaalt_toepasselijkheid',
  'https://www.svb.nl/nl/aow/aow-leeftijd', 'SVB, AOW-leeftijd per geboortejaar', 'SVB', 'jaarlijks',
  'Bepaalt of het tarief onder of boven de AOW-leeftijd geldt. Onmisbaar voor elke berekening met een Nederlands pensioen, maar nog nergens vastgelegd.'),

G('p.nl.ib.premie_volksverzekeringen', 'Premiepercentages volksverzekeringen', 'Taux des assurances nationales', 'AOW-, Anw- en Wlz-premie', 'nl.ib', 'fractie', 'verhoogt_last',
  'https://www.belastingdienst.nl', 'Belastingdienst, premiepercentages volksverzekeringen', 'Belastingdienst', 'jaarlijks',
  'De tools rekenen met gecombineerde tarieven box 1 waarin de premie al verwerkt zit. Voor wie in Frankrijk woont en niet premieplichtig is, moet de premie er juist uit. Die splitsing ontbreekt.',
  { sot: 'premie_volksverzekering' }),

G('p.nl.ib.ouderenkorting', 'Ouderenkorting', 'Credit d impot pour personnes agees', 'Ouderenkorting', 'nl.ib', 'EUR', 'verlaagt_last',
  'https://www.belastingdienst.nl', 'Belastingdienst, heffingskortingen', 'Belastingdienst', 'jaarlijks',
  'Van toepassing vanaf de AOW-leeftijd en dus voor vrijwel elke gepensioneerde in Frankrijk met Nederlands inkomen.', { vt: 'heffingskorting' }),

G('p.nl.ib.alleenstaande_ouderenkorting', 'Alleenstaande ouderenkorting', 'Credit d impot, personne agee seule', 'Alleenstaande ouderenkorting', 'nl.ib', 'EUR', 'verlaagt_last',
  'https://www.belastingdienst.nl', 'Belastingdienst, heffingskortingen', 'Belastingdienst', 'jaarlijks',
  'Alleen bij recht op een AOW voor alleenstaanden.', { vt: 'heffingskorting' }),

G('p.nl.ib.eigenwoningforfait', 'Eigenwoningforfait', 'Valeur locative forfaitaire du logement', 'Eigenwoningforfait', 'nl.ib', 'fractie', 'verhoogt_last',
  'https://www.belastingdienst.nl', 'Belastingdienst, eigenwoningforfait', 'Belastingdienst', 'jaarlijks',
  'Nodig voor wie een Nederlandse eigen woning aanhoudt en naar Frankrijk verhuist, en voor de omgekeerde route.'),

G('p.nl.ib.aftrektarief_hypotheekrente', 'Maximaal aftrektarief hypotheekrente', 'Taux maximal de deduction des interets', 'Tariefaanpassing aftrekposten', 'nl.ib', 'fractie', 'verlaagt_last',
  'https://www.belastingdienst.nl', 'Belastingdienst, tariefsaanpassing aftrekposten', 'Belastingdienst', 'jaarlijks',
  'Bepaalt tegen welk tarief de hypotheekrente nog aftrekbaar is.'),

G('p.nl.box2.tarieven', 'Tarieven box 2', 'Taux box 2', 'Aanmerkelijk belang, tarieven en schijf', 'nl.box2', 'EUR en fractie', 'verhoogt_last',
  'https://www.belastingdienst.nl', 'Belastingdienst, box 2', 'Belastingdienst', 'jaarlijks',
  'Relevant voor ondernemers met een BV die naar Frankrijk verhuizen. De verdragstoewijzing van dividend uit aanmerkelijk belang is een eigen vraagstuk.'),

G('p.nl.zorg.eigen_risico', 'Verplicht eigen risico Zvw', 'Franchise obligatoire de l assurance maladie', 'Verplicht eigen risico', 'nl.zorg', 'EUR/jaar', 'verhoogt_last',
  'https://www.rijksoverheid.nl', 'Rijksoverheid, eigen risico zorgverzekering', 'Ministerie van VWS', 'jaarlijks',
  'Financieel Kompas laat het eigen risico bewust buiten de berekening en meldt dat in de uitsplitsing. Voor een volledig beeld van de jaarlast hoort het bedrag er wel te zijn.'),

G('p.nl.zvw.percentage_hoog', 'Zvw-bijdrage, hoge percentage', 'Cotisation Zvw, taux employeur', 'Hoge percentage inkomensafhankelijke bijdrage Zvw', 'nl.zvw', 'fractie', 'verhoogt_last',
  'https://www.belastingdienst.nl', 'Belastingdienst, percentages inkomensafhankelijke bijdrage Zvw', 'Belastingdienst', 'jaarlijks',
  'Over loon draagt de werkgever de werkgeversheffing af. Alleen het lage percentage staat nu in het register.'),

G('p.nl.erf.vrijstelling_partner', 'Vrijstelling erfbelasting partner', 'Abattement sur les droits de succession, partenaire', 'Partnervrijstelling erfbelasting', 'nl.erf', 'EUR', 'verlaagt_last',
  'https://www.belastingdienst.nl', 'Belastingdienst, vrijstellingen erfbelasting', 'Belastingdienst', 'jaarlijks',
  'Bij een nalatenschap met vermogen in twee landen is de Nederlandse kant volledig onbeschreven. Het Franse deel staat wel in het register.', { vt: 'vrijstelling' }),

G('p.nl.erf.vrijstelling_kind', 'Vrijstelling erfbelasting kind', 'Abattement, enfant', 'Kindvrijstelling erfbelasting', 'nl.erf', 'EUR', 'verlaagt_last',
  'https://www.belastingdienst.nl', 'Belastingdienst, vrijstellingen erfbelasting', 'Belastingdienst', 'jaarlijks',
  'Tegenhanger van het Franse abattement van 100.000 euro per kind per ouder.', { vt: 'vrijstelling' }),

G('p.nl.erf.tarieven', 'Tarieven erfbelasting', 'Taux des droits de succession', 'Tarieven erfbelasting per groep', 'nl.erf', 'EUR en fractie', 'verhoogt_last',
  'https://www.belastingdienst.nl', 'Belastingdienst, tarieven erfbelasting', 'Belastingdienst', 'jaarlijks',
  'Nederland kent twee schijven per verwantschapsgroep, Frankrijk zeven. Zonder beide kan een nalatenschap over de grens niet worden vergeleken.'),

G('p.nl.schenk.vrijstelling_jaarlijks_kind', 'Jaarlijkse schenkingsvrijstelling kind', 'Abattement annuel sur les donations, enfant', 'Jaarlijkse vrijstelling schenkbelasting', 'nl.schenk', 'EUR', 'verlaagt_last',
  'https://www.belastingdienst.nl', 'Belastingdienst, vrijstellingen schenkbelasting', 'Belastingdienst', 'jaarlijks',
  'Nederland kent een jaarlijkse vrijstelling, Frankrijk een vrijstelling die per 15 jaar herleeft. Dat verschil is bepalend bij schenkingsplanning over de grens.', { vt: 'vrijstelling' }),

G('p.nl.ovb.tarieven', 'Tarieven overdrachtsbelasting', 'Taux des droits de mutation, Pays-Bas', 'Overdrachtsbelasting woning en overig', 'nl.ovb', 'fractie', 'verhoogt_last',
  'https://www.belastingdienst.nl', 'Belastingdienst, overdrachtsbelasting', 'Belastingdienst', 'jaarlijks',
  'De Franse DMTO staan volledig in het register, de Nederlandse tegenhanger niet. Voor de omgekeerde route, een Fransman die in Nederland koopt, ontbreekt daarmee alles.'),

G('p.nl.btw.tarieven', 'Btw-tarieven Nederland', 'Taux de TVA, Pays-Bas', 'Algemeen en verlaagd btw-tarief', 'nl.btw', 'procent', 'verhoogt_last',
  'https://www.belastingdienst.nl', 'Belastingdienst, btw-tarieven', 'Belastingdienst', 'zelden',
  'De niet-aangesloten repo ca-btw-oss-tool voert deze tarieven met bron en datum. Zodra die repo wordt aangesloten, kan de waarde hier terecht.'),

// ------------------------------------------------------------------- FR fiscaal
G('p.fr.sociaal.pass', 'Plafond annuel de la securite sociale', 'Plafond annuel de la securite sociale', 'PASS', 'fr.sociaal', 'EUR/jaar', 'bepaalt_grondslag',
  'https://www.urssaf.fr', 'Urssaf, plafond de la securite sociale', 'Urssaf', 'jaarlijks',
  'Het PASS is de rekeneenheid achter tientallen Franse drempels, waaronder de Urssaf-drempel voor chambres d hotes die nu als los bedrag in een handboek staat.'),

G('p.fr.sociaal.smic', 'SMIC, wettelijk minimumloon', 'SMIC horaire et mensuel', 'Salaire minimum interprofessionnel de croissance', 'fr.sociaal', 'EUR', 'bepaalt_grondslag',
  'https://www.service-public.fr/particuliers/vosdroits/F2300', 'service-public.fr, fiche F2300', 'Ministere du travail', 'jaarlijks',
  'Referentiepunt voor drempels in het arbeids- en socialezekerheidsrecht.'),

G('p.fr.ir.seuil_declaration', 'Aangiftedrempel impot sur le revenu', 'Seuil de declaration de revenus', null, 'fr.ir', 'EUR', 'bepaalt_toepasselijkheid',
  'https://www.impots.gouv.fr', 'impots.gouv.fr, obligation de declarer', 'DGFiP', 'jaarlijks',
  'Bepaalt of er uberhaupt aangifte moet worden gedaan. Voor een niet-resident met alleen Frans vastgoedinkomen is dat de eerste vraag.', { vt: 'drempel' }),

G('p.fr.ir.contribution_haut_revenus', 'Contribution exceptionnelle sur les hauts revenus', 'Contribution exceptionnelle sur les hauts revenus', 'CEHR, art. 223 sexies CGI', 'fr.ir', 'EUR en procent', 'verhoogt_last',
  'https://www.impots.gouv.fr', 'impots.gouv.fr, contribution exceptionnelle sur les hauts revenus; art. 223 sexies CGI', 'DGFiP', 'jaarlijks',
  'Komt bovenop de gewone schijven vanaf een revenu fiscal de reference van enkele honderdduizenden euro s. Ontbreekt in alle tools.'),

G('p.fr.ir.taux_minimum_non_residents', 'Minimumtarief voor niet-residenten', 'Taux minimum d imposition des non-residents', 'Art. 197 A CGI', 'fr.ir', 'procent en EUR', 'verhoogt_last',
  'https://www.impots.gouv.fr/particulier/non-resident', 'impots.gouv.fr, non-residents; art. 197 A CGI', 'DGFiP', 'jaarlijks',
  'GiteKompas toont hiervoor een bandbreedte van 20 tot 30 procent. De wettelijke staffel met de inkomensgrens waarboven 30 procent geldt, staat nergens vast.'),

G('p.fr.pv.exoneration_residence_principale', 'Vrijstelling meerwaarde hoofdverblijf', 'Exoneration de la residence principale', 'Art. 150 U II 1 CGI', 'fr.pv', 'tekst', 'verlaagt_last',
  'https://www.impots.gouv.fr/particulier/questions/je-vends-mon-bien-immobilier-vais-je-payer-de-la-plus-value-immobiliere',
  'art. 150 U II 1 CGI; impots.gouv.fr', 'DGFiP', 'zelden',
  'De meest gebruikte vrijstelling van allemaal, en de enige reden waarom de meeste verkopen onbelast blijven. Vastgoedtransactie kent wel de vrijstelling voor de voormalige hoofdwoning van een niet-resident, maar niet deze.', { vt: 'vrijstelling' }),

G('p.fr.th.taxe_habitation_residence_secondaire', 'Taxe d habitation op een tweede woning', 'Taxe d habitation sur les residences secondaires', 'THRS', 'fr.th', 'procent', 'verhoogt_last',
  SP('F42'), 'service-public.fr, taxe d habitation sur les residences secondaires', 'DGFiP en gemeenten', 'jaarlijks',
  'Een jaarlijkse last die vrijwel elke Nederlander met een tweede woning in Frankrijk treft, met een gemeentelijk tarief en in gespannen gebieden een opslag. Staat in geen enkele tool.'),

G('p.fr.tf.taxe_fonciere', 'Taxe fonciere', 'Taxe fonciere sur les proprietes baties', 'TFPB', 'fr.tf', 'procent', 'verhoogt_last',
  SP('F59'), 'service-public.fr, taxe fonciere sur les proprietes baties', 'DGFiP en gemeenten', 'jaarlijks',
  'De tweede jaarlijkse vastgoedlast, verschuldigd door elke eigenaar. Het tarief wordt per gemeente vastgesteld op de valeur locative cadastrale.'),

G('p.fr.tf.revalorisation_valeurs_locatives', 'Jaarlijkse herwaardering van de valeur locative', 'Revalorisation forfaitaire des valeurs locatives', null, 'fr.tf', 'procent', 'bepaalt_grondslag',
  'https://www.impots.gouv.fr', 'DGFiP, coefficient de revalorisation forfaitaire', 'DGFiP', 'jaarlijks',
  'De grondslag van taxe fonciere en taxe d habitation wordt jaarlijks bij wet geindexeerd. Zonder die factor is een meerjarige raming van de vaste lasten onmogelijk.'),

G('p.fr.cfe.minimum', 'Cotisation fonciere des entreprises, minimumbijdrage', 'CFE, base minimum', null, 'fr.cfe', 'EUR', 'verhoogt_last',
  'https://www.impots.gouv.fr', 'impots.gouv.fr, cotisation fonciere des entreprises', 'DGFiP en gemeenten', 'jaarlijks',
  'Elke micro-entrepreneur krijgt hiermee te maken na het eerste jaar. De CVAE-drempel staat wel in het register, de CFE niet.'),

G('p.fr.tva.tarif_intermediaire', 'Btw-tarief, tussentarief', 'Taux intermediaire de TVA', 'Art. 279 CGI', 'fr.tva', 'procent', 'verhoogt_last',
  'https://www.impots.gouv.fr', 'impots.gouv.fr, taux de TVA; art. 279 CGI', 'DGFiP', 'zelden',
  'Het tarief van 10 procent wordt in twee tools genoemd naast de 5,5 procent, maar staat nergens als eigen grootheid.'),

G('p.fr.succ.abattement_petit_enfant', 'Vrijstelling kleinkind', 'Abattement, petit-enfant', 'Art. 790 B CGI', 'fr.succ', 'EUR', 'verlaagt_last',
  SP('F14198'), 'service-public.fr, abattements sur les donations; art. 790 B CGI', 'DGFiP', 'zelden',
  'Ontbreekt terwijl de vrijstellingen voor kind, broer, zus en niet-verwante wel zijn vastgelegd.', { vt: 'abattement' }),

G('p.fr.succ.abattement_handicap', 'Extra vrijstelling bij handicap', 'Abattement supplementaire, personne handicapee', 'Art. 779 II CGI', 'fr.succ', 'EUR', 'verlaagt_last',
  SP('F14198'), 'service-public.fr; art. 779 II CGI', 'DGFiP', 'zelden',
  'Cumuleert met de andere vrijstellingen.', { vt: 'abattement' }),

G('p.fr.succ.vrijstelling_echtgenoot', 'Vrijstelling echtgenoot en PACS-partner', 'Exoneration du conjoint survivant et du partenaire pacse', 'Art. 796-0 bis CGI', 'fr.succ', 'tekst', 'verlaagt_last',
  SP('F14198'), 'art. 796-0 bis CGI', 'DGFiP', 'zelden',
  'De langstlevende echtgenoot is in Frankrijk volledig vrijgesteld van erfbelasting. Dat is een van de scherpste verschillen met Nederland en staat in geen enkele tool.', { vt: 'vrijstelling' }),

// ------------------------------------------------------------------- grensoverschrijdend
G('p.xb.verdrag.artikel_pensioen', 'Verdragstoewijzing pensioen en lijfrente', 'Attribution conventionnelle des pensions', 'Art. 18 en 19 verdrag NL-FR 1973', 'xb.verdrag', 'tekst', 'bepaalt_toepasselijkheid',
  'https://wetten.overheid.nl/BWBV0003649', 'Verdrag tussen Nederland en Frankrijk tot het vermijden van dubbele belasting, 16 maart 1973, art. 18 en 19', 'Ministerie van Financien', 'zelden',
  'Bepaalt of Nederland of Frankrijk mag heffen over een pensioen. Dit is de eerste vraag bij elke emigratie en er is in het hele netwerk van platforms geen enkele vastlegging van.'),

G('p.xb.verdrag.artikel_onroerend', 'Verdragstoewijzing inkomsten uit onroerend goed', 'Attribution des revenus immobiliers', 'Art. 6 verdrag NL-FR 1973', 'xb.verdrag', 'tekst', 'bepaalt_toepasselijkheid',
  'https://wetten.overheid.nl/BWBV0003649', 'Verdrag NL-FR 1973, art. 6', 'Ministerie van Financien', 'zelden',
  'Het situsbeginsel: inkomsten uit onroerend goed worden belast in het land waar het pand ligt.'),

G('p.xb.verdrag.artikel_dividend', 'Bronheffing op dividend onder het verdrag', 'Retenue a la source sur les dividendes', 'Art. 10 verdrag NL-FR 1973', 'xb.verdrag', 'procent', 'verhoogt_last',
  'https://wetten.overheid.nl/BWBV0003649', 'Verdrag NL-FR 1973, art. 10', 'Ministerie van Financien', 'zelden',
  'Bepaalt het maximale bronheffingstarief en daarmee hoeveel er te verrekenen valt.'),

G('p.xb.verdrag.voorkomingsmethode', 'Methode ter voorkoming van dubbele belasting', 'Methode d elimination de la double imposition', 'Art. 24 verdrag NL-FR 1973', 'xb.verdrag', 'tekst', 'verlaagt_last',
  'https://wetten.overheid.nl/BWBV0003649', 'Verdrag NL-FR 1973, art. 24', 'Ministerie van Financien', 'zelden',
  'Vrijstelling met progressievoorbehoud of verrekening: het verschil bepaalt de uitkomst en wordt nergens gemodelleerd.'),

G('p.xb.verdrag.nieuw_verdrag_status', 'Status van het nieuwe belastingverdrag NL-FR', 'Statut de la nouvelle convention fiscale', null, 'xb.verdrag', 'tekst', 'informatief',
  'https://www.rijksoverheid.nl', 'Rijksoverheid, belastingverdragen, stand van zaken', 'Ministerie van Financien', 'onregelmatig',
  'Nederland en Frankrijk onderhandelen over een opvolger van het verdrag uit 1973. Zolang de inwerkingtredingsdatum niet vaststaat, hoort die als aangekondigde wijziging bij alle verdragsparameters te staan.'),

G('p.xb.vo883.aanwijsregel', 'Aanwijsregel van de toepasselijke socialezekerheidswetgeving', 'Regle de determination de la legislation applicable', 'Titel II, art. 11 tot en met 16 Vo. 883/2004', 'xb.vo883', 'tekst', 'bepaalt_toepasselijkheid',
  'https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:32004R0883', 'Verordening (EG) 883/2004, titel II', 'Europese Commissie en SVB', 'zelden',
  'Bepaalt onder welk stelsel iemand valt, en daarmee of CSG verschuldigd is of dat het CAK de bijdrage heft. Zonder deze regel kan geen enkele grensoverschrijdende berekening kloppen.'),

G('p.xb.s1.recht_en_geldigheid', 'S1, recht en geldigheidsduur', 'Formulaire S1, droit et duree de validite', 'Art. 24 en 25 Vo. 883/2004', 'xb.s1', 'tekst', 'bepaalt_toepasselijkheid',
  'https://www.hetcak.nl', 'Het CAK, verdragsgerechtigden en formulier S1; art. 24 en 25 Vo. 883/2004', 'Het CAK en CPAM', 'zelden',
  'Het S1 is de sleutel tot inschrijving bij de CPAM en tot de CAK-bijdrage in plaats van CSG. De woonlandfactor staat wel in het register, de voorwaarde eronder niet.'),

G('p.xb.ehic.geldigheidsduur', 'Europese ziekteverzekeringskaart, geldigheidsduur', 'Carte europeenne d assurance maladie, duree', null, 'xb.ehic', 'jaren', 'bepaalt_toepasselijkheid',
  'https://www.hetcak.nl', 'Het CAK, Europese zorgpas', 'Het CAK', 'zelden',
  'Voor tijdelijk verblijf, naast het S1 voor bestendig verblijf.'),

G('p.xb.cak.rekenwijze_verdragsbijdrage', 'Rekenwijze van de CAK-verdragsbijdrage', 'Methode de calcul de la cotisation conventionnelle', null, 'xb.cak', 'tekst', 'bepaalt_grondslag',
  'https://www.hetcak.nl/zorgverzekering-buitenland/pensioen-uitkering/financiele-informatie/woonlandfactor-zvw-wlz-bijdragen/',
  'Het CAK, berekening van de verdragsbijdrage', 'Het CAK', 'jaarlijks',
  'De losse bestanddelen staan wel in het register, de volgorde waarin het CAK ze toepast niet. Dat hoort in laag 2 thuis, als rekenregel.'),

// ------------------------------------------------------------------- verzekeringen
G('p.fr.assur.habitation_verplicht', 'Verplichte opstal- en inboedelverzekering', 'Assurance habitation obligatoire', 'Art. 7 g loi 89-462', 'fr.assur', 'tekst', 'bepaalt_toepasselijkheid',
  'https://www.service-public.fr/particuliers/vosdroits/F2123', 'service-public.fr, assurance habitation; art. 7 g loi 89-462', 'Ministere de l economie', 'zelden',
  'Voor een huurder wettelijk verplicht, voor een eigenaar in een copropriete eveneens. Staat in geen enkele tool.'),

G('p.fr.assur.auto_rc_verplicht', 'Verplichte WA-autoverzekering', 'Assurance automobile obligatoire', 'Art. L211-1 Code des assurances', 'fr.assur', 'tekst', 'bepaalt_toepasselijkheid',
  'https://www.service-public.fr/particuliers/vosdroits/F2123', 'art. L211-1 Code des assurances', 'Ministere de l economie', 'zelden',
  'De bonus-malus staat wel in het register, de onderliggende verzekeringsplicht niet.'),

G('p.fr.assur.dommages_ouvrage', 'Assurance dommages-ouvrage', 'Assurance dommages-ouvrage', 'Art. L242-1 Code des assurances', 'fr.assur', 'procent', 'verhoogt_last',
  'https://www.service-public.fr/particuliers/vosdroits/F2129', 'art. L242-1 Code des assurances', 'Ministere de l economie', 'zelden',
  'Verplicht voor wie als particulier laat bouwen of ingrijpend laat verbouwen, en een reele kostenpost bij elke renovatie. Ontbreekt in de renovatietools.'),

G('p.fr.assur.garantie_decennale', 'Garantie decennale van de aannemer', 'Garantie decennale', 'Art. 1792 Code civil', 'fr.assur', 'jaren', 'bepaalt_toepasselijkheid',
  'https://www.service-public.fr/particuliers/vosdroits/F2034', 'art. 1792 Code civil', 'Ministere de la justice', 'zelden',
  'De tienjarige aansprakelijkheid van de aannemer. Bepalend bij elke aankoop van een recent verbouwd pand.'),

G('p.fr.mutuelle.premie_indicatie', 'Premie-indicatie complementaire sante', 'Prix indicatif d une mutuelle', null, 'fr.mutuelle', 'EUR/maand', 'verhoogt_last',
  'https://www.service-public.fr', 'marktoverzicht, bron nog te kiezen', 'geen enkele instantie, marktgegeven', 'jaarlijks',
  'ZorgKompas rekent met vergoedingspercentages van de Securite sociale maar kent geen premie voor de aanvullende verzekering. Zonder die premie is het beeld van de zorgkosten onvolledig. Dit is een marktgegeven en krijgt bij vulling klasse marktindex met een verantwoordelijke en een houdbaarheidsdatum.',
  { klasse: 'indicatief', resp: 'Anton Noe, Communities Abroad', houd: '2027-04-15' }),

// ------------------------------------------------------------------- transactiekosten
G('p.fr.notaris.tarief_hypotheekakte', 'Emolumenten en heffingen bij een hypotheekakte', 'Frais d acte de pret et taxe de publicite fonciere', null, 'fr.notaris', 'procent en EUR', 'verhoogt_last',
  'https://www.economie.gouv.fr/particuliers/gerer-mon-argent/investir-dans-limmobilier/achat-dun-bien-immobilier-quels-frais-de-notaire-devez-vous-payer',
  'tabel 5 Code de commerce en art. 844 CGI', 'Ministere de l economie', 'meerjaarlijks',
  'Wie met een Franse hypotheek koopt, betaalt boven op de koopakte ook de kosten van de leningakte. Vastgoedtransactie rekent alleen de koopakte.'),

G('p.fr.diagnostics.verplichte_diagnoses_kosten', 'Kosten van het verplichte diagnosepakket', 'Cout du dossier de diagnostic technique', 'Art. L271-4 Code de la construction', 'fr.diagnostics', 'EUR', 'verhoogt_last',
  'https://www.service-public.fr/particuliers/vosdroits/F16096', 'service-public.fr, dossier de diagnostic technique', 'Ministere de la transition ecologique', 'onregelmatig',
  'De verkoper betaalt het volledige diagnosepakket. Alleen het diagnostic electrique staat nu in het register, en dan nog alleen de geldigheidsduur.',
  { klasse: 'marktindex', resp: 'Anton Noe, Communities Abroad', houd: '2027-04-15' }),

G('p.fr.dmto.abattement_bijzondere_departementen', 'Bijzondere DMTO-regelingen per departement', 'Regimes departementaux particuliers', 'Art. 1594 F ter, F sexies en F septies CGI', 'fr.dmto', 'EUR en procent', 'verlaagt_last',
  'https://www.impots.gouv.fr/sites/default/files/media/1_metier/3_partenaire/notaires/dmto/dmto_2026-06.pdf',
  'DGFiP, bareme DMTO; art. 1594 F ter, F sexies en F septies CGI', 'DGFiP', 'jaarlijks',
  'In de DGFiP-tabel staan bij Calvados een abattement van 46.000 euro en bij Savoie een verlaagd tarief van 4,00 procent. Uit de platte tekst is niet af te leiden op welke kolom die betrekking hebben. Vastgoedtransactie heeft ze daarom niet ingebouwd en meldt dat onder OPENSTAAND.'),
];
