// Statische site. Geen frameworks, geen externe scripts en geen externe fonts.
// Lezen werkt zonder JavaScript; alleen zoeken en filteren gebruiken JavaScript.

import { CSS } from './stijl.mjs';
import { esc, slug, datumNl, waardeTekst, STATUSLABEL, LASTENSOORTLABEL, LANDLABEL, KLASSELABEL, EFFECTLABEL, MAANDNAMEN } from './hulp.mjs';
import { VERSIE, PEILDATUM, LICENTIE_DATA, BRONREGEL, VOORBEHOUD, UITGEVER, UITGEVER_URL } from './versie.mjs';
import { openbareTools, openbareNamen, openbareHerkomst, openbareVerantwoordelijke } from './tools.mjs';

const MENU = [
  ['', 'Start'],
  ['tabel.html', 'Tabel'],
  ['ijkkalender.html', 'IJkkalender'],
  ['levensduur.html', 'Levensduur'],
  ['documenten.html', 'Documenten'],
  ['changelog.html', 'Changelog'],
  ['over.html', 'Over Peil'],
];

const ISSUE_BASIS = 'https://github.com/antonnoe/peil-nl-fr/issues/new';

function pagina({ titel, beschrijving, actief, diepte = 0, inhoud, script = '' }) {
  const op = '../'.repeat(diepte);
  const menu = MENU.map(([href, label]) => {
    const doel = op + href;
    const huidig = href === actief ? ' aria-current="page"' : '';
    return `<li><a href="${esc(doel || './')}"${huidig}>${esc(label)}</a></li>`;
  }).join('');
  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(titel)} | Peil</title>
<meta name="description" content="${esc(beschrijving)}">
<meta name="robots" content="index,follow">
<link rel="stylesheet" href="${op}peil.css">
<link rel="icon" href="data:,">
</head>
<body>
<header class="kop"><div class="omhulsel">
<div class="merk"><strong><a href="${op}" style="text-decoration:none;color:inherit">Peil</a></strong>
<span>parameterregister NL-FR, versie ${esc(VERSIE)}, peildatum ${esc(datumNl(PEILDATUM))}</span></div>
<nav class="hoofdmenu" aria-label="hoofdmenu"><ul>${menu}</ul></nav>
</div></header>
<main><div class="omhulsel">
${inhoud}
<div class="voetnoot">
<p>${esc(VOORBEHOUD)}</p>
<p>Peil, versie ${esc(VERSIE)}, peildatum ${esc(datumNl(PEILDATUM))}. Gegevens onder ${esc(LICENTIE_DATA)}, code onder MIT.
<a href="${op}api/v1/index.json">API</a>, <a href="${op}api/v1/register.csv">CSV</a>,
<a href="https://github.com/antonnoe/peil-nl-fr">broncode</a>.</p>
<p>Een uitgave van ${esc(UITGEVER)}, <a href="${esc(UITGEVER_URL)}" rel="noopener">www.communitiesabroad.com</a>.</p>
</div>
</div></main>
${script}
</body>
</html>
`;
}

const merkje = (status) => `<span class="merkje ${status}">${esc(STATUSLABEL[status])}</span>`;

// Het blok "Let op" op een parameterpagina. De signalen die Peil intern bijhoudt
// dragen een sleutel en een niveau; naar buiten wordt daar een gewone zin van,
// zonder niveau in de tekst. De kleur van het blok volgt het zwaarste signaal.
const LET_OP = [
  ['afwijkend:', 'In omloop zijn afwijkende waarden voor deze parameter.'],
  ['gaat_veranderen:aankondiging:', 'Er is een wijziging aangekondigd.'],
  ['gaat_veranderen:geldig_tot:', 'De geldigheid van deze waarde loopt binnenkort af.'],
  ['gaat_veranderen:raming:', 'Naast de vastgestelde waarde staat een raming klaar. Zolang de raming niet is vastgesteld, blijft de vastgestelde waarde leidend.'],
  ['verouderd:houdbaarheid:', 'De laatste verificatie is ouder dan de houdbaarheid die bij deze parameter hoort.'],
  ['verouderd:ijkmoment:', 'Sinds het laatste ijkmoment is deze waarde niet opnieuw geverifieerd.'],
  ['verouderd:niet_vastgesteld:', 'Deze waarde is nog niet geverifieerd.'],
  ['verouderd:vervallen:', 'Deze grootheid is vervallen.'],
];

function letOpBlok(waarschuwingen) {
  const regels = [];
  let kleur = 'grijs';
  for (const w of waarschuwingen) {
    const treffer = LET_OP.find(([sleutel]) => w.sleutel.startsWith(sleutel));
    if (!treffer) continue;
    if (!regels.includes(treffer[1])) regels.push(treffer[1]);
    if (w.niveau === 'rood') kleur = 'rood';
    else if (w.niveau === 'oranje' && kleur !== 'rood') kleur = 'oranje';
  }
  if (!regels.length) return '';
  return `<div class="melding ${kleur}"><strong>Let op</strong><ul class="plat">`
    + regels.map((r) => `<li>${esc(r)}</li>`).join('') + '</ul></div>';
}

function waardeBlok(p) {
  const t = waardeTekst(p);
  if (p.status === 'te_verifieren') {
    return `<p class="waarde te_verifieren">geen rekenwaarde, eerst verifiëren</p>`;
  }
  return `<p class="waarde ${p.status}">${esc(t ?? 'geen waarde')}${p.eenheid && !String(t).includes(p.eenheid) ? ' <span style="font-weight:400;font-size:.8em">' + esc(p.eenheid) + '</span>' : ''}</p>`;
}

function geldigheidTekst(p) {
  const delen = [];
  if (p.geldig_jaar) delen.push('jaar ' + p.geldig_jaar);
  if (p.geldig_van) delen.push('vanaf ' + datumNl(p.geldig_van));
  if (p.geldig_tot) delen.push('tot en met ' + datumNl(p.geldig_tot));
  return delen.length ? delen.join(', ') : 'geen geldigheidsperiode vastgelegd';
}

function bronTekst(p) {
  if (p.bron_url) return `<a href="${esc(p.bron_url)}" rel="nofollow noopener">${esc(p.bron_kenmerk || p.instantie || p.bron_url)}</a>`;
  if (p.bron_kenmerk) return esc(p.bron_kenmerk);
  return '<em>nog geen bron vastgelegd</em>';
}

// ------------------------------------------------------------------ startpagina
// Een kanteling staat in een details-element en is standaard dicht. Zo blijft de
// startpagina op een telefoon kort; open- en dichtklappen werkt zonder JavaScript.
function vouw(titel, aantal, noot, inhoud) {
  return `<details class="kanteling"><summary><span class="vouwtitel">${esc(titel)}</span>`
    + `<span class="vouwtel">${aantal} parameters${noot ? ', ' + esc(noot) : ''}</span></summary>`
    + `<div class="vouwinhoud">${inhoud}</div></details>`;
}

function kanteling(titel, aantal, noot, rijen, kolommen, telFn) {
  const kop = kolommen.map((k) => `<th scope="col">${esc(k.label)}</th>`).join('');
  const body = rijen.map((r) => {
    const cellen = kolommen.map((k) => `<td data-kop="${esc(k.label)}">${telFn(r, k)}</td>`).join('');
    return `<tr><th scope="row" data-kop="">${esc(r.label)}</th>${cellen}</tr>`;
  }).join('');
  return vouw(titel, aantal, noot,
    `<div class="tabelhuls"><table class="kaartbaar"><thead><tr><th scope="col">&nbsp;</th>${kop}</tr></thead><tbody>${body}</tbody></table></div>`);
}

export function paginaStart(register, state) {
  const ps = register.parameters;
  const tel = (f) => ps.filter(f).length;
  const statussen = ['vastgesteld', 'raming', 'te_verifieren', 'vervallen'];
  const landen = [...new Set(ps.map((p) => p.land))].sort();
  const lasten = [...new Set(ps.map((p) => p.lastensoort))].sort();
  const regelingen = [...new Set(ps.map((p) => p.regeling.code))].sort();
  const aantalTools = new Set(ps.flatMap((p) => openbareNamen(p.gebruikt_in))).size;

  const index = ps.map((p) => ({
    i: p.id, n: p.naam_nl, f: p.naam_fr || '', o: p.naam_officieel || '',
    s: p.status, w: waardeTekst(p) || '', e: p.eenheid || '', j: p.geldig_jaar || '',
    b: p.bron_url || '', k: p.bron_kenmerk || '', l: p.land, t: p.lastensoort, r: p.regeling.code,
    v: p.verificatiedatum || '', g: openbareNamen(p.gebruikt_in).join(', '),
  }));

  const tellers = `<div class="tellers">
${statussen.map((s) => `<div class="teller"><b>${tel((p) => p.status === s)}</b><span>${esc(STATUSLABEL[s])}</span></div>`).join('')}
<div class="teller"><b>${tel((p) => p.gebruikt_in.some((g) => g.afwijkend))}</b><span>afwijkend tussen tools</span></div>
<div class="teller"><b>${new Set(state.waarschuwingen.filter((w) => w.niveau === 'rood').map((w) => w.parameter)).size}</b><span>met een punt van aandacht</span></div>
</div>`;

  const kant1 = kanteling('Per land', ps.length, landen.length + ' landen',
    landen.map((l) => ({ label: LANDLABEL[l], key: l })),
    statussen.map((s) => ({ label: STATUSLABEL[s], key: s })),
    (r, k) => tel((p) => p.land === r.key && p.status === k.key));

  const kant2 = kanteling('Per lastensoort', ps.length, lasten.length + ' lastensoorten',
    lasten.map((l) => ({ label: LASTENSOORTLABEL[l], key: l })),
    statussen.map((s) => ({ label: STATUSLABEL[s], key: s })),
    (r, k) => tel((p) => p.lastensoort === r.key && p.status === k.key));

  const kant3 = vouw('Per regeling', ps.length, regelingen.length + ' regelingen',
    `<div class="tabelhuls"><table class="kaartbaar"><thead><tr>
<th scope="col">Regeling</th><th scope="col">Parameters</th><th scope="col">Vastgesteld</th><th scope="col">Te verifiëren</th><th scope="col">Afwijkend</th></tr></thead><tbody>
${regelingen.map((code) => {
    const lijst = ps.filter((p) => p.regeling.code === code);
    return `<tr><th scope="row" data-kop="Regeling"><a href="api/v1/regeling/${esc(slug(code))}.json">${esc(code)}</a>, ${esc(lijst[0].regeling.naam)}</th>
<td data-kop="Parameters">${lijst.length}</td>
<td data-kop="Vastgesteld">${lijst.filter((p) => p.status === 'vastgesteld').length}</td>
<td data-kop="Te verifiëren">${lijst.filter((p) => p.status === 'te_verifieren').length}</td>
<td data-kop="Afwijkend">${lijst.filter((p) => p.gebruikt_in.some((g) => g.afwijkend)).length}</td></tr>`;
  }).join('')}</tbody></table></div>`);

  const inhoud = `
<div class="zoekblok">
<form method="get" action="tabel.html" id="zoekformulier">
<label for="q">Zoek een parameter op naam, id, of Nederlandse of Franse term</label>
<div class="zoekveld">
<input type="search" id="q" name="q" placeholder="bijvoorbeeld woonlandfactor, plus-value, p.fr.ps" autocomplete="off">
<button type="submit">Zoek</button>
</div>
</form>
</div>
<div id="resultaat" hidden></div>
<h1>Peil, openbaar parameterregister NL-FR</h1>
<p class="leidend">Elke waarde met een bron, een verificatiedatum en de tools die ermee rekenen. ${ps.length} parameters, ${aantalTools} aangesloten tools.</p>
<div class="voorbehoud">${esc(VOORBEHOUD)}</div>
${tellers}
<h2>Kantelingen</h2>
<p class="leidend">Tik een kanteling open om de verdeling te zien. Alles staat dicht, zodat de pagina op een telefoon kort blijft.</p>
${kant1}
${kant2}
${kant3}
<h2>Wat u hier vindt</h2>
<ul class="plat">
<li><a href="tabel.html">De volledige tabel</a> met filters op alle assen en een uitvoer naar CSV.</li>
<li><a href="ijkkalender.html">De ijkkalender</a>: per maand welke parameters normaal wijzigen.</li>
<li><a href="levensduur.html">De levensduur</a>: hoe vaak grootheden veranderen en hoe lang ze bestaan.</li>
<li><a href="api/v1/index.json">De API</a>: elk antwoord met versie, versiedatum, licentie en een kant-en-klare bronregel.</li>
</ul>
<script type="application/json" id="peil-index">${JSON.stringify(index).replace(/</g, '\\u003c')}</script>`;

  const script = `<script>
(function(){
 var bron=document.getElementById('peil-index');
 if(!bron)return;
 var rijen=JSON.parse(bron.textContent);
 var veld=document.getElementById('q');
 var doel=document.getElementById('resultaat');
 var formulier=document.getElementById('zoekformulier');
 var STATUS={vastgesteld:'vastgesteld',raming:'raming',te_verifieren:'te verifiëren',vervallen:'vervallen'};
 var BRONREGEL=${JSON.stringify(BRONREGEL)};
 function ontsnap(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
 function kaart(r){
  var w=r.s==='te_verifieren'?'<p class="waarde te_verifieren">geen rekenwaarde, eerst verifiëren</p>'
    :'<p class="waarde '+r.s+'">'+ontsnap(r.w||'geen waarde')+'</p>';
  var bron=r.b?'<a href="'+ontsnap(r.b)+'" rel="nofollow noopener">'+ontsnap(r.k||r.b)+'</a>':(r.k?ontsnap(r.k):'<em>nog geen bron vastgelegd</em>');
  return '<article class="kaart"><h3><a href="parameter/'+ontsnap(r.i)+'.html">'+ontsnap(r.n)+'</a></h3>'
   +'<p class="id">'+ontsnap(r.i)+'</p>'+w
   +'<p><span class="merkje '+r.s+'">'+ontsnap(STATUS[r.s])+'</span> '
   +(r.j?'geldig jaar '+ontsnap(r.j):'geen jaar vastgelegd')+(r.v?', geverifieerd '+ontsnap(r.v):'')+'</p>'
   +'<p>Bron: '+bron+'</p>'
   +'<div class="knoppenrij"><button type="button" class="tweede" data-kopieer="'+ontsnap(r.i)+'">Kopieer met bronregel</button>'
   +'<button type="button" class="tweede" data-deel="'+ontsnap(r.i)+'">Deel link</button></div></article>';
 }
 function zoek(term){
  term=term.trim().toLowerCase();
  if(term.length<2){doel.hidden=true;doel.innerHTML='';return;}
  var raak=rijen.filter(function(r){
   return (r.i+' '+r.n+' '+r.f+' '+r.o+' '+r.r+' '+r.g).toLowerCase().indexOf(term)>=0;
  });
  doel.hidden=false;
  if(!raak.length){doel.innerHTML='<p class="melding grijs">Geen parameter gevonden voor deze term. Probeer een kortere term of bekijk <a href="tabel.html">de volledige tabel</a>.</p>';return;}
  doel.innerHTML='<h2>'+raak.length+' resultaat'+(raak.length===1?'':'en')+'</h2><div class="kaarten">'
   +raak.slice(0,40).map(kaart).join('')+'</div>'
   +(raak.length>40?'<p class="leidend">Alleen de eerste 40 worden getoond. Verfijn de term of gebruik <a href="tabel.html">de tabel</a>.</p>':'');
 }
 veld.addEventListener('input',function(){zoek(veld.value);});
 formulier.addEventListener('submit',function(e){if(veld.value.trim().length>=2){e.preventDefault();zoek(veld.value);}});
 doel.addEventListener('click',function(e){
  var k=e.target.closest('[data-kopieer]'),d=e.target.closest('[data-deel]');
  var id=k?k.getAttribute('data-kopieer'):(d?d.getAttribute('data-deel'):null);
  if(!id)return;
  var r=rijen.filter(function(x){return x.i===id;})[0];
  var url=location.href.replace(/[^/]*$/,'')+'parameter/'+id+'.html';
  var tekst=d?url:(r.n+': '+(r.s==='te_verifieren'?'geen rekenwaarde, eerst verifiëren':(r.w||'geen waarde'))
   +' ('+STATUS[r.s]+(r.j?', jaar '+r.j:'')+'). Bron: '+(r.k||r.b||'nog geen bron vastgelegd')+'. '+BRONREGEL+' '+url);
  var knop=k||d;
  var oud=knop.textContent;
  function klaar(t){knop.textContent=t;setTimeout(function(){knop.textContent=oud;},2000);}
  if(navigator.clipboard&&navigator.clipboard.writeText){
   navigator.clipboard.writeText(tekst).then(function(){klaar('Gekopieerd');},function(){klaar('Kopiëren lukte niet');});
  }else{
   var h=document.createElement('textarea');h.value=tekst;document.body.appendChild(h);h.select();
   try{document.execCommand('copy');klaar('Gekopieerd');}catch(x){klaar('Kopiëren lukte niet');}
   document.body.removeChild(h);
  }
 });
 var vooraf=new URLSearchParams(location.search).get('q');
 if(vooraf){veld.value=vooraf;zoek(vooraf);}
})();
</script>`;

  return pagina({ titel: 'Start', beschrijving: 'Openbaar parameterregister NL-FR: fiscale, sociale en transactieparameters met bron, verificatiedatum en de tools die ermee rekenen.', actief: '', inhoud, script });
}

// ------------------------------------------------------------------ tabel
export function paginaTabel(register) {
  const ps = register.parameters;
  const opties = (waarden, label) => `<label>${esc(label)}<select data-filter="${esc(label)}">
<option value="">alle</option>${waarden.map((w) => `<option value="${esc(w[0])}">${esc(w[1])}</option>`).join('')}</select></label>`;

  const landen = [...new Set(ps.map((p) => p.land))].sort().map((l) => [l, LANDLABEL[l]]);
  const lasten = [...new Set(ps.map((p) => p.lastensoort))].sort().map((l) => [l, LASTENSOORTLABEL[l]]);
  const regelingen = [...new Set(ps.map((p) => p.regeling.code))].sort().map((r) => [r, r]);
  const klassen = [...new Set(ps.map((p) => p.variabiliteitsklasse))].sort().map((k) => [k, KLASSELABEL[k]]);
  const statussen = [...new Set(ps.map((p) => p.status))].sort().map((s) => [s, STATUSLABEL[s]]);
  const effecten = [...new Set(ps.map((p) => p.effect))].sort().map((e) => [e, EFFECTLABEL[e]]);
  const jaren = [...new Set(ps.map((p) => p.geldig_jaar).filter(Boolean))].sort().map((j) => [j, j]);
  const tools = [...new Set(ps.flatMap((p) => openbareNamen(p.gebruikt_in)))].sort((a, b) => a.localeCompare(b, 'nl')).map((t) => [t, t]);

  const rijen = ps.map((p) => {
    const afw = p.gebruikt_in.some((g) => g.afwijkend);
    const namen = openbareNamen(p.gebruikt_in);
    return `<tr data-land="${esc(p.land)}" data-lastensoort="${esc(p.lastensoort)}" data-regeling="${esc(p.regeling.code)}"
 data-klasse="${esc(p.variabiliteitsklasse)}" data-status="${esc(p.status)}" data-effect="${esc(p.effect)}"
 data-jaar="${esc(p.geldig_jaar || '')}" data-tools="${esc(namen.join('|'))}"
 data-afwijkend="${afw ? 'ja' : 'nee'}" data-zoek="${esc((p.id + ' ' + p.naam_nl + ' ' + (p.naam_fr || '') + ' ' + (p.naam_officieel || '')).toLowerCase())}">
<td data-kop="Parameter"><a href="parameter/${esc(p.id)}.html">${esc(p.naam_nl)}</a><br><span class="id">${esc(p.id)}</span></td>
<td data-kop="Waarde" class="${p.status === 'vervallen' ? 'waarde vervallen' : ''}">${p.status === 'te_verifieren' ? '<span class="waarde te_verifieren" style="font-size:.9rem">geen rekenwaarde</span>' : esc(waardeTekst(p) ?? '')}</td>
<td data-kop="Eenheid">${esc(p.eenheid || '')}</td>
<td data-kop="Status">${merkje(p.status)}${afw ? ' <span class="merkje rood">afwijkend</span>' : ''}</td>
<td data-kop="Land">${esc(LANDLABEL[p.land])}</td>
<td data-kop="Lastensoort">${esc(LASTENSOORTLABEL[p.lastensoort])}</td>
<td data-kop="Regeling">${esc(p.regeling.code)}</td>
<td data-kop="Klasse">${esc(KLASSELABEL[p.variabiliteitsklasse])}</td>
<td data-kop="Jaar">${esc(p.geldig_jaar || '')}</td>
<td data-kop="Geverifieerd">${esc(p.verificatiedatum ? datumNl(p.verificatiedatum) : '')}</td>
<td data-kop="Gebruikt in">${namen.length ? esc(namen.join(', ')) : '<em>nog niet in gebruik</em>'}</td>
</tr>`;
  }).join('');

  const inhoud = `
<h1>Volledige tabel</h1>
<p class="leidend">${ps.length} parameters. De tabel staat volledig in de pagina en is ook zonder JavaScript te lezen; het zoekveld en de filters gebruiken JavaScript.</p>
<div class="zoekblok">
<label for="q">Zoek op naam, id, of Nederlandse of Franse term</label>
<div class="zoekveld"><input type="search" id="q" placeholder="bijvoorbeeld woonlandfactor, plus-value, p.fr.ps" autocomplete="off">
<a class="knop tweede" href="api/v1/register.csv" download>CSV van het hele register</a>
<button type="button" id="csv-selectie" class="tweede">CSV van de selectie</button></div>
</div>
<div class="filters">
${opties(landen, 'land')}${opties(lasten, 'lastensoort')}${opties(regelingen, 'regeling')}
${opties(klassen, 'klasse')}${opties(statussen, 'status')}${opties(effecten, 'effect')}
${opties(jaren, 'jaar')}${opties(tools, 'tool')}
${opties([['ja', 'alleen afwijkend'], ['nee', 'alleen niet afwijkend']], 'afwijkend')}
</div>
<p id="aantal" class="leidend" aria-live="polite">${ps.length} van ${ps.length} parameters</p>
<div class="tabelhuls"><table class="kaartbaar" id="registertabel">
<thead><tr><th scope="col">Parameter</th><th scope="col">Waarde</th><th scope="col">Eenheid</th><th scope="col">Status</th>
<th scope="col">Land</th><th scope="col">Lastensoort</th><th scope="col">Regeling</th><th scope="col">Klasse</th>
<th scope="col">Jaar</th><th scope="col">Geverifieerd</th><th scope="col">Gebruikt in</th></tr></thead>
<tbody>${rijen}</tbody></table></div>`;

  const script = `<script>
(function(){
 var tabel=document.getElementById('registertabel');
 if(!tabel)return;
 var alle=[].slice.call(tabel.tBodies[0].rows);
 var veld=document.getElementById('q');
 var teller=document.getElementById('aantal');
 var keuzes=[].slice.call(document.querySelectorAll('[data-filter]'));
 function pas(){
  var term=veld.value.trim().toLowerCase();
  var zichtbaar=0;
  alle.forEach(function(rij){
   var toon=!term||rij.getAttribute('data-zoek').indexOf(term)>=0;
   keuzes.forEach(function(k){
    var v=k.value;if(!v||!toon)return;
    var naam=k.getAttribute('data-filter');
    if(naam==='tool'){toon=(rij.getAttribute('data-tools')||'').split('|').indexOf(v)>=0;}
    else{toon=rij.getAttribute('data-'+naam)===v;}
   });
   rij.hidden=!toon;
   if(toon)zichtbaar++;
  });
  teller.textContent=zichtbaar+' van '+alle.length+' parameters';
 }
 veld.addEventListener('input',pas);
 keuzes.forEach(function(k){k.addEventListener('change',pas);});
 document.getElementById('csv-selectie').addEventListener('click',function(){
  var koppen=[].slice.call(tabel.tHead.rows[0].cells).map(function(c){return c.textContent.trim();});
  var regels=[koppen.join(';')];
  alle.forEach(function(rij){
   if(rij.hidden)return;
   regels.push([].slice.call(rij.cells).map(function(c){
    var t=c.textContent.replace(/\\s+/g,' ').trim();
    return /[";]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t;
   }).join(';'));
  });
  var blob=new Blob(['\\ufeff'+regels.join('\\r\\n')],{type:'text/csv;charset=utf-8'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);a.download='peil-selectie.csv';
  document.body.appendChild(a);a.click();document.body.removeChild(a);
 });
 var vooraf=new URLSearchParams(location.search).get('q');
 if(vooraf){veld.value=vooraf;pas();}
})();
</script>`;

  return pagina({ titel: 'Tabel', beschrijving: 'Alle parameters van Peil in een tabel, met filters op land, lastensoort, regeling, klasse, status, effect, jaar en tool.', actief: 'tabel.html', inhoud, script });
}

// ------------------------------------------------------------------ detailpagina
export function paginaParameter(p, state, rekenregels) {
  const waarschuwingen = state.waarschuwingen.filter((w) => w.parameter === p.id);
  const regels = rekenregels.filter((r) => r.gebruikt_parameters.includes(p.id));
  const issueUrl = ISSUE_BASIS + '?labels=correctie&template=correctie-parameter.yml&title='
    + encodeURIComponent('Correctie ' + p.id) + '&parameter=' + encodeURIComponent(p.id);

  const rij = (label, waarde) => `<div><dt>${esc(label)}</dt><dd>${waarde}</dd></div>`;
  const of = (v, leeg = '<em>niet vastgelegd</em>') => (v === null || v === undefined || v === '' ? leeg : esc(v));

  const tools = openbareTools(p.gebruikt_in);
  const gebruikt = tools.length
    ? `<ul class="plat">${tools.map((t) => `<li>${t.url
      ? `<a href="${esc(t.url)}" rel="nofollow noopener">${esc(t.naam)}</a>`
      : esc(t.naam)}</li>`).join('')}</ul>`
    : '<p>Deze parameter is nog niet in gebruik bij een van de aangesloten tools.</p>';

  const historie = p.levensduur_a.wijzigingshistorie.length
    ? `<ul class="plat">${p.levensduur_a.wijzigingshistorie.map((h) => `<li><strong>${of(h.waarde)}</strong>${h.geldig_jaar ? ', jaar ' + esc(h.geldig_jaar) : ''}. ${esc(openbareHerkomst(h.herkomst))}${h.opmerking ? '. ' + esc(openbareHerkomst(h.opmerking)) : ''}</li>`).join('')}</ul>`
    : '<p>Geen eerdere waarden vastgelegd.</p>';

  const inhoud = `
<p class="leidend"><a href="../tabel.html">Terug naar de tabel</a></p>
<h1>${esc(p.naam_nl)}</h1>
<p class="id">${esc(p.id)}</p>
${waardeBlok(p)}
<p>${merkje(p.status)} ${p.gebruikt_in.some((g) => g.afwijkend) ? '<span class="merkje rood">afwijkende waarden in omloop</span>' : ''}
${p.kandidaat ? '<span class="merkje grijs">nog niet in gebruik</span>' : ''}</p>
${p.status === 'te_verifieren' ? '<div class="melding grijs">Peil heeft voor deze grootheid nog geen waarde met een primaire bron en een verificatiedatum. Er is daarom geen registerwaarde die u kunt overnemen.</div>' : ''}
${p.status === 'raming' ? '<div class="melding grijs">Dit is een raming, geen vastgestelde waarde. Raming en vaststelling worden in Peil strikt gescheiden gehouden.</div>' : ''}
${letOpBlok(waarschuwingen)}

<h2>Namen</h2>
<dl class="velden">
${rij('Nederlands', esc(p.naam_nl))}
${rij('Frans', of(p.naam_fr))}
${rij('Officieel', of(p.naam_officieel))}
</dl>

<h2>De vier assen</h2>
<dl class="velden">
${rij('Land', esc(LANDLABEL[p.land]))}
${rij('Lastensoort', esc(LASTENSOORTLABEL[p.lastensoort]))}
${rij('Regeling', esc(p.regeling.code) + ', ' + esc(p.regeling.naam))}
${rij('Belastingtype', of(p.regeling.belastingtype, 'niet van toepassing'))}
${rij('Socialelastentype', of(p.regeling.socialelastentype, 'niet van toepassing'))}
${rij('Vrijstellingstype', of(p.regeling.vrijstellingstype, 'niet van toepassing'))}
${rij('Transactionele basis', of(p.regeling.transactionele_basis, 'niet van toepassing'))}
${rij('Variabiliteitsklasse', esc(KLASSELABEL[p.variabiliteitsklasse]))}
${rij('Effect', esc(EFFECTLABEL[p.effect]))}
${p.verantwoordelijke !== undefined ? rij('Verantwoordelijke', of(openbareVerantwoordelijke(p.verantwoordelijke, UITGEVER))) : ''}
${p.houdbaarheidsdatum !== undefined ? rij('Houdbaar tot', of(datumNl(p.houdbaarheidsdatum))) : ''}
</dl>

<h2>Waarde en geldigheid</h2>
<dl class="velden">
${rij('Registerwaarde', p.status === 'te_verifieren' ? '<em>geen, eerst verifiëren</em>' : esc(waardeTekst(p) ?? ''))}
${rij('Eenheid', of(p.eenheid))}
${rij('Geldigheid', esc(geldigheidTekst(p)))}
${rij('Status', esc(STATUSLABEL[p.status]))}
</dl>

<h2>Bron en verificatie</h2>
<dl class="velden">
${rij('Bron', bronTekst(p))}
${rij('Bronsoort', of(p.bronsoort))}
${rij('Instantie', of(p.instantie))}
${rij('Geverifieerd op', of(datumNl(p.verificatiedatum)))}
${rij('Geverifieerd door', of(openbareHerkomst(p.verificatie_door)))}
${rij('Publicatiemoment', of(p.publicatiemoment))}
${rij('Aangekondigde wijziging', p.aangekondigde_wijziging
    ? esc((p.aangekondigde_wijziging.datum ? datumNl(p.aangekondigde_wijziging.datum) + ': ' : '') + p.aangekondigde_wijziging.omschrijving) + (p.aangekondigde_wijziging.bron ? ' (' + esc(openbareHerkomst(p.aangekondigde_wijziging.bron)) + ')' : '')
    : '<em>geen</em>')}
</dl>

<h2>Levensduur</h2>
<h3>A, hoe vaak de waarde verandert</h3>
<dl class="velden">
${rij('Aanpassingsfrequentie', esc(p.levensduur_a.aanpassingsfrequentie))}
${rij('Laatste wijziging', of(datumNl(p.levensduur_a.laatste_wijziging)))}
</dl>
${historie}
<h3>B, hoe lang de grootheid bestaat</h3>
<dl class="velden">
${rij('Ingevoerd', of(datumNl(p.levensduur_b.ingevoerd)))}
${rij('Vervallen', of(datumNl(p.levensduur_b.vervallen), '<em>bestaat nog</em>'))}
${rij('Opgevolgd door', p.levensduur_b.opgevolgd_door ? `<a href="${esc(p.levensduur_b.opgevolgd_door)}.html">${esc(p.levensduur_b.opgevolgd_door)}</a>` : '<em>niet opgevolgd</em>')}
</dl>

<h2>Gebruikt in</h2>
${gebruikt}
${regels.length ? `<h2>Rekenregels die deze parameter gebruiken</h2><ul class="plat">${regels.map((r) => `<li><code>${esc(r.id)}</code>, ${esc(r.naam_nl)}</li>`).join('')}</ul>` : ''}

${p.uitzonderingen.length ? `<h2>Uitzonderingen</h2><ul class="plat">${p.uitzonderingen.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>` : ''}
${p.testvoorbeeld ? `<h2>Testvoorbeeld</h2><dl class="velden">
${rij('Invoer', esc(p.testvoorbeeld.invoer))}
${rij('Verwachte uitkomst', esc(p.testvoorbeeld.verwachte_uitkomst))}
${rij('Toelichting', of(p.testvoorbeeld.toelichting))}</dl>` : ''}
${p.opmerkingen ? `<h2>Opmerkingen</h2><p>${esc(p.opmerkingen)}</p>` : ''}

<h2>Overnemen en melden</h2>
<div class="bronregel"><strong>Bronregel</strong><br>${esc(BRONREGEL)}</div>
<div class="knoppenrij">
<button type="button" class="tweede" id="kopieer">Kopieer met bronregel</button>
<button type="button" class="tweede" id="deel">Deel link</button>
<a class="knop tweede" href="../api/v1/parameters/${esc(p.id)}.json">JSON</a>
<a class="knop tweede" href="${esc(issueUrl)}" rel="nofollow noopener">Meld een correctie</a>
</div>
<p class="leidend">Vaste permalink: <code>parameter/${esc(p.id)}.html</code></p>`;

  const tekst = `${p.naam_nl}: ${p.status === 'te_verifieren' ? 'geen rekenwaarde, eerst verifiëren' : (waardeTekst(p) ?? 'geen waarde')} (${STATUSLABEL[p.status]}${p.geldig_jaar ? ', jaar ' + p.geldig_jaar : ''}). Bron: ${p.bron_kenmerk || p.bron_url || 'nog geen bron vastgelegd'}. ${BRONREGEL}`;

  const script = `<script>
(function(){
 var tekst=${JSON.stringify(tekst)};
 function kopieer(knop,waarde){
  var oud=knop.textContent;
  function klaar(t){knop.textContent=t;setTimeout(function(){knop.textContent=oud;},2000);}
  if(navigator.clipboard&&navigator.clipboard.writeText){
   navigator.clipboard.writeText(waarde).then(function(){klaar('Gekopieerd');},function(){klaar('Kopiëren lukte niet');});
  }else{
   var h=document.createElement('textarea');h.value=waarde;document.body.appendChild(h);h.select();
   try{document.execCommand('copy');klaar('Gekopieerd');}catch(x){klaar('Kopiëren lukte niet');}
   document.body.removeChild(h);
  }
 }
 document.getElementById('kopieer').addEventListener('click',function(){kopieer(this,tekst+' '+location.href);});
 document.getElementById('deel').addEventListener('click',function(){
  if(navigator.share){navigator.share({title:document.title,url:location.href}).catch(function(){kopieer(document.getElementById('deel'),location.href);});}
  else{kopieer(this,location.href);}
 });
})();
</script>`;

  return pagina({
    titel: p.naam_nl,
    beschrijving: `${p.naam_nl}: ${p.status === 'te_verifieren' ? 'nog te verifiëren' : (waardeTekst(p) ?? '')}. Bron, verificatiedatum, levensduur en de tools die ermee rekenen.`,
    actief: 'tabel.html', diepte: 1, inhoud, script,
  });
}

// ------------------------------------------------------------------ overige pagina's
export function paginaIjkkalender(ijk, register) {
  const naam = new Map(register.parameters.map((p) => [p.id, p.naam_nl]));
  const inhoud = `
<h1>IJkkalender</h1>
<p class="leidend">${esc(ijk.meta.toelichting)}</p>
<h2>De twee vaste ijkmomenten</h2>
<div class="kaarten">
${ijk.ijkmomenten.map((i) => `<article class="kaart"><h3>${esc(i.naam)}, ${i.dag} ${esc(MAANDNAMEN[i.maand - 1])}</h3>
<p>${esc(i.omschrijving)}</p><p class="leidend">${esc(i.domein.join(', '))}</p></article>`).join('')}
</div>
<h2>Per maand</h2>
${ijk.maanden.map((m) => `<h3>${esc(m.naam.charAt(0).toUpperCase() + m.naam.slice(1))}${m.ijkmoment ? ' <span class="merkje vastgesteld">ijkmoment</span>' : ''}</h3>
${m.verwachte_wijzigingen.length
    ? m.verwachte_wijzigingen.map((w) => `<p><strong>${esc(w.omschrijving)}</strong><br><span class="leidend">${esc(w.instantie)}, ${w.parameters.length} parameter${w.parameters.length === 1 ? '' : 's'}</span></p>
<ul class="plat">${w.parameters.slice(0, 12).map((id) => `<li><a href="parameter/${esc(id)}.html">${esc(naam.get(id) || id)}</a></li>`).join('')}
${w.parameters.length > 12 ? `<li class="leidend">en nog ${w.parameters.length - 12} andere</li>` : ''}</ul>`).join('')
    : '<p class="leidend">Geen wijzigingen verwacht.</p>'}`).join('')}`;
  return pagina({ titel: 'IJkkalender', beschrijving: 'Per maand welke parameters normaal wijzigen, met de ijkmomenten half december en half april.', actief: 'ijkkalender.html', inhoud });
}

export function paginaLevensduur(register, levensduurMd) {
  const ps = register.parameters;
  const freqs = [...new Set(ps.map((p) => p.levensduur_a.aanpassingsfrequentie))].sort();
  const inhoud = `
<h1>Levensduur</h1>
<p class="leidend">Levensduur A is hoe vaak een waarde verandert. Levensduur B is hoe lang de grootheid als zodanig bestaat. Beide staan bij elke parameter in het register.</p>
<h2>Aanpassingsfrequentie, levensduur A</h2>
<div class="tabelhuls"><table class="kaartbaar"><thead><tr><th scope="col">Frequentie</th><th scope="col">Parameters</th><th scope="col">Vastgesteld</th><th scope="col">Te verifiëren</th></tr></thead><tbody>
${freqs.map((f) => {
    const l = ps.filter((p) => p.levensduur_a.aanpassingsfrequentie === f);
    return `<tr><th scope="row" data-kop="Frequentie">${esc(f)}</th><td data-kop="Parameters">${l.length}</td>
<td data-kop="Vastgesteld">${l.filter((p) => p.status === 'vastgesteld').length}</td>
<td data-kop="Te verifiëren">${l.filter((p) => p.status === 'te_verifieren').length}</td></tr>`;
  }).join('')}</tbody></table></div>
<h2>Levensduur B, geboorte en sterfte</h2>
<div class="tellers">
<div class="teller"><b>${ps.filter((p) => p.levensduur_b.ingevoerd).length}</b><span>met een invoeringsdatum</span></div>
<div class="teller"><b>${ps.filter((p) => p.levensduur_b.vervallen).length}</b><span>vervallen</span></div>
<div class="teller"><b>${ps.filter((p) => p.levensduur_b.opgevolgd_door).length}</b><span>opgevolgd door een andere grootheid</span></div>
<div class="teller"><b>${ps.filter((p) => p.levensduur_a.wijzigingshistorie.length).length}</b><span>met wijzigingshistorie</span></div>
</div>
<h2>De analyse</h2>
${levensduurMd}`;
  return pagina({ titel: 'Levensduur', beschrijving: 'Hoe vaak parameters veranderen en hoe lang ze bestaan, per categorie.', actief: 'levensduur.html', inhoud });
}

export function paginaDocumenten(documenten) {
  const inhoud = `
<h1>Documentenregister</h1>
<p class="leidend">${esc(documenten.meta.stand)}</p>
${documenten.documenten.length === 0
    ? `<div class="melding grijs">Het documentenregister is nog leeg. De opzet ligt wel vast: per document de uitgever, de titel, het kenmerk, de publicatiedatum, het adres van de bron, waar het document wordt gebruikt, het verwachte vervangingsmoment, het document dat het vervangt en de status.</div>`
    : ''}
<h2>Wat hier komt te staan</h2>
<p>Officiële documenten waar handboeken en tools op steunen: brochures, arrêtés, circulaires en fiches. Per document wordt bijgehouden wanneer het naar verwachting wordt vervangen en door welk document, zodat een handboek dat nog naar een ingetrokken brochure verwijst zichtbaar wordt.</p>
<p>Het vullen van dit register is voorzien voor een volgende uitgave van Peil.</p>`;
  return pagina({ titel: 'Documenten', beschrijving: 'Documentenregister van Peil: officiële documenten waar handboeken en tools op steunen.', actief: 'documenten.html', inhoud });
}

export function paginaChangelog(changelog) {
  const inhoud = `
<h1>Changelog</h1>
<p class="leidend">Elke publicatie krijgt een versienummer. Eerdere versies blijven opvraagbaar onder <code>/api/versies/&lt;versie&gt;/</code>.</p>
${changelog.map((v) => `<h2>Versie ${esc(v.versie)}, ${esc(datumNl(v.datum))}</h2>
<p>${esc(v.samenvatting)}</p>
<ul class="plat">${v.wijzigingen.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
<p class="leidend">API van deze versie: <a href="api/versies/${esc(v.versie)}/index.json">/api/versies/${esc(v.versie)}/index.json</a></p>`).join('')}`;
  return pagina({ titel: 'Changelog', beschrijving: 'Alle publicaties van Peil met versienummer en wijzigingen.', actief: 'changelog.html', inhoud });
}

export function paginaOver(register, overMd) {
  const inhoud = `<h1>Over Peil</h1>${overMd}`;
  return pagina({ titel: 'Over Peil', beschrijving: 'Doel, harde regels, licentie, correctieprocedure en API-uitleg van Peil.', actief: 'over.html', inhoud });
}

export function pagina404() {
  const inhoud = `<h1>Pagina niet gevonden</h1>
<p>Deze pagina bestaat niet. Ga terug naar de <a href="./">startpagina</a> of zoek in de <a href="tabel.html">volledige tabel</a>.</p>`;
  return pagina({ titel: 'Niet gevonden', beschrijving: 'Pagina niet gevonden.', actief: '', inhoud });
}

export { CSS };
