import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Plus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Sidebar() {
  const { user } = useAuth();

  const baseNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Requests', href: '/requests', icon: FileText },
  ];

  const roleSpecificItems = {
    staff: [
      { name: 'Create Request', href: '/create-request', icon: Plus },
    ],
    accounts: [
      { name: 'Pending Review', href: '/review', icon: Clock },
      { name: 'All Requests', href: '/all-requests', icon: FileText },
    ],
    hod: [
      { name: 'For Authorization', href: '/authorize', icon: CheckCircle },
      { name: 'All Requests', href: '/all-requests', icon: FileText },
    ],
    management: [
      { name: 'Analytics', href: '/analytics', icon: TrendingUp },
      { name: 'User Management', href: '/users', icon: Users },
      { name: 'All Requests', href: '/all-requests', icon: FileText },
    ],
  };

  const navItems = [
    ...baseNavItems,
    ...(roleSpecificItems[user?.role as keyof typeof roleSpecificItems] || []),
  ];

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">RMS</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}