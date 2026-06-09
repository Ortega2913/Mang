import { staticFile } from 'remotion';
import { TemplateConfig } from './types';

// Template: "True Crime Files" — Mystery / crime documentary.
// Palette: near-black, blood-red accent, cool gray accent2.
// Swap scene text and images per case. Testimony quote slots must use
// real documented quotes — never fabricate victim or witness statements.
export const trueCrimeConfig: TemplateConfig = {
  theme: {
    name: 'True Crime Files',
    background: '#0C0809',
    accent: '#DC2626',
    accent2: '#6B7280',
  },
  intro: {
    title: 'TRUE CRIME FILES',
    subtitle: 'The Case That Broke Every Rule in the Rulebook',
    durationInFrames: 100,
  },
  lowerThird: {
    primary: 'True Crime Files',
    secondary: 'Case File 01 · Classified',
    startFrame: 45,
    durationInFrames: 170,
  },
  scenes: [
    // ── Chapter 01 · The Crime ────────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '01', title: 'The Crime' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/tc-crime.svg'),
      movement: 'zoom-in',
      kicker: 'Incident Date · [REDACTED]',
      caption: 'A quiet street. A 911 call at 2:47 a.m. And a set of details that did not add up.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/tc-victim.svg'),
      movement: 'pan-right',
      kicker: 'The Victim · Background',
      caption: "Replace with a respectful, documented account of the victim's identity and circumstances.",
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 72,
      label: 'Hours between the incident and the first arrest. A timeline investigators now call impossible.',
    },

    // ── Chapter 02 · The Investigation ───────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '02', title: 'The Investigation' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/tc-suspect.svg'),
      movement: 'pan-left',
      kicker: 'The Suspect · Profile',
      caption: 'Replace with factual, court-documented details about the person of interest — no speculation.',
    },
    {
      type: 'image',
      durationInFrames: 130,
      src: staticFile('images/tc-evidence.svg'),
      movement: 'zoom-out',
      kicker: 'Key Evidence · What the Files Show',
      caption: 'Three pieces of physical evidence. Two of them challenged in court. One that proved decisive.',
    },
    {
      type: 'quote',
      durationInFrames: 120,
      quote: 'Replace this with a direct quote from court transcripts, police reports, or on-record interviews — cite your source.',
      attribution: '— Evidence Slot · Cite transcript page and date',
    },

    // ── Chapter 03 · The Trial ────────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '03', title: 'The Trial' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/tc-trial.svg'),
      movement: 'drift',
      kicker: 'Courtroom · Day [N]',
      caption: 'The defense argument that stunned the prosecution — and the rebuttal that nobody saw coming.',
    },
    {
      type: 'stat',
      durationInFrames: 90,
      value: 11,
      label: "Months the trial ran. Longest in the state's criminal history at the time.",
    },

    // ── Chapter 04 · The Verdict ──────────────────────────────────────────
    { type: 'chapter', durationInFrames: 75, number: '04', title: 'The Verdict' },
    {
      type: 'image',
      durationInFrames: 140,
      src: staticFile('images/tc-verdict.svg'),
      movement: 'pan-up',
      kicker: 'Verdict Day',
      caption: 'Replace with the documented outcome and its aftermath — for victims, families, and the justice system.',
    },
    {
      type: 'quote',
      durationInFrames: 120,
      quote: 'Replace with an on-record reaction quote from an attorney, family member, or official — cited and verified.',
      attribution: '— Verdict Reaction Slot · Source and date required',
    },

    { type: 'chapter', durationInFrames: 80, number: 'BONUS', title: 'The Unanswered Questions' },
  ],
  outro: {
    brand: 'TRUE CRIME FILES',
    tagline: 'New case file every Sunday — subscribe',
    durationInFrames: 110,
  },
};
