import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Home, Package, Users, ShoppingCart } from 'lucide-react';
import { Sidebar } from './Sidebar';

const mockRoutes = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/packages', label: 'Packages', icon: Package },
];

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Desktop: Story = {
  args: {
    routes: mockRoutes,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const Mobile: Story = {
  args: {
    routes: mockRoutes,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

export const Tablet: Story = {
  args: {
    routes: mockRoutes,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const MobileMenuOpen: Story = {
  args: {
    routes: mockRoutes,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button[aria-label="Open menu"]') as HTMLButtonElement;
    if (button) {
      button.click();
    }
  },
};
