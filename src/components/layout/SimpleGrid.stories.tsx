import type { Meta, StoryObj } from '@storybook/react';
import { SimpleGrid } from './SimpleGrid';

const meta = {
  title: 'Components/SimpleGrid',
  component: SimpleGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SimpleGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', status: 'Pending' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Active' },
  { id: '6', name: 'Diana Clark', email: 'diana@example.com', status: 'Inactive' },
];

const columns = [
  { field: 'name', headerName: 'Name', sortable: true },
  { field: 'email', headerName: 'Email', sortable: true },
  { field: 'status', headerName: 'Status', sortable: true },
];

export const Basic: Story = {
  args: {
    data: sampleData,
    columns: columns,
  },
};

export const WithActions: Story = {
  args: {
    data: sampleData,
    columns: columns,
    onEdit: (row) => console.log('Edit:', row),
    onDelete: (row) => console.log('Delete:', row),
  },
};

export const CustomRenderer: Story = {
  args: {
    data: sampleData,
    columns: [
      { field: 'name', headerName: 'Name', sortable: true },
      { field: 'email', headerName: 'Email', sortable: true },
      {
        field: 'status',
        headerName: 'Status',
        sortable: true,
        cellRenderer: ({ value }) => (
          <span className={`px-2 py-1 rounded-full text-xs ${
            value === 'Active' ? 'bg-green-100 text-green-800' :
            value === 'Inactive' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {value}
          </span>
        ),
      },
    ],
  },
};
