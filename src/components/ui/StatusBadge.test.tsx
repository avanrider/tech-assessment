import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders pending status correctly', () => {
    render(<StatusBadge status="pending" />);
    const badge = screen.getByText('pending');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-accent-50', 'text-accent-700');
  });

  it('renders completed status correctly', () => {
    render(<StatusBadge status="completed" />);
    const badge = screen.getByText('completed');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-secondary-50', 'text-secondary-700');
  });

  it('renders cancelled status correctly', () => {
    render(<StatusBadge status="cancelled" />);
    const badge = screen.getByText('cancelled');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-100', 'text-red-800');
  });
});
