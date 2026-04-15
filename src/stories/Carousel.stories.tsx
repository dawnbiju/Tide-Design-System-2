import type { Meta, StoryObj } from '@storybook/react'
import { Carousel, CarouselCard } from '../components/Carousel'

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Carousel>

const sampleItems = [
  { title: 'Smart matching',        body: 'AI surfaces the best candidates for every role automatically.',   onClick: () => alert('Smart matching') },
  { title: 'Real-time analytics',   body: 'Track pipeline health and time-to-hire with live dashboards.',    onClick: () => alert('Analytics') },
  { title: 'Collaborative hiring',  body: 'Invite your team and make decisions together.',                   onClick: () => alert('Collaborative') },
  { title: 'ATS integrations',      body: 'Connect with Greenhouse, Lever, Workday, and more.',              onClick: () => alert('Integrations') },
  { title: 'Verified candidates',   body: 'Every profile is ID-verified so you spend less time screening.',  onClick: () => alert('Verified') },
  { title: 'Compliance built-in',   body: 'GDPR, DPDP, and EEO-compliant flows out of the box.',            onClick: () => alert('Compliance') },
]

export const Default: Story = {
  args: {
    items: sampleItems,
  },
}

export const WithHeading: Story = {
  args: {
    heading: 'Explore features',
    items: sampleItems,
  },
}

export const FewCards: Story = {
  args: {
    heading: 'Quick overview',
    items: sampleItems.slice(0, 3),
  },
}

// Single card — no scrolling needed
export const SingleCard: Story = {
  render: () => (
    <CarouselCard
      title="Smart matching"
      body="AI surfaces the best candidates for every role automatically."
      onClick={() => alert('clicked')}
    />
  ),
}
