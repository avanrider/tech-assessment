import { render, screen, fireEvent } from '@testing-library/react';
import { PackageForm } from './PackageForm';

describe('PackageForm', () => {
  const mockPackage = {
    id: '1',
    name: 'Basic Package',
    price: 99.99,
    description: 'Basic package description',
    isAvailable: true,
    features: ['Feature 1', 'Feature 2']
  };

  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  it('renders with empty values for new package', () => {
    render(
      <PackageForm 
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue('');
    expect(screen.getByLabelText(/price/i)).toHaveValue('');
    expect(screen.getByLabelText(/description/i)).toHaveValue('');
  });

  it('renders with existing package data', () => {
    render(
      <PackageForm 
        package={mockPackage}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue(mockPackage.name);
    expect(screen.getByLabelText(/price/i)).toHaveValue(mockPackage.price.toString());
    expect(screen.getByLabelText(/description/i)).toHaveValue(mockPackage.description);
    mockPackage.features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('handles form submission', async () => {
    render(
      <PackageForm 
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Premium Package' }
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: '199.99' }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Premium package description' }
    });

    // Add a feature
    fireEvent.change(screen.getByLabelText(/feature/i), {
      target: { value: 'New Feature' }
    });
    fireEvent.click(screen.getByRole('button', { name: /add feature/i }));

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Premium Package',
      price: 199.99,
      description: 'Premium package description',
      features: ['New Feature']
    });
  });

  it('handles cancellation', () => {
    render(
      <PackageForm 
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('validates required fields', () => {
    render(
      <PackageForm 
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Try to submit without filling required fields
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/price is required/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates price format', () => {
    render(
      <PackageForm 
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Enter invalid price
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: 'invalid-price' }
    });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText(/price must be a valid number/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('handles feature management', () => {
    render(
      <PackageForm 
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Add features
    const featureInput = screen.getByLabelText(/feature/i);
    
    fireEvent.change(featureInput, { target: { value: 'Feature 1' } });
    fireEvent.click(screen.getByRole('button', { name: /add feature/i }));
    
    fireEvent.change(featureInput, { target: { value: 'Feature 2' } });
    fireEvent.click(screen.getByRole('button', { name: /add feature/i }));

    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();

    // Remove a feature
    const removeButtons = screen.getAllByRole('button', { name: /remove feature/i });
    fireEvent.click(removeButtons[0]);

    expect(screen.queryByText('Feature 1')).not.toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
  });
});
