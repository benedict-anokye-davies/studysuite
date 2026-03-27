# StudySuite

A platform for UK university students to discover, track, and manage career opportunities — internships, spring weeks, grad schemes, scholarships, and more.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **UI:** Tailwind CSS v4, shadcn/ui, Framer Motion
- **Auth & Database:** Supabase (Auth + Postgres)
- **ORM:** Drizzle ORM
- **State:** Zustand (client), React Query (server)
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
# Copy .env.local.example to .env.local and fill in your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/             # Next.js App Router pages
│   ├── (auth)/      # Login, onboarding
│   ├── (dashboard)/ # Feed, explore, applications, calendar, settings
│   └── company/     # Company profiles
├── components/      # React components
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
├── lib/             # Utilities, Supabase clients, constants
├── stores/          # Zustand state stores
└── types/           # TypeScript type definitions
```

## Features (Planned)

- Personalised opportunity feed based on preferences
- Filter by type, industry, location, year group
- Application tracking kanban board
- Deadline calendar
- Company profiles
- Onboarding questionnaire for personalisation
