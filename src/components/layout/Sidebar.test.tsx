import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Home, Users, Package } from 'lucide-react';

// Mock routes for testing
const mockRoutes = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/packages', label: 'Packages', icon: Package }
];

// Wrapper component for router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('Sidebar', () => {
  beforeEach(() => {
    window.innerWidth = 1024; // Desktop view by default
    window.dispatchEvent(new Event('resize'));
  });

  it('renders all route links', () => {
    renderWithRouter(<Sidebar routes={mockRoutes} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Packages')).toBeInTheDocument();
  });

  it('shows/hides mobile menu correctly', () => {
    window.innerWidth = 375; // Mobile view
    window.dispatchEvent(new Event('resize'));
    
    renderWithRouter(<Sidebar routes={mockRoutes} />);
    
    // Menu should be hidden initially
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('-translate-x-full');

    // Click hamburger to open
    const menuButton = screen.getByLabelText('Open menu');
    fireEvent.click(menuButton);
    
    // Menu should be visible
    expect(nav).toHaveClass('translate-x-0');

    // Click close button
    const closeButton = screen.getByLabelText('Close menu');
    fireEvent.click(closeButton);
    
    // Menu should be hidden again
    expect(nav).toHaveClass('-translate-x-full');
  });

  it('closes mobile menu when route changes', () => {
    window.innerWidth = 375; // Mobile view
    window.dispatchEvent(new Event('resize'));
    
    renderWithRouter(<Sidebar routes={mockRoutes} />);
    
    // Open menu
    const menuButton = screen.getByLabelText('Open menu');
    fireEvent.click(menuButton);
    
    // Click a route link
    fireEvent.click(screen.getByText('Users'));
    
    // Menu should close
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('-translate-x-full');
  });

  it('shows desktop layout on larger screens', () => {
    window.innerWidth = 1024; // Desktop view
    window.dispatchEvent(new Event('resize'));
    
    renderWithRouter(<Sidebar routes={mockRoutes} />);
    
    // Menu button should not be visible
    expect(screen.queryByLabelText('Open menu')).not.toBeInTheDocument();
    
    // Sidebar should be visible
    const nav = screen.getByRole('navigation');
    expect(nav).not.toHaveClass('-translate-x-full');
    expect(nav).toBeVisible();
  });
});
