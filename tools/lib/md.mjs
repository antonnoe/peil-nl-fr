// Zeer kleine Markdown-omzetter voor de documenten die Peil zelf schrijft.
// Ondersteunt koppen, alinea's, lijsten, tabellen, vet, code en links.
// Alinea's worden op een regel samengevoegd: geen harde regeleinden in de HTML.

import { esc } from './hulp.mjs';

const inline = (s) => esc(s)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

export function mdNaarHtml(md) {
  const regels = md.replace(/\r\n/g, '\n').split('\n');
  const uit = [];
  let i = 0;
  let alinea = [];
  const spoel = () => { if (alinea.length) { uit.push('<p>' + inline(alinea.join(' ')) + '</p>'); alinea = []; } };

  while (i < regels.length) {
    const r = regels[i];
    if (/^\s*$/.test(r)) { spoel(); i++; continue; }

    const kop = r.match(/^(#{1,4})\s+(.*)$/);
    if (kop) { spoel(); const n = kop[1].length; uit.push(`<h${n}>${inline(kop[2])}</h${n}>`); i++; continue; }

    if (/^\s*[-*]\s+/.test(r)) {
      spoel();
      const items = [];
      while (i < regels.length && /^\s*[-*]\s+/.test(regels[i])) { items.push(inline(regels[i].replace(/^\s*[-*]\s+/, ''))); i++; }
      uit.push('<ul class="plat">' + items.map((t) => `<li>${t}</li>`).join('') + '</ul>');
      continue;
    }

    if (/^\s*\d+\.\s+/.test(r)) {
      spoel();
      const items = [];
      while (i < regels.length && /^\s*\d+\.\s+/.test(regels[i])) { items.push(inline(regels[i].replace(/^\s*\d+\.\s+/, ''))); i++; }
      uit.push('<ol>' + items.map((t) => `<li>${t}</li>`).join('') + '</ol>');
      continue;
    }

    if (r.trim().startsWith('|') && regels[i + 1] && /^\s*\|[-:\s|]+\|\s*$/.test(regels[i + 1])) {
      spoel();
      const cellen = (rij) => rij.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const koppen = cellen(r);
      i += 2;
      const rijen = [];
      while (i < regels.length && regels[i].trim().startsWith('|')) { rijen.push(cellen(regels[i])); i++; }
      uit.push('<div class="tabelhuls"><table class="kaartbaar"><thead><tr>'
        + koppen.map((k) => `<th scope="col">${inline(k)}</th>`).join('')
        + '</tr></thead><tbody>'
        + rijen.map((rij) => '<tr>' + rij.map((c, n) => `<td data-kop="${esc(koppen[n] || '')}">${inline(c)}</td>`).join('') + '</tr>').join('')
        + '</tbody></table></div>');
      continue;
    }

    alinea.push(r.trim());
    i++;
  }
  spoel();
  return uit.join('\n');
}

// Alles vanaf de eerste kop van niveau 2, zodat de titel van het document
// niet twee keer op de pagina staat.
export function mdZonderTitel(md) {
  const knip = md.indexOf('\n## ');
  return knip === -1 ? md : md.slice(knip + 1);
}
