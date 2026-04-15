import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '../components/Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['standard', 'elevated', 'outlined', 'interactive', 'expandable'] },
  },
}
export default meta
type Story = StoryObj<typeof Card>

const defaults = {
  title: 'Quarterly review',
  subtitle: 'Updated 2 hours ago',
  body: 'Cards organise related content, metadata, and actions into a clear scanning block.',
  expandedContent: 'Additional hidden details appear below when expanded.',
}

export const Standard:    Story = { args: { ...defaults, variant: 'standard'    } }
export const Elevated:    Story = { args: { ...defaults, variant: 'elevated'    } }
export const Outlined:    Story = { args: { ...defaults, variant: 'outlined'    } }
export const Interactive: Story = { args: { ...defaults, variant: 'interactive' } }
export const Expandable:  Story = { args: { ...defaults, variant: 'expandable'  } }
