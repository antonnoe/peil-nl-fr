export const CSS = `:root{
 --achtergrond:#ffffff; --tekst:#16191d; --zacht:#5a6472; --lijn:#d6dbe1;
 --vlak:#f4f6f8; --accent:#14507a; --accent-tekst:#ffffff;
 --groen:#16653c; --groen-vlak:#e3f4ea; --oranje:#8a4b08; --oranje-vlak:#fdefdf;
 --grijs:#4b5563; --grijs-vlak:#eceff2; --rood:#9b1c1c; --rood-vlak:#fdeaea;
}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--achtergrond);color:var(--tekst);
 font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
 font-size:17px;line-height:1.55;overflow-wrap:break-word}
.omhulsel{max-width:78rem;margin:0 auto;padding:0 16px}
a{color:var(--accent)}
a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
header.kop{background:var(--vlak);border-bottom:1px solid var(--lijn);padding:12px 0}
.merk{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
.merk strong{font-size:1.25rem;letter-spacing:.02em}
.merk span{color:var(--zacht);font-size:.85rem}
nav.hoofdmenu ul{list-style:none;display:flex;flex-wrap:wrap;gap:4px 14px;margin:10px 0 0;padding:0}
nav.hoofdmenu a{display:inline-block;padding:4px 0;text-decoration:none;font-size:.95rem}
nav.hoofdmenu a[aria-current=page]{font-weight:700;text-decoration:underline}
main{padding:20px 0 40px}
h1{font-size:1.55rem;line-height:1.25;margin:.2em 0 .4em}
h2{font-size:1.2rem;margin:1.6em 0 .5em}
h3{font-size:1.02rem;margin:1.3em 0 .4em}
p{margin:.6em 0}
.leidend{color:var(--zacht)}
.zoekblok{position:sticky;top:0;z-index:5;background:var(--achtergrond);padding:10px 0;border-bottom:1px solid var(--lijn)}
.zoekblok label{display:block;font-weight:600;margin-bottom:4px}
.zoekveld{display:flex;gap:8px;flex-wrap:wrap}
input[type=search],input[type=text],select{font:inherit;padding:10px 12px;border:1px solid var(--lijn);border-radius:8px;background:#fff;color:inherit;min-width:0}
input[type=search]{flex:1 1 14rem}
button,.knop{font:inherit;padding:9px 14px;border-radius:8px;border:1px solid var(--accent);
 background:var(--accent);color:var(--accent-tekst);cursor:pointer;text-decoration:none;display:inline-block}
button.tweede,.knop.tweede{background:#fff;color:var(--accent)}
.kaarten{display:grid;gap:12px;margin:14px 0}
.kaart{border:1px solid var(--lijn);border-radius:10px;padding:12px 14px;background:#fff}
.kaart h3{margin:0 0 6px;font-size:1.03rem}
.kaart h3 a{text-decoration:none}
.kaart .id{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.8rem;color:var(--zacht)}
.waarde{font-size:1.18rem;font-weight:700;margin:6px 0}
.waarde.vastgesteld{color:var(--groen)}
.waarde.raming{color:var(--oranje)}
.waarde.te_verifieren{color:var(--grijs);font-weight:600;font-size:1rem}
.waarde.vervallen{color:var(--grijs);text-decoration:line-through}
.merkje{display:inline-block;font-size:.76rem;font-weight:700;letter-spacing:.02em;
 padding:2px 8px;border-radius:999px;border:1px solid transparent}
.merkje.vastgesteld{background:var(--groen-vlak);color:var(--groen);border-color:#bfe3cd}
.merkje.raming{background:var(--oranje-vlak);color:var(--oranje);border-color:#f0d3ae}
.merkje.te_verifieren{background:var(--grijs-vlak);color:var(--grijs);border-color:#d4d9de}
.merkje.vervallen{background:var(--grijs-vlak);color:var(--grijs);border-color:#d4d9de;text-decoration:line-through}
.merkje.rood{background:var(--rood-vlak);color:var(--rood);border-color:#f0c2c2}
.merkje.oranje{background:var(--oranje-vlak);color:var(--oranje);border-color:#f0d3ae}
.merkje.grijs{background:var(--grijs-vlak);color:var(--grijs);border-color:#d4d9de}
.velden{margin:0;font-size:.93rem}
.velden div{display:flex;gap:8px;padding:3px 0;border-bottom:1px solid var(--vlak);flex-wrap:wrap}
.velden dt{color:var(--zacht);flex:0 0 11rem;margin:0}
.velden dd{margin:0;flex:1 1 12rem;min-width:0}
.knoppenrij{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.tellers{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:10px;margin:14px 0}
.teller{border:1px solid var(--lijn);border-radius:10px;padding:10px 12px;background:var(--vlak)}
.teller b{display:block;font-size:1.6rem;line-height:1.1}
.teller span{font-size:.85rem;color:var(--zacht)}
details.kanteling{border:1px solid var(--lijn);border-radius:10px;margin:10px 0;background:var(--achtergrond)}
details.kanteling>summary{cursor:pointer;padding:10px 12px;display:flex;gap:6px 12px;flex-wrap:wrap;
 align-items:baseline;justify-content:space-between;list-style:none}
details.kanteling>summary::-webkit-details-marker{display:none}
details.kanteling>summary::marker{content:""}
.vouwtitel{font-weight:700}
.vouwtitel::before{content:"\\25B8";display:inline-block;margin-right:8px;color:var(--zacht);font-weight:400}
details.kanteling[open]>summary .vouwtitel::before{content:"\\25BE"}
.vouwtel{font-size:.85rem;color:var(--zacht)}
.vouwinhoud{padding:0 12px 4px;border-top:1px solid var(--lijn)}
.vouwinhoud .tabelhuls{margin:10px 0}
.tabelhuls{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:12px 0}
table{border-collapse:collapse;width:100%;font-size:.92rem}
th,td{text-align:left;padding:7px 9px;border-bottom:1px solid var(--lijn);vertical-align:top}
thead th{background:var(--vlak);position:sticky;top:0;white-space:nowrap}
tbody tr:hover{background:var(--vlak)}
.voetnoot{margin-top:28px;padding-top:14px;border-top:1px solid var(--lijn);font-size:.86rem;color:var(--zacht)}
.voorbehoud{background:var(--vlak);border-left:4px solid var(--accent);padding:10px 12px;border-radius:0 8px 8px 0;margin:14px 0;font-size:.92rem}
.melding{padding:10px 12px;border-radius:8px;margin:12px 0;font-size:.93rem}
.melding.rood{background:var(--rood-vlak);color:var(--rood)}
.melding.grijs{background:var(--grijs-vlak);color:var(--grijs)}
ul.plat{list-style:none;padding:0;margin:.4em 0}
ul.plat li{padding:3px 0;border-bottom:1px solid var(--vlak)}
.filters{display:grid;grid-template-columns:repeat(auto-fit,minmax(11rem,1fr));gap:8px;margin:10px 0}
.filters label{font-size:.85rem;color:var(--zacht);display:block}
.filters select{width:100%}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.88em;background:var(--vlak);padding:1px 4px;border-radius:4px}
.bronregel{background:var(--vlak);border:1px solid var(--lijn);border-radius:8px;padding:10px 12px;font-size:.86rem}
@media (max-width:760px){
 body{font-size:16px}
 h1{font-size:1.35rem}
 .velden dt{flex:0 0 100%}
 .velden dd{flex:1 1 100%}
 table.kaartbaar,table.kaartbaar thead,table.kaartbaar tbody,table.kaartbaar tr,table.kaartbaar th,table.kaartbaar td{display:block}
 table.kaartbaar thead{position:absolute;left:-9999px}
 table.kaartbaar tr{border:1px solid var(--lijn);border-radius:10px;margin-bottom:10px;padding:8px 10px}
 table.kaartbaar td{border:none;border-bottom:1px solid var(--vlak);padding:5px 0}
 table.kaartbaar td:last-child{border-bottom:none}
 table.kaartbaar td::before{content:attr(data-kop);display:block;font-size:.76rem;color:var(--zacht)}
 .tabelhuls{overflow-x:visible}
}
@media (prefers-color-scheme:dark){
 :root{--achtergrond:#14171a;--tekst:#eceff2;--zacht:#a4aebb;--lijn:#333a42;--vlak:#1d2126;
  --accent:#7fc0ef;--accent-tekst:#10161c;--groen:#66d69b;--groen-vlak:#15301f;
  --oranje:#f0b169;--oranje-vlak:#33240f;--grijs:#aab3bd;--grijs-vlak:#242a30;
  --rood:#f09a9a;--rood-vlak:#33191a}
 .kaart,input,select{background:#1a1e23}
 button.tweede,.knop.tweede{background:#1a1e23}
}
@media print{
 header.kop nav,.zoekblok,.knoppenrij,.voetnoot a{display:none}
 body{font-size:11pt}
 .kaart{break-inside:avoid;border-color:#999}
 a{color:inherit;text-decoration:none}
 .velden dt{flex:0 0 9rem}
}
`;
