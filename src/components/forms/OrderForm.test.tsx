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

  it('renders new order form with first customer and package selected', () => {
    render(
      <OrderForm 
        customers={mockCustomers}
        packages={mockPackages}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // In the new implementation, first customer and package are pre-selected
    expect(screen.getByLabelText(/customer/i)).toHaveValue(mockCustomers[0].id);
    expect(screen.getByLabelText(/package/i)).toHaveValue(mockPackages[0].id);
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
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
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
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

    fireEvent.click(screen.getByRole('button', { name: 'Create' }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      customerId: '123',
      packageId: '456',
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

    // Clear the selections first
    fireEvent.change(screen.getByLabelText(/customer/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/package/i), { target: { value: '' } });

    fireEvent.click(screen.getByRole('button', { name: 'Create' }));

    expect(screen.getByText('Customer is required')).toBeInTheDocument();
    expect(screen.getByText('Package is required')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('allows changing the status', () => {
    render(
      <OrderForm 
        customers={mockCustomers}
        packages={mockPackages}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const statusSelect = screen.getByLabelText(/status/i);
    fireEvent.change(statusSelect, {
      target: { value: 'completed' }
    });

    expect(statusSelect).toHaveValue('completed');
  });
});
