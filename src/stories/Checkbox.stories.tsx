import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '../components/Checkbox/Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Unchecked: Story = {
  args: { label: 'Accept terms and conditions', checked: false },
}

export const Checked: Story = {
  args: { label: 'Accept terms and conditions', checked: true },
}

export const Indeterminate: Story = {
  args: { label: 'Select all', indeterminate: true },
}

export const Disabled: Story = {
  args: { label: 'Disabled option', disabled: true },
}

export const DisabledChecked: Story = {
  args: { label: 'Disabled checked', disabled: true, checked: true },
}
