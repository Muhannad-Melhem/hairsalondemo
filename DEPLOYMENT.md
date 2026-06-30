# Deployment Guide

## Deploying to Vercel (Recommended)

### Prerequisites

- A [Vercel](https://vercel.com) account
- A [Supabase](https://supabase.com) project (see [README](./README.md#supabase-setup))
- Your Supabase project URL and anon key ready

### Steps

1. Push your repository to GitHub (or GitLab/Bitbucket)

2. Go to [vercel.com/new](https://vercel.com/new) and import your repository

3. Configure the project:
   - **Framework preset**: Next.js (auto-detected)
   - **Root directory**: `./` (default)
   - **Build command**: `next build` (auto-detected from package.json)
   - **Output directory**: `.next` (auto-detected)

4. Add environment variables in the Vercel dashboard (Settings → Environment Variables):

   | Variable | Stage |
   |----------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview, Development |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview, Development |
   | `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview, Development |
   | `NEXT_PUBLIC_SITE_URL` | Production: `https://your-domain.com`, Preview: auto-assigned |
   | `ADMIN_EMAIL` | Production, Preview, Development |

5. Deploy

   Vercel will automatically deploy on every push to the default branch. Preview deployments are created for pull requests.

### Custom Domain

1. In your Vercel project dashboard, go to **Settings → Domains**
2. Add your domain and follow the DNS configuration instructions
3. Update `NEXT_PUBLIC_SITE_URL` in Vercel environment variables to your custom domain

### Post-Deployment

1. Run the Supabase migration in production:
   - Go to your Supabase dashboard → SQL Editor
   - Run the contents of `supabase/migrations/00001_schema.sql`
2. Create an admin user via Supabase Auth (Email/Password)
3. Verify the admin panel works at `https://your-domain.com/admin/login`

---

## Deploying to Cloudflare Pages

### Prerequisites

- A [Cloudflare](https://cloudflare.com) account
- A [Supabase](https://supabase.com) project
- Node.js 20+ and pnpm installed locally

### Steps

1. Build the static export:

   Cloudflare Pages does not support the full Node.js server required by Next.js App Router by default. You have two options:

   **Option A: Use `@cloudflare/next-on-pages` (recommended)**

   ```bash
   pnpm add -D @cloudflare/next-on-pages
   ```

   Update `next.config.ts`:
   ```ts
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     // existing config...
   };

   // Wrap with next-on-pages if deploying to Cloudflare
   // export default process.env.CF_PAGES ? wrapConfig(nextConfig) : nextConfig;
   export default nextConfig;
   ```

   Build and deploy:
   ```bash
   pnpm exec @cloudflare/next-on-pages
   ```

   **Option B: Static export (limited functionality)**

   Update `next.config.ts` to enable static export:
   ```ts
   const nextConfig: NextConfig = {
     output: "export",
     images: { unoptimized: true }, // Cloudflare Pages doesn't support next/image optimization
     // ...rest of config
   };
   ```

   Build:
   ```bash
   pnpm build
   ```
   The output will be in the `out/` directory.

2. Deploy via the Cloudflare Dashboard:
   - Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
   - Select your repository
   - **Build command**: `pnpm build`
   - **Build output directory**: `.vercel/output/static` (with next-on-pages) or `out` (static export)
   - **Root directory**: `./`
   - Add the same environment variables listed in the Vercel section above
   - Deploy

3. Deploy via Wrangler CLI (alternative):
   ```bash
   npx wrangler pages deploy .vercel/output/static --project-name=luxe-hair-studio
   ```

### Important Notes for Cloudflare

- **Server Actions** (`"use server"`) require the `@cloudflare/next-on-pages` adapter — static export will not support them
- **Image optimization** — `next/image` does not work on Cloudflare Pages without the on-pages adapter or by using `unoptimized: true` with static export
- **API Routes** — The booking API route (`/api/booking`) will not work with static export; use the server action (`createBooking` from `@/lib/supabase/actions.ts`) instead, which is already implemented

### Custom Domain

1. In your Cloudflare Pages project, go to **Custom domains**
2. Add your domain
3. Cloudflare will automatically configure DNS and SSL

---

## Environment Variables Reference

| Variable | Required | Runtime | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Client + Server | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server Only | Service role key (admin operations) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Client + Server | Canonical site URL |
| `ADMIN_EMAIL` | Yes | Server Only | Admin sign-in email |

---

## Supabase Production Checklist

- [ ] Migration applied to production database
- [ ] Auth configured (Email/Password provider enabled)
- [ ] RLS policies verified (public read on content tables, authenticated write)
- [ ] Admin user created in Supabase Auth
- [ ] Admin profile auto-created or manually inserted in `profiles` table
- [ ] Storage bucket created for gallery images (if needed)
- [ ] Auto-generated API keys replaced with production keys
