import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import logo from '../assets/logo.png';

type RouteInfo = {
  path: string;
  component: React.ComponentType;
  label: string;
  icon: React.ComponentType<any>;
};

interface SidebarProps {
  routes: RouteInfo[];
}

export function Sidebar({ routes }: SidebarProps) {
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