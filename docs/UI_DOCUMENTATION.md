# StudySuite UI Documentation

Component reference for the StudySuite frontend. Each entry covers purpose, props, design rationale, accessibility, responsive behaviour, and usage.

---

## OpportunityCard

### Purpose

The primary content unit. Renders a single opportunity (job, internship, spring week, etc.) in the feed or explore views.

### Props / Variants

```ts
interface OpportunityCardProps {
  opportunity: Opportunity;  // full opportunity object from mock-data / API
  variant?: 'compact' | 'expanded';  // default: 'expanded'
}
```

**`expanded`** (default) — Used in grid layouts (feed, explore). Shows company logo, role title, metadata, tags, deadline, and action buttons. Fixed height via `h-full` for grid alignment.

**`compact`** — Single-row layout for list views or embedded previews. Logo, company/role inline, type badge right-aligned.

### Design Decisions

- **Real company logos** via `next/image` from `/public/logos/`. Falls back to coloured initials if the image fails to load (`onError` handler). Logos are displayed on a white background to ensure they render correctly regardless of their original background.
- **No gradient borders, no glow shadows**. Hover state is a subtle background shift (`#111118` to `#141420`) and border lightening. This is intentional: cards should feel dense and informational, not decorative.
- **Type badges** use a neutral `bg-white/[0.04]` with `text-zinc-500` instead of per-type colours. The old version used screaming coloured badges; the new version treats type as metadata, not visual hierarchy.
- **Deadline urgency** is communicated through text colour only (red for <7d, amber for <14d, neutral otherwise). No coloured rings, no pulsing dots.
- **Bookmark/external link buttons** are `zinc-700` by default, lighten on hover. Bookmark fill state uses `currentColor`. No animation beyond transition-colors.

### Accessibility

- Bookmark button: `aria-label="Bookmark {title} at {company}"`
- External link: `aria-label="Apply to {title}"`, `target="_blank"` with `rel="noopener noreferrer"`
- All interactive elements are keyboard-focusable
- Company logo alt text: `"{company} logo"`

### Responsive Behaviour

- Grid: `sm:grid-cols-2 lg:grid-cols-3` (parent controls this)
- Compact variant: single row, truncates title with `truncate`
- Logo size: `h-9 w-9` (expanded), `h-7 w-7` (compact)

### Example Usage

```tsx
import { OpportunityCard } from '@/components/opportunity-card';

// Grid (expanded)
<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
  {opportunities.map((opp) => (
    <OpportunityCard key={opp.id} opportunity={opp} />
  ))}
</div>

// List (compact)
<div className="space-y-1">
  {opportunities.map((opp) => (
    <OpportunityCard key={opp.id} opportunity={opp} variant="compact" />
  ))}
</div>
```

---

## FilterBar

### Purpose

Faceted filter UI for the Explore page. Desktop: inline horizontal bar with popover dropdowns. Mobile: collapsible panel triggered by a button.

### Props / Variants

The component reads from and writes to the `useFilterStore` Zustand store directly. No props.

**Available filters:**
- Type (multi-select checkboxes)
- Industry (multi-select checkboxes)
- Location (text input)
- Year Group (single-select)
- Open only (toggle switch)
- Search query (text input, full-width)

### Design Decisions

- **Notion-style filter triggers**: small rounded buttons with label + chevron. Active state is a slightly lighter background and brighter text, not a coloured highlight.
- **Checkbox style**: custom square checkboxes using a `span` with border. Checked state fills with `zinc-500` and renders an SVG checkmark. This avoids the default browser checkbox inconsistency.
- **Search input**: `h-9`, `text-[13px]`, minimal border. Placeholder text is `zinc-700` (very subtle) to avoid visual noise when empty.
- **No animated expand/collapse on mobile**. The panel simply renders or doesn't. Framer Motion was removed from this component — animation on filter panels adds latency and no value.
- **Switch component** uses `zinc-500` when checked instead of a brand colour. The filter bar should be utilitarian.

### Accessibility

- All filter buttons and checkboxes are keyboard-accessible
- Popover components from shadcn/ui handle focus trapping automatically
- Search input has a visible label via placeholder (could be improved with a `<label>`)
- Mobile filter toggle announces count of active filters

### Responsive Behaviour

- Desktop (`md+`): horizontal flex row of filter triggers
- Mobile (`<md`): single "Filters" button that toggles an inline panel with pill-style options
- Location input: `w-28` on desktop, full-width on mobile

### Example Usage

```tsx
import { FilterBar } from '@/components/filter-bar';

export default function ExplorePage() {
  return (
    <div className="space-y-6">
      <FilterBar />
      {/* ... results grid */}
    </div>
  );
}
```

---

## SidebarNav

### Purpose

Primary desktop navigation. Renders a vertical list of navigation links. Used in the dashboard layout sidebar.

### Props / Variants

No props. Navigation items are hardcoded:
- Home (`/feed`)
- Explore (`/explore`)
- Applications (`/applications`)
- Calendar (`/calendar`)
- Settings (`/settings`)

### Design Decisions

- **Clean text wordmark** "StudySuite" — no gradient icon, no GraduationCap icon. Just `text-[15px] font-semibold`. The brand isn't established enough for an icon-only mark.
- **No user card at bottom**. Auth isn't implemented yet. Showing a fake "BD / Ben / CS Year 1" card is dishonest and adds clutter.
- **Active state**: `bg-white/[0.06]` with `text-zinc-100`. No left indicator bar, no brand colour. The subtle background shift is enough — Linear uses the same pattern.
- **Icon sizing**: `h-4 w-4`, same weight as the text. Icons are `zinc-600` by default, `zinc-300` when active.
- **Spacing**: `space-y-0.5` between items (2px). Dense, not wasteful.

### Accessibility

- Uses semantic `<nav>` element
- Each link uses Next.js `<Link>` for client-side navigation
- Active state determined by `usePathname()` comparison

### Responsive Behaviour

- Hidden on mobile (parent layout uses `hidden md:block`)
- Fixed width: parent sets `w-60`
- Sidebar fills full height with `h-full flex flex-col`

### Example Usage

Used in `src/app/(dashboard)/layout.tsx`:

```tsx
<aside className="hidden w-60 shrink-0 border-r border-white/[0.04] bg-[#0E0E14] md:block">
  <SidebarNav />
</aside>
```

---

## MobileNav

### Purpose

Mobile navigation drawer. Wraps `SidebarNav` in a sheet/drawer that slides in from the left.

### Props / Variants

No props. Triggered by a hamburger menu button in the mobile header.

### Design Decisions

- Uses shadcn `Sheet` component for the drawer
- Clicking any nav link closes the sheet (via `onClick={() => setOpen(false)}` on the wrapper)
- Trigger button is a plain `Menu` icon with `zinc-500` colour, no background until hover
- Sheet width matches sidebar: `w-56`

### Accessibility

- `SheetTitle` is visually hidden (`sr-only`) but present for screen readers: "Navigation"
- Trigger button has `sr-only` text: "Toggle menu"
- Focus is trapped within the sheet when open (shadcn/ui handles this)
- Sheet can be closed with Escape key

### Responsive Behaviour

- Only renders on `<md` screens (trigger has `md:hidden`)
- Sheet slides from left with built-in shadcn animation

### Example Usage

```tsx
<header className="flex h-14 items-center gap-4 border-b border-white/[0.04] bg-[#0E0E14] px-4 md:hidden">
  <MobileNav />
  <span className="text-lg font-bold tracking-tight text-zinc-100">
    StudySuite
  </span>
</header>
```

---

## Landing Page Sections

### Purpose

Marketing/onboarding page at `/`. Introduces the product and links to the dashboard.

### Sections

1. **Navigation bar** — fixed top, blurred background. Logo text + "Log in" / "Get started" buttons.
2. **Hero** — headline, subtitle, two CTAs (primary: "Open dashboard", secondary: "Browse opportunities"), and a static preview mock of the dashboard feed.
3. **Features grid** — 2x2 grid explaining what StudySuite does. Plain text, no icons. Each item has a title (`text-sm font-medium`) and description (`text-sm text-zinc-500`).
4. **CTA section** — single-line prompt + button.
5. **Footer** — wordmark + copyright year.

### Design Decisions

- **No fake statistics**. The old version claimed "2,500+ opportunities", "500+ employers", "10,000+ students". These were lies. Removed entirely.
- **No "Trusted by students at" section**. The old version listed Oxford, Cambridge, etc. with no basis. Removed.
- **No gradient text**. The old version had `bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent` on "opportunity". Now it's plain `text-zinc-100`.
- **No background glows/orbs**. The old version had two blur circles (`indigo-500/[0.06]` and `violet-500/[0.04]`). Removed.
- **No Framer Motion**. Landing page content is static. Fade-up animations on a marketing page are generic.
- **Dashboard preview** is a static mock using simple divs. Shows three example opportunities in a minimal row layout. This is more honest and useful than a hero image.
- **CTA buttons** are `bg-zinc-100 text-zinc-900` (inverted). No brand colour buttons. The page is monochrome with the accent being the white button against the dark background.

### Responsive Behaviour

- Hero: full viewport height, centered content
- Features grid: `sm:grid-cols-2`, stacks on mobile
- Preview mock: full width with `max-w-3xl`, scrollable on small screens
- Nav: fixed, responsive padding

---

## Dashboard Layout

### Purpose

Wraps all authenticated pages (`/feed`, `/explore`, `/applications`, `/calendar`, `/settings`). Provides sidebar + mobile nav + main content area.

### Structure

```
┌─────────────────────────────────────────┐
│ [Sidebar 240px] │ [Main content area]   │
│                 │                        │
│ (hidden mobile) │ max-w-6xl centered     │
│                 │ px-4 py-6 / px-8 py-8  │
└─────────────────────────────────────────┘
```

On mobile:
```
┌──────────────────────┐
│ [Header: menu + logo]│
│ [Main content area]  │
│                      │
└──────────────────────┘
```

### Design Decisions

- **`bg-[#0A0A0F]`** for the root background. This is darker than the sidebar (`#0E0E14`) and cards (`#111118`), creating a natural depth hierarchy.
- **`max-w-6xl`** on the content area. Wide enough for a 3-column grid, not so wide that lines of text become unreadable.
- **No bottom tab bar on mobile**. The hamburger drawer is sufficient for now. A bottom bar can be added when there are more features worth promoting.

### Example Usage

```tsx
// src/app/(dashboard)/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0A0A0F]">
      <aside className="hidden w-60 shrink-0 border-r border-white/[0.04] bg-[#0E0E14] md:block">
        <SidebarNav />
      </aside>
      <div className="flex flex-1 flex-col min-w-0">
        <header className="... md:hidden">
          <MobileNav />
          ...
        </header>
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
```

---

## Design System Notes

### Colour Palette

The UI uses a deliberately restrained palette:

| Token | Value | Usage |
|---|---|---|
| `#0A0A0F` | Page background | Deepest level |
| `#0E0E14` | Sidebar, header | Slightly raised |
| `#111118` | Cards, inputs | Surface level |
| `#141420` / `#151520` | Hover states | Subtle lift |
| `white/[0.04]` | Borders, dividers | Nearly invisible |
| `white/[0.06-0.08]` | Active borders | Slightly visible |
| `zinc-100-200` | Primary text | Headers, titles |
| `zinc-400-500` | Secondary text | Labels, metadata |
| `zinc-600-700` | Muted text | Captions, icons |
| `red-400/80` | Urgent deadline | Used sparingly |
| `amber-400/80` | Warning deadline | Used sparingly |

No brand accent colour is used anywhere in the dashboard. The landing page uses `bg-zinc-100 text-zinc-900` for CTA buttons (inverted, not coloured).

### Typography

- Font: Inter (loaded via `next/font/google`)
- Body text: `text-[13px]` (13px) — dense, professional
- Section headers: `text-lg font-medium` (18px)
- Sub-headers: `text-xs font-medium uppercase tracking-wider` (12px)
- Card titles: `text-sm font-medium` (14px)
- Metadata: `text-xs` (12px)

### Interaction Patterns

- Transitions: `duration-100` (100ms) on most elements. Fast.
- No Framer Motion animations in core UI. Cards and filters render immediately.
- Hover states: background shift only. No transforms, no shadows, no scale.
- Active/selected: background opacity increase + text brightness increase.
