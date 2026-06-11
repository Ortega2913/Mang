# Pollo AI Studio (Replica)

A from-scratch Next.js + Tailwind CSS clone of the [pollo.ai](https://pollo.ai)
landing page and AI generator UI — same layout, navigation, generation
studio, pricing and FAQ structure, with a fully working **mock** generation
flow (no paid AI API keys required).

> This is a UI/UX replica for demo & learning purposes. The "Generate"
> button simulates a render and returns a placeholder result — it does not
> call any real AI model.

## Pages

- `/` — Landing page: hero + generation studio, model strip, showcase
  gallery, tools/features grid, how-it-works, testimonials, pricing, FAQ, CTA.
- `/create` — Full-screen AI Generator Studio (text-to-video, image-to-video,
  text-to-image, AI avatar).
- `/pricing` — Dedicated pricing + FAQ page.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build a static export

```bash
npm run build
```

This produces a fully static site in `web/out/` (Next.js `output: "export"`),
which can be hosted on **any** static host — GitHub Pages, Vercel, Netlify,
Cloudflare Pages, etc.

## Free deployment & free domain

### Option 1 — GitHub Pages (already wired up)

A GitHub Actions workflow at `.github/workflows/deploy.yml` builds this app
and deploys `web/out` to GitHub Pages on every push to `main`.

To enable it:

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. In the repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).
4. Your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

That URL is your **free domain** — no purchase or registration needed. The
`next.config.ts` automatically detects GitHub Actions and sets the correct
`basePath`/`assetPrefix` for project pages.

### Option 2 — Vercel / Netlify (free tier, custom subdomain)

Both platforms offer a free `*.vercel.app` / `*.netlify.app` domain:

1. Import this repo on [vercel.com/new](https://vercel.com/new) or
   [app.netlify.com](https://app.netlify.com).
2. Set the project **root directory** to `web`.
3. Build command: `npm run build` — output directory: `out`.
4. Deploy. You'll get a free `your-project.vercel.app` /
   `your-project.netlify.app` URL automatically.

### Connecting a custom domain later

Once deployed, you can attach a free subdomain from a provider like
[is-a.dev](https://www.is-a.dev/) or a low-cost domain from any registrar to
your GitHub Pages / Vercel / Netlify site via their "Custom Domain" settings —
no code changes required.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, static export)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) icons
