# Natural Girlies Magazine

A premium editorial digital magazine where natural beauty meets data, wellness, and cultural storytelling. Built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Sanity-ready content models.

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS with a custom editorial design system
- **Animations:** Framer Motion (respects `prefers-reduced-motion`)
- **CMS:** Sanity-ready schema definitions in `src/sanity/schemas/`
- **Analytics:** Google Analytics 4, consent-gated
- **Deployment:** Optimized for Vercel

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |
| `npm run lint` | Lint with ESLint (if configured) |

## Project Structure

```
src/
  app/                # App Router pages and route handlers
    page.tsx          # Homepage
    magazine/         # Magazine landing + issue detail
    stories/          # Long-form features + story detail
    blog/             # Blog index + post detail
    categories/       # Category index + category detail
    authors/          # Author index + author detail
    search/           # Search page
    saved/            # Bookmarked articles
    qa/               # Internal QA index (noindex)
    privacy/          # Legal pages
    layout.tsx        # Root layout
    loading.tsx       # Global loading state
    error.tsx         # Global error boundary
    not-found.tsx     # 404 page
    sitemap.ts        # Dynamic sitemap
    robots.ts         # robots.txt
  components/         # Reusable React components
    ui/               # Buttons, inputs, badges, etc.
    layout/           # Header, footer, mobile menu, breadcrumb
    cards/            # Story, issue, blog, signature section cards
    motion/           # Framer Motion wrappers (FadeIn, etc.)
    comments/         # Moderation-first comment system
    seo/              # JSON-LD components
  hooks/              # Custom React hooks
  lib/                # Utilities, types, constants, sample data
    analytics.ts      # Tracking helpers (consent-gated)
    constants.ts      # Nav, social, categories, signature sections
    sample-data.ts    # Editorial sample content
    types.ts          # Shared TypeScript interfaces
    utils.ts          # cn, formatDate, estimateReadTime, truncate
  sanity/schemas/     # Sanity content model definitions
public/
  manifest.json       # PWA manifest
```

## Environment Variables

See `.env.example` for the full list. The most important:

- `NEXT_PUBLIC_SITE_URL` — Used for metadata, sitemap, and canonical URLs
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics 4. Optional; tracking only fires after the reader accepts cookies.
- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` — Required once you connect Sanity

## Content Model

The site is wired for four primary content types, defined in `src/sanity/schemas/`:

- **Story** — Long-form editorial features
- **BlogPost** — Ongoing editorial, launches, behind-the-scenes
- **Issue** — Quarterly magazine with editor's note, contributors, and featured stories
- **Category** — Crown, Skin, Fashion, Beauty (with editorial intro copy)

Authors, tags, signature sections, and site settings are also defined as separate schemas.

## Design System

The brand palette and typography live in `tailwind.config.ts` (or `globals.css` for Tailwind v4).

- **Type:** Playfair Display (headlines) + Inter (body/UI), loaded via `next/font`
- **Palette:** Cream `#FDF8F4`, espresso `#3C2415`, coral `#E8956A`, plus soft pink, melon, butter yellow, lavender, rose, light tangerine
- **Spacing & radius:** Custom warm-toned shadows and generous editorial spacing

## Accessibility

Built to WCAG 2.2 AA targets:

- Skip-to-content link, semantic landmarks, focus-visible outlines
- Keyboard navigation throughout (modals, menus, comments, search)
- All animations respect `prefers-reduced-motion`
- Screen reader friendly forms and live regions

## Privacy & Compliance

- Cookie consent banner (`<CookieConsent />`) blocks analytics until accepted
- Privacy Policy, Terms of Use, Accessibility Statement, and Comment Policy pages included
- **Important:** Legal copy is a starting point — have a lawyer review before launch

## Deployment

Optimized for Vercel:

1. Push the repo to GitHub
2. Import into Vercel
3. Set environment variables in the Vercel dashboard
4. Deploy

The included `next.config` adds production security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, etc.).

## Roadmap

This codebase ships ready to add:

- Member / subscriber accounts
- Premium issues and gated content
- Sponsored editorials with proper disclosure
- Audio narration for articles
- Community features beyond comments
