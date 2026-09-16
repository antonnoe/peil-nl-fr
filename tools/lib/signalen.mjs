// Signalen voor de Cockpit. Peil slaat zelf geen alarm; het levert alleen dit bestand.
//
// Soorten waarschuwing:
//   gaat_veranderen  aangekondigde wijziging binnen 90 dagen, geldig_tot binnen 90 dagen,
//                    of een raming staat klaar naast een vastgestelde waarde
//   verouderd        verificatiedatum ouder dan de houdbaarheid, of een ijkmoment is
//                    gepasseerd zonder nieuwe verificatie
//   afwijkend        tools gebruiken verschillende waarden voor dezelfde parameter
//   veranderd        veld aanwezig maar leeg; de Peil-run vult het in een volgende taak
//
// Niveau rood zodra een tool nu met een afwijkende, verouderde of niet-vastgestelde waarde rekent.

const DAG = 86400000;
const dagenTot = (datum, peil) => Math.round((Date.parse(datum + 'T00:00:00Z') - Date.parse(peil + 'T00:00:00Z')) / DAG);

// Houdbaarheid per aanpassingsfrequentie, in dagen, voor overheid_vastgesteld.
const HOUDBAARHEID_DAGEN = {
  jaarlijks: 400, halfjaarlijks: 200, meerjaarlijks: 400,
  onregelmatig: 400, zelden: 400, doorlopend: 120, onbekend: 400,
};
// Ongeacht de frequentie beschouwt Peil een verificatie ouder dan een jaar als verouderd:
// een openbaar register hoort niet met een controle van meer dan een jaar geleden te staan.

const inGebruik = (p) => p.gebruikt_in.length > 0;

export function bouwWaarschuwingen(register, ijkkalender, peildatum) {
  const waarschuwingen = [];
  const ids = new Set(register.parameters.map((p) => p.id));
  const push = (w) => waarschuwingen.push({ veranderd: null, ...w });
  const geraakt = (p) => p.gebruikt_in.map((g) => ({ repo: g.repo, cockpit_onderdeel: g.cockpit_onderdeel, locatie: g.locatie }));

  // laatst gepasseerde ijkmoment per domein
  const laatstGepasseerd = (maand, dag) => {
    const [jj] = peildatum.split('-').map(Number);
    const kandidaten = [jj, jj - 1].map((j) => `${j}-${String(maand).padStart(2, '0')}-${String(dag).padStart(2, '0')}`);
    return kandidaten.find((d) => dagenTot(d, peildatum) <= 0) ?? null;
  };
  const ijkNL = laatstGepasseerd(12, 15);
  const ijkFR = laatstGepasseerd(4, 15);

  for (const p of register.parameters) {
    const raakt = geraakt(p);
    const gebruikt = inGebruik(p);

    // --- afwijkend
    const afw = p.gebruikt_in.filter((g) => g.afwijkend);
    if (afw.length) {
      push({
        sleutel: `afwijkend:${p.id}`, soort: 'afwijkend', niveau: 'rood', parameter: p.id,
        omschrijving: `Tools gebruiken verschillende waarden voor ${p.naam_nl}: `
          + afw.map((g) => `${g.repo} ${g.waarde_in_tool}`).join('; ') + '.',
        geraakt: afw.map((g) => ({ repo: g.repo, cockpit_onderdeel: g.cockpit_onderdeel, locatie: g.locatie })),
      });
    }

    // --- gaat veranderen: aangekondigde wijziging binnen 90 dagen
    if (p.aangekondigde_wijziging?.datum) {
      const d = dagenTot(p.aangekondigde_wijziging.datum, peildatum);
      if (d >= 0 && d <= 90) {
        push({
          sleutel: `gaat_veranderen:aankondiging:${p.id}`, soort: 'gaat_veranderen',
          niveau: gebruikt && p.status !== 'vastgesteld' ? 'rood' : 'oranje', parameter: p.id,
          omschrijving: `Aangekondigde wijziging over ${d} dagen: ${p.aangekondigde_wijziging.omschrijving}.`,
          geraakt: raakt,
        });
      }
    }

    // --- gaat veranderen: geldigheid loopt af binnen 90 dagen
    if (p.geldig_tot && p.status !== 'vervallen') {
      const d = dagenTot(p.geldig_tot, peildatum);
      if (d >= 0 && d <= 90) {
        push({
          sleutel: `gaat_veranderen:geldig_tot:${p.id}`, soort: 'gaat_veranderen',
          niveau: gebruikt ? 'rood' : 'oranje', parameter: p.id,
          omschrijving: `De geldigheid loopt over ${d} dagen af, op ${p.geldig_tot}.`,
          geraakt: raakt,
        });
      }
    }

    // --- gaat veranderen: een raming staat klaar naast een vastgestelde waarde
    if (p.status === 'vastgesteld' && ids.has(p.id + '_raming')) {
      const raming = register.parameters.find((q) => q.id === p.id + '_raming');
      push({
        sleutel: `gaat_veranderen:raming:${p.id}`, soort: 'gaat_veranderen',
        niveau: 'oranje', parameter: p.id,
        omschrijving: `Naast de vastgestelde waarde staat een raming klaar: ${raming.waarde_weergave}. Zolang de raming niet is vastgesteld, blijft de vastgestelde waarde leidend.`,
        geraakt: raakt,
      });
    }

    // --- verouderd: verificatiedatum voorbij de houdbaarheid
    if (p.status === 'vastgesteld' && p.verificatiedatum) {
      const grens = p.houdbaarheidsdatum
        ? dagenTot(p.houdbaarheidsdatum, peildatum)
        : HOUDBAARHEID_DAGEN[p.levensduur_a.aanpassingsfrequentie] + dagenTot(p.verificatiedatum, peildatum);
      if (grens < 0) {
        push({
          sleutel: `verouderd:houdbaarheid:${p.id}`, soort: 'verouderd',
          niveau: gebruikt ? 'rood' : 'oranje', parameter: p.id,
          omschrijving: `De verificatie van ${p.verificatiedatum} is ouder dan de houdbaarheid die hoort bij de aanpassingsfrequentie ${p.levensduur_a.aanpassingsfrequentie}; Peil houdt daarbij een bovengrens van een jaar aan.`,
          geraakt: raakt,
        });
      } else {
        // --- verouderd: ijkmoment gepasseerd zonder nieuwe verificatie
        const ijk = p.land === 'FR' ? ijkFR : ijkNL;
        if (ijk && p.verificatiedatum < ijk && ['jaarlijks', 'halfjaarlijks'].includes(p.levensduur_a.aanpassingsfrequentie)) {
          push({
            sleutel: `verouderd:ijkmoment:${p.id}`, soort: 'verouderd',
            niveau: gebruikt ? 'rood' : 'oranje', parameter: p.id,
            omschrijving: `Het ijkmoment van ${ijk} is gepasseerd zonder nieuwe verificatie; de laatste verificatie is van ${p.verificatiedatum}.`,
            geraakt: raakt,
          });
        }
      }
    }

    // --- verouderd: een tool rekent met een waarde die Peil niet heeft vastgesteld
    if (gebruikt && p.status === 'te_verifieren') {
      push({
        sleutel: `verouderd:niet_vastgesteld:${p.id}`, soort: 'verouderd', niveau: 'rood', parameter: p.id,
        omschrijving: `${p.gebruikt_in.length} tool${p.gebruikt_in.length === 1 ? '' : 's'} rekent met een waarde voor ${p.naam_nl} die geen bron met verificatiedatum heeft.`,
        geraakt: raakt,
      });
    }
    if (gebruikt && p.status === 'vervallen') {
      push({
        sleutel: `verouderd:vervallen:${p.id}`, soort: 'verouderd', niveau: 'rood', parameter: p.id,
        omschrijving: `Een tool gebruikt nog een vervallen grootheid.`, geraakt: raakt,
      });
    }

    // --- veranderd: veld aanwezig maar leeg, de Peil-run vult het in taak 2
    push({
      sleutel: `veranderd:${p.id}`, soort: 'veranderd', niveau: 'grijs', parameter: p.id,
      omschrijving: 'Wat er sinds de vorige Peil-run aan deze parameter is veranderd. Nog niet gevuld.',
      geraakt: raakt, veranderd: null,
    });
  }

  return waarschuwingen;
}

export function bouwState(register, ijkkalender, peildatum, versie, licentie) {
  const alle = bouwWaarschuwingen(register, ijkkalender, peildatum);
  // De grijze plaatshouders staan per parameter in de API, maar niet als losse
  // waarschuwing in state.json; anders verdrinkt het signaal in de plaatshouders.
  const waarschuwingen = alle.filter((w) => w.soort !== 'veranderd');

  const tellers = (lijst) => ({
    vastgesteld: lijst.filter((p) => p.status === 'vastgesteld').length,
    raming: lijst.filter((p) => p.status === 'raming').length,
    te_verifieren: lijst.filter((p) => p.status === 'te_verifieren').length,
    vervallen: lijst.filter((p) => p.status === 'vervallen').length,
    afwijkend_tussen_tools: lijst.filter((p) => p.gebruikt_in.some((g) => g.afwijkend)).length,
  });

  const perOnderdeel = new Map();
  for (const p of register.parameters) {
    for (const g of p.gebruikt_in) {
      if (!perOnderdeel.has(g.cockpit_onderdeel)) perOnderdeel.set(g.cockpit_onderdeel, { repos: new Set(), params: new Set() });
      const o = perOnderdeel.get(g.cockpit_onderdeel);
      o.repos.add(g.repo);
      o.params.add(p.id);
    }
  }

  const perCockpit = [...perOnderdeel.entries()].map(([onderdeel, o]) => {
    const lijst = register.parameters.filter((p) => o.params.has(p.id));
    return {
      cockpit_onderdeel: onderdeel,
      repos: [...o.repos].sort(),
      tellers: tellers(lijst),
      waarschuwingen: waarschuwingen
        .filter((w) => w.geraakt.some((g) => g.cockpit_onderdeel === onderdeel))
        .map((w) => w.sleutel)
        .sort(),
    };
  }).sort((a, b) => a.cockpit_onderdeel.localeCompare(b.cockpit_onderdeel));

  return {
    meta: {
      bron: 'Peil, openbaar parameterregister NL-FR',
      versie, versiedatum: peildatum, peildatum, licentie,
      toelichting: 'Peil is een meetbron. Het stuurt geen mails, opent geen issues en slaat geen alarm. Alle signalen staan hier en worden door de Cockpit opgehaald.',
      soorten: {
        gaat_veranderen: 'aangekondigde wijziging binnen 90 dagen, geldigheid die binnen 90 dagen afloopt, of een raming die klaarstaat naast een vastgestelde waarde',
        verouderd: 'verificatiedatum voorbij de houdbaarheid, een gepasseerd ijkmoment zonder nieuwe verificatie, of een tool die rekent met een niet-vastgestelde of vervallen waarde',
        afwijkend: 'tools gebruiken verschillende waarden voor dezelfde parameter',
        veranderd: 'veld aanwezig maar leeg; de Peil-run vult dit in een volgende taak',
      },
      niveaus: { rood: 'een tool rekent nu met een afwijkende, verouderde of niet-vastgestelde waarde', oranje: 'aandacht nodig, geen tool rekent er nu fout mee', grijs: 'plaatshouder' },
    },
    totalen: tellers(register.parameters),
    per_cockpit_onderdeel: perCockpit,
    waarschuwingen: waarschuwingen.sort((a, b) => a.sleutel.localeCompare(b.sleutel)),
  };
}
