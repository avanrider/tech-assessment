import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLoaderData, useRevalidator, useNavigation } from 'react-router-dom';
import { SimpleGrid } from '../components/layout/SimpleGrid';
import { Modal } from '../components/ui/Modal';
import { OrderForm } from '../components/forms/OrderForm';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Toast } from '../components/ui/Toast';
import { MockAPI } from '../utils/mockApi';
import { IOrder, ICustomer, IPackage, OrderStatusType, ApiErrorType } from '../types';

const getErrorMessage = (error: ApiErrorType): string => {
  if (error.type === 'VALIDATION_ERROR') {
    return error.errors.map(e => e.message).join(', ');
  }
  return error.message;
};

// Loader function for React Router
export async function loader() {
  const [ordersResponse, customersResponse, packagesResponse] = await Promise.all([
    MockAPI.getOrders(),
    MockAPI.getCustomers(),
    MockAPI.getPackages()
  ]);

  if (!ordersResponse.success || !customersResponse.success || !packagesResponse.success) {
    throw new Error('Failed to load orders, customers, and packages');
  }

  const customerMap = new Map(
    customersResponse.data.map(customer => [customer.id, customer])
  );

  const packageMap = new Map(
    packagesResponse.data.map(pkg => [pkg.id, pkg])
  );

  // Enhance orders with customer and package details
  const ordersWithDetails = ordersResponse.data.map(order => ({
    ...order,
    customerDetails: customerMap.get(order.customerId),
    packageDetails: packageMap.get(order.packageId),
    amount: (packageMap.get(order.packageId)?.price ?? 0)
  }));

  return {
    orders: ordersWithDetails,
    customers: customersResponse.data,
    packages: packagesResponse.data
  };
}

interface OrderWithDetails extends IOrder {
  customerDetails?: ICustomer;
  packageDetails?: IPackage;
}

interface LoaderData {
  orders: OrderWithDetails[];
  customers: ICustomer[];
  packages: IPackage[];
}

export default function Orders() {
  const { orders, customers, packages } = useLoaderData() as LoaderData;
  const revalidator = useRevalidator();
  const [modalOpen, setModalOpen] = useState(false);
  const [editOrder, setEditOrder] = useState<OrderWithDetails | undefined>();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleCreate = async (formData: { customerId: string; packageId: string; status: OrderStatusType }) => {
    const selectedPackage = packages.find(p => p.id === formData.packageId);
    if (!selectedPackage) {
      setToast({ message: 'Selected package not found', type: 'error' });
      return;
    }

    const orderData = {
      ...formData,
      amount: selectedPackage.price // Amount is determined by the package price
    };

    const response = await MockAPI.createOrder(orderData);
    if (response.success) {
      revalidator.revalidate();
      setModalOpen(false);
      setToast({ message: 'Order created successfully', type: 'success' });
    } else {
      setToast({ message: getErrorMessage(response.error), type: 'error' });
    }
  };

  const handleUpdate = async (formData: { customerId: string; packageId: string; status: OrderStatusType }) => {
    if (!editOrder) return;

    const selectedPackage = packages.find(p => p.id === formData.packageId);
    if (!selectedPackage) {
      setToast({ message: 'Selected package not found', type: 'error' });
      return;
    }

    const orderData = {
      ...formData,
      amount: selectedPackage.price // Amount is determined by the package price
    };
    
    const response = await MockAPI.updateOrder(editOrder.id, orderData);
    if (response.success) {
      revalidator.revalidate();
      setModalOpen(false);
      setEditOrder(undefined);
      setToast({ message: 'Order updated successfully', type: 'success' });
    } else {
      setToast({ message: getErrorMessage(response.error), type: 'error' });
    }
  };

  const handleDelete = async (order: IOrder) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    
    const response = await MockAPI.deleteOrder(order.id);
    if (response.success) {
      revalidator.revalidate();
      setToast({ message: 'Order deleted successfully', type: 'success' });
    } else {
      setToast({ message: getErrorMessage(response.error), type: 'error' });
    }
  };

  const navigation = useNavigation();
  const columns = [
    {
      field: 'customerDetails' as keyof OrderWithDetails,
      headerName: 'Customer',
      sortable: true,
      cellRenderer: ({ value }: { value: ICustomer | undefined }) => 
        value ? value.name : 'Unknown Customer'
    },
    {
      field: 'packageDetails' as keyof OrderWithDetails,
      headerName: 'Package',
      sortable: true,
      cellRenderer: ({ value }: { value: IPackage | undefined }) => 
        value ? `${value.name} ($${value.price})` : 'Unknown Package'
    },
    { 
      field: 'status' as keyof OrderWithDetails, 
      headerName: 'Status',
      sortable: true,
      cellRenderer: ({ value }: { value: OrderWithDetails['status'] }) => <StatusBadge status={value} />
    }
  ];

  if (navigation.state === 'loading') return <div className="flex justify-center p-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600"
        >
          <Plus size={16} />
          <span>Add Order</span>
        </button>
      </div>

      <SimpleGrid
        data={orders}
        columns={columns}
        onEdit={(order) => {
          setEditOrder(order);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditOrder(undefined);
        }}
        title={editOrder ? 'Edit Order' : 'Create Order'}
      >
        <OrderForm
          order={editOrder}
          customers={customers}
          packages={packages}
          onSubmit={editOrder ? handleUpdate : handleCreate}
          onCancel={() => {
            setModalOpen(false);
            setEditOrder(undefined);
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