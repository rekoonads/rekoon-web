import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DeviceAtlasData {
  mobileDevice: boolean;
  displayWidth: number | null;
  vendor: string;
  useBiggerIcons: boolean;
  browserName: string;
  osName: string;
  model: string;
}

const DeviceAtlasInfo: React.FC = () => {
  const [deviceData, setDeviceData] = useState<DeviceAtlasData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const response = await axios.get<DeviceAtlasData>(
          'http://localhost:3001/api/device-info',
        );
        setDeviceData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching device information:', err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        );
        setLoading(false);
      }
    };

    fetchDeviceInfo();
  }, []);

  if (loading) return <div>Loading DeviceAtlas info...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!deviceData) return <div>No DeviceAtlas data available</div>;

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">DeviceAtlas Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>
            <strong>Mobile Device:</strong>{' '}
            {deviceData.mobileDevice ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Display Width:</strong>{' '}
            {deviceData.displayWidth ?? 'Unknown'}px
          </p>
          <p>
            <strong>Vendor:</strong> {deviceData.vendor}
          </p>
          <p>
            <strong>Use Bigger Icons:</strong>{' '}
            {deviceData.useBiggerIcons ? 'Yes' : 'No'}
          </p>
        </div>
        <div>
          <p>
            <strong>Browser:</strong> {deviceData.browserName}
          </p>
          <p>
            <strong>OS:</strong> {deviceData.osName}
          </p>
          <p>
            <strong>Model:</strong> {deviceData.model}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeviceAtlasInfo;
