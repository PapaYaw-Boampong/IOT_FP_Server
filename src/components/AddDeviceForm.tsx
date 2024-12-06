import React, { useState } from 'react';
import { SmartDevice } from '../types';

interface AddDeviceFormProps {
  onSubmit: (device: Omit<SmartDevice, 'DeviceID' | 'addedDate'>) => void;
}

export const AddDeviceForm: React.FC<AddDeviceFormProps> = ({ onSubmit }) => {
  const [DeviceName, setDeviceName] = useState('');
  const [DeviceLocation, setDeviceLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Call onSubmit to handle the device addition
    onSubmit({
      DeviceName,
      DeviceLocation,
    });

    // Reset form fields after submission
    setDeviceName('');
    setDeviceLocation('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Device</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Device Name</label>
          <input
            type="text"
            value={DeviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={DeviceLocation}
            onChange={(e) => setDeviceLocation(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Device
        </button>
      </div>
    </form>
  );
};
