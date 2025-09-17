import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Home, 
  Users, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  FileText, 
  Settings,
  LogOut,
  School,
  ClipboardList,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home }
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...baseItems,
          { id: 'users', label: 'Users', icon: Users },
          { id: 'students', label: 'Students', icon: GraduationCap },
          { id: 'classes', label: 'Classes', icon: School },
          { id: 'subjects', label: 'Subjects', icon: BookOpen },
          { id: 'timetable', label: 'Timetable', icon: Calendar },
          { id: 'reports', label: 'Reports', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      case 'teacher':
        return [
          ...baseItems,
          { id: 'students', label: 'My Students', icon: GraduationCap },
          { id: 'attendance', label: 'Attendance', icon: ClipboardList },
          { id: 'grades', label: 'Grades', icon: FileText },
          { id: 'timetable', label: 'My Timetable', icon: Calendar }
        ];
      case 'student':
        return [
          ...baseItems,
          { id: 'grades', label: 'My Grades', icon: FileText },
          { id: 'attendance', label: 'My Attendance', icon: ClipboardList },
          { id: 'timetable', label: 'Timetable', icon: Calendar }
        ];
      case 'parent':
        return [
          ...baseItems,
          { id: 'children', label: 'My Children', icon: GraduationCap },
          { id: 'grades', label: 'Grades', icon: FileText },
          { id: 'attendance', label: 'Attendance', icon: ClipboardList }
        ];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="bg-white shadow-lg h-screen w-64 fixed left-0 top-0 z-10">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 rounded-lg p-2">
            <School className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">EduManage</h1>
            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors hover:bg-gray-50 ${
                activeTab === item.id 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gray-200 rounded-full p-2">
            <Users className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};