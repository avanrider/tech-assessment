import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the API calls
jest.mock('../api/MockAPI', () => ({
  MockAPI: {
    getOrders: jest.fn().mockResolvedValue({
      success: true,
      data: [
        { id: '1', customer: 'John Doe', amount: 100, status: 'pending' },
        { id: '2', customer: 'Jane Smith', amount: 250, status: 'completed' },
      ],
    }),
    getCustomers: jest.fn().mockResolvedValue({
      success: true,
      data: [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      ],
    }),
    getPackages: jest.fn().mockResolvedValue({
      success: true,
      data: [
        { id: '1', name: 'Widget A', price: 50 },
        { id: '2', name: 'Widget B', price: 75 },
      ],
    }),
    createOrder: jest.fn().mockResolvedValue({
      success: true,
      data: { id: '3', customer: 'New Customer', amount: 150, status: 'pending' },
    }),
    updateOrder: jest.fn().mockResolvedValue({
      success: true,
      data: { id: '1', customer: 'Updated Customer', amount: 200, status: 'completed' },
    }),
    deleteOrder: jest.fn().mockResolvedValue({ success: true, data: undefined }),
  },
}));

describe('App Component', () => {
  test('renders dashboard by default', () => {
    render(<App />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
  });

  test('navigates to Orders page', async () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('Orders'));
    
    await waitFor(() => {
      expect(screen.getByText('Orders')).toBeInTheDocument();
      expect(screen.getByText('Add Order')).toBeInTheDocument();
    });
  });

  test('navigates to Customers page', async () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('Customers'));
    
    await waitFor(() => {
      expect(screen.getByText('Customers')).toBeInTheDocument();
    });
  });

  test('displays loading state initially', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Orders'));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

describe('OrderForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('validates required fields', async () => {
    render(<App />);
    
    // Navigate to orders and open create modal
    fireEvent.click(screen.getByText('Orders'));
    await waitFor(() => screen.getByText('Add Order'));
    fireEvent.click(screen.getByText('Add Order'));
    
    // Try to submit without filling fields
    fireEvent.click(screen.getByText('Create'));
    
    await waitFor(() => {
      expect(screen.getByText('Customer is required')).toBeInTheDocument();
      expect(screen.getByText('Amount must be positive')).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    render(<App />);
    
    // Navigate to orders and open create modal
    fireEvent.click(screen.getByText('Orders'));
    await waitFor(() => screen.getByText('Add Order'));
    fireEvent.click(screen.getByText('Add Order'));
    
    // Fill form
    fireEvent.change(screen.getByLabelText('Customer'), {
      target: { value: 'Test Customer' },
    });
    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '100' },
    });
    
    // Submit form
    fireEvent.click(screen.getByText('Create'));
    
    await waitFor(() => {
      expect(screen.getByText('Order created successfully')).toBeInTheDocument();
    });
  });
});

describe('SimpleGrid Component', () => {
  test('displays data correctly', async () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('Orders'));
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('$100')).toBeInTheDocument();
      expect(screen.getByText('$250')).toBeInTheDocument();
    });
  });

  test('filters data when searching', async () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('Orders'));
    await waitFor(() => screen.getByText('John Doe'));
    
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  test('sorts data when clicking column headers', async () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('Orders'));
    await waitFor(() => screen.getByText('John Doe'));
    
    // Click on Customer header to sort
    fireEvent.click(screen.getByText('Customer'));
    
    // Check if sort indicator appears
    expect(screen.getByText('Customer')).toBeInTheDocument();
  });
});