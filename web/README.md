# Lumora AI — Free AI Image & Video Generator

A fully functional AI image & video generator, inspired by tools like
pollo.ai, built with Next.js and free, no-API-key AI services.

## Features

- **AI Image Generator** — text-to-image using [Pollinations.ai](https://pollinations.ai)
  (Flux, Realism, Anime, 3D, Turbo styles), multiple aspect ratios, seed
  control, AI prompt enhancer, download, and recent-generations history.
- **AI Video Generator** — describe a story and the app:
  1. Uses a free LLM to write a multi-scene shot list.
  2. Generates an AI image for each scene.
  3. Animates the scenes (Ken Burns zoom + crossfades) and records them
     into a downloadable video, entirely in the browser via
     `canvas.captureStream()` + `MediaRecorder`.
- **Optional "Pro" text-to-video** — if you set the `HF_API_TOKEN` env var
  (a free Hugging Face token), the video page also offers an experimental
  true text-to-video model via Hugging Face's free Inference API.
- No sign-up, no database, no paid APIs required.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- API routes proxy Pollinations' image/text APIs (keeps requests same-origin
  so the browser canvas isn't CORS-tainted, which is required for the video
  recorder).

## Local development

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000.

## Deploying for free (Vercel)

This app is zero-config on [Vercel](https://vercel.com)'s free Hobby plan:

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. Go to https://vercel.com/new and import the repository.
3. Set **Root Directory** to `web`.
4. (Optional) Add an environment variable `HF_API_TOKEN` if you want to
   enable the experimental Pro text-to-video feature — get a free token at
   https://huggingface.co/settings/tokens.
5. Click **Deploy**.

Once connected, every push to this branch automatically triggers a new
deployment — no further setup needed.

## Deploying for free (Netlify)

1. Go to https://app.netlify.com/start and import the repository.
2. Set **Base directory** to `web`.
3. Build command: `npm run build`, Publish directory: `.next`
   (Netlify auto-detects Next.js and installs the required adapter).
4. (Optional) Add `HF_API_TOKEN` under Site settings → Environment variables.
5. Deploy. Future pushes redeploy automatically.

## Notes

- Image and text generation are powered by Pollinations.ai's free public
  API (no key required). Occasionally the free service may be slow or
  briefly unavailable — the UI surfaces a friendly error and lets you retry.
- The slideshow video generator works in any modern Chromium/Firefox
  browser. Safari support for in-browser video recording can vary.
