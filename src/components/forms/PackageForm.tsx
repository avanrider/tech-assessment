import React, { useState } from 'react';
import { IPackage } from '../../types';

type PackageFormData = {
  name: string;
  price: number;
  description?: string;
  isAvailable: boolean;
};

export interface PackageFormProps {
  package?: IPackage;
  onSubmit: (packageData: PackageFormData) => Promise<void>;
  onCancel: () => void;
}

export function PackageForm({ package: pkg, onSubmit, onCancel }: PackageFormProps) {
  const [formData, setFormData] = useState<PackageFormData>({
    name: pkg?.name || '',
    price: pkg?.price || 0,
    description: pkg?.description || '',
    isAvailable: pkg?.isAvailable ?? true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
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
        <label htmlFor="package-name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="package-name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="package-price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          id="package-price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>

      <div>
        <label htmlFor="package-description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
        <textarea
          id="package-description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="package-available"
            checked={formData.isAvailable}
            onChange={(e) => setFormData(prev => ({ ...prev, isAvailable: e.target.checked }))}
            className="form-checkbox h-4 w-4 rounded border-gray-300
              text-primary-500 
              focus:ring-primary-500 focus:ring-offset-0
              checked:bg-primary-500 checked:hover:bg-primary-600"
          />
          <span className="text-sm font-medium text-gray-700">Available</span>
        </label>
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
          {pkg ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
}
