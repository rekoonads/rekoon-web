import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building } from 'lucide-react';
import { Button } from '../components/ui/button';
import { MdCampaign } from 'react-icons/md';
import { CreateOrganization } from '@clerk/clerk-react';

export default function LoginOptions() {
  const [selectedBusinessType, setSelectedBusinessType] = useState('Agency');
  const [businessName, setBusinessName] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isCreated, setIsCreated] = useState(false);

  const handleCreateAccount = () => {
    if (selectedBusinessType === 'Agency') {
      return setModalIsOpen(true);
    } else if (selectedBusinessType === 'Advertiser') {
      if (businessName.trim() === '') {
        setError('Please enter an advertiser name.');
        return;
      }
      // Add your advertiser creation logic here
      // After successfully creating the advertiser, redirect to /manage-advertise
      navigate('/manage-advertise');
      
    }
  };
  // useEffect(() => {
  //   isCreated === true ? navigate('/auth/sign-up') : navigate('/login-options');
  // }, [isCreated]);

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/')
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h2 className="text-center text-xl font-semibold mb-6">
          Which best describes your business?
        </h2>
        <button
          onClick={closeModal}
          className="absolute top-5 left-10 p-2  text-blue-900 font-semibold rounded-lg hover:bg-slate-50 transition hover:text-purple-500 flex items-center gap-2"
        >
          {' '}
          <ArrowLeft />
          Go back...
        </button>
        <div className="flex justify-center space-x-4 mb-6">
          <div className="flex items-center p-4 border rounded-lg w-1/2">
            <input
              type="radio"
              id="agency"
              name="businessType"
              className="mr-2"
              checked={selectedBusinessType === 'Agency'}
              onChange={() => setSelectedBusinessType('Agency')}
              value={selectedBusinessType}
            />
            <label htmlFor="agency" className="flex items-center space-x-2">
              <Building className="w-6 h-6" />
              <div>
                <p className="font-semibold">Agency</p>
                <p className="text-sm text-gray-600">
                  We’re an agency buying ads on behalf of an advertiser
                </p>
              </div>
            </label>
          </div>
          <div className="flex items-center p-4 border rounded-lg w-1/2">
            <input
              type="radio"
              id="advertiser"
              name="businessType"
              className="mr-2"
              checked={selectedBusinessType === 'Advertiser'}
              onChange={() => setSelectedBusinessType('Advertiser')}
            />
            <label htmlFor="advertiser" className="flex items-center space-x-2">
              <MdCampaign className="w-6 h-6" />
              <div>
                <p className="font-semibold">Advertiser</p>
                <p className="text-sm text-gray-600">
                  We’re buying ads for our own business
                </p>
              </div>
            </label>
          </div>
        </div>
        <p className="text-center text-gray-600 mb-6">
          A vital partner that oversees and executes advertising campaigns for
          clients and brands.
        </p>
        {selectedBusinessType === 'Advertiser' && (
          <div className="flex justify-between items-center mb-6">
            <label htmlFor="businessName" className="font-semibold">
              {selectedBusinessType} Name:{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="businessName"
              placeholder={`Enter ${selectedBusinessType} Name`}
              className="border-b-2 border-gray-300 outline-none flex-1 ml-2"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
            <span className="text-gray-400 ml-2">0/50</span>
          </div>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex justify-center">
          <Button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            onClick={handleCreateAccount}
          >
            Create Account
          </Button>
        </div>
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <CreateOrganization afterCreateOrganizationUrl="/manage-advertise" />
        </div>
      )}
    </div>
  );
}
