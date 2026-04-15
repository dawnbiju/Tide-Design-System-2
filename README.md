# Tide Design System 2

A complete React + TypeScript component library extracted pixel-perfect from the [Tide Design System 2 Figma file](https://www.figma.com/design/TrWgWyHmqjNcjSURuXJmnm/tide-design-system-2).

---

## Contents

| Layer | Details |
|---|---|
| **Foundations** | Colors · Typography · Spacing · Radius · Shadow |
| **Tokens** | CSS custom properties + TypeScript token object |
| **Components** | Button · Link · FeatureCard · TextInput · Textarea · Checkbox · Radio · Toggle · Select · Card · Modal · Alert · Toast · Banner · TabBar · Sidebar · Breadcrumbs · DataTable |
| **Patterns** | PortalCTA · BenefitGrid |
| **Stories** | Storybook stories for every component and variant |
| **CI** | GitHub Actions — type-check · lint · build · Storybook deploy to GitHub Pages |
| **Figma Sync** | Scheduled workflow + webhook trigger to pull Figma Variable changes into a PR |

---

## Getting started

```bash
npm install
npm run dev          # Start Vite dev server (component showcase) on :5173
npm run storybook    # Start Storybook on :6006
```

---

## Project structure

```
tide-design-system/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   ├── Link/
│   │   ├── FeatureCard/
│   │   ├── TextInput/       # TextInput + Textarea
│   │   ├── Checkbox/
│   │   ├── Radio/
│   │   ├── Toggle/
│   │   ├── Select/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Alert/           # Alert + Toast + Banner
│   │   ├── Navigation/      # TabBar + Sidebar + Breadcrumbs
│   │   ├── DataTable/
│   │   └── Patterns/        # PortalCTA + BenefitGrid
│   ├── tokens/
│   │   └── tokens.ts        # Typed design token object
│   ├── styles/
│   │   └── globals.css      # CSS custom properties + Tailwind base
│   ├── stories/             # Storybook story files
│   ├── utils/cn.ts          # Minimal className merger
│   └── index.ts             # Public library entry point
├── scripts/
│   └── sync-figma-tokens.mjs  # Figma Variables → tokens script
├── .github/
│   └── workflows/
│       ├── ci.yml           # CI pipeline + Storybook Pages deploy
│       └── figma-sync.yml   # Scheduled Figma → GitHub sync
├── .storybook/
├── .eslintrc.cjs
├── tailwind.config.ts
├── vite.config.ts
└── vite.lib.config.ts       # Library build config
```

---

## Design tokens

All tokens live in two places:

- **`src/styles/globals.css`** — CSS custom properties consumed by Tailwind utilities in components
- **`src/tokens/tokens.ts`** — Typed TypeScript object for JS/TS contexts

### Core palette

| Token | Value | Usage |
|---|---|---|
| `--tide-color-primary-50`  | `#EFF1FF` | Soft backgrounds |
| `--tide-color-primary-100` | `#D0D5FC` | Borders, dividers |
| `--tide-color-primary-500` | `#1929D6` | Primary brand / CTA |
| `--tide-color-primary-700` | `#0C169A` | Deep brand surfaces |
| `--tide-color-primary-900` | `#040966` | Headings, dark sections |
| `--tide-color-neutral-200` | `#ECECEE` | Quiet surfaces |
| `--tide-color-neutral-500` | `#5F606D` | Secondary text |
| `--tide-color-ink-950`     | `#0C0C0E` | Default text / links |
| `--tide-color-yellow-400`  | `#FFC142` | Warm accent |

### Typography

| Scale | Family | Size | Weight | Line height |
|---|---|---|---|---|
| Display XL | Plus Jakarta Sans | 52px | 600 | 68px |
| Display L  | Plus Jakarta Sans | 40px | 600 | 52px |
| Heading L  | Plus Jakarta Sans | 32px | 600 | 40px |
| Heading M  | Plus Jakarta Sans | 24px | 600 | 32px |
| Heading S  | Figtree            | 20px | 700 | 32px |
| Title M    | Figtree            | 16px | 600 | 24px |
| Body L     | Figtree            | 18px | 400 | 28px |
| Body M     | Figtree            | 16px | 400 | 24px |
| Body S     | Figtree            | 14px | 400 | 20px |
| Label/Btn  | Figtree            | 16px | 500 | 24px |
| Caption    | Figtree            | 12px | 500 | 16px |

### Spacing (8pt grid)

`0 · 8 · 16 · 24 · 32 · 40 · 48 · 56 · 64 · 72 · 80 · 96` px

---

## Components

### Button

```tsx
<Button variant="primary" theme="default" size="medium" label="Explore jobs" />
<Button variant="secondary" theme="inverse" size="small" label="Learn more" />
```

Props: `variant` (primary | secondary) · `theme` (default | inverse) · `size` (medium | small) · `disabled` · all native `<button>` props.

---

### Link

```tsx
<Link href="/careers" label="Visit our careers page" />
<Link href="/careers" theme="inverse" label="Visit our careers page" />
```

Props: `theme` (default | inverse) · all native `<a>` props.

---

### FeatureCard

```tsx
<FeatureCard theme="light" title="Smart matching" body="AI-powered recommendations surface the best candidates." />
<FeatureCard theme="brand" title="Real-time analytics" body="Track pipeline health with live dashboards." />
<FeatureCard theme="inverse" title="Compliance built-in" body="GDPR and EEO-compliant flows out of the box." />
```

Props: `theme` (light | brand | inverse) · `title` · `body` · `icon` (optional ReactNode).

---

### TextInput

```tsx
<TextInput
  label="Email address"
  placeholder="name@company.com"
  state="default"          // default | success | error | warning | disabled
  affix="prefix"           // none | prefix | suffix
  prefixSymbol="₹"
  helper="We'll never share your email."
  counter="0/50"
/>
```

Props: `label` · `helper` · `counter` · `state` · `affix` · `prefixSymbol` · `suffixSymbol` · all native `<input>` props.

---

### Textarea

```tsx
<Textarea
  label="Tell us about yourself"
  placeholder="Write a short bio…"
  state="default"          // default | error | disabled
  helper="This will appear on your public profile."
  counter="0/500"
/>
```

Props: `label` · `helper` · `counter` · `state` (default | error | disabled) · all native `<textarea>` props.

---

### Checkbox

```tsx
<Checkbox label="Accept terms and conditions" checked />
<Checkbox label="Select all" indeterminate />
<Checkbox label="Disabled" disabled />
```

Props: `label` · `indeterminate` · all native `<input type="checkbox">` props.

---

### Radio

```tsx
<Radio name="plan" label="Starter — Free" checked />
<Radio name="plan" label="Growth — ₹999/mo" />
<Radio name="plan" label="Enterprise" disabled />
```

Props: `label` · all native `<input type="radio">` props.

---

### Toggle

```tsx
<Toggle label="Instant notifications" stateLabel="Enabled" state="on" onChange={v => console.log(v)} />
```

Props: `label` · `stateLabel` · `state` (off | on | disabled) · `onChange`.

---

### Select

```tsx
<Select
  label="Office location"
  mode="single"            // single | multi
  searchable
  options={[
    { value: 'mumbai',    label: 'Mumbai',    group: 'INDIA' },
    { value: 'bengaluru', label: 'Bengaluru', group: 'INDIA' },
    { value: 'london',    label: 'London',    group: 'EUROPE' },
  ]}
  onChange={v => console.log(v)}
/>
```

Props: `label` · `helper` · `options` · `value` · `mode` (single | multi) · `state` (default | error | disabled) · `placeholder` · `searchable` · `onChange`.

---

### Card

```tsx
<Card variant="standard"    title="Profile strength" body="Complete your profile to stand out." />
<Card variant="elevated"    title="Featured role" body="Senior Designer at Acme Corp." />
<Card variant="outlined"    title="Saved job" body="Product Manager — Bengaluru." />
<Card variant="interactive" title="Apply now" body="Click to start your application." />
<Card variant="expandable"  title="About this role" body="Full job description here…" />
```

Props: `variant` (standard | elevated | outlined | interactive | expandable) · `title` · `body` · `badge` · `media` · `actions`.

---

### Modal

```tsx
<Modal
  type="confirmation"       // confirmation | form | information
  open={isOpen}
  title="Delete saved draft?"
  description="This action cannot be undone."
  primaryLabel="Delete"
  secondaryLabel="Cancel"
  onPrimary={handleDelete}
  onSecondary={() => setOpen(false)}
  onClose={() => setOpen(false)}
/>
```

Props: `type` · `open` · `title` · `description` · `primaryLabel` · `secondaryLabel` · `onPrimary` · `onSecondary` · `onClose` · `formContent` · `infoContent`.

---

### Alert / Toast / Banner

```tsx
<Alert  variant="success" title="Saved!"       description="Changes applied."         dismissible />
<Alert  variant="error"   title="Error"         description="Something went wrong."    dismissible />
<Toast  variant="info"    title="Heads up"      description="New feature available."   dismissible />
<Banner variant="warning" title="Maintenance"   description="Apr 20, 2–4 AM UTC." />
```

All three share: `variant` (info | success | warning | error) · `title` · `description` · `dismissible`.

---

### Navigation

#### TabBar

```tsx
<TabBar
  items={[
    { id: 'overview', label: 'Overview' },
    { id: 'jobs',     label: 'Jobs', badge: 3 },
    { id: 'culture',  label: 'Culture' },
  ]}
  activeId={activeTab}
  onTabChange={setActiveTab}
/>
```

#### Sidebar

```tsx
<Sidebar
  items={[
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'jobs',      label: 'Jobs',     children: [
      { id: 'saved',   label: 'Saved Jobs' },
      { id: 'applied', label: 'Applied'   },
    ]},
    { id: 'profile',   label: 'Profile' },
  ]}
  activeId={activeItem}
  onItemClick={setActiveItem}
/>
```

Supports nested (indented children) and expandable (collapsible with › chevron) states from Figma.

#### Breadcrumbs

```tsx
<Breadcrumbs
  items={[
    { id: 'home',  label: 'Home',  href: '/' },
    { id: 'jobs',  label: 'Jobs',  href: '/jobs' },
    { id: 'role',  label: 'Senior Designer' },
  ]}
/>
```

---

### DataTable

```tsx
<DataTable
  columns={[
    { key: 'name',   label: 'Name',   sortable: true },
    { key: 'role',   label: 'Role',   sortable: true },
    { key: 'status', label: 'Status', filterable: true },
  ]}
  rows={employees}
  selectable
  editable
  pageSize={10}
  onRowClick={row => console.log(row)}
/>
```

Props: `columns` (key · label · sortable · filterable · width) · `rows` · `selectable` · `editable` · `loading` · `emptyMessage` · `pageSize` · `onRowClick`.

Column states: **Default** · **Sorted** (▲▼ toggle) · **Filtered** (inline search input, brand highlight).  
Row states: **Default** · **Selected** (checkbox + brand tint) · **Editable** (click to edit inline).

---

### Patterns

#### PortalCTA

Full-width CTA section with eyebrow, heading, body copy and up to 3 action buttons. Supports light and brand (deep navy) themes.

```tsx
<PortalCTA
  eyebrow="For employers"
  heading="Hire smarter, grow faster"
  body="Post jobs, search verified candidates, and manage your pipeline — all in one place."
  theme="light"             // light | brand
  buttons={[
    { label: 'Post a job',  variant: 'primary' },
    { label: 'Learn more',  variant: 'secondary' },
  ]}
/>
```

#### BenefitGrid

Responsive grid of FeatureCards with an optional heading and body intro.

```tsx
<BenefitGrid
  heading="Why teams choose Tide"
  body="Everything you need to build, ship, and scale your hiring."
  items={[
    { title: 'Smart matching',      body: 'AI-powered candidate recommendations.' },
    { title: 'Real-time analytics', body: 'Live pipeline dashboards.' },
    { title: 'Compliance built-in', body: 'GDPR and EEO flows out of the box.' },
  ]}
  columns={3}               // 2 | 3 | 4
  cardTheme="light"         // light | brand | inverse
/>
```

---

## Figma → GitHub sync

### How it works

1. **Figma Variables** store the design tokens (colors, spacing, radius, etc.).
2. A **scheduled GitHub Action** (`figma-sync.yml`) runs every weekday at 08:00 UTC.
3. The action calls `scripts/sync-figma-tokens.mjs` which hits the [Figma REST API](https://www.figma.com/developers/api#variables).
4. If any token values changed, the action opens a **Pull Request** with the diff for review.
5. Merging the PR publishes updated tokens automatically.

### Manual trigger

Go to **Actions → Figma Sync → Run workflow** in your GitHub repo.

### Webhook trigger (real-time)

Configure a Figma plugin or Zapier/Make automation to call the GitHub API when a Figma file is published:

```http
POST https://api.github.com/repos/{owner}/{repo}/dispatches
Authorization: Bearer {GH_PAT}
Content-Type: application/json

{ "event_type": "figma-publish" }
```

### Required secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret | Description |
|---|---|
| `FIGMA_TOKEN` | Figma Personal Access Token (read scope) |
| `GH_PAT` | GitHub PAT with `repo` write permission (for creating PRs) |

---

## GitHub Pages (Storybook)

Enable GitHub Pages so the CI pipeline can deploy your Storybook automatically:

1. Go to **Settings → Pages** in your GitHub repo
2. Under **Source**, select **GitHub Actions**
3. Push to `main` — the CI workflow will build and deploy Storybook to your Pages URL

---

## Publishing to npm

```bash
npm run build:lib         # Outputs ESM bundle to dist/
npm publish               # Publish to npm registry
```

Consumers import like:

```tsx
import { Button, Card, DataTable, PortalCTA, tokens } from 'tide-design-system'
import 'tide-design-system/styles'
```

---

## Contributing

1. Branch from `main` — `feat/`, `fix/`, `chore/` prefixes
2. Run `npm run type-check && npm run lint` before pushing
3. Add/update Storybook stories for any UI change
4. CI must pass before merge

---

## License

MIT — © Tide Platform Ltd
