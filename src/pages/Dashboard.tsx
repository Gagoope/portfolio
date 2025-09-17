import React from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  DollarSign,
  Users,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRequests } from '../contexts/RequestContext';
import { RequestCard } from '../components/Common/RequestCard';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { user } = useAuth();
  const { requests, getRequestsByUser, getRequestsByStatus } = useRequests();
  const navigate = useNavigate();

  const userRequests = getRequestsByUser(user?.id || '');
  const pendingRequests = getRequestsByStatus('pending');
  const accountsReviewRequests = getRequestsByStatus('accounts-review');
  const hodReviewRequests = getRequestsByStatus('hod-review');
  const approvedRequests = getRequestsByStatus('approved');

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'staff':
        return [
          {
            name: 'My Requests',
            value: userRequests.length,
            icon: FileText,
            color: 'bg-blue-500',
          },
          {
            name: 'Pending',
            value: userRequests.filter(r => r.status === 'pending').length,
            icon: Clock,
            color: 'bg-yellow-500',
          },
          {
            name: 'Approved',
            value: userRequests.filter(r => r.status === 'approved').length,
            icon: CheckCircle,
            color: 'bg-green-500',
          },
          {
            name: 'Total Amount',
            value: `$${userRequests.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}`,
            icon: DollarSign,
            color: 'bg-purple-500',
          },
        ];
      case 'accounts':
        return [
          {
            name: 'Pending Review',
            value: accountsReviewRequests.length + pendingRequests.length,
            icon: Clock,
            color: 'bg-yellow-500',
          },
          {
            name: 'Total Requests',
            value: requests.length,
            icon: FileText,
            color: 'bg-blue-500',
          },
          {
            name: 'Approved',
            value: approvedRequests.length + hodReviewRequests.length,
            icon: CheckCircle,
            color: 'bg-green-500',
          },
          {
            name: 'Total Value',
            value: `$${requests.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}`,
            icon: DollarSign,
            color: 'bg-purple-500',
          },
        ];
      case 'hod':
        return [
          {
            name: 'For Authorization',
            value: hodReviewRequests.length,
            icon: AlertTriangle,
            color: 'bg-orange-500',
          },
          {
            name: 'Total Requests',
            value: requests.length,
            icon: FileText,
            color: 'bg-blue-500',
          },
          {
            name: 'Approved',
            value: approvedRequests.length,
            icon: CheckCircle,
            color: 'bg-green-500',
          },
          {
            name: 'Total Value',
            value: `$${requests.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}`,
            icon: DollarSign,
            color: 'bg-purple-500',
          },
        ];
      case 'management':
        return [
          {
            name: 'Total Requests',
            value: requests.length,
            icon: FileText,
            color: 'bg-blue-500',
          },
          {
            name: 'Active Users',
            value: new Set(requests.map(r => r.requestedBy.id)).size,
            icon: Users,
            color: 'bg-green-500',
          },
          {
            name: 'Approved',
            value: approvedRequests.length,
            icon: CheckCircle,
            color: 'bg-purple-500',
          },
          {
            name: 'Total Value',
            value: `$${requests.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}`,
            icon: DollarSign,
            color: 'bg-orange-500',
          },
        ];
      default:
        return [];
    }
  };

  const getRecentRequests = () => {
    switch (user?.role) {
      case 'staff':
        return userRequests.slice(0, 3);
      case 'accounts':
        return [...pendingRequests, ...accountsReviewRequests].slice(0, 3);
      case 'hod':
        return hodReviewRequests.slice(0, 3);
      case 'management':
        return requests.slice(0, 3);
      default:
        return [];
    }
  };

  const stats = getStatsForRole();
  const recentRequests = getRecentRequests();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your requests today.
          </p>
        </div>
        {user?.role === 'staff' && (
          <button
            onClick={() => navigate('/create-request')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Request</span>
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {user?.role === 'staff' ? 'My Recent Requests' : 'Recent Requests'}
            </h2>
            <button
              onClick={() => {
                switch (user?.role) {
                  case 'staff':
                    navigate('/requests');
                    break;
                  case 'accounts':
                    navigate('/review');
                    break;
                  case 'hod':
                    navigate('/authorize');
                    break;
                  case 'management':
                    navigate('/all-requests');
                    break;
                }
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View all
            </button>
          </div>
        </div>
        <div className="p-6">
          {recentRequests.length > 0 ? (
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onClick={() => navigate(`/request/${request.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No recent requests to display</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions for different roles */}
      {user?.role === 'staff' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/create-request')}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
            >
              <div className="text-center">
                <Plus className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                  Create New Request
                </span>
              </div>
            </button>
            <button
              onClick={() => navigate('/requests')}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
            >
              <div className="text-center">
                <FileText className="h-8 w-8 text-gray-400 group-hover:text-green-500 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">
                  View My Requests
                </span>
              </div>
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group"
            >
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-gray-400 group-hover:text-purple-500 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                  View Analytics
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}