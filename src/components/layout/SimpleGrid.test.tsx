import { render, screen, fireEvent } from '@testing-library/react';
import { SimpleGrid } from './SimpleGrid';

describe('SimpleGrid', () => {
  // Mock data with specific types
  type MockDataType = {
    id: string;
    name: string;
    age: number;
    status?: boolean;
  };

  const mockData: MockDataType[] = [
    { id: '1', name: 'John Doe', age: 30 },
    { id: '2', name: 'Jane Smith', age: 25 },
    { id: '3', name: 'Bob Johnson', age: 35 }
  ];

  const mockColumns = [
    { field: 'name' as const, headerName: 'Name', sortable: true },
    { field: 'age' as const, headerName: 'Age', sortable: true }
  ];

  it('renders headers correctly', () => {
    render(<SimpleGrid data={mockData} columns={mockColumns} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders data correctly', () => {
    render(<SimpleGrid data={mockData} columns={mockColumns} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('handles custom cell rendering', () => {
    const columnsWithRenderer = [
      ...mockColumns,
      { 
        field: 'status' as const, 
        headerName: 'Status',
        cellRenderer: ({ value }: { value: boolean; data: MockDataType }) => 
          value ? 'Active' : 'Inactive'
      }
    ];

    const dataWithStatus = mockData.map(item => ({ ...item, status: true }));

    render(<SimpleGrid data={dataWithStatus} columns={columnsWithRenderer} />);
    
    expect(screen.getAllByText('Active')).toHaveLength(3);
  });

  it('handles empty data', () => {
    render(<SimpleGrid data={[]} columns={mockColumns} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('handles row click events', () => {
    const handleRowClick = jest.fn();
    
    render(
      <SimpleGrid 
        data={mockData} 
        columns={mockColumns}
        onRowClick={handleRowClick}
      />
    );
    
    fireEvent.click(screen.getByText('John Doe'));
    
    expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it('applies custom row classes', () => {
    const getRowClass = (item: typeof mockData[0]) => 
      item.age > 30 ? 'text-red-500' : '';

    render(
      <SimpleGrid 
        data={mockData} 
        columns={mockColumns}
        getRowClass={getRowClass}
      />
    );
    
    const bobRow = screen.getByText('Bob Johnson').closest('tr');
    expect(bobRow).toHaveClass('text-red-500');

    const johnRow = screen.getByText('John Doe').closest('tr');
    expect(johnRow).not.toHaveClass('text-red-500');
  });
});
