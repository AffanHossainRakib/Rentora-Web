# Rentora

Rental marketplace frontend — tenants find basha vara across Bangladesh, landlords list
properties, admins moderate the platform. Next.js 16 App Router frontend for the
[Rentora backend](https://github.com/AffanHossainRakib/Rentora).

## Tech stack

- Next.js 16 (App Router, TypeScript), Tailwind CSS v4, shadcn/ui
- Server Actions + httpOnly cookies for auth (no client-side token handling)
- `proxy.ts` (Next 16 Middleware) for route protection by role
- Cloudinary for profile and property photo uploads (signed, server-side)
- Stripe Checkout for payments (hosted by the backend, the frontend only redirects)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

### Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `BACKEND_API_URL` | server only | Base URL of the Rentora backend API |
| `NEXT_PUBLIC_SITE_URL` | client + server | This site's own URL — metadata, sitemap, Stripe's return URL |
| `GOOGLE_SITE_VERIFICATION` | server (rendered in `<head>`) | Search Console verification tag, optional |
| `CLOUDINARY_CLOUD_NAME` | server | Cloudinary account for image uploads |
| `CLOUDINARY_API_KEY` | server | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | server, **never** `NEXT_PUBLIC_` | Signs uploads; must stay server-only |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | client + server | Mirrors `CLOUDINARY_CLOUD_NAME`, used to validate image URLs before handing them to `next/image` |

No JWT secret lives in this project by design — see "Auth model" below.

## Auth model

The frontend holds no JWT signing secret. `proxy.ts` only *decodes* the access token (role and
expiry) for fast redirects; the real, backend-verified check is `GET /auth/me`, called from every
layout that needs the session (`service/getMe.ts`). A forged or tampered cookie gets past the
proxy's redirect but is rejected the moment a protected layout calls `getMe()`, before any
protected content renders. See `..docs/01-rentora-frontend/folder-structure-reference.md` (project
memory) for the full reasoning.

## Project structure

Route groups: `(authGroup)` (login/register), `(publicGroup)` (home, browse, property details,
city pages, legal, payment return pages), `(dashboardGroup)` (tenant/landlord/admin dashboards).
A component or action used by only one route lives in that route's `_components`/`_actions`
folder; shared across a group it moves up to the group's folder; shared app-wide it lives in
`components/shared/`. Full layout in `..docs/01-rentora-frontend/features.md`.

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build (also type-checks)
npm run lint     # eslint
npm start        # run a production build
```

## Deployment (Vercel)

1. Set all the environment variables above in the Vercel project settings.
2. Set `NEXT_PUBLIC_SITE_URL` to the deployed URL once known.
3. Apply the backend changes in `..docs/01-rentora-frontend/backend-changes-prompt.md` — several
   frontend features (landlord's own property list, reviews on the property page, the payment
   return flow, amenities filtering, admin user search) depend on them.
4. After deploying, verify the site in Google Search Console and submit `/sitemap.xml`.

## Admin credentials (demo)

```
Email:    admin@rentora.test
Password: password
```

## Documentation

- `API_INTEGRATION.md` — every backend endpoint mapped to the frontend route/component that calls it
- `..docs/01-rentora-frontend/features.md` — the full build plan, decisions and phase-by-phase notes
- `..docs/01-rentora-frontend/seo.md` — the SEO plan (metadata, city pages, sitemap, structured data)
- `..docs/01-rentora-frontend/backend-changes-prompt.md` — backend changes this frontend assumes
