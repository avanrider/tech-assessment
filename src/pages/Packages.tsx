import React, { useState } from 'react';
import { useLoaderData, useRevalidator, useNavigation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { DataGrid } from '../components/layout/DataGrid';
import { Modal } from '../components/ui/Modal';
import { PackageForm } from '../components/forms/PackageForm';
import { Toast } from '../components/ui/Toast';
import { MockAPI } from '../utils/mockApi';
import { IPackage } from '../types';

type PackageWithOrders = IPackage & {
  orderCounts: {
    total: number;
    price: number;
    completed: number;
    cancelled: number;
  };
};

// Loader function for React Router
export async function loader() {
  const response = await MockAPI.getPackages();
  if (!response.success) {
    throw new Error('Failed to load packages');
  }
  return response.data;
}

export default function Packages() {
  const packages = useLoaderData() as PackageWithOrders[];
  const revalidator = useRevalidator();
  const navigation = useNavigation();
  const [modalOpen, setModalOpen] = useState(false);
  const [editPackage, setEditPackage] = useState<PackageWithOrders | undefined>();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleCreate = async (packageData: { name: string; price: number; description?: string; isAvailable: boolean }) => {
    const response = await MockAPI.createPackage(packageData);
    if (response.success) {
      revalidator.revalidate();
      setModalOpen(false);
      setToast({ message: 'Package created successfully', type: 'success' });
    } else {
      setToast({ 
        message: response.error.type === 'VALIDATION_ERROR'
          ? response.error.errors.map(e => e.message).join(', ')
          : response.error.message,
        type: 'error'
      });
    }
  };

  const handleUpdate = async (packageData: { name: string; price: number; description?: string; isAvailable: boolean }) => {
    if (!editPackage) return;
    
    const response = await MockAPI.updatePackage(editPackage.id, packageData);
    if (response.success) {
      revalidator.revalidate();
      setModalOpen(false);
      setEditPackage(undefined);
      setToast({ message: 'Package updated successfully', type: 'success' });
    } else {
      setToast({ 
        message: response.error.type === 'VALIDATION_ERROR'
          ? response.error.errors.map(e => e.message).join(', ')
          : response.error.message,
        type: 'error'
      });
    }
  };

  const handleDelete = async (pkg: PackageWithOrders) => {
    if (pkg.orderCounts.total > 0) {
      setToast({ 
        message: 'Cannot delete package with existing orders', 
        type: 'error' 
      });
      return;
    }

    if (!window.confirm('Are you sure you want to delete this package?')) return;
    
    const response = await MockAPI.deletePackage(pkg.id);
    if (response.success) {
      revalidator.revalidate();
      setToast({ message: 'Package deleted successfully', type: 'success' });
    } else {
      setToast({ 
        message: response.error.type === 'VALIDATION_ERROR'
          ? response.error.errors.map(e => e.message).join(', ')
          : response.error.message,
        type: 'error'
      });
    }
  };

  const columns = [
    { field: 'name' as keyof PackageWithOrders, headerName: 'Name' },
    { 
      field: 'price' as keyof PackageWithOrders, 
      headerName: 'Price',
      cellRenderer: ({ value }: { value: number }) => `$${value.toFixed(2)}`
    },
    { field: 'description' as keyof PackageWithOrders, headerName: 'Description' },
    { 
      field: 'isAvailable' as keyof PackageWithOrders,
      headerName: 'Status',
      cellRenderer: ({ value }: { value: boolean }) => (
        <span className={`px-2 py-1 rounded-full text-sm ${
          value ? 'bg-secondary-50 text-secondary-700' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Available' : 'Unavailable'}
        </span>
      )
    }
  ];

  if (navigation.state === 'loading') return <div className="flex justify-center p-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Packages</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600"
        >
          <Plus size={16} />
          <span>Add Package</span>
        </button>
      </div>

      <DataGrid
        data={packages}
        columns={columns}
        onEdit={(pkg) => {
          setEditPackage(pkg);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditPackage(undefined);
        }}
        title={editPackage ? 'Edit Package' : 'Create Package'}
      >
        <PackageForm
          package={editPackage}
          onSubmit={editPackage ? handleUpdate : handleCreate}
          onCancel={() => {
            setModalOpen(false);
            setEditPackage(undefined);
          }}
        />
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
