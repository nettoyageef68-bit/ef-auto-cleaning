# AGENTS.md

This project is a TanStack Start site for EF Auto Cleaning, a mobile interior car cleaning service based in Mulhouse, France.

## Architecture

- `src/routes/__root.tsx` defines the root HTML shell, global metadata, and language.
- `src/routes/index.tsx` contains the main single-page React experience. It manages section switching, booking form state, the subscription simulator, the referral form, and the lightweight admin view.
- `src/styles.css` contains the global visual system, responsive layout rules, typography imports, and all page-specific styling.
- `src/router.tsx` wires TanStack Router to the generated route tree.
- `src/routes/products/` and `src/data/products.ts` are scaffolded product-template remnants and are not part of the EF Auto Cleaning experience unless intentionally reused.
- `netlify.toml` contains Netlify deployment and dev-server configuration.

## Key Technologies

- TanStack Start and TanStack Router for routing and SSR-compatible React rendering.
- React 19 with TypeScript.
- Vite 7 for development and production bundling.
- Tailwind CSS 4 is available, though this site primarily uses hand-authored CSS in `src/styles.css`.
- Lucide React provides interface icons.
- Netlify hosts and builds the application.

## Conventions

- Keep route components in `src/routes/` and use TanStack Router file-based routing.
- Use PascalCase for React components and camelCase for local functions and state.
- Prefer the existing `Section` union in `src/routes/index.tsx` when adding or renaming top-level sections.
- Keep the EF Auto Cleaning visual identity consistent: off-black background, gold primary accent, green subscription/accent states, Bebas Neue display headings, and DM Sans body text.
- Keep form behavior clear and client-side unless persistence is explicitly requested. If persistent bookings, referrals, subscriptions, or admin data are needed, use Netlify platform primitives and read the relevant Netlify database skill before implementing.
- Do not run build commands during automated edits. Use lightweight checks such as `npx tsc --noEmit` when appropriate.

## Non-Obvious Decisions

The provided static HTML was translated into React components instead of embedded as raw HTML so the navigation, simulator, booking flow, referral flow, and admin interactions can use React state. The admin area is intentionally session-local; it demonstrates workflow behavior but does not persist data after refresh.

The original emoji-heavy placeholders were replaced with Lucide icons and styled visual blocks to better match a production service site while preserving the original content, offers, phone number, service area, pricing, and French copy.
