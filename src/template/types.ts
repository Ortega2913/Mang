import { CameraMovement } from '../components/KenBurnsImage';

export type Theme = {
  name: string;
  background: string;
  accent: string;
  accent2: string;
};

export type IntroConfig = {
  title: string;
  subtitle: string;
  durationInFrames: number;
};

export type OutroConfig = {
  brand: string;
  tagline: string;
  durationInFrames: number;
};

export type LowerThirdConfig = {
  primary: string;
  secondary: string;
  startFrame: number;
  durationInFrames: number;
};

export type ChapterScene = {
  type: 'chapter';
  durationInFrames: number;
  number: string;
  title: string;
};

export type ImageScene = {
  type: 'image';
  durationInFrames: number;
  src: string;
  movement?: CameraMovement;
  kicker?: string;
  caption?: string;
};

export type StatScene = {
  type: 'stat';
  durationInFrames: number;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
};

export type QuoteScene = {
  type: 'quote';
  durationInFrames: number;
  quote: string;
  attribution?: string;
};

export type SceneConfig = ChapterScene | ImageScene | StatScene | QuoteScene;

export type TemplateConfig = {
  theme: Theme;
  intro: IntroConfig;
  scenes: SceneConfig[];
  outro: OutroConfig;
  lowerThird?: LowerThirdConfig;
};

export const getTemplateDuration = (config: TemplateConfig): number =>
  config.intro.durationInFrames +
  config.scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0) +
  config.outro.durationInFrames;
