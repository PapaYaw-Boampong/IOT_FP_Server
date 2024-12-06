import React, { useState, useRef } from 'react';
import { FilterOptions } from '../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  view: 'devices' | 'readings';
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, view }) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>({
    ...filters,
    limit: filters.limit || 5, // Set default value for "Number of Records"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters); // Apply filters only when button is clicked
    buttonRef.current?.blur(); // Remove focus from button after click
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h3 className="text-lg font-semibold text-gray-700">Filter {view === 'devices' ? 'Devices' : 'Readings'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Device Name</label>
          <input
            type="text"
            name="DeviceName"
            value={localFilters.DeviceName || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        {view === 'readings' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sensor Type</label>
              <input
                type="text"
                name="SensorType"
                value={localFilters.SensorType || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={localFilters.startDate || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                value={localFilters.endDate || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Records</label>
          <input
            type="number"
            name="limit"
            value={localFilters.limit || 5}
            onChange={handleChange}
            min={1}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        ref={buttonRef}
        onClick={handleApplyFilters}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Apply Filters
      </button>
    </div>
  );
};
