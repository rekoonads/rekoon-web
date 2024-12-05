import React, { useState } from 'react';
import { MapPin, Globe, Clock, Wifi, Smartphone, Laptop } from 'lucide-react';

interface TrackingData {
  ip: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
  deviceType: string;
}

const IPTracker: React.FC = () => {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customIp, setCustomIp] = useState('');

  const fetchTrackingData = async (ip?: string) => {
    setLoading(true);
    setError('');
    try {
      const url = ip
        ? `http://localhost:3001/api/track-ip?ip=${ip}`
        : 'http://localhost:3001/api/track-ip';
      console.log(`Fetching from URL: ${url}`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setTrackingData(null);
      } else {
        setTrackingData(data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch tracking data. Please try again later.');
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        IP Address Tracker
      </h1>
      <div className="mb-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Enter IP (optional)"
            value={customIp}
            onChange={(e) => setCustomIp(e.target.value)}
            className="flex-grow px-4 py-2 text-gray-700 bg-gray-200 rounded-l-lg focus:outline-none focus:bg-white"
            aria-label="Enter IP address"
          />
          <button
            onClick={() => fetchTrackingData(customIp)}
            disabled={loading}
            className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            Track IP
          </button>
        </div>
      </div>
      <button
        onClick={() => fetchTrackingData()}
        disabled={loading}
        className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:shadow-outline disabled:opacity-50 mb-4"
      >
        {loading ? 'Loading...' : 'Track Random IP'}
      </button>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {trackingData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Globe className="mr-2" /> IP Information
            </h3>
            <p>
              <strong>IP:</strong> {trackingData.ip}
            </p>
            <p>
              <strong>Country:</strong> {trackingData.country}
            </p>
            <p>
              <strong>Region:</strong> {trackingData.region}
            </p>
            <p>
              <strong>City:</strong> {trackingData.city}
            </p>
            <p>
              <strong>Coordinates:</strong> {trackingData.latitude},{' '}
              {trackingData.longitude}
            </p>
            <p className="flex items-center">
              <Clock className="mr-2" />
              <strong>Timezone:</strong> {trackingData.timezone}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Wifi className="mr-2" /> Network Information
            </h3>
            <p>
              <strong>ISP:</strong> {trackingData.isp}
            </p>
            <p className="flex items-center mt-2">
              {trackingData.deviceType === 'Mobile' ? (
                <Smartphone className="mr-2" />
              ) : (
                <Laptop className="mr-2" />
              )}
              <strong>Device Type:</strong> {trackingData.deviceType}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPTracker;
