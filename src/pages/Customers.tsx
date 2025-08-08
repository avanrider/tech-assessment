import React, { useState } from 'react';
import { useLoaderData, useRevalidator, useNavigation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { SimpleGrid } from '../components/SimpleGrid';
import { Modal } from '../components/Modal';
import { CustomerForm } from '../components/CustomerForm';
import { Toast } from '../components/Toast';
import { MockAPI } from '../utils/mockApi';
import { ICustomer } from '../types';

type CustomerWithOrders = ICustomer & {
  orderCounts: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
};

// Loader function for React Router
export async function loader() {
  const response = await MockAPI.getCustomers();
  if (!response.success) {
    throw new Error('Failed to load customers');
  }
  return response.data;
}

export default function Customers() {
  const customers = useLoaderData() as CustomerWithOrders[];
  const revalidator = useRevalidator();
  const navigation = useNavigation();
  const [modalOpen, setModalOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState<CustomerWithOrders | undefined>();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleCreate = async (customerData: { name: string; email: string; phoneNumber?: string }) => {
    const response = await MockAPI.createCustomer(customerData);
    if (response.success) {
      revalidator.revalidate();
      setModalOpen(false);
      setToast({ message: 'Customer created successfully', type: 'success' });
    } else {
      setToast({ 
        message: response.error.type === 'VALIDATION_ERROR'
          ? response.error.errors.map(e => e.message).join(', ')
          : response.error.message,
        type: 'error'
      });
    }
  };

  const handleUpdate = async (customerData: { name: string; email: string; phoneNumber?: string }) => {
    if (!editCustomer) return;
    
    const response = await MockAPI.updateCustomer(editCustomer.id, customerData);
    if (response.success) {
      revalidator.revalidate();
      setModalOpen(false);
      setEditCustomer(undefined);
      setToast({ message: 'Customer updated successfully', type: 'success' });
    } else {
      setToast({ 
        message: response.error.type === 'VALIDATION_ERROR'
          ? response.error.errors.map(e => e.message).join(', ')
          : response.error.message,
        type: 'error'
      });
    }
  };

  const handleDelete = async (customer: CustomerWithOrders) => {
    if (customer.orderCounts.total > 0) {
      setToast({ 
        message: 'Cannot delete customer with existing orders', 
        type: 'error' 
      });
      return;
    }

    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    
    const response = await MockAPI.deleteCustomer(customer.id);
    if (response.success) {
      revalidator.revalidate();
      setToast({ message: 'Customer deleted successfully', type: 'success' });
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
    { field: 'name' as keyof CustomerWithOrders, headerName: 'Name' },
    { field: 'email' as keyof CustomerWithOrders, headerName: 'Email' },
    { field: 'phoneNumber' as keyof CustomerWithOrders, headerName: 'Phone' },
    { 
      field: 'orderCounts' as keyof CustomerWithOrders,
      headerName: 'Orders',
      cellRenderer: ({ value }: { value: CustomerWithOrders['orderCounts'] }) => (
        <div className="space-x-2">
          <span className="text-primary-500">{value.pending} pending</span>
          <span className="text-green-600">{value.completed} completed</span>
          <span className="text-red-600">{value.cancelled} cancelled</span>
        </div>
      )
    }
  ];

  if (navigation.state === 'loading') return <div className="flex justify-center p-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customers</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600"
        >
          <Plus size={16} />
          <span>Add Customer</span>
        </button>
      </div>

      <SimpleGrid
        data={customers}
        columns={columns}
        onEdit={(customer) => {
          setEditCustomer(customer);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditCustomer(undefined);
        }}
        title={editCustomer ? 'Edit Customer' : 'Create Customer'}
      >
        <CustomerForm
          customer={editCustomer}
          onSubmit={editCustomer ? handleUpdate : handleCreate}
          onCancel={() => {
            setModalOpen(false);
            setEditCustomer(undefined);
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