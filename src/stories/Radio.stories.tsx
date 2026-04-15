import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from '../components/Radio/Radio'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Radio>

export const Unchecked: Story = {
  args: { label: 'Option A', checked: false },
}

export const Checked: Story = {
  args: { label: 'Option A', checked: true },
}

export const Disabled: Story = {
  args: { label: 'Disabled option', disabled: true },
}

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Radio name="plan" label="Starter — Free" checked />
      <Radio name="plan" label="Growth — ₹999/mo" />
      <Radio name="plan" label="Enterprise — Contact us" />
    </div>
  ),
}
