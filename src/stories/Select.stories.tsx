import type { Meta, StoryObj } from '@storybook/react'
import { Select } from '../components/Select/Select'

const OFFICE_OPTIONS = [
  { value: 'mumbai',    label: 'Mumbai',    group: 'INDIA' },
  { value: 'bengaluru', label: 'Bengaluru', group: 'INDIA' },
  { value: 'delhi',     label: 'Delhi',     group: 'INDIA' },
  { value: 'london',    label: 'London',    group: 'EUROPE' },
  { value: 'berlin',    label: 'Berlin',    group: 'EUROPE' },
]

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    mode:  { control: 'radio', options: ['single', 'multi'] },
    state: { control: 'radio', options: ['default', 'error', 'disabled'] },
  },
}
export default meta
type Story = StoryObj<typeof Select>

export const SingleDefault: Story = {
  args: {
    label: 'Office location',
    placeholder: 'Select a location',
    options: OFFICE_OPTIONS,
    mode: 'single',
  },
}

export const SingleSearchable: Story = {
  args: {
    label: 'Office location',
    placeholder: 'Search locations…',
    options: OFFICE_OPTIONS,
    mode: 'single',
    searchable: true,
  },
}

export const Multi: Story = {
  args: {
    label: 'Preferred offices',
    placeholder: 'Select multiple…',
    options: OFFICE_OPTIONS,
    mode: 'multi',
    searchable: true,
  },
}

export const Error: Story = {
  args: {
    label: 'Office location',
    placeholder: 'Select a location',
    options: OFFICE_OPTIONS,
    state: 'error',
    helper: 'Please select a location.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Office location',
    placeholder: 'Not available',
    options: OFFICE_OPTIONS,
    state: 'disabled',
  },
}
