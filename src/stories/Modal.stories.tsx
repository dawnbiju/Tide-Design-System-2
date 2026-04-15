import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from '../components/Modal/Modal'
import { Button } from '../components/Button/Button'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['confirmation', 'form', 'information'] },
  },
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Modal>

const ModalWrapper = (props: React.ComponentProps<typeof Modal>) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="primary" theme="default" size="medium" label="Open modal" onClick={() => setOpen(true)} />
      <Modal {...props} open={open} onClose={() => setOpen(false)} onSecondary={() => setOpen(false)} />
    </>
  )
}

export const Confirmation: Story = {
  render: () => (
    <ModalWrapper
      type="confirmation"
      title="Delete saved draft?"
      description="This action cannot be undone. The draft will be permanently removed."
      primaryLabel="Delete"
      secondaryLabel="Cancel"
    />
  ),
}

export const Information: Story = {
  render: () => (
    <ModalWrapper
      type="information"
      title="How scoring works"
      description="Your profile score is calculated based on completeness, activity, and engagement with employers."
      primaryLabel="Got it"
      secondaryLabel="Learn more"
    />
  ),
}

export const Form: Story = {
  render: () => (
    <ModalWrapper
      type="form"
      title="Update contact details"
      primaryLabel="Save changes"
      secondaryLabel="Cancel"
      formContent={
        <div className="flex flex-col gap-4">
          <input
            className="border border-gray-300 rounded-xl px-4 h-12 w-full text-sm"
            placeholder="Full name"
          />
          <input
            className="border border-gray-300 rounded-xl px-4 h-12 w-full text-sm"
            placeholder="Email address"
          />
        </div>
      }
    />
  ),
}
