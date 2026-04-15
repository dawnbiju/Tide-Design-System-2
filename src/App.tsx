import { useState, useEffect } from 'react'
import type { ThemeId } from './tokens/tokens'
import { Button }      from './components/Button'
import { Link }        from './components/Link'
import { FeatureCard } from './components/FeatureCard'
import { TextInput }   from './components/TextInput'
import { Textarea }    from './components/TextInput/Textarea'
import { Checkbox }    from './components/Checkbox'
import { Radio }       from './components/Radio'
import { Toggle }      from './components/Toggle'
import { Select }      from './components/Select'
import { Card }        from './components/Card'
import { Modal }       from './components/Modal'
import { Alert, Toast, Banner } from './components/Alert'
import { TabBar, Sidebar, Breadcrumbs } from './components/Navigation'
import { DataTable }   from './components/DataTable'
import { PortalCTA, BenefitGrid } from './components/Patterns/Patterns'

/* ── Section wrapper ─────────────────────────────────────────────────────── */
function Section({
  title,
  children,
  cols = 1,
  flow = false,
}: {
  title: string
  children: React.ReactNode
  /** Number of columns on lg screens — defaults to 1 (full-width) */
  cols?: 1 | 2 | 3 | 4
  /** Use flex-row wrap instead of grid (e.g. buttons, links) */
  flow?: boolean
}) {
  const gridCls = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[cols]

  return (
    <section className="flex flex-col gap-6 w-full">
      <h2 className="font-body font-semibold text-heading-m leading-8 tracking-[0.25px] text-[var(--color-text-primary)] border-b border-[var(--color-border-subtle)] pb-4">
        {title}
      </h2>
      {flow ? (
        <div className="flex flex-wrap gap-3 items-center">{children}</div>
      ) : (
        <div className={`grid ${gridCls} gap-4 items-start`}>{children}</div>
      )}
    </section>
  )
}

/* ── Theme switcher pill ─────────────────────────────────────────────────── */
function ThemeSwitcher({ theme, onChange }: { theme: ThemeId; onChange: (t: ThemeId) => void }) {
  const themes: { id: ThemeId; label: string; dot: string }[] = [
    { id: 'default', label: 'Default',  dot: '#1929D6' },
    { id: 'crimson', label: 'Crimson',  dot: '#E11D3F' },
  ]
  return (
    <div className="flex items-center gap-2 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded-full px-3 py-1.5 shadow-card">
      <span className="font-body text-body-s text-[var(--color-text-secondary)] pr-1">Theme</span>
      {themes.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={[
            'flex items-center gap-1.5 px-3 py-1 rounded-full font-body text-body-s transition-colors',
            theme === t.id
              ? 'bg-[var(--color-bg-brand)] text-[var(--color-text-inverse)]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
          ].join(' ')}
        >
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 border border-white/30"
            style={{ background: t.dot }}
          />
          {t.label}
        </button>
      ))}
    </div>
  )
}

/* ── App ─────────────────────────────────────────────────────────────────── */
export default function App() {
  const [theme,         setTheme]         = useState<ThemeId>('default')
  const [modalOpen,     setModalOpen]     = useState(false)
  const [toggleState,   setToggleState]   = useState<'off' | 'on'>('off')
  const [checkboxState, setCheckboxState] = useState(false)
  const [radioValue,    setRadioValue]    = useState('a')
  const [selectValue,   setSelectValue]   = useState('')
  const [activeTab,     setActiveTab]     = useState('overview')
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  // Apply theme as data-theme attribute on <html>
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'default') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }
  }, [theme])

  return (
    <div className="min-h-screen bg-[var(--color-bg-page)]">

      {/* ── Top Bar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-3 bg-[var(--color-bg-page)] border-b border-[var(--color-border-subtle)]">
        <span className="font-body font-semibold text-title-m text-[var(--color-text-primary)]">
          Tide DS
        </span>
        <ThemeSwitcher theme={theme} onChange={setTheme} />
      </div>

      {/* ── Top Banner ───────────────────────────────────────────────────── */}
      <Banner
        variant="info"
        title="Design System Preview"
        description="Live Tide Design System 2 component showcase."
        dismissible
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-[var(--color-bg-brand-strong)] w-full px-4 sm:px-8 lg:px-16 py-16 sm:py-24 flex flex-col gap-6">
        <p className="font-body text-body-s tracking-[0.5px] uppercase text-[var(--color-text-inverse)] opacity-70">
          Tide Design System 2
        </p>
        <h1 className="font-body font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight text-[var(--color-text-inverse)] max-w-3xl">
          Financial clarity with a confident, human voice.
        </h1>
        <p className="font-body text-body-l leading-7 tracking-[0.25px] text-[var(--color-text-inverse)] opacity-80 max-w-xl">
          A complete React + TypeScript component library extracted pixel-perfect from Figma.
        </p>
        <div className="flex flex-wrap gap-4 mt-2">
          <Button variant="primary"   theme="inverse" size="medium" label="Get started" />
          <Button variant="secondary" theme="inverse" size="medium" label="View on GitHub" />
        </div>
      </div>

      {/* ── Component Gallery ────────────────────────────────────────────── */}
      <main className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 flex flex-col gap-20">

        {/* ── Button ───────────────────────────────────────────────────── */}
        <Section title="Button" flow>
          <Button variant="primary"   theme="default" size="medium" label="Primary Medium" />
          <Button variant="primary"   theme="default" size="small"  label="Primary Small" />
          <Button variant="secondary" theme="default" size="medium" label="Secondary Medium" />
          <Button variant="secondary" theme="default" size="small"  label="Secondary Small" />
          <Button variant="primary"   theme="default" size="medium" label="Disabled" disabled />
          <div className="flex gap-3 bg-[var(--color-bg-brand-strong)] px-4 py-3 rounded-[var(--radius-16)]">
            <Button variant="primary"   theme="inverse" size="medium" label="Inverse Primary" />
            <Button variant="secondary" theme="inverse" size="medium" label="Inverse Secondary" />
          </div>
        </Section>

        {/* ── Link ─────────────────────────────────────────────────────── */}
        <Section title="Link" flow>
          <Link theme="default" label="Read more" />
          <Link theme="default" label="Learn about pricing" />
          <div className="bg-[var(--color-bg-brand-strong)] px-5 py-3 rounded-[var(--radius-16)]">
            <Link theme="inverse" label="View careers" />
          </div>
        </Section>

        {/* ── Feature Card ─────────────────────────────────────────────── */}
        <Section title="Feature Card" cols={3}>
          <FeatureCard theme="light"   title="Recognition budget"   body="Each team gets room to recognise people in personal, meaningful ways." />
          <FeatureCard theme="brand"   title="Recognition budget"   body="Each team gets room to recognise people in personal, meaningful ways." />
          <FeatureCard theme="inverse" title="Recognition budget"   body="Each team gets room to recognise people in personal, meaningful ways." />
        </Section>

        {/* ── Text Input ───────────────────────────────────────────────── */}
        <Section title="Text Input" cols={2}>
          <TextInput label="Email address"  placeholder="name@company.com"    helper="We'll never share your email." />
          <TextInput label="Amount" affix="prefix" placeholder="0.00"          helper="Enter your transfer amount." />
          <TextInput label="Username" affix="suffix" suffixSymbol="#"
                     placeholder="@handle" state="error"                       helper="Username already taken." />
          <TextInput label="Notes" multiline placeholder="Add a note…"         helper="Max 500 characters." counter="0/500" />
        </Section>

        {/* ── Textarea ─────────────────────────────────────────────────── */}
        <Section title="Textarea" cols={2}>
          <Textarea label="Tell us about yourself" placeholder="Write a short bio…"       helper="This will appear on your public profile." counter="0/300" />
          <Textarea label="Cover letter"           placeholder="Write your cover letter…" state="error" helper="Minimum 50 characters required." />
        </Section>

        {/* ── Selection Controls ───────────────────────────────────────── */}
        <Section title="Checkbox &amp; Radio" cols={2}>
          <div className="flex flex-col gap-3">
            <Checkbox
              label="Receive product updates"
              checked={checkboxState}
              onChange={e => setCheckboxState(e.target.checked)}
            />
            <Checkbox label="Subscribe to newsletter" checked indeterminate />
            <Checkbox label="Disabled option" disabled />
          </div>
          <div className="flex flex-col gap-3">
            <Radio label="Option A" name="demo" value="a" checked={radioValue === 'a'} onChange={() => setRadioValue('a')} />
            <Radio label="Option B" name="demo" value="b" checked={radioValue === 'b'} onChange={() => setRadioValue('b')} />
            <Radio label="Disabled" name="demo" value="c" disabled />
          </div>
        </Section>

        {/* ── Toggle ───────────────────────────────────────────────────── */}
        <Section title="Toggle" cols={2}>
          <Toggle
            label="Instant notifications"
            stateLabel={toggleState === 'on' ? 'Enabled' : 'Disabled'}
            state={toggleState}
            onChange={on => setToggleState(on ? 'on' : 'off')}
          />
          <Toggle label="Dark mode" stateLabel="Coming soon" state="disabled" />
        </Section>

        {/* ── Select ───────────────────────────────────────────────────── */}
        <Section title="Select" cols={2}>
          <Select
            label="Office location"
            helper="Choose your primary office."
            value={selectValue}
            onChange={v => setSelectValue(v as string)}
            searchable
            options={[
              { value: 'mumbai',    label: 'Mumbai',    group: 'INDIA' },
              { value: 'bengaluru', label: 'Bengaluru', group: 'INDIA' },
              { value: 'delhi',     label: 'Delhi',     group: 'INDIA' },
              { value: 'remote',    label: 'Remote',    group: 'REMOTE' },
              { value: 'hybrid',    label: 'Hybrid',    group: 'REMOTE', disabled: true },
            ]}
          />
          <Select label="Disabled select" state="disabled" placeholder="Not available" options={[]} />
        </Section>

        {/* ── Card ─────────────────────────────────────────────────────── */}
        <Section title="Card" cols={3}>
          {(['standard', 'elevated', 'outlined', 'interactive', 'expandable'] as const).map(v => (
            <Card
              key={v}
              variant={v}
              title="Quarterly review"
              subtitle="Updated 2 hours ago"
              body="Cards organise related content, metadata, and actions into a clear scanning block."
              expandedContent="Additional hidden details appear here when the card is expanded."
            />
          ))}
        </Section>

        {/* ── Modal ────────────────────────────────────────────────────── */}
        <Section title="Modal" flow>
          <Button label="Open Confirmation Modal" onClick={() => setModalOpen(true)} />
          <Modal
            open={modalOpen}
            type="confirmation"
            title="Delete saved draft?"
            description="This action removes the draft for everyone on the team. You can't undo it later."
            primaryLabel="Delete draft"
            onPrimary={() => setModalOpen(false)}
            onClose={() => setModalOpen(false)}
          />
        </Section>

        {/* ── Alert / Toast / Banner ────────────────────────────────────── */}
        <Section title="Alert / Toast / Banner" cols={2}>
          <Alert variant="info"    title="Info Alert"    description="Inline feedback for the surrounding content." dismissible />
          <Alert variant="success" title="Success Alert" description="Your changes have been saved successfully."    dismissible />
          <Alert variant="warning" title="Warning Alert" description="Your session will expire in 5 minutes."       dismissible />
          <Alert variant="error"   title="Error Alert"   description="Something went wrong. Please try again."      dismissible />
          <Toast variant="success" title="Profile updated" description="Your changes were saved." dismissible />
          <Toast variant="info"    title="New feature" description="Check out what's new in this release." dismissible />
        </Section>

        {/* ── Navigation ───────────────────────────────────────────────── */}
        <Section title="Navigation">
          {/* Tab Bar */}
          <div className="flex flex-col gap-3">
            <p className="font-body font-semibold text-body-s text-[var(--color-text-secondary)] uppercase tracking-widest">Tabs</p>
            <TabBar
              items={[
                { id: 'overview', label: 'Overview' },
                { id: 'activity', label: 'Activity' },
                { id: 'settings', label: 'Settings', badge: 3 },
              ]}
              activeId={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Sidebar + Breadcrumbs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <p className="font-body font-semibold text-body-s text-[var(--color-text-secondary)] uppercase tracking-widest">Sidebar</p>
              <Sidebar
                items={[
                  { id: 'dashboard', label: 'Dashboard' },
                  {
                    id: 'people', label: 'People',
                    children: [
                      { id: 'team',      label: 'Team' },
                      { id: 'freelance', label: 'Freelancers' },
                    ],
                  },
                  { id: 'reports',  label: 'Reports' },
                  { id: 'settings', label: 'Settings' },
                ]}
                activeId={activeSidebar}
                onItemClick={setActiveSidebar}
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-body font-semibold text-body-s text-[var(--color-text-secondary)] uppercase tracking-widest">Breadcrumbs</p>
              <Breadcrumbs
                items={[
                  { id: 'home',    label: 'Home',        href: '/' },
                  { id: 'people',  label: 'People',      href: '/people' },
                  { id: 'profile', label: 'Ayesha Khan' },
                ]}
              />
            </div>
          </div>
        </Section>

        {/* ── Data Table ───────────────────────────────────────────────── */}
        <Section title="Data Table">
          <DataTable
            selectable
            editable
            columns={[
              { key: 'name',       label: 'Name',       sortable: true },
              { key: 'role',       label: 'Role',       sortable: true },
              { key: 'status',     label: 'Status',     filterable: true },
              { key: 'department', label: 'Department', sortable: true },
            ]}
            rows={[
              { name: 'Ayesha Khan',  role: 'Senior Product Designer', status: 'Active',    department: 'Design' },
              { name: 'Rohan Mehta',  role: 'Engineering Lead',        status: 'Active',    department: 'Engineering' },
              { name: 'Priya Nair',   role: 'Data Analyst',            status: 'On leave',  department: 'Analytics' },
              { name: 'Dev Sharma',   role: 'Product Manager',         status: 'Active',    department: 'Product' },
              { name: 'Aisha Patel',  role: 'UX Researcher',           status: 'Reviewing', department: 'Design' },
            ]}
          />
        </Section>

        {/* ── Patterns ─────────────────────────────────────────────────── */}
        <Section title="Patterns — PortalCTA" cols={2}>
          <PortalCTA
            eyebrow="For employers"
            heading="Hire smarter, grow faster"
            body="Post jobs, search verified candidates, and manage your pipeline — all in one place."
            theme="light"
            buttons={[
              { label: 'Post a job',  variant: 'primary' },
              { label: 'Learn more',  variant: 'secondary' },
            ]}
          />
          <PortalCTA
            eyebrow="For job seekers"
            heading="Your next opportunity is waiting"
            body="Discover roles at top companies and apply with a single click."
            theme="brand"
            buttons={[
              { label: 'Explore jobs',    variant: 'primary',   theme: 'inverse' },
              { label: 'Create profile',  variant: 'secondary', theme: 'inverse' },
            ]}
          />
        </Section>

        <Section title="Patterns — BenefitGrid">
          <BenefitGrid
            heading="Why teams choose Tide"
            body="Everything you need to build, ship, and scale your hiring — in one beautiful system."
            items={[
              { title: 'Smart matching',       body: 'AI-powered recommendations surface the best candidates automatically.' },
              { title: 'Real-time analytics',  body: 'Track pipeline health and time-to-hire with live dashboards.' },
              { title: 'Collaborative hiring', body: 'Invite your team, assign roles, and make decisions together.' },
              { title: 'ATS integrations',     body: 'Connect with Greenhouse, Lever, Workday, and 30+ other tools.' },
              { title: 'Verified candidates',  body: 'Every profile is ID-verified so you spend less time screening.' },
              { title: 'Compliance built-in',  body: 'GDPR, DPDP, and EEO-compliant flows out of the box.' },
            ]}
            columns={3}
          />
        </Section>

      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-[var(--color-bg-brand-strong)] w-full px-4 sm:px-8 lg:px-16 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-body font-semibold text-heading-s leading-8 tracking-[0.25px] text-[var(--color-text-inverse)]">
          Tide Design System 2
        </p>
        <p className="font-body text-body-s text-[var(--color-text-inverse)] opacity-60">
          Built with React + TypeScript + Tailwind · Synced from Figma
        </p>
      </footer>
    </div>
  )
}
