import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '../components/TextInput/Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'radio', options: ['default', 'error', 'disabled'] },
  },
}
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    label: 'Tell us about yourself',
    placeholder: 'Write a short bio…',
    helper: 'This will appear on your public profile.',
    state: 'default',
  },
}

export const WithCounter: Story = {
  args: {
    label: 'Cover letter',
    placeholder: 'Introduce yourself to the employer…',
    counter: '0/500',
    state: 'default',
  },
}

export const ErrorState: Story = {
  args: {
    label: 'Tell us about yourself',
    placeholder: 'Write a short bio…',
    helper: 'Bio must be at least 20 characters.',
    state: 'error',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Tell us about yourself',
    placeholder: 'Not editable',
    state: 'disabled',
  },
}
