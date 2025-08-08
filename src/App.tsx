  import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { ChevronRight, Home, Users, Package, Package2 } from 'lucide-react';
import { Dashboard } from './pages/Dashboard';
import logo from './assets/logo.png';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Packages from './pages/Packages';

type RouteInfo = {
  path: string;
  component: React.ComponentType;
  label: string;
  icon: React.ComponentType<any>;
};

const routes: RouteInfo[] = [
  { path: '/', component: Dashboard, label: 'Dashboard', icon: Home },
  { path: '/orders', component: Orders, label: 'Orders', icon: Package },
  { path: '/customers', component: Customers, label: 'Customers', icon: Users },
  { path: '/packages', component: Packages, label: 'Packages', icon:  Package2}
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="w-1/2" />
        </div>
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <nav className="mt-4">
        {routes.map(route => {
          const Icon = route.icon;
          return (
            <Link
              key={route.path}
              to={route.path}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 ${
                location.pathname === route.path ? 'bg-primary-50 text-primary-500 border-r-2 border-primary-500' : 'text-gray-600'
              }`}
            >
              <Icon size={20} />
              <span>{route.label}</span>
              {location.pathname === route.path && <ChevronRight size={16} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

// Main App Component
export default function App() {
  return (
    <>
      <a href="#nav" className="skip-link">
        Skip to navigation
      </a>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <div className="flex h-screen bg-content-bg">
        <aside>
          <nav id="nav" aria-label="Main Navigation">
            <Sidebar />
          </nav>
        </aside>
        
        <main id="main" className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}