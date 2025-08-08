import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        <Link 
          to="/orders" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <h3 className="text-lg font-medium group-hover:text-primary-600 transition-colors">Orders</h3>
          <p className="text-3xl font-bold text-primary-500">{stats.orders}</p>
        </Link>
        <Link 
          to="/customers" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <h3 className="text-lg font-medium group-hover:text-secondary-600 transition-colors">Customers</h3>
          <p className="text-3xl font-bold text-secondary-600">{stats.customers}</p>
        </Link>
        <Link 
          to="/packages" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <h3 className="text-lg font-medium group-hover:text-accent-600 transition-colors">Packages</h3>
          <p className="text-3xl font-bold text-accent-600">{stats.packages}</p>
        </Link>
      </div>
    </div>
  );
}