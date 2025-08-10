import { render, screen, fireEvent, act } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders message correctly', () => {
    render(<Toast message="Test message" type="success" onClose={() => {}} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders different types with correct styles', () => {
    const { rerender } = render(<Toast message="Test" type="success" onClose={() => {}} />);
    expect(screen.getByText('Test')).toHaveClass('bg-secondary-50', 'text-secondary-700');

    rerender(<Toast message="Test" type="error" onClose={() => {}} />);
    expect(screen.getByText('Test')).toHaveClass('bg-red-100', 'text-red-800');

    rerender(<Toast message="Test" type="info" onClose={() => {}} />);
    expect(screen.getByText('Test')).toHaveClass('bg-accent-50', 'text-accent-700');
  });

  it('calls onClose when clicking close button', () => {
    const mockOnClose = jest.fn();
    render(<Toast message="Test message" type="success" onClose={mockOnClose} />);
    
    const closeButton = screen.getByLabelText('Close notification');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('auto-closes after duration', () => {
    const mockOnClose = jest.fn();
    render(
      <Toast 
        message="Test message" 
        type="success" 
        onClose={mockOnClose} 
        duration={3000} 
      />
    );

    expect(mockOnClose).not.toHaveBeenCalled();
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not auto-close if duration is 0', () => {
    const mockOnClose = jest.fn();
    render(
      <Toast 
        message="Test message" 
        type="success" 
        onClose={mockOnClose} 
        duration={0} 
      />
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
