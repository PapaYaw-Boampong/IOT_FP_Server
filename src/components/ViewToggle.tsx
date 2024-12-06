import React from 'react';
import { LayoutGrid, Database } from 'lucide-react';

interface ViewToggleProps {
  view: 'devices' | 'readings';
  onViewChange: (view: 'devices' | 'readings') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm">
      <button
        onClick={() => onViewChange('devices')}
        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
          view === 'devices'
            ? 'bg-blue-500 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <LayoutGrid className="w-4 h-4 mr-2" />
        Devices
      </button>
      <button
        onClick={() => onViewChange('readings')}
        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
          view === 'readings'
            ? 'bg-blue-500 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Database className="w-4 h-4 mr-2" />
        Readings
      </button>
    </div>
  );
};