import type { Meta, StoryObj } from '@storybook/react';
import { OrderForm } from './OrderForm';
import type { IOrder, ICustomer, IPackage } from '../../types';
import { OrderStatus } from '../../types';

const meta: Meta<typeof OrderForm> = {
  title: 'Components/Forms/OrderForm',
  component: OrderForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OrderForm>;

const mockCustomers: ICustomer[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phoneNumber: '987-654-3210' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com' }
];

const mockPackages: IPackage[] = [
  { id: '1', name: 'Basic Package', price: 99.99, isAvailable: true },
  { id: '2', name: 'Premium Package', price: 199.99, isAvailable: true },
  { id: '3', name: 'Legacy Package', price: 149.99, isAvailable: false }
];

export const New: Story = {
  args: {
    customers: mockCustomers,
    packages: mockPackages,
    onSubmit: async (data) => console.log('Form submitted:', data),
    onCancel: () => console.log('Form cancelled'),
  },
};

export const Edit: Story = {
  args: {
    order: {
      id: '1',
      customerId: '1',
      packageId: '1',
      amount: 99.99,
      status: OrderStatus.PENDING,
    },
    customers: mockCustomers,
    packages: mockPackages,
    onSubmit: async (data) => console.log('Form submitted:', data),
    onCancel: () => console.log('Form cancelled'),
  },
};

export const CompletedOrder: Story = {
  args: {
    order: {
      id: '2',
      customerId: '2',
      packageId: '2',
      amount: 199.99,
      status: OrderStatus.COMPLETED,
    },
    customers: mockCustomers,
    packages: mockPackages,
    onSubmit: async (data) => console.log('Form submitted:', data),
    onCancel: () => console.log('Form cancelled'),
  },
};

export const WithUnavailablePackage: Story = {
  args: {
    order: {
      id: '3',
      customerId: '1',
      packageId: '3',
      amount: 149.99,
      status: OrderStatus.PENDING,
    },
    customers: mockCustomers,
    packages: mockPackages,
    onSubmit: async (data) => console.log('Form submitted:', data),
    onCancel: () => console.log('Form cancelled'),
  },
};

export const WithValidationErrors: Story = {
  args: {
    customers: mockCustomers,
    packages: mockPackages,
    onSubmit: async () => {},
    onCancel: () => {},
  },
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  },
};
