# Luxe Hair Studio

A premium hair salon booking platform built with Next.js 16, Prisma, NextAuth, and Cloudinary.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Database**: SQLite (dev) / PostgreSQL (prod) via Prisma 7
- **Auth**: NextAuth v5 (credentials provider, JWT, RBAC)
- **Storage**: Cloudinary (image upload)
- **Email**: Resend (transactional)
- **Styling**: Tailwind CSS 4, shadcn/ui, Framer Motion
- **Validation**: Zod 4, react-hook-form

## Getting Started

```bash
# Install dependencies
npm install

# Setup database
cp .env.example .env.local
# Edit .env.local with your credentials

# Generate Prisma client and push schema
npx prisma generate
npx prisma db push

# Seed with demo data
npm run db:seed

# Start development server
npm run dev
```

### Default Admin Access
- **URL**: http://localhost:3000/admin/login
- **Email**: admin@luxehairstudio.com
- **Password**: admin123

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed with demo data |
| `npm run db:studio` | Open Prisma Studio |
