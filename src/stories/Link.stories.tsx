import type { Meta, StoryObj } from '@storybook/react'
import { Link } from '../components/Link/Link'

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    theme: { control: 'radio', options: ['default', 'inverse'] },
  },
}
export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {
  args: { label: 'Visit our careers page', href: '#', theme: 'default' },
}

export const Inverse: Story = {
  args: { label: 'Visit our careers page', href: '#', theme: 'inverse' },
  parameters: { backgrounds: { default: 'brand' } },
}

export const WithChildren: Story = {
  render: () => <Link href="#">Read the full announcement →</Link>,
}
