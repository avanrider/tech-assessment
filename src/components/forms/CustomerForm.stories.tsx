import type { Meta, StoryObj } from '@storybook/react';
import { CustomerForm } from './CustomerForm';

const meta: Meta<typeof CustomerForm> = {
  title: 'Components/Forms/CustomerForm',
  component: CustomerForm,
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
type Story = StoryObj<typeof CustomerForm>;

export const New: Story = {
  args: {
    onSubmit: (data) => console.log('Form submitted:', data),
    onCancel: () => console.log('Form cancelled'),
  },
};

export const Edit: Story = {
  args: {
    customer: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '123-456-7890',
    },
    onSubmit: (data) => console.log('Form submitted:', data),
    onCancel: () => console.log('Form cancelled'),
  },
};

export const WithValidationErrors: Story = {
  args: {
    onSubmit: () => {},
    onCancel: () => {},
  },
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  },
};
