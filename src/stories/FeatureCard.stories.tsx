import type { Meta, StoryObj } from '@storybook/react'
import { FeatureCard } from '../components/FeatureCard'

const meta: Meta<typeof FeatureCard> = {
  title: 'Components/FeatureCard',
  component: FeatureCard,
  tags: ['autodocs'],
  argTypes: {
    theme: { control: 'radio', options: ['light', 'brand', 'inverse'] },
  },
}
export default meta
type Story = StoryObj<typeof FeatureCard>

const defaultArgs = {
  title: 'Recognition budget',
  body: 'Each team gets room to recognise people in personal, meaningful ways.',
}

export const Light:   Story = { args: { ...defaultArgs, theme: 'light' } }
export const Brand:   Story = { args: { ...defaultArgs, theme: 'brand' },   parameters: { backgrounds: { default: 'brand' } } }
export const Inverse: Story = { args: { ...defaultArgs, theme: 'inverse' }, parameters: { backgrounds: { default: 'brand-dark' } } }
