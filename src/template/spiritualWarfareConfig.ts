import { staticFile } from 'remotion';
import { TemplateConfig } from './types';

// Episode skeleton for "Spiritual Warfare: The 6 Weapons Every Believer Must
// Master" — built from the brief's structure (Ephesians 6 deep dive → real
// testimonies → daily-use strategies → 2026 warning signs → bonus).
//
// This is a TRAILER-LENGTH cut (~80s) that proves out every beat in the
// brief end to end. A 40–50 min episode follows the exact same shape — copy
// this file, then under each chapter add more `image`/`quote` scenes (one
// per sub-point you script), lengthen `durationInFrames` to match your
// voiceover, and lay your narration audio over the composition. The two
// `quote` scenes under "Battles Won" are intentionally left as labeled
// slots — replace them with your own recorded testimony excerpts rather
// than scripted ones.
export const spiritualWarfareConfig: TemplateConfig = {
  theme: {
    name: 'Armor of Light',
    background: '#0A0612',
    accent: '#E8C547',
    accent2: '#6B4FE0',
  },
  intro: {
    title: 'SPIRITUAL WARFARE',
    subtitle: 'The 6 Weapons Every Believer Must Master',
    durationInFrames: 90,
  },
  lowerThird: {
    primary: 'Armor of God Series',
    secondary: 'Episode 01 · Stand Firm — Ephesians 6',
    startFrame: 40,
    durationInFrames: 160,
  },
  scenes: [
    { type: 'chapter', durationInFrames: 70, number: '01', title: 'The Armor of God' },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/sw-armor-1-belt.svg'),
      movement: 'zoom-in',
      kicker: 'Weapon 1 · Belt of Truth',
      caption: 'Truth is what holds every other piece of your armor in place.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/sw-armor-2-breastplate.svg'),
      movement: 'pan-right',
      kicker: 'Weapon 2 · Breastplate of Righteousness',
      caption: 'A guarded heart is a heart the enemy cannot accuse.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/sw-armor-3-shoes.svg'),
      movement: 'pan-left',
      kicker: 'Weapon 3 · Shoes of the Gospel of Peace',
      caption: 'Stand on peace and you will never lose your footing in the fight.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/sw-armor-4-shield.svg'),
      movement: 'drift',
      kicker: 'Weapon 4 · Shield of Faith',
      caption: 'Faith does not dodge the fiery darts — it extinguishes them.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/sw-armor-5-helmet.svg'),
      movement: 'zoom-out',
      kicker: 'Weapon 5 · Helmet of Salvation',
      caption: 'Guard your mind first — that is where every battle begins.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/sw-armor-6-sword.svg'),
      movement: 'pan-up',
      kicker: 'Weapon 6 · Sword of the Spirit',
      caption: 'The Word of God is the only weapon in this list built to attack.',
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 6,
      label: 'Pieces of armor. One command from Ephesians 6:13 — stand firm.',
    },

    { type: 'chapter', durationInFrames: 70, number: '02', title: 'Battles Won' },
    {
      type: 'quote',
      durationInFrames: 120,
      quote: 'Insert a real deliverance testimony here — choose one your viewer can see themselves in.',
      attribution: '— Testimony Slot 1 · Replace with your footage',
    },
    {
      type: 'quote',
      durationInFrames: 120,
      quote: 'A second testimony builds trust faster — pick one that shows a different kind of battle.',
      attribution: '— Testimony Slot 2 · Replace with your footage',
    },

    { type: 'chapter', durationInFrames: 70, number: '03', title: 'How To Use Each Weapon Daily' },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/sw-strategy-1-morning.svg'),
      movement: 'zoom-in',
      kicker: 'Strategy · Morning Armor Prayer',
      caption: 'Speak Ephesians 6 over your day before the world speaks over you.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/sw-strategy-2-scripture.svg'),
      movement: 'pan-right',
      kicker: 'Strategy · Scripture Bombs',
      caption: 'Memorize three verses this week and fire them the moment fear shows up.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/sw-strategy-3-worship.svg'),
      movement: 'drift',
      kicker: 'Strategy · Worship as Warfare',
      caption: 'Some chains only break in an atmosphere of praise.',
    },

    { type: 'chapter', durationInFrames: 70, number: '04', title: 'Warning Signs in 2026' },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/sw-warning-1-apathy.svg'),
      movement: 'zoom-out',
      kicker: 'Watch For · Spiritual Apathy',
      caption: 'A sudden coldness toward prayer and Scripture that was not there before.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/sw-warning-2-unrest.svg'),
      movement: 'pan-left',
      kicker: 'Watch For · Persistent Unrest',
      caption: 'A heaviness that lifts the moment you start praying — and creeps back the moment you stop.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/sw-warning-3-drift.svg'),
      movement: 'pan-down',
      kicker: 'Watch For · Drifting Influences',
      caption: 'Habits and circles that quietly pull you from who you are called to be.',
    },

    { type: 'chapter', durationInFrames: 80, number: 'BONUS', title: 'Companion Shorts + Prayer Guide' },
  ],
  outro: {
    brand: 'FAITH ARMORY',
    tagline: 'Download the Warfare Prayer Guide — link in description',
    durationInFrames: 100,
  },
};
