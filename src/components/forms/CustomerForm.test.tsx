import { render, screen, fireEvent } from '@testing-library/react';
import { CustomerForm } from './CustomerForm';

describe('CustomerForm', () => {
  const mockCustomer = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890'
  };

  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  it('renders with empty values for new customer', () => {
    render(
      <CustomerForm 
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/phone/i)).toHaveValue('');
  });

  it('renders with existing customer data', () => {
    render(
      <CustomerForm 
        customer={mockCustomer}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue(mockCustomer.name);
    expect(screen.getByLabelText(/email/i)).toHaveValue(mockCustomer.email);
    expect(screen.getByLabelText(/phone/i)).toHaveValue(mockCustomer.phone);
  });

  it('handles form submission', async () => {
    render(
      <CustomerForm 
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Jane Smith' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'jane@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: '987-654-3210' }
    });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210'
    });
  });

  it('handles cancellation', () => {
    render(
      <CustomerForm 
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('validates required fields', () => {
    render(
      <CustomerForm 
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Try to submit without filling required fields
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates email format', () => {
    render(
      <CustomerForm 
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Enter invalid email
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' }
    });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
