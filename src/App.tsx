  import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { ChevronRight, Home, Users, Package, Package2 } from 'lucide-react';
import { Dashboard } from './pages/Dashboard';
import logo from './assets/logo.png';

// Import AG Grid styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Import AG Grid styles globally
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Packages from './pages/Packages';
import { Sidebar } from './components/layout/Sidebar';

// Import AG Grid styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

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
            <Sidebar routes={routes} />
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