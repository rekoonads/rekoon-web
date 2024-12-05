import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BACKEND_URL = 'http://localhost:3001'; // Update this to match your backend URL

const DV360Integration: React.FC = () => {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [advertiserId, setAdvertiserId] = useState('');
  const [agencyId, setAgencyId] = useState('');
  const [creativeId, setCreativeId] = useState('');
  const [partnerId, setPartnerId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('DV360Integration component mounted');
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');

    if (userId) {
      console.log('UserId found in URL:', userId);
      fetchUserData(userId);
    } else {
      console.log('No userId found in URL');
    }
  }, [location]);

  const fetchUserData = async (userId: string) => {
    try {
      console.log('Fetching user data for userId:', userId);
      const response = await axios.get(
        `${BACKEND_URL}/api/user-data/${userId}`,
      );
      console.log('User data received:', response.data);
      setAdvertiserId(response.data.advertiserId || '');
      setAgencyId(response.data.agencyId || '');
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data');
    }
  };

  const handleAuthenticate = () => {
    if (user) {
      console.log('Initiating authentication for user:', user.id);
      // Clear any existing tokens
      localStorage.removeItem('dv360_tokens');
      window.location.href = `${BACKEND_URL}/api/auth/google?userId=${user.id}`;
    } else {
      console.log('User not logged in');
      setError('User not logged in');
    }
  };

  const handlePublishAd = async () => {
    if (!user) {
      console.log('Attempt to publish ad without user login');
      setError('User not logged in');
      return;
    }

    if (!partnerId) {
      setError('Partner ID is required');
      return;
    }

    try {
      console.log('Publishing ad for user:', user.id);
      const response = await axios.post(`${BACKEND_URL}/api/publish-ad`, {
        userId: user.id,
        advertiserId,
        agencyId,
        creativeId,
        partnerId,
      });
      console.log('Ad published successfully:', response.data);
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      console.error('Error publishing ad:', error);
      setError(error.response?.data?.error || 'Error publishing ad');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Publish YouTube Ad</h1>
      <div className="space-y-4">
        <button
          onClick={handleAuthenticate}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Authenticate with Google
        </button>
        <input
          type="text"
          placeholder="Advertiser ID"
          value={advertiserId}
          onChange={(e) => setAdvertiserId(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Agency ID"
          value={agencyId}
          onChange={(e) => setAgencyId(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Creative ID"
          value={creativeId}
          onChange={(e) => setCreativeId(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Partner ID"
          value={partnerId}
          onChange={(e) => setPartnerId(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handlePublishAd}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Publish Ad
        </button>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default DV360Integration;
