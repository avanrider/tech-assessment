import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid } from './DataGrid';

const meta = {
  title: 'Components/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = [
  { id: '1', name: 'Item 1', price: 10, status: 'active' },
  { id: '2', name: 'Item 2', price: 20, status: 'inactive' },
  { id: '3', name: 'Item 3', price: 30, status: 'active' },
];

const mockColumns = [
  { field: 'name' as const, headerName: 'Name' },
  { field: 'price' as const, headerName: 'Price' },
  { 
    field: 'status' as const, 
    headerName: 'Status',
    cellRenderer: ({ value }: { value: string }) => (
      <span className={`px-2 py-1 rounded-full text-sm ${
        value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    )
  }
];

export const Basic: Story = {
  args: {
    data: mockData,
    columns: mockColumns,
  },
};

export const WithActions: Story = {
  args: {
    data: mockData,
    columns: mockColumns,
    onEdit: (row) => console.log('Edit:', row),
    onDelete: (row) => console.log('Delete:', row),
  },
};

export const WithCustomRendering: Story = {
  args: {
    data: mockData,
    columns: [
      { field: 'name' as const, headerName: 'Name' },
      { 
        field: 'price' as const, 
        headerName: 'Price',
        cellRenderer: ({ value }: { value: number }) => `$${value.toFixed(2)}`
      },
      { 
        field: 'status' as const, 
        headerName: 'Status',
        cellRenderer: ({ value }: { value: string }) => (
          <span className={`px-2 py-1 rounded-full text-sm ${
            value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {value}
          </span>
        )
      }
    ],
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: mockColumns,
  },
};
