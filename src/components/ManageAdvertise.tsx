import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import {
  OrganizationSwitcher,
  useAuth,
  UserButton,
  useUser,
} from '@clerk/clerk-react';
import { DropdownMenuDemo } from './SettingsMenu';
import JSEncrypt from 'jsencrypt';

export default function ManageAdvertise() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAdd, setIsAdd] = useState<UserData | undefined>(undefined);
  const [agencyId, setAgencyId] = useState<UserField | undefined>(undefined);
  const navigate = useNavigate();
  const { orgId, userId } = useAuth();
  const { user } = useUser();

  // gst validation
  const clientId = 'CF567621CQMSJBMGPP5C73DT8AR0';
  const publicKey = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAozn9fqJ002LOHM1xRMGz
  fMzEOpquWXZ4wJWSaxmHlcMbUi/N+bHTbd49jFJSMO+tKMEfRyXtZ9MRD0/UVM7y
  l0bzWkntAhkXBkHjo69KSmDypg+47ypqQ58dztcGQz++4E5ow+I1jy0YyHJhZMWK
  TxaeSogL5g+IRZSYbSJufsvgpmUesYd5ejVeBlOqdenqfN3chWVA+rsXDfJQZZqj
  OsllU0XG6zr8RCdtNMC3zdIfjLKkwWGb/V4vL1xXfaP/OW8DhCq6adVh1LYCUAaO
  dcRusWIQArAwt2CgajW8JrAnqhmCSRi6YWhe/iTqyppJusLBpA1qrZ5NJrU+lUcO
  WQIDAQAB
  -----END PUBLIC KEY-----`;

  const [gstNumber, setGstNumber] = useState('');
  const handlegstChange = (event) => {
    const { value } = event.target;
    setGstNumber(value);

    if (value.length === 15) {
      const timestamp = Math.floor(Date.now() / 1000);
      const dataToEncrypt = `${clientId}.${timestamp}`;

      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);
      const encryptedData = encrypt.encrypt(dataToEncrypt);

      const url = 'https://api.cashfree.com/verification/gstin';
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-client-id': 'CF567621CQN034ABG73C739TF7A0',
          'x-client-secret':
            'cfsk_ma_prod_69c81d0d1b98a8c177c1b242cd942640_6e949e28',
          'X-CF-Signature': encryptedData,
        },
        body: JSON.stringify({ GSTIN: gstNumber, businessName: 'Cashfree' }),
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error('error:' + err));
    }
  };

  //end

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const response = await fetch(`/api/search-agency/${id}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: UserField = await response.json();
        setAgencyId(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (orgId) {
      fetchData(orgId);
    }
  }, [orgId]);

  console.log(agencyId);

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const response = await fetch(`/api/search-user/${id}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: UserData = await response.json();
        setIsAdd(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.id) {
      fetchData(user.id);
    }
  }, [user?.id]);

  const openDrawer = () => {
    setIsDrawerVisible(true);
    setTimeout(() => {
      setIsDrawerOpen(true);
    }, 0);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setIsDrawerVisible(false);
    }, 500);
  };

  const handleManageReportsClick = () => {
    navigate('/report');
  };

  console.log(user?.fullName);
  const userType = isAdd?.type_of_user ?? 'Unknown'; // Default value if undefined
  console.log(userType);
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between p-4 bg-white text-white">
        {userType === 'Advertiser' ? (
          <div className="flex items-start ">
            <h1 className="font-semibold text-black p-2 bg-slate-200 rounded-lg">
              Advertiser
            </h1>
          </div>
        ) : null}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-800 p-2 rounded">
            {userType === 'Agency' ? <OrganizationSwitcher /> : null}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenuDemo name="Kunal" email="mkkm@gmail.com" />
          <Link to={'/dashboard'}>
            <Button>Go to Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      </header>
      <main className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Campaigns</h2>
                <a href="#" className="text-blue-600">
                  Media Library
                </a>
              </div>
              <p className="text-gray-600 mb-4">
                Create, plan or manage campaigns on Disney+ Hotstar
              </p>
              <div className="flex gap-4">
                <Button className="bg-blue-600 text-white">
                  Manage Campaigns
                </Button>
                <Link to={'/campaign'}>
                  <Button variant="outline">Create Campaign</Button>
                </Link>
                <Button variant="outline">Plan Campaign</Button>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow mt-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Measurement</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Create or view reports of campaigns run on Disney+ Hotstar
              </p>
              <div className="flex gap-4">
                <Button
                  className="bg-blue-600 text-white"
                  onClick={handleManageReportsClick}
                >
                  Manage Reports
                </Button>
                <Button variant="outline">Create Report</Button>
                <Button variant="outline">View Analytics</Button>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow mt-4">
              <img
                src="/advertise/adtech-trends-2024-banner.png"
                alt="Ad"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Update Details</h3>
                <Button
                  variant="link"
                  className="text-blue-600"
                  onClick={openDrawer}
                >
                  Update
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                {userType === 'Advertiser' ? (
                  <>
                    <span>Advertiser Name:</span>
                    <span>{user?.fullName}</span>
                  </>
                ) : userType === 'Agency' ? (
                  <>
                    <span>Agency Name:</span>
                    <span>{agencyId.agencyName}</span>
                  </>
                ) : null}
              </div>
              <div className="flex justify-between">
                <span>GST Number:</span>
                <span>-</span>
              </div>
              <div className="flex justify-between">
                <span>Legal Name:</span>
                <span>-</span>
              </div>
              <div className="flex justify-between">
                <span>Address:</span>
                <span>-</span>
              </div>
            </div>
            <div className="bg-orange-100 p-4 rounded mt-4">
              <p className="text-orange-600">
                Your business details are incomplete. Please update them to
                activate your account.{' '}
                <a href="#" className="text-blue-600">
                  Learn More
                </a>
              </p>
              <Button
                variant="link"
                className="text-blue-600 mt-2"
                onClick={openDrawer}
              >
                Update Now
              </Button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Ad Credit</h3>
              <div className="bg-yellow-100 p-4 rounded mt-2">
                <p className="text-yellow-600">
                  Business onboarding is not complete. Your ad credit will be
                  enabled upon completion of the onboarding process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isDrawerVisible && (
        <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50 transition-opacity duration-500">
          <div
            className={`bg-white w-1/3 h-full p-8 overflow-y-auto shadow-lg transition-transform duration-500 ${
              isDrawerOpen
                ? 'transform translate-x-0'
                : 'transform translate-x-full'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Update Details</h2>
              <Button
                onClick={closeDrawer}
                className="bg-red-500 text-white hover:bg-red-700"
              >
                Close
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advertiser Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Advertiser Name"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
                <div className="mt-2">
                  <label className="mb-3 block text-black dark:text-white">
                    Advertiser Logo
                  </label>
                  <input
                    type="file"
                    className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  GST Number
                </label>
                <input
                  type="text"
                  placeholder="Enter GST Number"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  onChange={handlegstChange}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Legal Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Legal Name"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Address"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mt-2">
                  <label className="mb-3 block text-black dark:text-white">
                    GST Certificate
                  </label>
                  <input
                    type="file"
                    className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CIN Number
                </label>
                <input
                  type="text"
                  placeholder="Enter CIN Number"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-end">
                <Button className="bg-blue-600 text-white">Save</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
