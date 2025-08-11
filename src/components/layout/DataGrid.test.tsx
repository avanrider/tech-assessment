import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataGrid } from './DataGrid';

describe('DataGrid', () => {
  const mockData = [
    { id: '1', name: 'Item 1', price: 10 },
    { id: '2', name: 'Item 2', price: 20 },
  ];

  const mockColumns = [
    { field: 'name' as keyof typeof mockData[0], headerName: 'Name' },
    { field: 'price' as keyof typeof mockData[0], headerName: 'Price' },
  ];

  it('renders the grid with data', () => {
    render(<DataGrid data={mockData} columns={mockColumns} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders the header columns', () => {
    render(<DataGrid data={mockData} columns={mockColumns} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
  });

  it('handles custom cell rendering', () => {
    const columnsWithRenderer = [
      { field: 'name' as keyof typeof mockData[0], headerName: 'Name' },
      { 
        field: 'price' as keyof typeof mockData[0], 
        headerName: 'Price',
        cellRenderer: ({ data }: { data: typeof mockData[0] }) => 
          `$${data.price.toFixed(2)}`
      }
    ];

    render(<DataGrid data={mockData} columns={columnsWithRenderer} />);
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
  });

  it('handles empty data', () => {
    render(<DataGrid data={[]} columns={mockColumns} />);
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('renders edit and delete buttons when handlers are provided', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    render(
      <DataGrid 
        data={mockData} 
        columns={mockColumns}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    const editButtons = screen.getAllByLabelText(/Edit Item/);
    const deleteButtons = screen.getAllByLabelText(/Delete Item/);

    expect(editButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);

    fireEvent.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalledWith(mockData[0]);

    fireEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith(mockData[0]);
  });

  it('handles row clicks', () => {
    const onRowClick = jest.fn();
    render(
      <DataGrid 
        data={mockData} 
        columns={mockColumns}
        onRowClick={onRowClick}
      />
    );

    fireEvent.click(screen.getByText('Item 1'));
    expect(onRowClick).toHaveBeenCalledWith(mockData[0]);
  });
});
