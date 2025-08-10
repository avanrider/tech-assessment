import React from 'react';

export interface StatusBadgeProps {
  status: 'pending' | 'completed' | 'cancelled';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${
      status === 'completed' ? 'bg-secondary-50 text-secondary-700' :
      status === 'cancelled' ? 'bg-red-100 text-red-800' :
      'bg-accent-50 text-accent-700'
    }`}>
      {status}
    </span>
  );
}