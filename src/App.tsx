import { useState, useEffect } from 'react';
import { DataTable } from './components/DataTable';
import { DevicesTable } from './components/DevicesTable';
import { FilterPanel } from './components/FilterPanel';
import { AddDeviceForm } from './components/AddDeviceForm';
import { ViewToggle } from './components/ViewToggle';
import { FilterOptions, SmartDevice } from './types';
import toast from 'react-hot-toast';
import { GaugeCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function App() {
  const [currentView, setCurrentView] = useState<'devices' | 'readings'>('readings');
  const [devices, setDevices] = useState<SmartDevice[]>([]);
  const [readings, setReadings] = useState([]);
  const [filters, setFilters] = useState<FilterOptions>({
    DeviceName: '',
    SensorType: '',
    startDate: '',
    endDate: '',
    limit: 5,
  });

  // Reset filters when view changes
  useEffect(() => {
    setFilters({
      DeviceName: '',
      SensorType: '',
      startDate: '',
      endDate: '',
      limit: 5,
    });
  }, [currentView]);

  // Fetch devices
  const fetchDevices = async () => {
    const query = new URLSearchParams(
      Object.entries(filters)
        .filter(([key, value]) => (key === 'DeviceName' || key === 'limit') && value !== '')
        .reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
    ).toString();

    try {
      const response = await fetch(`https://iotfinal.free.nf/IOTFinal/get_smartdevices.php?${query}`);
      const data = await response.json();
      setDevices(data);
    } catch (err) {
      console.error('Error fetching devices:', err);
    }
  };

  // Fetch sensor readings
  const fetchReadings = async () => {
    const query = new URLSearchParams(
      Object.entries(filters)
        .filter(([_, value]) => value !== '') // Apply all filters
        .reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
    ).toString();

    try {
      const response = await fetch(`https://iotfinal.free.nf/IOTFinal/get_sensordata.php?${query}`);
      const data = await response.json();
      setReadings(data);
    } catch (err) {
      console.error('Error fetching readings:', err);
    }
  };

  // Fetch data when filters change
  useEffect(() => {
    if (currentView === 'devices') {
      fetchDevices();
    } else {
      fetchReadings();
    }
  }, [filters]); // Trigger when filters change

  // Handle filter changes from FilterPanel
  const handleFilterChange = (updatedFilters: FilterOptions) => {
    setFilters(updatedFilters); // Update filters in the parent state
  };

  // Handle adding new devices
  const handleAddDevice = async (device: Omit<SmartDevice, 'DeviceID'>) => {
    const newDevice = { ...device };
  
    try {
      const response = await fetch('https://iotfinal.free.nf/IOTFinal/get_smartdevices.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDevice),
      });
  
      // Handle HTTP status codes
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to add device');
        return;
      }
  
      // Success: Parse the response and notify the user
      const result = await response.json();
      toast.success(result.message || 'Device added successfully!');
      fetchDevices(); // Refresh the devices table
    } catch (err: any) {
      // Handle network or unexpected errors
      console.error('Error adding device:', err);
      toast.error(`An unexpected error occurred: ${err.message || err}`);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <GaugeCircle className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">IoT Dashboard</span>
            </div>
            <ViewToggle 
              view={currentView} 
              onViewChange={(view) => setCurrentView(view)} // Change view and reset filters
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <FilterPanel 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                view={currentView} // Pass current view to FilterPanel
              />
            </div>
            <div>
              <AddDeviceForm 
                onSubmit={handleAddDevice}
                
              />
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-700">
                {currentView === 'readings' ? 'Sensor Readings' : 'Smart Devices'}
              </h2>
            </div>
            {currentView === 'readings' ? (
              <DataTable data={readings} />
            ) : (
              <DevicesTable devices={devices} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
