# deepboda.me

Personal site for Deep Boda, Senior DevOps & Full-Stack Engineer.

The page is structured as **one request travelling down the stack**. Each section
is a layer, what I do there, and the thing that tends to break at that layer.

## Run

```bash
npm run dev      # http://localhost:3000
npm run build    # static, all routes prerendered
npm run start    # serve the production build
```

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with CSS custom properties for the design tokens
- **Inter** via `next/font` (self-hosted, preloaded, `display: swap`)
- Zero animation libraries. All motion is **native CSS scroll-driven animation**
  (`animation-timeline: view()`), which runs on the compositor and ships no JS.

## Structure

```
app/
  globals.css      design tokens, layered base + components, scroll animations
  layout.tsx       metadata, JSON-LD Person schema, font
  page.tsx         the whole homepage
  theme-toggle.tsx the only client component on the page
  sitemap.ts
  robots.ts
lib/
  content.ts       all copy lives here, nothing hard-coded in JSX
```

**Edit `lib/content.ts` to change any text.** The page renders from it.

## Notes on the CSS

Base styles and components are inside `@layer base` and `@layer components`.
This matters: unlayered CSS beats layered CSS in the cascade regardless of
specificity, so an unlayered reset would silently override every Tailwind
utility.

Dark mode is `prefers-color-scheme` by default with a manual override stored in
`localStorage` and applied via `data-theme` on `<html>`.

## Deploy

**Phase 1 — Vercel.** Push to GitHub, import, point deepboda.me at it. Free.

**Phase 2 — own infrastructure.** `next build` with `output: "export"` gives a
static bundle for S3 + CloudFront, provisioned with Terraform and deployed from
GitHub Actions. Then write the migration up and link it. The site becomes its own
case study.

## Still to build

- [ ] `/writing` — MDX, the LinkedIn posts as long-form with their graphics
- [ ] `/uses` and `/colophon`
- [ ] Live data panel: uptime, last deploy, build duration from real infra
- [ ] GSAP + Lenis pinned request-path sequence
- [ ] One React Three Fiber moment: the interactive cluster model
- [ ] OG image generation via `ImageResponse`
