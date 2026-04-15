import type { Meta, StoryObj } from '@storybook/react'
import { PortalCTA, BenefitGrid } from '../components/Patterns/Patterns'

/* ── PortalCTA ─────────────────────────────────────────── */
const portalMeta: Meta<typeof PortalCTA> = {
  title: 'Patterns/PortalCTA',
  component: PortalCTA,
  tags: ['autodocs'],
  argTypes: {
    theme: { control: 'radio', options: ['light', 'brand'] },
  },
}
export default portalMeta

export const Light: StoryObj<typeof PortalCTA> = {
  args: {
    eyebrow: 'For employers',
    heading: 'Hire smarter, grow faster',
    body: 'Post jobs, search verified candidates, and manage your pipeline — all in one place.',
    theme: 'light',
    buttons: [
      { label: 'Post a job', variant: 'primary' },
      { label: 'Learn more', variant: 'secondary' },
    ],
  },
}

export const Brand: StoryObj<typeof PortalCTA> = {
  args: {
    eyebrow: 'For job seekers',
    heading: 'Your next opportunity is waiting',
    body: 'Discover roles at top companies and apply with a single click.',
    theme: 'brand',
    buttons: [
      { label: 'Explore jobs', variant: 'primary', theme: 'inverse' },
      { label: 'Create profile', variant: 'secondary', theme: 'inverse' },
    ],
  },
}

/* ── BenefitGrid ───────────────────────────────────────── */
export const BenefitGridStory: StoryObj<typeof BenefitGrid> = {
  name: 'BenefitGrid',
  render: () => (
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
  ),
}

export const BenefitGridBrandCards: StoryObj<typeof BenefitGrid> = {
  name: 'BenefitGrid — Brand cards',
  render: () => (
    <BenefitGrid
      heading="Built for scale"
      items={[
        { title: '10M+ profiles', body: 'The largest verified talent pool in the region.' },
        { title: '500K+ hires',   body: 'Trusted by leading enterprises across 30 industries.' },
        { title: '99.9% uptime',  body: 'Enterprise SLA with 24/7 support included.' },
      ]}
      columns={3}
      cardTheme="brand"
    />
  ),
  parameters: { backgrounds: { default: 'light' } },
}
