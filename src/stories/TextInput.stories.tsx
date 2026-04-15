import type { Meta, StoryObj } from '@storybook/react'
import { TextInput } from '../components/TextInput'

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['default', 'success', 'error', 'warning', 'disabled'] },
    affix: { control: 'radio',  options: ['none', 'prefix', 'suffix'] },
  },
}
export default meta
type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  args: { label: 'Field label', placeholder: 'Placeholder text', helper: 'Helper text or validation guidance.', counter: '0/50' },
}
export const WithPrefix: Story = {
  args: { label: 'Amount', affix: 'prefix', prefixSymbol: '₹', placeholder: '0.00', helper: 'Enter transfer amount.' },
}
export const Success: Story = {
  args: { label: 'Email', state: 'success', placeholder: 'name@company.com', helper: 'Looks good!' },
}
export const Error: Story = {
  args: { label: 'Username', state: 'error', placeholder: '@handle', helper: 'Username already taken.' },
}
export const Disabled: Story = {
  args: { label: 'Read only', state: 'disabled', placeholder: 'Cannot edit' },
}
export const Multiline: Story = {
  args: { label: 'Notes', multiline: true, placeholder: 'Write your note…', helper: 'Max 500 characters.', counter: '0/500' },
}
