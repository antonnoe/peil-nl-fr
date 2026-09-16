#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { bouwState } from './lib/signalen.mjs';
import { VERSIE, PEILDATUM, LICENTIE_DATA } from './lib/versie.mjs';

const WORTEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const register = JSON.parse(readFileSync(join(WORTEL, 'data', 'register.json'), 'utf8'));
const ijk = JSON.parse(readFileSync(join(WORTEL, 'data', 'ijkkalender.json'), 'utf8'));

const state = bouwState(register, ijk, PEILDATUM, VERSIE, LICENTIE_DATA);
mkdirSync(join(WORTEL, 'peil'), { recursive: true });
writeFileSync(join(WORTEL, 'peil', 'state.json'), JSON.stringify(state, null, 1) + '\n');

const perNiveau = state.waarschuwingen.reduce((a, w) => { a[w.niveau] = (a[w.niveau] || 0) + 1; return a; }, {});
const perSoort = state.waarschuwingen.reduce((a, w) => { a[w.soort] = (a[w.soort] || 0) + 1; return a; }, {});
console.log('waarschuwingen:', state.waarschuwingen.length, perNiveau, perSoort);
console.log('cockpit-onderdelen:', state.per_cockpit_onderdeel.length);
