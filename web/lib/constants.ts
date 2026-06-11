export type ImageModel = {
  id: string;
  label: string;
  description: string;
};

export const IMAGE_MODELS: ImageModel[] = [
  {
    id: "flux",
    label: "Flux",
    description: "Sharp, versatile, great all-rounder",
  },
  {
    id: "flux-realism",
    label: "Realism",
    description: "Photorealistic images",
  },
  {
    id: "flux-anime",
    label: "Anime",
    description: "Anime & illustration style",
  },
  {
    id: "flux-3d",
    label: "3D Render",
    description: "3D rendered look",
  },
  {
    id: "turbo",
    label: "Turbo",
    description: "Fastest generation",
  },
];

export type AspectRatio = {
  id: string;
  label: string;
  width: number;
  height: number;
};

export const ASPECT_RATIOS: AspectRatio[] = [
  { id: "square", label: "Square (1:1)", width: 1024, height: 1024 },
  { id: "portrait", label: "Portrait (9:16)", width: 768, height: 1344 },
  { id: "landscape", label: "Landscape (16:9)", width: 1344, height: 768 },
  { id: "standard", label: "Standard (4:3)", width: 1024, height: 768 },
];

export const VIDEO_ASPECT_RATIOS: AspectRatio[] = [
  { id: "landscape", label: "Landscape (16:9)", width: 960, height: 544 },
  { id: "square", label: "Square (1:1)", width: 720, height: 720 },
  { id: "portrait", label: "Portrait (9:16)", width: 544, height: 960 },
];

export const SCENE_COUNTS = [3, 4, 5, 6];

export const SECONDS_PER_SCENE = [2, 3, 4, 5];
