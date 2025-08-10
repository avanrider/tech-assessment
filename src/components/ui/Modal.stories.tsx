import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    isOpen: true,
    title: 'Example Modal',
    children: <div>This is an example modal content.</div>,
    onClose: () => console.log('Modal closed'),
  },
};

export const LongContent: Story = {
  args: {
    isOpen: true,
    title: 'Modal with Long Content',
    children: (
      <div>
        <p>This is a paragraph of text.</p>
        <p>This is another paragraph of text.</p>
        <p>And here's even more content to show scrolling.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    ),
    onClose: () => console.log('Modal closed'),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Hidden Modal',
    children: <div>You should not see this content.</div>,
    onClose: () => console.log('Modal closed'),
  },
};
