export interface SensorReading {
  ReadingID: number;
  DeviceName: string;
  SensorType: string;
  Timestamp: string;
  Value: number;
  Unit: string;
}

export interface SmartDevice {
  DeviceID: number;
  DeviceName: string;
  DeviceLocation: string;
}

export interface FilterOptions {
  DeviceName: string;
  SensorType: string;
  startDate: string;
  endDate: string;
  limit: number;
}