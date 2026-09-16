#!/usr/bin/env node
// Bouwt dist/: de statische site en de statische API onder /api/v1/,
// plus een bevroren kopie van deze versie onder /api/versies/<versie>/.
// Geen frameworks, geen externe scripts, geen externe fonts.

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, cpSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { bouwApi } from './lib/api.mjs';
import * as site from './lib/site.mjs';
import { CSS } from './lib/stijl.mjs';
import { mdNaarHtml, mdZonderTitel } from './lib/md.mjs';
import { CHANGELOG } from './lib/changelog.mjs';
import { VERSIE } from './lib/versie.mjs';

const WORTEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(WORTEL, 'dist');
const lees = (...p) => JSON.parse(readFileSync(join(WORTEL, ...p), 'utf8'));
const leesTekst = (...p) => readFileSync(join(WORTEL, ...p), 'utf8');

const register = lees('data', 'register.json');
const rekenregels = lees('data', 'rekenregels.json');
const duidingsregels = lees('data', 'duidingsregels.json');
const documenten = lees('data', 'documenten.json');
const ijkkalender = lees('data', 'ijkkalender.json');
const state = lees('peil', 'state.json');

if (existsSync(DIST)) rmSync(DIST, { recursive: true });
mkdirSync(DIST, { recursive: true });

const schrijf = (relPad, inhoud) => {
  const doel = join(DIST, relPad);
  mkdirSync(dirname(doel), { recursive: true });
  writeFileSync(doel, inhoud);
};

// ------------------------------------------------------------------ API
const api = bouwApi({ register, rekenregels, duidingsregels, documenten, ijkkalender, state, changelog: CHANGELOG });
for (const [pad, inhoud] of api) schrijf(pad, inhoud);

// bevroren kopie van deze versie
for (const [pad, inhoud] of api) schrijf(pad.replace(/^api\/v1\//, `api/versies/${VERSIE}/`), inhoud);
schrijf('api/versies/index.json', JSON.stringify({
  versies: CHANGELOG.map((v) => ({ versie: v.versie, datum: v.datum, pad: `/api/versies/${v.versie}/index.json` })),
  huidig: VERSIE, huidig_pad: '/api/v1/index.json',
}, null, 1) + '\n');

// ------------------------------------------------------------------ site
schrijf('peil.css', CSS);
schrijf('.nojekyll', '');
schrijf('index.html', site.paginaStart(register, state));
schrijf('tabel.html', site.paginaTabel(register));
schrijf('ijkkalender.html', site.paginaIjkkalender(ijkkalender, register));
schrijf('levensduur.html', site.paginaLevensduur(register, mdNaarHtml(mdZonderTitel(leesTekst('docs', 'levensduur.md')))));
schrijf('documenten.html', site.paginaDocumenten(documenten));
schrijf('changelog.html', site.paginaChangelog(CHANGELOG));
schrijf('over.html', site.paginaOver(register, mdNaarHtml(mdZonderTitel(leesTekst('docs', 'over-peil.md')))));
schrijf('404.html', site.pagina404());
for (const p of register.parameters) {
  schrijf(`parameter/${p.id}.html`, site.paginaParameter(p, state, rekenregels.rekenregels));
}

// ------------------------------------------------------------------ sitemap en robots
const basis = 'https://antonnoe.github.io/peil-nl-fr/';
const paden = ['', 'tabel.html', 'ijkkalender.html', 'levensduur.html', 'documenten.html', 'changelog.html', 'over.html']
  .concat(register.parameters.map((p) => `parameter/${p.id}.html`));
schrijf('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + paden.map((p) => `<url><loc>${basis}${p}</loc><lastmod>${register.meta.versiedatum}</lastmod></url>`).join('\n')
  + '\n</urlset>\n');
schrijf('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${basis}sitemap.xml\n`);

// ------------------------------------------------------------------ gegevens meeleveren
for (const bestand of ['register.json', 'rekenregels.json', 'duidingsregels.json', 'documenten.json', 'ijkkalender.json', 'inventarisatie.json']) {
  cpSync(join(WORTEL, 'data', bestand), join(DIST, 'data', bestand), { force: true });
}
mkdirSync(join(DIST, 'schema'), { recursive: true });
cpSync(join(WORTEL, 'schema'), join(DIST, 'schema'), { recursive: true });
cpSync(join(WORTEL, 'peil', 'state.json'), join(DIST, 'peil', 'state.json'), { force: true });

console.log('dist gebouwd:', api.size, 'API-bestanden,', register.parameters.length + 8, 'pagina s');
