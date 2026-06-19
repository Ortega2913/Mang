# Grok Clone

A free, open-source clone of the Grok chat UI built with Next.js and Tailwind CSS.
Supports chat, image generation, and video generation using free APIs.

## Free APIs used

| Mode  | Provider                                   | API key required? |
|-------|---------------------------------------------|--------------------|
| Chat  | [Pollinations.ai](https://pollinations.ai) (OpenAI-compatible) | No |
| Image | [Pollinations.ai](https://pollinations.ai) image generation    | No |
| Video | [Hugging Face Inference API](https://huggingface.co/docs/api-inference) (`damo-vilab/text-to-video-ms-1.7b`) | Yes — free tier |

## Setup

```bash
cd webapp
npm install
cp .env.example .env.local
```

Chat and image generation work immediately with no API key.

To enable video generation, create a free token at
https://huggingface.co/settings/tokens and put it in `.env.local`:

```
HF_API_TOKEN=hf_xxxxxxxxxxxxxxxxxxxx
```

## Run

```bash
npm run dev
```

Open http://localhost:3000.

## Notes

- Hugging Face's free inference tier can be slow to "warm up" a model on first
  use (the API will return an estimated wait time) and is rate-limited.
- Pollinations.ai is unauthenticated and rate-limited; for production use
  consider adding your own paid provider keys.
