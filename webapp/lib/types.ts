export type Mode = "chat" | "image" | "video";

export type Attachment = {
  type: "image" | "video";
  url: string;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  attachment?: Attachment;
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
