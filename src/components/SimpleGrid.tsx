import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

export interface IGridRow {
  id: string;
  [key: string]: any;
}

export interface SimpleGridProps<T extends IGridRow> {
  data: T[];
  columns: Array<{
    field: keyof T;
    headerName: string;
    sortable?: boolean;
    filter?: boolean;
    cellRenderer?: (params: { value: any; data: T }) => React.ReactNode;
  }>;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function SimpleGrid<T extends IGridRow>({ data, columns, onEdit, onDelete }: SimpleGridProps<T>) {
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredData = data.filter(row => {
    // Convert the row to a searchable string including nested properties
    const searchString = columns.map(col => {
      const value = row[col.field];
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).join(' ');
      }
      return value?.toString() || '';
    }).join(' ').toLowerCase();
    
    return searchString.includes(filterText.toLowerCase());
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    
    const aVal = a[sortField];
    const bVal = b[sortField];
    
    // Handle nested objects (like customerDetails and packageDetails)
    const getValue = (val: any): string => {
      if (typeof val === 'object' && val !== null) {
        if ('name' in val) return val.name;
        return Object.values(val).join(' ');
      }
      return val?.toString() || '';
    };

    const aStr = getValue(aVal);
    const bStr = getValue(bVal);

    if (aStr < bStr) return sortDirection === 'asc' ? -1 : 1;
    if (aStr > bStr) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(sortedData.length / pageSize);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="px-3 py-2 border rounded-md w-64"
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => (
                <th
                  key={String(col.field)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => col.sortable !== false && handleSort(col.field)}
                >
                  {col.headerName}
                  {sortField === col.field && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
              ))}
              {(onEdit || onDelete) && <th className="px-6 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {columns.map(col => (
                  <td key={String(col.field)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {col.cellRenderer ? col.cellRenderer({ value: row[col.field], data: row }) : String(row[col.field])}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        <Edit size={16} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="px-6 py-3 border-t flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <div className="space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}