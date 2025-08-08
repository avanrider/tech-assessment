import React from 'react';

export interface StatusBadgeProps {
  status: 'pending' | 'completed' | 'cancelled';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${
      status === 'completed' ? 'bg-green-100 text-green-800' :
      status === 'cancelled' ? 'bg-red-100 text-red-800' :
      'bg-yellow-100 text-yellow-800'
    }`}>
      {status}
    </span>
  );
}