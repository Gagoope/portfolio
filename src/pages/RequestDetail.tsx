import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  User, 
  Paperclip, 
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useRequests } from '../contexts/RequestContext';
import { useAuth } from '../contexts/AuthContext';
import { StatusBadge } from '../components/Common/StatusBadge';

export function RequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { requests, updateRequestStatus } = useRequests();
  const { user } = useAuth();
  
  const [comment, setComment] = useState('');
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

  const request = requests.find(r => r.id === id);

  if (!request) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Request not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Go back
        </button>
      </div>
    );
  }

  const canApprove = () => {
    if (user?.role === 'accounts' && request.status === 'pending') return true;
    if (user?.role === 'hod' && request.status === 'accounts-review') return true;
    return false;
  };

  const handleAction = (action: 'approve' | 'reject') => {
    if (!user) return;

    if (action === 'approve') {
      if (user.role === 'accounts') {
        updateRequestStatus(request.id, 'accounts-review', {
          approvedBy: user,
          approvedAt: new Date().toISOString(),
          comments: comment,
        });
      } else if (user.role === 'hod') {
        updateRequestStatus(request.id, 'approved', {
          approvedBy: user,
          approvedAt: new Date().toISOString(),
          comments: comment,
        });
      }
    } else {
      updateRequestStatus(request.id, 'rejected');
    }

    setActionType(null);
    setComment('');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'petty-cash': return 'bg-blue-50 text-blue-700';
      case 'travel-imprest': return 'bg-green-50 text-green-700';
      case 'maintenance': return 'bg-orange-50 text-orange-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'petty-cash': return 'Petty Cash';
      case 'travel-imprest': return 'Travel Imprest';
      case 'maintenance': return 'Maintenance';
      default: return type;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{request.title}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(request.type)}`}>
              {getTypeLabel(request.type)}
            </span>
            <StatusBadge status={request.status} />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
              {request.urgency.toUpperCase()} PRIORITY
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <p className="mt-1 text-gray-900">{request.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Amount</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-lg font-semibold text-gray-900">
                      {request.currency} {request.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Requested Date</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">
                      {new Date(request.requestedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attachments */}
          {request.attachments.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h2>
              <div className="space-y-3">
                {request.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Paperclip className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">{attachment}</span>
                    <button className="ml-auto text-blue-600 hover:text-blue-700 text-sm">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approval Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Approval Timeline</h2>
            <div className="space-y-4">
              {/* Request Submitted */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Request Submitted</div>
                  <div className="text-sm text-gray-600">
                    by {request.requestedBy.name} on {new Date(request.requestedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Accounts Approval */}
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  request.accountsApproval ? 'bg-green-100' : 
                  ['accounts-review', 'hod-review', 'approved'].includes(request.status) ? 'bg-green-100' :
                  'bg-gray-100'
                }`}>
                  {request.accountsApproval || ['accounts-review', 'hod-review', 'approved'].includes(request.status) ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Clock className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Accounts Review</div>
                  {request.accountsApproval ? (
                    <div className="text-sm text-gray-600">
                      Approved by {request.accountsApproval.approvedBy.name} on{' '}
                      {new Date(request.accountsApproval.approvedAt).toLocaleDateString()}
                      {request.accountsApproval.comments && (
                        <div className="mt-1 text-gray-700 italic">
                          "{request.accountsApproval.comments}"
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">Pending review</div>
                  )}
                </div>
              </div>

              {/* HOD Approval */}
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  request.hodApproval ? 'bg-green-100' : 
                  request.status === 'approved' ? 'bg-green-100' :
                  request.status === 'hod-review' ? 'bg-yellow-100' :
                  'bg-gray-100'
                }`}>
                  {request.hodApproval || request.status === 'approved' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : request.status === 'hod-review' ? (
                    <Clock className="h-4 w-4 text-yellow-600" />
                  ) : (
                    <Clock className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">HOD Authorization</div>
                  {request.hodApproval ? (
                    <div className="text-sm text-gray-600">
                      Authorized by {request.hodApproval.approvedBy.name} on{' '}
                      {new Date(request.hodApproval.approvedAt).toLocaleDateString()}
                      {request.hodApproval.comments && (
                        <div className="mt-1 text-gray-700 italic">
                          "{request.hodApproval.comments}"
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      {request.status === 'hod-review' ? 'Under review' : 'Awaiting authorization'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Requester Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Requester</h3>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{request.requestedBy.name}</div>
                <div className="text-sm text-gray-600">{request.requestedBy.department}</div>
                <div className="text-sm text-gray-500">{request.requestedBy.email}</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          {canApprove() && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setActionType('approve')}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => setActionType('reject')}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <XCircle className="h-4 w-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Modal */}
      {actionType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {actionType === 'approve' ? 'Approve Request' : 'Reject Request'}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments {actionType === 'reject' ? '(Required)' : '(Optional)'}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={actionType === 'approve' ? 'Add any notes...' : 'Please provide a reason for rejection...'}
                required={actionType === 'reject'}
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setActionType(null);
                  setComment('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(actionType)}
                disabled={actionType === 'reject' && !comment.trim()}
                className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {actionType === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}