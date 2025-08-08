// Base interfaces
export interface IGridRow {
  id: string;
  [key: string]: unknown;
}

export interface ITimestamps {
  createdAt: Date;
  updatedAt: Date;
}

// Enum for order status
export const OrderStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];

// Business entity interfaces
export interface IOrder extends IGridRow, Partial<ITimestamps> {
  /** The ID of the customer this order belongs to */
  customerId: string;
  packageId: string;
  amount: number;
  status: OrderStatusType;
}

export interface ICustomer extends IGridRow, Partial<ITimestamps> {
  name: string;
  email: string;
  phoneNumber?: string;
}

export interface IPackage extends IGridRow, Partial<ITimestamps> {
  name: string;
  price: number;
  description?: string;
  isAvailable: boolean;
}

// Generic parameter interface for API calls
export interface IPaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IFilterParams {
  search?: string;
  [key: string]: unknown;
}

// API error types
export interface IValidationError {
  field: string;
  message: string;
}

export type ApiErrorType = 
  | { type: 'VALIDATION_ERROR'; errors: IValidationError[] }
  | { type: 'NOT_FOUND'; message: string }
  | { type: 'UNAUTHORIZED'; message: string }
  | { type: 'SERVER_ERROR'; message: string };

// API response types with discriminated unions
export type ApiResponse<T> = 
  | { success: true; data: T; metadata?: { total: number; page: number } }
  | { success: false; error: ApiErrorType };

// Grid component types
export interface IGridColumn<T> {
  field: keyof T;
  headerName: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  cellRenderer?: (params: { value: T[keyof T]; data: T }) => React.ReactNode;
}

export interface IGridProps<T extends IGridRow> {
  data: T[];
  columns: IGridColumn<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  loading?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}