import React, { useState } from 'react';
import { MapPin, Globe, Clock, Smartphone } from 'lucide-react';

interface TrackingData {
  ip: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  deviceInfo: {
    browser: string;
    version: string;
    os: string;
    platform: string;
    isMobile: boolean;
    isDesktop: boolean;
    isBot: boolean;
  };
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
        ? `http://localhost:8080/api/track-ip?ip=${ip}`
        : 'http://localhost:8080/api/track-ip';
      const response = await fetch(url);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setTrackingData(null);
      } else {
        setTrackingData(data);
      }
    } catch (err) {
      setError('Failed to fetch tracking data');
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
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {trackingData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Globe className="mr-2" /> Geolocation Information
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
              <Smartphone className="mr-2" /> Device Information
            </h3>
            <p>
              <strong>Browser:</strong> {trackingData.deviceInfo.browser}{' '}
              {trackingData.deviceInfo.version}
            </p>
            <p>
              <strong>OS:</strong> {trackingData.deviceInfo.os}
            </p>
            <p>
              <strong>Platform:</strong> {trackingData.deviceInfo.platform}
            </p>
            <p>
              <strong>Type:</strong>{' '}
              {trackingData.deviceInfo.isMobile
                ? 'Mobile'
                : trackingData.deviceInfo.isDesktop
                ? 'Desktop'
                : 'Other'}
            </p>
            <p>
              <strong>Is Bot:</strong>{' '}
              {trackingData.deviceInfo.isBot ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPTracker;
