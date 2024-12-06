import React from 'react';
import { SensorReading } from '../types';

interface DataTableProps {
  data: SensorReading[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="overflow-y-auto max-h-[250px] shadow-md rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((reading, index) => (
            <tr key={reading.ReadingID || `reading-${index}`} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reading.ReadingID}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reading.DeviceName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reading.SensorType}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(reading.Timestamp).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {reading.Value} {reading.Unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
