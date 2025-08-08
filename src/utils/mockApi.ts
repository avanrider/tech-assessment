import { 
  IOrder, 
  ICustomer, 
  IPackage, 
  ApiResponse, 
  OrderStatus,
  OrderStatusType,
  IPaginationParams,
  IFilterParams,
  ApiErrorType 
} from '../types';
import { StorageService } from './storage';

// Initialize mock data
const CUSTOMER_1_ID = '1';
const CUSTOMER_2_ID = '2';

const initialCustomers: ICustomer[] = [
  { 
    id: CUSTOMER_1_ID, 
    name: 'John Doe', 
    email: 'john@example.com',
    phoneNumber: '123-456-7890',
    createdAt: new Date('2025-08-01'),
    updatedAt: new Date('2025-08-01')
  },
  { 
    id: CUSTOMER_2_ID, 
    name: 'Jane Smith', 
    email: 'jane@example.com',
    createdAt: new Date('2025-08-02'),
    updatedAt: new Date('2025-08-02')
  }
];

const initialOrders: IOrder[] = [
  { 
    id: '1', 
    customerId: CUSTOMER_1_ID, 
    packageId: '1', // Link to Basic Service Package
    amount: 100, 
    status: OrderStatus.PENDING,
    createdAt: new Date('2025-08-01'),
    updatedAt: new Date('2025-08-01')
  },
  { 
    id: '2', 
    customerId: CUSTOMER_2_ID,
    packageId: '2', // Link to Premium Service Package
    amount: 250, 
    status: OrderStatus.COMPLETED,
    createdAt: new Date('2025-08-02'),
    updatedAt: new Date('2025-08-02')
  },
  { 
    id: '3', 
    customerId: CUSTOMER_1_ID,
    packageId: '1', // Another Basic Service Package for John Doe
    amount: 150, 
    status: OrderStatus.CANCELLED,
    createdAt: new Date('2025-08-03'),
    updatedAt: new Date('2025-08-03')
  }
];

const initialPackages: IPackage[] = [
  { 
    id: '1', 
    name: 'Basic Service Package', 
    price: 50, 
    isAvailable: true,
    description: 'Essential service package for small businesses',
    createdAt: new Date('2025-08-01'),
    updatedAt: new Date('2025-08-01')
  },
  { 
    id: '2', 
    name: 'Premium Service Package', 
    price: 75, 
    isAvailable: false,
    description: 'Comprehensive service package for growing businesses',
    createdAt: new Date('2025-08-02'),
    updatedAt: new Date('2025-08-02')
  }
];

// Initialize storage with mock data
StorageService.initializeStorage({
  orders: initialOrders,
  customers: initialCustomers,
  packages: initialPackages,
});

// Mock API
export class MockAPI {
  private static delay = () => new Promise(resolve => setTimeout(resolve, 300));
  
  private static createError(type: 'NOT_FOUND' | 'SERVER_ERROR' | 'VALIDATION_ERROR', message: string, validationErrors?: { field: string; message: string }[]): ApiErrorType {
    if (type === 'VALIDATION_ERROR' && validationErrors) {
      return { type, errors: validationErrors };
    }
    return { type, message } as ApiErrorType;
  }

  static async getOrders(): Promise<ApiResponse<IOrder[]>> {
    await this.delay();
    const orders = StorageService.getOrders();
    return { 
      success: true, 
      data: orders,
      metadata: { total: orders.length, page: 1 }
    };
  }
  
  static async createOrder(orderData: { customerId: string; packageId: string; amount: number; status: OrderStatusType }): Promise<ApiResponse<IOrder>> {
    await this.delay();
    
    // Validate the input
    const validationErrors: { field: string; message: string }[] = [];
    if (typeof orderData.customerId !== 'string') {
      validationErrors.push({ field: 'customerId', message: 'Customer ID must be a string' });
    }
    if (typeof orderData.packageId !== 'string') {
      validationErrors.push({ field: 'packageId', message: 'Package ID must be a string' });
    }
    if (typeof orderData.amount !== 'number' || orderData.amount <= 0) {
      validationErrors.push({ field: 'amount', message: 'Amount must be a positive number' });
    }
    if (!Object.values(OrderStatus).includes(orderData.status)) {
      validationErrors.push({ field: 'status', message: 'Invalid status value' });
    }

    if (validationErrors.length > 0) {
      return {
        success: false,
        error: this.createError('VALIDATION_ERROR', 'Validation failed', validationErrors)
      };
    }

    const now = new Date();
    const newOrder: IOrder = { 
      id: Date.now().toString(),
      customerId: orderData.customerId,
      packageId: orderData.packageId,
      amount: orderData.amount,
      status: orderData.status,
      createdAt: now,
      updatedAt: now
    };
    
    const orders = StorageService.getOrders();
    orders.push(newOrder);
    StorageService.setOrders(orders);
    
    return { success: true, data: newOrder };
  }
  
  static async updateOrder(id: string, orderUpdate: { customerId?: string; packageId?: string; amount?: number; status?: OrderStatusType }): Promise<ApiResponse<IOrder>> {
    await this.delay();
    const orders = StorageService.getOrders();
    const index = orders.findIndex((o: IOrder) => o.id === id);
    
    if (index === -1) {
      return { 
        success: false, 
        error: this.createError('NOT_FOUND', 'Order not found')
      };
    }

    const updatedOrder = { 
      ...orders[index], 
      ...orderUpdate,
      updatedAt: new Date()
    };
    orders[index] = updatedOrder;
    StorageService.setOrders(orders);
    
    return { success: true, data: updatedOrder };
  }
  
  static async deleteOrder(id: string): Promise<ApiResponse<void>> {
    await this.delay();
    const orders = StorageService.getOrders();
    const index = orders.findIndex((o: IOrder) => o.id === id);
    
    if (index === -1) {
      return { 
        success: false, 
        error: this.createError('NOT_FOUND', 'Order not found')
      };
    }
    
    orders.splice(index, 1);
    StorageService.setOrders(orders);
    return { success: true, data: undefined };
  }
  
  private static async getCustomerOrderCounts(customerId: string) {
    const orders = StorageService.getOrders();
    // Log for debugging
    console.log('Checking orders for customer:', customerId, orders);
    const customerOrders = orders.filter(o => o.customerId === customerId);
    const counts = {
      total: customerOrders.length,
      pending: customerOrders.filter(o => o.status === OrderStatus.PENDING).length,
      completed: customerOrders.filter(o => o.status === OrderStatus.COMPLETED).length,
      cancelled: customerOrders.filter(o => o.status === OrderStatus.CANCELLED).length
    };
    // Log for debugging
    console.log('Order counts:', counts);
    return counts;
  }

  static async getCustomers(): Promise<ApiResponse<(ICustomer & { orderCounts: { total: number; pending: number; completed: number; cancelled: number } })[]>> {
    await this.delay();
    const customers = StorageService.getCustomers();
    
    // Add order counts to each customer
    const customersWithOrders = await Promise.all(
      customers.map(async customer => ({
        ...customer,
        orderCounts: await this.getCustomerOrderCounts(customer.id)
      }))
    );
    
    return { success: true, data: customersWithOrders };
  }

  static async createCustomer(customerData: { name: string; email: string; phoneNumber?: string }): Promise<ApiResponse<ICustomer>> {
    await this.delay();
    
    // Validate email uniqueness
    const customers = StorageService.getCustomers();
    if (customers.some(c => c.email.toLowerCase() === customerData.email.toLowerCase())) {
      return {
        success: false,
        error: this.createError('VALIDATION_ERROR', 'Validation failed', [
          { field: 'email', message: 'Email already exists' }
        ])
      };
    }

    const now = new Date();
    const newCustomer: ICustomer = {
      id: Date.now().toString(),
      ...customerData,
      createdAt: now,
      updatedAt: now
    };

    customers.push(newCustomer);
    StorageService.setCustomers(customers);
    return { success: true, data: newCustomer };
  }

  static async updateCustomer(
    id: string,
    customerData: Partial<Pick<ICustomer, 'name' | 'email' | 'phoneNumber'>>
  ): Promise<ApiResponse<ICustomer>> {
    await this.delay();
    const customers = StorageService.getCustomers();
    const index = customers.findIndex(c => c.id === id);

    if (index === -1) {
      return {
        success: false,
        error: this.createError('NOT_FOUND', 'Customer not found')
      };
    }

    // Check email uniqueness if email is being updated
    const emailToUpdate = customerData.email;
    if (emailToUpdate && 
        customers.some(c => c.id !== id && c.email.toLowerCase() === emailToUpdate.toLowerCase())) {
      return {
        success: false,
        error: this.createError('VALIDATION_ERROR', 'Validation failed', [
          { field: 'email', message: 'Email already exists' }
        ])
      };
    }

    const updatedCustomer = {
      ...customers[index],
      ...customerData,
      updatedAt: new Date()
    };
    customers[index] = updatedCustomer;
    StorageService.setCustomers(customers);
    return { success: true, data: updatedCustomer };
  }

  static async deleteCustomer(id: string): Promise<ApiResponse<void>> {
    await this.delay();
    const customers = StorageService.getCustomers();
    const orders = StorageService.getOrders();

    // Check if customer has any orders
    if (orders.some(o => o.customerId === id)) {
      return {
        success: false,
        error: this.createError('VALIDATION_ERROR', 'Cannot delete customer with existing orders', [
          { field: 'id', message: 'Customer has existing orders' }
        ])
      };
    }

    const index = customers.findIndex(c => c.id === id);
    if (index === -1) {
      return {
        success: false,
        error: this.createError('NOT_FOUND', 'Customer not found')
      };
    }

    customers.splice(index, 1);
    StorageService.setCustomers(customers);
    return { success: true, data: undefined };
  }
  
  static async getPackages(): Promise<ApiResponse<IPackage[]>> {
    await this.delay();
    const packages = StorageService.getPackages();
    return { 
      success: true, 
      data: packages,
      metadata: { total: packages.length, page: 1 }
    };
  }

  static async createPackage(packageData: { 
    name: string; 
    price: number; 
    description?: string;
    isAvailable: boolean;
  }): Promise<ApiResponse<IPackage>> {
    await this.delay();
    
    // Validate the input
    const validationErrors: { field: string; message: string }[] = [];
    if (!packageData.name.trim()) {
      validationErrors.push({ field: 'name', message: 'Name is required' });
    }
    if (typeof packageData.price !== 'number' || packageData.price <= 0) {
      validationErrors.push({ field: 'price', message: 'Price must be a positive number' });
    }
    if (typeof packageData.isAvailable !== 'boolean') {
      validationErrors.push({ field: 'isAvailable', message: 'Availability status must be specified' });
    }

    if (validationErrors.length > 0) {
      return {
        success: false,
        error: this.createError('VALIDATION_ERROR', 'Validation failed', validationErrors)
      };
    }

    const packages = StorageService.getPackages();
    
    // Check for duplicate package name
    if (packages.some(p => p.name.toLowerCase() === packageData.name.toLowerCase())) {
      return {
        success: false,
        error: this.createError('VALIDATION_ERROR', 'Validation failed', [
          { field: 'name', message: 'Package name already exists' }
        ])
      };
    }

    const now = new Date();
    const newPackage: IPackage = {
      id: Date.now().toString(),
      ...packageData,
      createdAt: now,
      updatedAt: now
    };

    packages.push(newPackage);
    StorageService.setPackages(packages);
    return { success: true, data: newPackage };
  }

  static async updatePackage(
    id: string,
    packageData: Partial<Pick<IPackage, 'name' | 'price' | 'description' | 'isAvailable'>>
  ): Promise<ApiResponse<IPackage>> {
    await this.delay();
    const packages = StorageService.getPackages();
    const index = packages.findIndex(p => p.id === id);

    if (index === -1) {
      return {
        success: false,
        error: this.createError('NOT_FOUND', 'Package not found')
      };
    }

    // Validate the updates
    const validationErrors: { field: string; message: string }[] = [];
    if (packageData.name && !packageData.name.trim()) {
      validationErrors.push({ field: 'name', message: 'Name cannot be empty' });
    }
    if (packageData.price !== undefined && packageData.price <= 0) {
      validationErrors.push({ field: 'price', message: 'Price must be a positive number' });
    }

    if (validationErrors.length > 0) {
      return {
        success: false,
        error: this.createError('VALIDATION_ERROR', 'Validation failed', validationErrors)
      };
    }

    // Check for duplicate name if name is being updated
    const nameToUpdate = packageData.name;
    if (nameToUpdate && 
        packages.some(p => p.id !== id && p.name.toLowerCase() === nameToUpdate.toLowerCase())) {
      return {
        success: false,
        error: this.createError('VALIDATION_ERROR', 'Validation failed', [
          { field: 'name', message: 'Package name already exists' }
        ])
      };
    }

    const updatedPackage = {
      ...packages[index],
      ...packageData,
      updatedAt: new Date()
    };
    packages[index] = updatedPackage;
    StorageService.setPackages(packages);
    return { success: true, data: updatedPackage };
  }

  static async deletePackage(id: string): Promise<ApiResponse<void>> {
    await this.delay();
    const packages = StorageService.getPackages();
    const orders = StorageService.getOrders();

    const index = packages.findIndex(p => p.id === id);
    if (index === -1) {
      return {
        success: false,
        error: this.createError('NOT_FOUND', 'Package not found')
      };
    }

    // Check if the package is used in any orders
    // TODO: Update this check once order-package relationships are established
    if (packages[index].isAvailable) {
      return {
        success: false,
        error: this.createError('VALIDATION_ERROR', 'Cannot delete package that is currently available', [
          { field: 'id', message: 'Package is currently available' }
        ])
      };
    }

    packages.splice(index, 1);
    StorageService.setPackages(packages);
    return { success: true, data: undefined };
  }
}