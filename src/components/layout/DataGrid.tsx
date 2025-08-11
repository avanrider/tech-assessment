import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { GridReadyEvent, ColDef } from 'ag-grid-community';
import { Edit, Trash2 } from 'lucide-react';

export interface IGridRow {
  id: string;
  [key: string]: any;
}

export interface DataGridProps<T extends IGridRow> {
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
  onRowClick?: (row: T) => void;
}

export function DataGrid<T extends IGridRow>({ 
  data, 
  columns, 
  onEdit, 
  onDelete, 
  onRowClick 
}: DataGridProps<T>) {
  const defaultColDef = React.useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1
  }), []);

  const gridRef = React.useRef<AgGridReact>(null);

  React.useEffect(() => {
    // Force grid resize when it's mounted
    const resizeGrid = () => {
      if (gridRef.current?.api) {
        gridRef.current.api.sizeColumnsToFit();
      }
    };

    window.addEventListener('resize', resizeGrid);
    return () => window.removeEventListener('resize', resizeGrid);
  }, []);

  const actionsRenderer = React.useCallback((params: any) => (
    <div className="flex justify-end space-x-2">
      {onEdit && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(params.data);
          }}
          className="text-indigo-600 hover:text-indigo-900"
          aria-label={`Edit ${params.data[columns[0].field]}`}
        >
          <Edit size={16} />
        </button>
      )}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(params.data);
          }}
          className="text-red-600 hover:text-red-900"
          aria-label={`Delete ${params.data[columns[0].field]}`}
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  ), [onEdit, onDelete, columns]);

  const columnDefs = React.useMemo(() => [
    ...columns.map(col => ({
      field: col.field as string,
      headerName: col.headerName,
      sortable: col.sortable !== false,
      filter: col.filter !== false,
      cellRenderer: col.cellRenderer,
    } as ColDef)),
    ...(onEdit || onDelete ? [{
      headerName: 'Actions',
      sortable: false,
      filter: false,
      cellRenderer: actionsRenderer,
      width: 100,
      pinned: 'right' as const
    } as ColDef] : [])
  ], [columns, actionsRenderer, onEdit, onDelete]);

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  console.log('Rendering grid with data:', { rowCount: data.length, columnCount: columnDefs.length });

  return (
    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={10}
        onRowClicked={params => onRowClick?.(params.data)}
        suppressCellFocus={true}
        
        enableCellTextSelection={true}
        animateRows={true}
        domLayout="normal"
        ensureDomOrder={true}
        suppressColumnVirtualisation={false}
        rowSelection="single"
        theme="legacy"
      />
    </div>
  );
}
