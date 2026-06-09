import { staticFile } from 'remotion';
import { TemplateConfig } from './types';

// Template: "Dark Empire" — Corporate business biography.
// Palette: near-black background, burnished gold accent, navy blue accent2.
// Copy this file, swap src paths with your own B-roll, and fill in your
// subject's actual company/name/numbers. Every durationInFrames is sized for
// a 30 fps narration of roughly the shown caption length.
export const darkEmpireConfig: TemplateConfig = {
  theme: {
    name: 'Dark Empire',
    background: '#070810',
    accent: '#C9A84C',
    accent2: '#1E3A7A',
  },
  intro: {
    title: 'THE DARK EMPIRE',
    subtitle: 'How One Family Built a $200 Billion Dynasty',
    durationInFrames: 100,
  },
  lowerThird: {
    primary: 'Corporate Chronicles',
    secondary: 'Business Biography Series',
    startFrame: 45,
    durationInFrames: 170,
  },
  scenes: [
    // ── Chapter 01 · Origins ──────────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '01', title: 'Humble Beginnings' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/de-origins.svg'),
      movement: 'zoom-in',
      kicker: 'The Starting Point · 1940s',
      caption: 'Born into a working-class family with nothing but a relentless drive to change their circumstances.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/de-pivot.svg'),
      movement: 'pan-right',
      kicker: 'The First Venture · Decade 1',
      caption: 'A $500 loan, a battered truck, and a route no one else wanted — the first deal that changed everything.',
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 500,
      prefix: '$',
      label: 'The only capital they started with. Zero investors. Zero safety net.',
    },

    // ── Chapter 02 · Power Play ───────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '02', title: 'The Power Play' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/de-rivals.svg'),
      movement: 'pan-left',
      kicker: 'Eliminating Competition · The 1960s',
      caption: 'They did not compete with rivals — they absorbed them, one strategic acquisition at a time.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/de-empire.svg'),
      movement: 'zoom-out',
      kicker: 'Vertical Integration · The Masterstroke',
      caption: 'Controlling the supply chain from raw materials to the consumer — a model economists still study today.',
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 38,
      suffix: '%',
      label: 'Market share captured within two decades — without a single public share offering.',
    },

    // ── Chapter 03 · The Controversy ─────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '03', title: 'The Controversy' },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/de-scandal.svg'),
      movement: 'drift',
      kicker: 'Whistleblower Reports · 1978',
      caption: 'The Senate investigation that nearly unraveled three decades of carefully constructed power.',
    },
    {
      type: 'quote',
      durationInFrames: 120,
      quote: 'They built the infrastructure of this country. They also built the infrastructure of corruption.',
      attribution: '— Testimony Slot · Replace with a real quote from court records or interview',
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 14,
      label: 'Congressional hearings endured — and survived — without a single criminal conviction.',
    },

    // ── Chapter 04 · The Legacy ───────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '04', title: 'The Legacy' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/de-legacy.svg'),
      movement: 'pan-up',
      kicker: 'Three Generations Later',
      caption: 'The empire did not die — it transformed. Philanthropy, politics, and quiet ownership of the systems that govern daily life.',
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 200,
      prefix: '$',
      suffix: 'B',
      label: 'Combined family net worth across four generations. Built on that first $500.',
    },

    // ── BONUS ─────────────────────────────────────────────────────────────
    { type: 'chapter', durationInFrames: 80, number: 'BONUS', title: 'The Playbook They Never Shared' },
  ],
  outro: {
    brand: 'CORPORATE CHRONICLES',
    tagline: 'Subscribe — new business biography every Thursday',
    durationInFrames: 110,
  },
};
