import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['pending', 'completed', 'cancelled'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Pending: Story = {
  args: {
    status: 'pending',
  },
};

export const Completed: Story = {
  args: {
    status: 'completed',
  },
};

export const Cancelled: Story = {
  args: {
    status: 'cancelled',
  },
};
