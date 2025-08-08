// src/components/OrderForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { OrderForm } from './OrderForm';
import type { IOrder, ICustomer, IPackage } from '../types';
import { OrderStatus } from '../types';

const meta: Meta<typeof OrderForm> = {
  title: 'Components/OrderForm',
  component: OrderForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OrderForm>;

const mockCustomers: ICustomer[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
];

const mockPackages: IPackage[] = [
  { id: '1', name: 'Basic Package', price: 100, isAvailable: true },
  { id: '2', name: 'Premium Package', price: 200, isAvailable: true }
];

export const CreateOrder: Story = {
  args: {
    customers: mockCustomers,
    packages: mockPackages,
    onSubmit: async (order) => {
      console.log('Create order:', order);
    },
    onCancel: () => console.log('Cancel create'),
  },
};

export const EditOrder: Story = {
  args: {
    customers: mockCustomers,
    packages: mockPackages,
    order: {
      id: '1',
      customerId: '1',
      packageId: '1',
      amount: 100,
      status: OrderStatus.PENDING,
    },
    onSubmit: async (order) => {
      console.log('Update order:', order);
    },
    onCancel: () => console.log('Cancel edit'),
  },
};
