import { staticFile } from 'remotion';
import { TemplateConfig } from './types';

// Template: "Collapse & Rise" — Company / brand that failed catastrophically
// then came back. The peak → cracks → collapse → survival → rebuild → comeback
// arc is one of the highest-engagement documentary structures on YouTube.
// Palette: pure black, amber accent, red accent2 — warm danger feel.
export const collapseRiseConfig: TemplateConfig = {
  theme: {
    name: 'Collapse & Rise',
    background: '#080808',
    accent: '#F59E0B',
    accent2: '#EF4444',
  },
  intro: {
    title: 'COLLAPSE & RISE',
    subtitle: 'How a $90 Billion Company Fell — and Then Won Again',
    durationInFrames: 100,
  },
  lowerThird: {
    primary: 'Collapse & Rise',
    secondary: 'Business Turnaround Series · Season 01',
    startFrame: 45,
    durationInFrames: 170,
  },
  scenes: [
    // ── Chapter 01 · The Peak ─────────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '01', title: 'The Peak' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/cr-peak.svg'),
      movement: 'zoom-in',
      kicker: 'All-Time High · Year [N]',
      caption: 'The magazine covers. The analyst upgrades. The stock price that made every investor feel like a genius.',
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 90,
      prefix: '$',
      suffix: 'B',
      label: 'Peak market cap — a number that made competitors nervous and insiders complacent.',
    },

    // ── Chapter 02 · First Cracks ─────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '02', title: 'First Cracks' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/cr-cracks.svg'),
      movement: 'pan-right',
      kicker: 'Warning Signs · Ignored',
      caption: 'Three internal memos. Two whistleblower complaints. One board that did not want to hear it.',
    },
    {
      type: 'quote',
      durationInFrames: 120,
      quote: 'Replace with a real, documented internal warning quote — board minutes, regulatory filing, or verified memoir excerpt.',
      attribution: '— Whistleblower Slot · Cite source and date',
    },

    // ── Chapter 03 · The Collapse ─────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '03', title: 'The Collapse' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/cr-collapse.svg'),
      movement: 'zoom-out',
      kicker: 'Crash · The Week Everything Broke',
      caption: 'Forty percent wiped in five trading sessions. Employees found out the company was bankrupt from the news.',
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 97,
      suffix: '%',
      label: 'Share price decline from peak to bankruptcy filing. The full wipeout.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/cr-survival.svg'),
      movement: 'drift',
      kicker: 'Survival Mode · Rock Bottom',
      caption: 'Down to 200 employees, a rented server rack, and one product line nobody believed in — except the founder.',
    },

    // ── Chapter 04 · The Rebuild ──────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '04', title: 'The Rebuild' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/cr-rebuild.svg'),
      movement: 'pan-left',
      kicker: 'New Leadership · The Turnaround Plan',
      caption: "The new CEO's first act was firing half the executive team and calling every remaining employee by name.",
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 18,
      label: 'Months from bankruptcy filing to first profitable quarter. Wall Street called it impossible.',
    },

    // ── Chapter 05 · The Comeback ─────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '05', title: 'The Comeback' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/cr-comeback.svg'),
      movement: 'pan-up',
      kicker: 'Five Years Later · New All-Time High',
      caption: 'The same company. A completely different business model. And a valuation that surpassed the old peak.',
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 140,
      prefix: '$',
      suffix: 'B',
      label: 'New market cap after the turnaround. Fifty billion more than the peak they collapsed from.',
    },

    { type: 'chapter', durationInFrames: 80, number: 'BONUS', title: 'What They Did That Others Cannot Copy' },
  ],
  outro: {
    brand: 'COLLAPSE & RISE',
    tagline: 'New turnaround story every Tuesday — never miss one',
    durationInFrames: 110,
  },
};
