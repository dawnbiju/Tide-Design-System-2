# Tide Design System 2

A complete React + TypeScript component library extracted pixel-perfect from the [Tide Design System 2 Figma file](https://www.figma.com/design/TrWgWyHmqjNcjSURuXJmnm/tide-design-system-2).

---

## Contents

| Layer | Details |
|---|---|
| **Foundations** | Colors · Typography · Spacing · Radius · Shadow |
| **Tokens** | CSS custom properties + TypeScript token object |
| **Components** | Button · Link · FeatureCard · TextInput · Checkbox · Radio · Toggle · Select · Card · Modal · Alert · Toast · Banner · TabBar · Sidebar · Breadcrumbs · DataTable |
| **Stories** | Storybook stories for every component variant |
| **CI** | GitHub Actions — type-check · lint · build · Storybook deploy |
| **Figma Sync** | Scheduled workflow + webhook trigger to pull Figma Variable changes into a PR |

---

## Getting started

```bash
npm install
npm run dev          # Start Vite dev server (component showcase)
npm run storybook    # Start Storybook on :6006
```

---

## Project structure

```
tide-design-system/
├── src/
│   ├── components/          # One folder per component
│   │   ├── Button/
│   │   ├── Card/
│   │   └── ...
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
│       ├── ci.yml           # CI pipeline
│       └── figma-sync.yml   # Scheduled Figma → GitHub sync
├── .storybook/
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
| `--tide-color-ink-950`     | `#0C0C0E` | Default text links |
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

Props: `variant` (primary | secondary) · `theme` (default | inverse) · `size` (medium | small) · all native `<button>` props.

### TextInput

```tsx
<TextInput
  label="Email address"
  placeholder="name@company.com"
  state="default"          // default | success | error | warning | disabled
  affix="prefix"           // none | prefix | suffix
  helper="We'll never share your email."
  counter="0/50"
/>
```

### Select

```tsx
<Select
  label="Office location"
  mode="single"            // single | multi
  searchable
  options={[
    { value: 'mumbai',    label: 'Mumbai',    group: 'INDIA' },
    { value: 'bengaluru', label: 'Bengaluru', group: 'INDIA' },
  ]}
  onChange={v => console.log(v)}
/>
```

### Alert / Toast / Banner

```tsx
<Alert   variant="success" title="Saved!" description="Changes applied." dismissible />
<Toast   variant="error"   title="Failed" description="Please retry."    dismissible />
<Banner  variant="warning" title="Maintenance" description="Apr 20, 2–4 AM UTC." />
```

### DataTable

```tsx
<DataTable
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
  ]}
  rows={employees}
  selectable
  pageSize={10}
  onRowClick={row => console.log(row)}
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

| Secret | Description |
|---|---|
| `FIGMA_TOKEN` | Figma Personal Access Token (read scope) |
| `GH_PAT` | GitHub PAT with `repo` write permission (for creating PRs) |

---

## Publishing to npm

```bash
npm run build:lib         # Outputs ESM bundle to dist/
npm publish               # Publish to npm registry
```

Consumers import like:

```tsx
import { Button, Card, tokens } from 'tide-design-system'
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
