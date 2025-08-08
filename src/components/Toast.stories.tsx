import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    message: 'Operation completed successfully!',
    type: 'success',
    onClose: () => console.log('Toast closed'),
  },
};

export const Error: Story = {
  args: {
    message: 'An error occurred. Please try again.',
    type: 'error',
    onClose: () => console.log('Toast closed'),
  },
};

export const LongMessage: Story = {
  args: {
    message: 'This is a very long message that might wrap to multiple lines in the toast notification.',
    type: 'success',
    onClose: () => console.log('Toast closed'),
  },
};
