// Kleine JSON Schema-validator. Bewust zonder externe afhankelijkheden: Peil
// bouwt en test zonder npm install, zodat de keten in een lege omgeving werkt.
// Ondersteunt de deelverzameling die de schema's van Peil gebruiken.

import { readFileSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';

export class Valideerder {
  constructor(schemaMap) { this.schemas = schemaMap; }

  static laad(paden) {
    const map = new Map();
    for (const pad of paden) map.set(basename(pad), JSON.parse(readFileSync(pad, 'utf8')));
    return new Valideerder(map);
  }

  valideer(schemaBestand, data, pad = '') {
    const schema = this.schemas.get(schemaBestand);
    if (!schema) throw new Error('onbekend schema: ' + schemaBestand);
    const fouten = [];
    this.#toets(schema, data, pad || '$', schemaBestand, fouten);
    return fouten;
  }

  #resolveer(ref, bestand) {
    let doelBestand = bestand;
    let fragment = ref;
    if (!ref.startsWith('#')) {
      const [file, frag] = ref.split('#');
      doelBestand = basename(file);
      fragment = frag ? '#' + frag : '#';
    }
    const schema = this.schemas.get(doelBestand);
    if (!schema) throw new Error('onbekende $ref: ' + ref);
    if (fragment === '#' || fragment === '') return [schema, doelBestand];
    let node = schema;
    for (const deel of fragment.slice(2).split('/')) {
      node = node[deel.replace(/~1/g, '/').replace(/~0/g, '~')];
      if (node === undefined) throw new Error('onvindbare $ref: ' + ref);
    }
    return [node, doelBestand];
  }

  #typeKlopt(type, waarde) {
    switch (type) {
      case 'object': return waarde !== null && typeof waarde === 'object' && !Array.isArray(waarde);
      case 'array': return Array.isArray(waarde);
      case 'string': return typeof waarde === 'string';
      case 'number': return typeof waarde === 'number';
      case 'integer': return typeof waarde === 'number' && Number.isInteger(waarde);
      case 'boolean': return typeof waarde === 'boolean';
      case 'null': return waarde === null;
      default: return true;
    }
  }

  #geldig(schema, data, bestand) {
    const f = [];
    this.#toets(schema, data, '$', bestand, f);
    return f.length === 0;
  }

  #toets(schema, data, pad, bestand, fouten) {
    if (schema === true || schema === undefined) return;
    if (schema === false) { fouten.push(`${pad}: niets is hier toegestaan`); return; }

    if (schema.$ref) {
      const [doel, doelBestand] = this.#resolveer(schema.$ref, bestand);
      this.#toets(doel, data, pad, doelBestand, fouten);
      const rest = { ...schema }; delete rest.$ref;
      if (Object.keys(rest).some((k) => !['$schema', '$id', 'title', 'description'].includes(k))) {
        this.#toets(rest, data, pad, bestand, fouten);
      }
      return;
    }

    if (schema.type !== undefined) {
      const types = Array.isArray(schema.type) ? schema.type : [schema.type];
      if (!types.some((t) => this.#typeKlopt(t, data))) {
        fouten.push(`${pad}: verwacht type ${types.join(' of ')}, kreeg ${data === null ? 'null' : Array.isArray(data) ? 'array' : typeof data}`);
        return;
      }
    }

    if (schema.enum !== undefined && !schema.enum.some((v) => JSON.stringify(v) === JSON.stringify(data))) {
      fouten.push(`${pad}: waarde ${JSON.stringify(data)} staat niet in de toegestane lijst`);
    }
    if (schema.const !== undefined && JSON.stringify(schema.const) !== JSON.stringify(data)) {
      fouten.push(`${pad}: verwacht ${JSON.stringify(schema.const)}`);
    }

    if (typeof data === 'string') {
      if (schema.pattern && !new RegExp(schema.pattern).test(data)) fouten.push(`${pad}: voldoet niet aan patroon ${schema.pattern}`);
      if (schema.minLength !== undefined && data.length < schema.minLength) fouten.push(`${pad}: korter dan ${schema.minLength} tekens`);
      if (schema.format === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(data)) fouten.push(`${pad}: geen geldige datum`);
    }
    if (typeof data === 'number') {
      if (schema.minimum !== undefined && data < schema.minimum) fouten.push(`${pad}: kleiner dan ${schema.minimum}`);
      if (schema.maximum !== undefined && data > schema.maximum) fouten.push(`${pad}: groter dan ${schema.maximum}`);
    }

    if (Array.isArray(data)) {
      if (schema.minItems !== undefined && data.length < schema.minItems) fouten.push(`${pad}: minder dan ${schema.minItems} elementen`);
      if (schema.maxItems !== undefined && data.length > schema.maxItems) fouten.push(`${pad}: meer dan ${schema.maxItems} elementen`);
      if (schema.items) data.forEach((v, i) => this.#toets(schema.items, v, `${pad}[${i}]`, bestand, fouten));
    }

    if (data !== null && typeof data === 'object' && !Array.isArray(data)) {
      for (const sleutel of schema.required || []) {
        if (!(sleutel in data)) fouten.push(`${pad}: verplicht veld ${sleutel} ontbreekt`);
      }
      for (const [sleutel, waarde] of Object.entries(data)) {
        const sub = schema.properties?.[sleutel];
        if (sub) this.#toets(sub, waarde, `${pad}.${sleutel}`, bestand, fouten);
        else if (schema.properties && schema.additionalProperties === false) {
          fouten.push(`${pad}: onbekend veld ${sleutel}`);
        } else if (typeof schema.additionalProperties === 'object') {
          this.#toets(schema.additionalProperties, waarde, `${pad}.${sleutel}`, bestand, fouten);
        }
      }
    }

    for (const sub of schema.allOf || []) this.#toets(sub, data, pad, bestand, fouten);
    if (schema.anyOf && !schema.anyOf.some((sub) => this.#geldig(sub, data, bestand))) {
      fouten.push(`${pad}: voldoet aan geen van de alternatieven${schema.description ? ' (' + schema.description + ')' : ''}`);
    }
    if (schema.oneOf) {
      const raak = schema.oneOf.filter((sub) => this.#geldig(sub, data, bestand)).length;
      if (raak !== 1) fouten.push(`${pad}: voldoet aan ${raak} alternatieven, verwacht precies een`);
    }
    if (schema.not && this.#geldig(schema.not, data, bestand)) fouten.push(`${pad}: voldoet aan een verboden vorm`);

    if (schema.if) {
      if (this.#geldig(schema.if, data, bestand)) {
        if (schema.then) this.#toets(schema.then, data, pad, bestand, fouten);
      } else if (schema.else) {
        this.#toets(schema.else, data, pad, bestand, fouten);
      }
    }
  }
}

export function laadSchemas(wortel) {
  const dir = join(wortel, 'schema');
  const namen = ['gemeen', 'parameter', 'rekenregel', 'duidingsregel', 'document', 'ijkkalender', 'state', 'register'];
  return Valideerder.laad(namen.map((n) => join(dir, n + '.schema.json')));
}
