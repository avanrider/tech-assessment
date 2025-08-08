import React, { useState, useEffect } from 'react';
import { MockAPI } from '../utils/mockApi';

export function Dashboard() {
  const [stats, setStats] = useState({ orders: 0, customers: 0, packages: 0 });

  useEffect(() => {
    const loadStats = async () => {
      const [ordersRes, customersRes, packagesRes] = await Promise.all([
        MockAPI.getOrders(),
        MockAPI.getCustomers(),
        MockAPI.getPackages()
      ]);

      setStats({
        orders: ordersRes.success ? ordersRes.data.length : 0,
        customers: customersRes.success ? customersRes.data.length : 0,
        packages: packagesRes.success ? packagesRes.data.length : 0
      });
    };
    
    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Orders</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.orders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Customers</h3>
          <p className="text-3xl font-bold text-green-600">{stats.customers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Packages</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.packages}</p>
        </div>
      </div>
    </div>
  );
}