import { render, screen, fireEvent } from '@testing-library/react';
import { OrderForm } from './OrderForm';

describe('OrderForm', () => {
  const mockOrder = {
    id: '1',
    customerId: '123',
    packageId: '456',
    amount: 99.99,
    status: 'pending' as const
  };

  const mockCustomers = [
    { id: '123', name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890' },
    { id: '456', name: 'Jane Smith', email: 'jane@example.com', phoneNumber: '987-654-3210' }
  ];

  const mockPackages = [
    { id: '456', name: 'Basic Package', price: 99.99, isAvailable: true },
    { id: '789', name: 'Premium Package', price: 199.99, isAvailable: true }
  ];

  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  it('renders with empty values for new order', () => {
    render(
      <OrderForm 
        customers={mockCustomers}
        packages={mockPackages}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/customer/i)).toHaveValue('');
    expect(screen.getByLabelText(/package/i)).toHaveValue('');
    expect(screen.getByLabelText(/amount/i)).toHaveValue('');
  });

  it('renders with existing order data', () => {
    render(
      <OrderForm 
        order={mockOrder}
        customers={mockCustomers}
        packages={mockPackages}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/customer/i)).toHaveValue(mockOrder.customerId);
    expect(screen.getByLabelText(/package/i)).toHaveValue(mockOrder.packageId);
    expect(screen.getByLabelText(/amount/i)).toHaveValue(mockOrder.amount.toString());
  });

  it('handles form submission', async () => {
    render(
      <OrderForm 
        customers={mockCustomers}
        packages={mockPackages}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Select customer
    fireEvent.change(screen.getByLabelText(/customer/i), {
      target: { value: '123' }
    });

    // Select package
    fireEvent.change(screen.getByLabelText(/package/i), {
      target: { value: '456' }
    });

    // Amount should be auto-filled from package price
    expect(screen.getByLabelText(/amount/i)).toHaveValue('99.99');

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      customerId: '123',
      packageId: '456',
      amount: 99.99,
      status: 'pending'
    });
  });

  it('handles cancellation', () => {
    render(
      <OrderForm 
        customers={mockCustomers}
        packages={mockPackages}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('validates required fields', () => {
    render(
      <OrderForm 
        customers={mockCustomers}
        packages={mockPackages}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Try to submit without selecting required fields
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText(/customer is required/i)).toBeInTheDocument();
    expect(screen.getByText(/package is required/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('auto-fills amount when package is selected', () => {
    render(
      <OrderForm 
        customers={mockCustomers}
        packages={mockPackages}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Select package
    fireEvent.change(screen.getByLabelText(/package/i), {
      target: { value: '789' }
    });

    // Amount should be auto-filled with package price
    expect(screen.getByLabelText(/amount/i)).toHaveValue('199.99');
  });
});
