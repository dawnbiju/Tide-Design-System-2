import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TabBar, Sidebar, Breadcrumbs } from '../components/Navigation/Navigation'

/* ── Tab Bar ───────────────────────────────────────────── */
const tabMeta: Meta<typeof TabBar> = {
  title: 'Navigation/TabBar',
  component: TabBar,
  tags: ['autodocs'],
}
export default tabMeta

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'jobs',     label: 'Jobs',    badge: 3 },
  { id: 'people',   label: 'People' },
  { id: 'culture',  label: 'Culture' },
]

function TabBarDemo() {
  const [active, setActive] = useState('overview')
  return <TabBar items={TABS} activeId={active} onTabChange={setActive} className="w-[480px]" />
}

export const Default: StoryObj<typeof TabBar> = {
  render: () => <TabBarDemo />,
}

/* ── Sidebar ───────────────────────────────────────────── */
const SIDEBAR_ITEMS = [
  { id: 'dashboard',  label: 'Dashboard' },
  { id: 'jobs',       label: 'My Applications' },
  { id: 'saved',      label: 'Saved Jobs' },
  { id: 'profile',    label: 'Profile' },
  { id: 'settings',   label: 'Settings' },
]

function SidebarDemo() {
  const [active, setActive] = useState('dashboard')
  return (
    <Sidebar
      items={SIDEBAR_ITEMS}
      activeId={active}
      onItemClick={setActive}
      className="w-64 p-2 bg-[var(--color-bg-surface)] rounded-2xl border border-[var(--color-border-subtle)]"
    />
  )
}

export const SidebarStory: StoryObj<typeof Sidebar> = {
  name: 'Sidebar',
  render: () => <SidebarDemo />,
}

/* ── Breadcrumbs ───────────────────────────────────────── */
export const BreadcrumbsStory: StoryObj<typeof Breadcrumbs> = {
  name: 'Breadcrumbs',
  render: () => (
    <Breadcrumbs
      items={[
        { id: 'home',     label: 'Home',       href: '#' },
        { id: 'jobs',     label: 'Jobs',        href: '#' },
        { id: 'software', label: 'Software Engineer' },
      ]}
    />
  ),
}
