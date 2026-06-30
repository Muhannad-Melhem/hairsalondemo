# Contributing

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `pnpm install`
4. Copy `.env.example` to `.env.local` and fill in the values
5. Run the dev server: `pnpm dev`

## Guidelines

- Follow the existing code style and conventions (TypeScript strict mode, Tailwind v4 syntax, Framer Motion for animations)
- Use `@/` path aliases for imports from `src/`
- Run `pnpm lint` before committing
- Write descriptive commit messages
- Keep components focused and file-scoped
- Use `cn()` from `@/lib/utils` for conditional class merging
- Add Zod schemas for any form validation
- Ensure new pages are added to `src/app/sitemap.ts`

## Project Conventions

- **Server Actions** go in `src/lib/supabase/actions.ts`
- **Supabase clients** live in `src/lib/supabase/`
- **Types** are in `src/types/index.ts`
- **UI primitives** use shadcn/ui in `src/components/ui/`
- **Site configuration** is in `src/lib/constants.ts`
- **Static demo data** (used as fallback) is in `src/lib/data.ts`

## Pull Requests

1. Create a feature branch from `main`
2. Make your changes
3. Ensure the build passes: `pnpm build`
4. Open a PR with a clear title and description
