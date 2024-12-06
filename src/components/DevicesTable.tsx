import React from 'react';
import { SmartDevice } from '../types';

interface DevicesTableProps {
  devices: SmartDevice[];
}

export const DevicesTable: React.FC<DevicesTableProps> = ({ devices }) => {
  return (
    <div className="overflow-y-auto max-h-[250px] shadow-md rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {devices.map((device) => (
            <tr key={device.DeviceID} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{device.DeviceID}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{device.DeviceName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{device.DeviceLocation}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(device.AddedDate).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
