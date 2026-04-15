import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from '../components/Toggle/Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'radio', options: ['off', 'on', 'disabled'] },
  },
}
export default meta
type Story = StoryObj<typeof Toggle>

export const Off: Story = {
  args: { label: 'Instant notifications', stateLabel: 'Disabled', state: 'off' },
}

export const On: Story = {
  args: { label: 'Instant notifications', stateLabel: 'Enabled', state: 'on' },
}

export const Disabled: Story = {
  args: { label: 'Instant notifications', stateLabel: 'Unavailable', state: 'disabled' },
}
