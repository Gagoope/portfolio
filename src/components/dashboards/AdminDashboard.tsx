import React from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Students', value: '1,247', icon: GraduationCap, color: 'blue', change: '+12' },
    { label: 'Total Teachers', value: '89', icon: Users, color: 'green', change: '+3' },
    { label: 'Active Classes', value: '34', icon: BookOpen, color: 'purple', change: '0' },
    { label: 'Attendance Rate', value: '94.2%', icon: CheckCircle, color: 'emerald', change: '+2.1%' }
  ];

  const recentActivities = [
    { action: 'New student enrolled', user: 'Sarah Johnson', time: '10 minutes ago', type: 'success' },
    { action: 'Grade updated', user: 'Math - Grade 10A', time: '23 minutes ago', type: 'info' },
    { action: 'Attendance marked', user: 'English - Grade 9B', time: '45 minutes ago', type: 'success' },
    { action: 'Parent meeting scheduled', user: 'John Smith', time: '1 hour ago', type: 'warning' }
  ];

  const upcomingTasks = [
    { task: 'Parent-Teacher Conference', date: 'Tomorrow', priority: 'high' },
    { task: 'Monthly Report Generation', date: 'In 3 days', priority: 'medium' },
    { task: 'Staff Meeting', date: 'Friday', priority: 'low' },
    { task: 'Grade Submission Deadline', date: 'Next week', priority: 'high' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening at your school today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                    <p className="text-xs text-gray-400 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Tasks</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{task.task}</p>
                      <p className="text-xs text-gray-500">{task.date}</p>
                    </div>
                  </div>
                  {task.priority === 'high' && (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <Users className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">Add New User</p>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
              <GraduationCap className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">Enroll Student</p>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
              <BookOpen className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">Create Class</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};