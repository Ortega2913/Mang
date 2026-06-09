import { staticFile } from 'remotion';
import { TemplateConfig } from './types';

// Template: "Neon Chronicles" — Tech empire / Silicon Valley documentary.
// Palette: deep black-green, electric mint accent, electric violet accent2.
// Swap the subject name, numbers, and B-roll paths to generate any tech story.
export const neonChroniclesConfig: TemplateConfig = {
  theme: {
    name: 'Neon Chronicles',
    background: '#040C0E',
    accent: '#00FFAA',
    accent2: '#7B00FF',
  },
  intro: {
    title: 'NEON CHRONICLES',
    subtitle: 'The Algorithm That Ate the World',
    durationInFrames: 100,
  },
  lowerThird: {
    primary: 'Tech Empire Series',
    secondary: 'Season 01 · The Rise of Silicon',
    startFrame: 45,
    durationInFrames: 170,
  },
  scenes: [
    // ── Chapter 01 · The Garage ───────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '01', title: 'The Garage' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/nc-garage.svg'),
      movement: 'zoom-in',
      kicker: 'Where It Started · Menlo Park, 1994',
      caption: 'Two college dropouts, a whiteboard, and a theory about human attention that nobody else took seriously.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/nc-algorithm.svg'),
      movement: 'pan-right',
      kicker: 'The Algorithm · Build 1',
      caption: 'The first version ran on a single server and ranked pages by how many other pages linked to them — a radical idea.',
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 10000,
      label: 'Pages indexed in the first 24 hours. The internet had never been mapped this way before.',
    },

    // ── Chapter 02 · Venture Capital ─────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '02', title: 'The Money' },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/nc-vc.svg'),
      movement: 'pan-left',
      kicker: 'Series A · Sand Hill Road',
      caption: 'Twelve meetings. Eleven rejections. One check that changed everything — $25 million for 12% of the company.',
    },
    {
      type: 'quote',
      durationInFrames: 120,
      quote: 'The business model did not exist yet. We funded the attention — figuring out monetisation was somebody else\'s problem.',
      attribution: '— Investor Slot · Replace with a real VC quote',
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 25,
      prefix: '$',
      suffix: 'M',
      label: 'Series A valuation implied. Within five years that stake was worth $2.8 billion.',
    },

    // ── Chapter 03 · The Moonshot ─────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '03', title: 'Moonshot Mode' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/nc-moonshot.svg'),
      movement: 'zoom-out',
      kicker: 'Project X · Internal Skunkworks',
      caption: 'A secret division given one directive: solve problems ten times better, not ten percent better.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/nc-antitrust.svg'),
      movement: 'drift',
      kicker: 'DoJ Investigation · 2019',
      caption: 'The bigger you become, the harder regulators look. And regulators were looking very hard.',
    },

    // ── Chapter 04 · Digital Dominance ────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '04', title: 'Digital Dominance' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/nc-dominance.svg'),
      movement: 'pan-up',
      kicker: 'Market Position · Today',
      caption: 'Not a company anymore — infrastructure. As invisible and as essential as electricity.',
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 92,
      suffix: '%',
      label: 'Global search market share. The other 8% is everyone else — combined.',
    },

    { type: 'chapter', durationInFrames: 80, number: 'BONUS', title: 'What Comes After Dominance' },
  ],
  outro: {
    brand: 'TECH EMPIRE',
    tagline: 'New tech biography every week — subscribe now',
    durationInFrames: 110,
  },
};
