import React, { useState } from 'react';
import { IOrder, ICustomer, IPackage, OrderStatus, OrderStatusType } from '../types';

type OrderFormData = {
  customerId: string;
  packageId: string;
  status: OrderStatusType;
};

export interface OrderFormProps {
  order?: IOrder;
  customers: ICustomer[];
  packages: IPackage[];
  onSubmit: (order: OrderFormData) => Promise<void>;
  onCancel: () => void;
}

export function OrderForm({ order, customers, packages, onSubmit, onCancel }: OrderFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    customerId: order?.customerId || customers[0]?.id || '',
    packageId: order?.packageId || packages[0]?.id || '',
    status: order?.status || OrderStatus.PENDING
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customerId) newErrors.customerId = 'Customer is required';
    if (!formData.packageId) newErrors.packageId = 'Package is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await onSubmit(formData);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Customer</label>
        <select
          value={formData.customerId}
          onChange={(e) => setFormData(prev => ({ ...prev, customerId: e.target.value }))}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Select a customer</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>
              {customer.name} ({customer.email})
            </option>
          ))}
        </select>
        {errors.customerId && <p className="text-red-500 text-sm mt-1">{errors.customerId}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Package</label>
        <select
          value={formData.packageId}
          onChange={(e) => setFormData(prev => ({ ...prev, packageId: e.target.value }))}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Select a package</option>
          {packages.map(pkg => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name} (${pkg.price}) - {pkg.isAvailable ? 'Available' : 'Unavailable'}
            </option>
          ))}
        </select>
        {errors.packageId && <p className="text-red-500 text-sm mt-1">{errors.packageId}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as OrderStatusType }))}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value={OrderStatus.PENDING}>Pending</option>
          <option value={OrderStatus.COMPLETED}>Completed</option>
          <option value={OrderStatus.CANCELLED}>Cancelled</option>
        </select>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
        >
          {order ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
}