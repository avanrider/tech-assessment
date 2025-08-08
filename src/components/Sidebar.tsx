import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import mobileLogo from '../assets/mobile-logo.png';

interface RouteInfo {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface SidebarProps {
  routes: RouteInfo[];
}

export function Sidebar({ routes }: SidebarProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile Header - Always visible on mobile, hidden on desktop */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-30 flex items-center px-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 hover:text-primary-500"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex-1 flex justify-center">
          <img src={mobileLogo} alt="Logo" className="h-8" />
        </div>
        <div className="w-10" /> {/* Spacer to balance the layout */}
      </div>

      {/* Sidebar */}
      <div 
        className={`
          fixed md:static inset-0 z-40 transform
          lg:transform-none md:opacity-100
          ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 md:translate-x-0'}
          transition-all duration-300
        `}
      >
        {/* Overlay - Only on mobile */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Sidebar Content */}
        <nav className="w-64 h-full bg-white shadow-md relative mt-16 md:mt-0">
          <div className="p-4 border-b hidden md:block">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Logo" className="w-1/2" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <div className="py-4">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`
                    flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100
                    ${location.pathname === route.path ? 'bg-gray-100 border-l-4 border-primary-500' : ''}
                  `}
                >
                  <Icon size={20} />
                  <span className="ml-3">{route.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}