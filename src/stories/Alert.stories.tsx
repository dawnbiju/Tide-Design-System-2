import type { Meta, StoryObj } from '@storybook/react'
import { Alert, Toast, Banner } from '../components/Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['info', 'success', 'warning', 'error'] },
  },
}
export default meta
type Story = StoryObj<typeof Alert>

export const Info:    Story = { args: { variant: 'info',    description: 'Inline feedback for the surrounding content.' } }
export const Success: Story = { args: { variant: 'success', description: 'Your changes have been saved.'                } }
export const Warning: Story = { args: { variant: 'warning', description: 'Session expires in 5 minutes.'               } }
export const Error:   Story = { args: { variant: 'error',   description: 'Something went wrong. Try again.'            } }
export const Dismissible: Story = { args: { variant: 'info', description: 'You can dismiss this.', dismissible: true } }

export const ToastExample: StoryObj<typeof Toast> = {
  render: () => <Toast variant="success" title="Saved!" description="Your profile was updated." dismissible />,
}

export const BannerExample: StoryObj<typeof Banner> = {
  render: () => <Banner variant="warning" title="Scheduled maintenance" description="The platform will be offline on Apr 20 from 2–4 AM UTC." dismissible />,
}
