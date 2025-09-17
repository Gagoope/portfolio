import React from 'react';
import { Calendar, DollarSign, User, Paperclip, AlertTriangle } from 'lucide-react';
import { Request } from '../../types';
import { StatusBadge } from './StatusBadge';

interface RequestCardProps {
  request: Request;
  onClick?: () => void;
  showActions?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
}

export function RequestCard({ request, onClick, showActions, onApprove, onReject }: RequestCardProps) {
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
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(request.type)}`}>
              {getTypeLabel(request.type)}
            </span>
            <StatusBadge status={request.status} size="sm" />
            {request.urgency === 'high' && (
              <div className="flex items-center space-x-1">
                <AlertTriangle className={`h-4 w-4 ${getUrgencyColor(request.urgency)}`} />
                <span className={`text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                  Urgent
                </span>
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{request.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{request.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <DollarSign className="h-4 w-4" />
          <span>{request.currency} {request.amount.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <User className="h-4 w-4" />
          <span>{request.requestedBy.name}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{new Date(request.requestedAt).toLocaleDateString()}</span>
        </div>
        {request.attachments.length > 0 && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Paperclip className="h-4 w-4" />
            <span>{request.attachments.length} attachment{request.attachments.length > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {showActions && (
        <div className="flex space-x-3 pt-4 border-t border-gray-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApprove?.();
            }}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            Approve
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReject?.();
            }}
            className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}