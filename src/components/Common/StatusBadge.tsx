import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'pending' | 'accounts-review' | 'hod-review' | 'approved' | 'rejected';
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: Clock,
          label: 'Pending'
        };
      case 'accounts-review':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: AlertCircle,
          label: 'Accounts Review'
        };
      case 'hod-review':
        return {
          color: 'bg-purple-100 text-purple-800',
          icon: AlertCircle,
          label: 'HOD Review'
        };
      case 'approved':
        return {
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          label: 'Approved'
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800',
          icon: XCircle,
          label: 'Rejected'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: Clock,
          label: 'Unknown'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';

  return (
    <span className={`inline-flex items-center space-x-1 rounded-full font-medium ${config.color} ${sizeClasses}`}>
      <Icon className={iconSize} />
      <span>{config.label}</span>
    </span>
  );
}