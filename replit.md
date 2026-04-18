# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### `magnify-website` (React + Vite)
Multi-page studio site for Magnify (Birmingham, UK & Abuja, Nigeria).
- Routes: `/` (cinematic hero + footer only), `/about`, `/services`, `/portfolio`, `/contact`
- Cinematic homepage hero in `src/components/CinematicHero.tsx` — GSAP + OGL (WebGL) panorama cylinder using 12 monochromatic images at `public/hero/img1.png`–`img12.png`. Includes a static-image CSS fallback when WebGL is unavailable.
- Shared `Header` and `Footer` components in `src/components/`.
- Contact form is visual-only (toast confirmation, no backend). Uses react-hook-form + zod.
- Theme: monochrome only — black, white, `#202020`, `#ebebe3`. Fonts: Space Grotesk (display), Inter (body), Cormorant Garamond (cinematic hero overlay).
- Restart workflow: `artifacts/magnify-website: web`
