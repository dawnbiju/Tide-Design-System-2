import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary'] },
    theme:   { control: 'radio', options: ['default', 'inverse'] },
    size:    { control: 'radio', options: ['medium', 'small'] },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const PrimaryMedium: Story = {
  args: { variant: 'primary', theme: 'default', size: 'medium', label: 'Explore jobs' },
}

export const PrimarySmall: Story = {
  args: { variant: 'primary', theme: 'default', size: 'small', label: 'Explore jobs' },
}

export const SecondaryMedium: Story = {
  args: { variant: 'secondary', theme: 'default', size: 'medium', label: 'Learn more' },
}

export const PrimaryInverse: Story = {
  args: { variant: 'primary', theme: 'inverse', size: 'medium', label: 'Explore jobs' },
  parameters: { backgrounds: { default: 'brand' } },
}

export const SecondaryInverse: Story = {
  args: { variant: 'secondary', theme: 'inverse', size: 'medium', label: 'Learn more' },
  parameters: { backgrounds: { default: 'brand' } },
}

export const Disabled: Story = {
  args: { variant: 'primary', theme: 'default', size: 'medium', label: 'Disabled', disabled: true },
}
