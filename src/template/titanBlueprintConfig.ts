import { staticFile } from 'remotion';
import { TemplateConfig } from './types';

// Template: "Titan's Blueprint" — Self-made billionaire / entrepreneur story.
// Palette: deep charcoal, warm cream accent, antique gold accent2.
// The six chapters mirror the classic "zero to billionaire" arc that performs
// well on documentary channels. Swap stats and captions for your subject.
export const titanBlueprintConfig: TemplateConfig = {
  theme: {
    name: "Titan's Blueprint",
    background: '#060504',
    accent: '#E8D5A3',
    accent2: '#7A5C1E',
  },
  intro: {
    title: "TITAN'S BLUEPRINT",
    subtitle: 'From Nothing to a Net Worth the World Couldn\'t Ignore',
    durationInFrames: 100,
  },
  lowerThird: {
    primary: "Titan's Blueprint",
    secondary: 'Self-Made Billionaire Series · Episode 01',
    startFrame: 45,
    durationInFrames: 170,
  },
  scenes: [
    // ── Chapter 01 · Zero ─────────────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '01', title: 'Born with Nothing' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/tb-poverty.svg'),
      movement: 'zoom-in',
      kicker: 'Origin · The Beginning',
      caption: 'No trust fund. No connections. No roadmap. Just a question they could not stop asking: why not me?',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/tb-hustle.svg'),
      movement: 'pan-right',
      kicker: 'First Dollar · Age [N]',
      caption: 'The first business was embarrassingly simple. The margin was razor-thin. The lesson was worth billions.',
    },

    // ── Chapter 02 · The Mentor ───────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '02', title: 'The Mentor' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/tb-mentor.svg'),
      movement: 'pan-left',
      kicker: 'The Meeting That Changed Everything',
      caption: 'One conversation in a hotel lobby rewired how they thought about money, risk, and time.',
    },
    {
      type: 'quote',
      durationInFrames: 120,
      quote: 'Replace with a real, attributed quote from the mentor relationship — interview, memoir, or verified source.',
      attribution: '— Mentor Quote Slot · Cite source',
    },

    // ── Chapter 03 · The Breakthrough ────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '03', title: 'The Breakthrough' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/tb-breakthru.svg'),
      movement: 'zoom-out',
      kicker: 'The Bet · Year [N]',
      caption: 'They put everything on one deal. Every dollar. Their reputation. Their marriage nearly did not survive it.',
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 47,
      suffix: 'x',
      label: 'Return on the single bet that turned them from struggling entrepreneur to industry force.',
    },

    // ── Chapter 04 · Costly Mistakes ──────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '04', title: 'Costly Mistakes' },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/tb-mistakes.svg'),
      movement: 'drift',
      kicker: 'The Setback · Year [N]',
      caption: 'The acquisition that almost ended the empire before it was fully built. Nine figures lost in 18 months.',
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 340,
      prefix: '$',
      suffix: 'M',
      label: 'Lost in the single worst decision of their career. Most people quit here. They did not.',
    },

    // ── Chapter 05 · The Billion ──────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '05', title: 'The Billion' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/tb-billion.svg'),
      movement: 'pan-up',
      kicker: 'Forbes List · Year [N]',
      caption: 'The day the number hit ten figures — and why they say it felt like nothing changed and everything changed.',
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 1,
      prefix: '$',
      suffix: 'B+',
      label: 'Net worth reached. From the first dollar earned as a teenager to the cover of Forbes.',
    },

    { type: 'chapter', durationInFrames: 80, number: 'BONUS', title: 'The Blueprint They Wish Someone Gave Them' },
  ],
  outro: {
    brand: "TITAN'S BLUEPRINT",
    tagline: 'New billionaire story every fortnight — subscribe',
    durationInFrames: 110,
  },
};
