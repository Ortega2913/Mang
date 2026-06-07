import { staticFile } from 'remotion';
import { TemplateConfig } from './types';

// Starting point for a documentary-style episode, structured the way
// channels like MagnatesMedia pace a "rise of X" story: title card →
// chapter → B-roll with kinetic captions → stat callout → chapter →
// B-roll → quote → chapter → B-roll → outro.
//
// To make a new episode for your niche: copy this file, swap the theme
// colors, rewrite the intro/scenes/outro copy, and point each `image`
// scene's `src` at your own photos/footage stills in `public/images/`.
export const exampleConfig: TemplateConfig = {
  theme: {
    name: 'Gilded Archive',
    background: '#05070C',
    accent: '#F2B84B',
    accent2: '#3E6FD9',
  },
  intro: {
    title: 'THE ARCHITECT',
    subtitle: 'How One Idea Built An Empire',
    durationInFrames: 90,
  },
  lowerThird: {
    primary: 'A Mang Originals Documentary',
    secondary: 'Episode 01 · The Rise',
    startFrame: 40,
    durationInFrames: 170,
  },
  scenes: [
    { type: 'chapter', durationInFrames: 80, number: '01', title: 'Humble Beginnings' },
    {
      type: 'image',
      durationInFrames: 150,
      src: staticFile('images/placeholder-1.svg'),
      movement: 'zoom-in',
      kicker: 'Origins',
      caption: 'Every empire starts with a single bet nobody else was willing to make.',
    },
    {
      type: 'stat',
      durationInFrames: 110,
      value: 1500000000,
      prefix: '$',
      label: 'Built from a single small workshop in under a decade',
    },
    { type: 'chapter', durationInFrames: 80, number: '02', title: 'The Turning Point' },
    {
      type: 'image',
      durationInFrames: 150,
      src: staticFile('images/placeholder-2.svg'),
      movement: 'pan-right',
      kicker: 'The Gamble',
      caption: 'When competitors hesitated, they doubled down — and rewrote the rules.',
    },
    {
      type: 'quote',
      durationInFrames: 130,
      quote: 'The biggest risk is never taking one.',
      attribution: '— On the decision that changed everything',
    },
    { type: 'chapter', durationInFrames: 80, number: '03', title: 'The Legacy' },
    {
      type: 'image',
      durationInFrames: 150,
      src: staticFile('images/placeholder-3.svg'),
      movement: 'drift',
      kicker: 'Today',
      caption: 'Decades later, the playbook they wrote is still being copied.',
    },
  ],
  outro: {
    brand: 'MANG ORIGINALS',
    tagline: 'Subscribe for the next chapter',
    durationInFrames: 100,
  },
};
