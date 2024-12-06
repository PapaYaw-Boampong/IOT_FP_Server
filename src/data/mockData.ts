import { SensorReading, SmartDevice } from '../types';

export const mockSensorReadings: SensorReading[] = [
  {
    readingId: 1,
    deviceName: "Living Room Sensor",
    sensorType: "Temperature",
    timestamp: "2024-03-15T10:30:00",
    value: 23.5,
    unit: "°C"
  },
  {
    readingId: 2,
    deviceName: "Kitchen Sensor",
    sensorType: "Humidity",
    timestamp: "2024-03-15T10:31:00",
    value: 45,
    unit: "%"
  },
  // Add more mock readings as needed
];

export const mockDevices: SmartDevice[] = [
  {
    deviceId: 1,
    deviceName: "Living Room Sensor",
    deviceLocation: "Living Room",
    addedDate: "2024-03-01T00:00:00"
  },
  {
    deviceId: 2,
    deviceName: "Kitchen Sensor",
    deviceLocation: "Kitchen",
    addedDate: "2024-03-02T00:00:00"
  }
];