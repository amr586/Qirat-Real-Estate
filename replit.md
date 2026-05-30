# قيراط — Qirat Real Estate

A bilingual (Arabic/English) real estate portfolio website for the Qirat mobile app, showcasing Cairo properties with animations, contact forms, and an app download banner.

## Run & Operate

- `pnpm --filter @workspace/qirat run dev` — run the frontend (port auto-assigned)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- Required env: None for frontend. `DATABASE_URL` needed for API server.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion
- Routing: Wouter
- Email: @emailjs/browser (needs configuration)
- Fonts: Cairo (Arabic) + Montserrat (English) via Google Fonts
- Build: Vite

## Where things live

- `artifacts/qirat/` — main frontend React app
  - `src/contexts/LanguageContext.tsx` — Arabic/English toggle context
  - `src/data/properties.ts` — 5 Cairo property listings
  - `src/pages/` — Home, About, Services, Properties, PropertyDetail, Contact
  - `src/components/` — Navbar, Footer, LoadingScreen, AppDownloadBanner
  - `public/qirat-logo.jpg` — brand logo

## Architecture decisions

- Static frontend only — no backend needed for the portfolio site
- EmailJS used for contact forms (configure service/template IDs in PropertyDetail.tsx and Contact.tsx)
- Language context wraps the entire app; all text uses `t(ar, en)` helper
- Loading screen shows logo for 2.8s then fades out with framer-motion
- Hero background: video with image fallback (Cairo city aerial photo)

## Product

- Home page: animated "قيراط" word cycle with shimmer effect, video/image hero, stats, featured properties, latest articles section
- About page: team, mission/vision/values, company story
- Services: 5 real estate services (buy, sell, rent, valuation, legal) — no partnership
- Properties: 5 Cairo listings with type filter (all/sale/rent)
- Property detail: full info + contact form + similar properties section → amrw4634@gmail.com
- Contact page: full form → amrw4634@gmail.com
- Sell Unit (/sell): 3-step process + sell form → amrw4634@gmail.com
- Blog (/blog): 6 Cairo real estate articles grid
- Careers (/careers): sales consultant application form + CV link → amrw4634@gmail.com
- App download banner: appears 4s after page load
- Language toggle: Arabic ↔ English (all text translates)

## User preferences

- Brand colors: Navy Blue #1B3A6B + Gold #C9A84C
- Fonts: Cairo (AR) + Montserrat (EN)
- Email for all contact forms: amrw4634@gmail.com
- App link for download banner: TBD (user will provide)

## Gotchas

- EmailJS credentials needed: replace `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, `YOUR_PUBLIC_KEY` in Contact.tsx and PropertyDetail.tsx
- Google Fonts must be loaded from index.html `<link>` tag, NOT from CSS `@import` (PostCSS conflict with Tailwind)
- Video background uses fallback image if CDN video is blocked

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
