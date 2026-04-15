import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from '../components/DataTable'

const meta: Meta = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
}
export default meta

const columns = [
  { key: 'name',       label: 'Name',       sortable: true },
  { key: 'role',       label: 'Role',       sortable: true },
  { key: 'status',     label: 'Status',     sortable: true },
  { key: 'department', label: 'Department', sortable: true },
]

const rows = [
  { name: 'Ayesha Khan',  role: 'Senior Product Designer', status: 'Active',    department: 'Design' },
  { name: 'Rohan Mehta',  role: 'Engineering Lead',        status: 'Active',    department: 'Engineering' },
  { name: 'Priya Nair',   role: 'Data Analyst',            status: 'On leave',  department: 'Analytics' },
  { name: 'Dev Sharma',   role: 'Product Manager',         status: 'Active',    department: 'Product' },
  { name: 'Aisha Patel',  role: 'UX Researcher',           status: 'Reviewing', department: 'Design' },
]

export const Default: StoryObj = { render: () => <DataTable columns={columns} rows={rows} /> }
export const Selectable: StoryObj = { render: () => <DataTable columns={columns} rows={rows} selectable /> }
export const Loading: StoryObj = { render: () => <DataTable columns={columns} rows={[]} loading /> }
export const Empty: StoryObj = { render: () => <DataTable columns={columns} rows={[]} emptyMessage="No employees found." /> }
