export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
};

export const TEXT_MODELS = [
  { id: "openai", label: "GPT (free)" },
  { id: "mistral", label: "Mistral (free)" },
  { id: "llama", label: "Llama (free)" },
  { id: "deepseek", label: "DeepSeek (free)" },
] as const;

export const IMAGE_MODELS = [
  { id: "flux", label: "Flux (best quality)" },
  { id: "flux-realism", label: "Flux Realism" },
  { id: "turbo", label: "Turbo (fastest)" },
] as const;

export const ASPECT_RATIOS = [
  { id: "1:1", label: "Square", width: 1024, height: 1024 },
  { id: "16:9", label: "Landscape", width: 1280, height: 720 },
  { id: "9:16", label: "Portrait", width: 720, height: 1280 },
] as const;

export type ImageItem = {
  id: string;
  prompt: string;
  url: string;
  model: string;
  aspectRatio: string;
  createdAt: number;
};

export type VideoItem = {
  id: string;
  prompt: string;
  url: string;
  createdAt: number;
};
