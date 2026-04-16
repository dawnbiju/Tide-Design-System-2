import type { Meta, StoryObj } from '@storybook/react'
import { Stepper } from '../components/Stepper'

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Stepper>

export const Default: Story = {
  args: {
    headingBold: 'Your Tide card is shipped,',
    headingLight: 'once you complete these steps',
    steps: [
      { title: 'Download the app.',                           body: 'Click on the link.' },
      { title: 'Tell us about your business.',                body: 'Furnish your PAN card details.' },
      { title: 'Provide your address.',                       body: 'Furnish your address as per your Aadhar card.' },
      { title: 'Appear for the video identity verification.', body: 'Ensure that you have an ID proof with you.' },
      { title: 'You are ready to go!',                       body: 'You will get your expense card shortly.' },
    ],
    ctaLabel: 'Get started',
  },
}

export const Short: Story = {
  args: {
    headingBold: 'Set up your account',
    headingLight: 'in just a few minutes',
    steps: [
      { title: 'Create your profile.',  body: 'Add your name, photo, and role.' },
      { title: 'Invite your team.',     body: 'Send invites to team members.' },
      { title: 'Connect your tools.',   body: 'Integrate with your existing stack.' },
    ],
    ctaLabel: "Let's go",
  },
}

export const NoHeading: Story = {
  args: {
    steps: [
      { title: 'Step one',   body: 'Complete the first action.' },
      { title: 'Step two',   body: 'Move on to the second.' },
      { title: 'Step three', body: 'You are done!' },
    ],
  },
}
