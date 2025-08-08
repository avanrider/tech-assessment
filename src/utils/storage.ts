import { IOrder, ICustomer, IPackage } from '../types';

const STORAGE_KEYS = {
  ORDERS: 'orders',
  CUSTOMERS: 'customers',
  PACKAGES: 'packages',
} as const;

export class StorageService {
  private static serializeDates(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }
    
    if (obj instanceof Date) {
      return {
        __type: 'date',
        value: obj.toISOString(),
      };
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.serializeDates(item));
    }
    
    if (typeof obj === 'object') {
      const result: any = {};
      for (const key in obj) {
        result[key] = this.serializeDates(obj[key]);
      }
      return result;
    }
    
    return obj;
  }

  private static deserializeDates(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }
    
    if (obj.__type === 'date') {
      return new Date(obj.value);
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.deserializeDates(item));
    }
    
    if (typeof obj === 'object') {
      const result: any = {};
      for (const key in obj) {
        result[key] = this.deserializeDates(obj[key]);
      }
      return result;
    }
    
    return obj;
  }

  private static getItem<T>(key: string, defaultValue: T): T {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    const parsed = JSON.parse(item);
    return this.deserializeDates(parsed);
  }

  private static setItem<T>(key: string, value: T): void {
    const serialized = this.serializeDates(value);
    localStorage.setItem(key, JSON.stringify(serialized));
  }

  static getOrders(): IOrder[] {
    return this.getItem<IOrder[]>(STORAGE_KEYS.ORDERS, []);
  }

  static setOrders(orders: IOrder[]): void {
    this.setItem(STORAGE_KEYS.ORDERS, orders);
  }

  static getCustomers(): ICustomer[] {
    return this.getItem<ICustomer[]>(STORAGE_KEYS.CUSTOMERS, []);
  }

  static setCustomers(customers: ICustomer[]): void {
    this.setItem(STORAGE_KEYS.CUSTOMERS, customers);
  }

  static getPackages(): IPackage[] {
    return this.getItem<IPackage[]>(STORAGE_KEYS.PACKAGES, []);
  }

  static setPackages(packages: IPackage[]): void {
    this.setItem(STORAGE_KEYS.PACKAGES, packages);
  }

  static initializeStorage(initialData: {
    orders?: IOrder[];
    customers?: ICustomer[];
    packages?: IPackage[];
  }): void {
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS) && initialData.orders) {
      this.setOrders(initialData.orders);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS) && initialData.customers) {
      this.setCustomers(initialData.customers);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PACKAGES) && initialData.packages) {
      this.setPackages(initialData.packages);
    }
  }
}
