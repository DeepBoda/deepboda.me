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
- **MDX** via `@next/mdx` for the writing section
- **Inter** via `next/font` (self-hosted, preloaded, `display: swap`)
- **Native CSS scroll-driven animation** (`animation-timeline: view()`) for every
  reveal. Compositor-run, zero JS.
- **GSAP + ScrollTrigger** only for the pinned request trace, where scrubbing and
  per-section state genuinely need JS. Dynamically imported, so it is not in the
  initial bundle.
- **Lenis** smooth scroll, driven off GSAP's ticker so scroll-linked animation
  stays in sync. Both disabled entirely under `prefers-reduced-motion`, and the
  trace falls back to a static diagram under 1024px.
- **Dynamic OG images** via `next/og` at `/og?title=&kicker=`
- **React Three Fiber** for one 3D moment: the cluster model. Triple-gated
  (>=1024px, no reduced motion, scrolled into view) and dynamically imported,
  so three.js sits in its own 883KB chunk that most visitors never download.
  A static isometric SVG carries the same explanation everywhere else.

## Structure

```
app/
  globals.css           design tokens, layered base + components, scroll animations
  layout.tsx            metadata, JSON-LD Person schema, nav + footer
  page.tsx              the homepage
  nav.tsx  footer.tsx
  theme-toggle.tsx      the only client component on the site
  writing/
    page.tsx            the index
    article-header.tsx  title, date, hero image, BlogPosting JSON-LD
    (post)/
      layout.tsx        prose shell + author CTA. Route group, so the URL
                        stays /writing/<slug> and the index is unaffected.
      <slug>/page.mdx   one folder per post
  sitemap.ts  robots.ts
lib/
  content.ts       homepage copy
  posts.ts         post manifest, drives the index and the sitemap
mdx-components.tsx prose styling for MDX elements
```

## Adding a post

1. Add an entry to `POSTS` in `lib/posts.ts`
2. Drop the image in `public/writing/<slug>.png`
3. Create `app/writing/(post)/<slug>/page.mdx`, starting with
   `<ArticleHeader slug="<slug>" />`

The index, sitemap and JSON-LD all follow from the manifest.

Note: `useMDXComponents()` in this Next version takes **no arguments**.

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

- [x] `/writing` — MDX, seven posts live with their graphics
- [x] Dynamic OG images, per page and per post
- [x] GSAP + Lenis pinned request trace
- [x] 3D cluster model, gated and code-split
- [x] `/uses` and `/colophon`
- [x] RSS feed at `/writing/rss.xml`
- [x] Real build metadata on /colophon, read at build time
- [ ] Live uptime panel, once there is an endpoint worth pulling
