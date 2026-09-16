#!/usr/bin/env node
// Rekent de cijfers uit die in docs/rapport-taak-1.md staan, zodat ze
// reproduceerbaar zijn en niet met de hand zijn overgetikt.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const WORTEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const register = JSON.parse(readFileSync(join(WORTEL, 'data', 'register.json'), 'utf8'));
const state = JSON.parse(readFileSync(join(WORTEL, 'peil', 'state.json'), 'utf8'));
const ps = register.parameters;
const tel = (f) => ps.filter(f).length;
const groep = (f) => ps.reduce((a, p) => { const k = f(p); a[k] = (a[k] || 0) + 1; return a; }, {});

console.log('parameters:', ps.length);
console.log('status:', groep((p) => p.status));
console.log('land:', groep((p) => p.land));
console.log('lastensoort:', groep((p) => p.lastensoort));
console.log('klasse:', groep((p) => p.variabiliteitsklasse));
console.log('kandidaat:', tel((p) => p.kandidaat));
console.log('in gebruik:', tel((p) => p.gebruikt_in.length > 0));
console.log('afwijkend:', tel((p) => p.gebruikt_in.some((g) => g.afwijkend)));
console.log('waarschuwingen per niveau:', state.waarschuwingen.reduce((a, w) => { a[w.niveau] = (a[w.niveau] || 0) + 1; return a; }, {}));
console.log('waarschuwingen per soort:', state.waarschuwingen.reduce((a, w) => { a[w.soort] = (a[w.soort] || 0) + 1; return a; }, {}));

// Prioriteit voor verificatie: alleen rood, dan wegen naar bereik en gewicht.
// score = aantal tools + 3 bij een afwijking + 2 bij fiscaal of sociaal + 1 als
// de grootheid de last direct verhoogt of verlaagt.
const rood = new Set(state.waarschuwingen.filter((w) => w.niveau === 'rood').map((w) => w.parameter));
const score = (p) => p.gebruikt_in.length
  + (p.gebruikt_in.some((g) => g.afwijkend) ? 3 : 0)
  + (['fiscaal', 'sociaal'].includes(p.lastensoort) ? 2 : 0)
  + (['verhoogt_last', 'verlaagt_last'].includes(p.effect) ? 1 : 0);

const top = ps.filter((p) => rood.has(p.id)).sort((a, b) => score(b) - score(a) || a.id.localeCompare(b.id)).slice(0, 10);
console.log('\nTien met de hoogste prioriteit voor verificatie:');
top.forEach((p, i) => console.log(
  `${i + 1}. ${p.id} | score ${score(p)} | ${p.gebruikt_in.length} tool(s)${p.gebruikt_in.some((g) => g.afwijkend) ? ', AFWIJKEND' : ''} | ${p.naam_nl} | ${p.gebruikt_in.map((g) => g.repo).join(', ')}`));
