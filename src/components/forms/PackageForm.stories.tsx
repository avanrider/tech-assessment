import type { Meta, StoryObj } from '@storybook/react';
import { PackageForm } from './PackageForm';

const meta: Meta<typeof PackageForm> = {
  title: 'Components/Forms/PackageForm',
  component: PackageForm,
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
type Story = StoryObj<typeof PackageForm>;

export const New: Story = {
  args: {
    onSubmit: async (data) => console.log('Form submitted:', data),
    onCancel: () => console.log('Form cancelled'),
  },
};

export const Edit: Story = {
  args: {
    package: {
      id: '1',
      name: 'Basic Package',
      price: 99.99,
      description: 'This is a basic package with essential features.',
      isAvailable: true,
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    onSubmit: async (data) => console.log('Form submitted:', data),
    onCancel: () => console.log('Form cancelled'),
  },
};

export const WithFeatures: Story = {
  args: {
    package: {
      id: '2',
      name: 'Premium Package',
      price: 199.99,
      description: 'Premium package with all features included.',
      isAvailable: true,
      features: [
        'Priority Support',
        'Advanced Analytics',
        'Custom Branding',
        'API Access',
        'Unlimited Storage',
      ],
    },
    onSubmit: async (data) => console.log('Form submitted:', data),
    onCancel: () => console.log('Form cancelled'),
  },
};

export const Unavailable: Story = {
  args: {
    package: {
      id: '3',
      name: 'Legacy Package',
      price: 149.99,
      description: 'This package is no longer available.',
      isAvailable: false,
      features: ['Feature 1', 'Feature 2'],
    },
    onSubmit: async (data) => console.log('Form submitted:', data),
    onCancel: () => console.log('Form cancelled'),
  },
};
