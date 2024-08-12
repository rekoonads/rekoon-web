import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  OrganizationSwitcher,
  useAuth,
  UserButton,
  useUser,
} from '@clerk/clerk-react';
import { DropdownMenuDemo } from './SettingsMenu';
import { getAgency, searchUser } from '../asyncCall/asyncCall';
import { events } from '@react-three/fiber';

export default function ManageAdvertise() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAdd, setIsAdd] = useState<UserData | undefined>(undefined);
  // const [agencyId, setAgencyId] = useState<UserField | undefined>(undefined);
  const [legalName, setLegalName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [gstNumber, setGstNumber] = useState<string>('');
  const navigate = useNavigate();
  const { orgId, userId } = useAuth();
  const { user } = useUser();

  const appId = '1pamnh';
  const appKey = 'pmzmvrg9legon1ky2uwm';
  const transactionId = '05szuy8uajfo-DEMO';

  const url = 'https://ind-lookup.hyperverge.co/api/lookup/searchGSTIN';

  const headers = {
    appId: appId,
    appKey: appKey,
    transactionId: transactionId,
    'Content-Type': 'application/json',
  };
  const handleGSTChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newGstNumber = event.target.value;
    setGstNumber(newGstNumber);

    if (newGstNumber) {
      const data = {
        gstin: newGstNumber,
      };

      try {
        const response = await axios.post(url, data, { headers });
        console.log('Response:', response.data);

        if (response.data && response.data.status === 'success') {
          const legalName = response.data.result.data.legalName || '';
          const address = response.data.result.data.pradr.fullAddress || '';

          setLegalName(legalName);
          setAddress(address);

          console.log('Legal Name:', legalName);
          console.log('Address:', address);
        } else {
          setLegalName('');
          setAddress('');
        }
      } catch (error) {
        console.error('Error:', error);
        setLegalName('');
        setAddress('');
      }
    } else {
      setLegalName('');
      setAddress('');
    }
  };

  //Searching User Type
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

  //for getting the agency
  console.log(isAdd?.data[0].agencyName);

  //for getting the advertiser
  console.log(isAdd?.data[0].advertiserName);

  //for Agencies only
  const [agencyData, setAgencyData] = useState<string>('');
  console.log(orgId);
  useEffect(() => {
    if (isAdd?.type_of_user === 'Agency') {
      const handleSearch = async () => {
        if (!orgId) return; // Prevents running on initial render
        try {
          const data = await getAgency(orgId);
          setAgencyData(data);
        } catch (err) {
          console.log(err);
        }
      };

      handleSearch();
    }
  }, [isAdd, orgId]);

  console.log(agencyData);

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

  const userType = isAdd?.type_of_user ?? 'Unknown';
  console.log(userType);

  const [cinNumber, setCinNumber] = useState<string>('');
  console.log(legalName);
  console.log(cinNumber);
  console.log(agencyData?.agencyId);
  console.log(isAdd?.data[0]?.advertiserId);
  const [name, setName] = useState<string>('');
  const [responseFile, setResponseFile] = useState<any>()

//Send GST Certificate 
  const sendGSTCertificate = async (event: any) => {
    const gstData = event.target.files[0]; 
    const formData = new FormData();
    formData.append('file', gstData); 

    try {
        const response = await axios.post(
            '/api/file-cloud',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        console.log(response.data);
        setResponseFile(response.data);
    } catch (error) {
        console.error('Error uploading the file', error);
        
    }
};
 console.log(responseFile?.url)
useEffect(()=> {
  if(responseFile){
    alert(`Certificate Updated Successfully`)
  }
}, [responseFile])

 // Sending GST logo 
 const [imageData, setImageData] = useState<any>()
 const [imgFile, setImgFile] = useState<any>()
 const sendGSTLogo = async(event: any) =>{
  const gstLogo = event.target.files[0]; 

    const formData = new FormData();
    formData.append('file', gstLogo); 

    try {
      const response = await axios.post(
          '/api/file-cloud',
          formData,
          {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          },
      );
      console.log(response.data);
      setImageData(response.data);
  } catch (error) {
      console.error('Error uploading the file', error);
      
  }
 }
 useEffect(()=> {
  if(imageData){
    alert(`Image Updated Successfully`)
  }
}, [imageData])

console.log(imageData?.url)


  // Change the name based on the Type
  useEffect(() => {
    isAdd?.type_of_user === 'Agency'
      ? setName(agencyData?.agencyName)
      : isAdd?.type_of_user === 'Advertiser'
      ? setName(isAdd?.data[0].advertiserName)
      : 'No Name';
  }, [isAdd?.type_of_user]);

  const [respondedData, setRespondedData] = useState<any>();

  const sendUpdateData = async (event: React.FormEvent) => {
    event.preventDefault();
    // /api/update_user
    if (isAdd?.type_of_user === 'Agency') {
      try {
        const postData = await axios.patch(
          '/api/update_user',
          {
            typeofuser: 'Agency',
            agencyName: isAdd?.data[0]?.agencyName,
            logo: imageData?.url,
            gstNumber: gstNumber,
            legalName: legalName,
            address: address,
            agencyId: agencyData?.agencyId,
            gstCertificate: responseFile?.url,
            cinNumber: cinNumber,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(postData);
        setRespondedData(postData);
      } catch (error) {
        console.log(error);
      }
    } else if (isAdd?.type_of_user === 'Advertiser') {
      try {
        const postData = await axios.patch(
          '/api/update_user',
          {
            typeofuser: 'Advertiser',
            advertiserName: isAdd?.data[0].advertiserName,
            logo: imageData?.url,
            gstNumber: gstNumber,
            legalName: legalName,
            address: address,
            advertiserId: isAdd?.data[0]?.advertiserId,
            gstCertificate: responseFile?.url,
            cinNumber: cinNumber,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(postData);
        setRespondedData(postData);
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(respondedData);
 
  useEffect(()=>{
    if(respondedData){
      alert(`The data has been stored`)
    }
  },[respondedData])
 

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
                    <span>{isAdd?.data[0].advertiserName}</span>
                  </>
                ) : userType === 'Agency' ? (
                  <>
                    <span>Agency Name:</span>
                    <span>{agencyData?.agencyName}</span>
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
                {isAdd?.type_of_user === 'Advertiser' ? (
                  <>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Advertiser Name
                    </label>
                  </>
                ) : isAdd?.type_of_user === 'Agency' ? (
                  <>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agency Name
                    </label>
                  </>
                ) : null}
                <input
                  type="text"
                  placeholder="Enter Advertiser Name"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={name}
                />
                <div className="mt-2">
                  <label className="mb-3 block text-black dark:text-white">
                    Advertiser Logo
                  </label>
                  <input
                    type="file"
                    onChange={sendGSTLogo}
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
                  value={gstNumber}
                  onChange={handleGSTChange}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Legal Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Legal Name"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    value={legalName}
                    readOnly
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
                    value={address}
                    readOnly
                  />
                </div>
                <div className="mt-2">
                  <label className="mb-3 block text-black dark:text-white">
                    GST Certificate
                  </label>
                  <input
                    type="file"
                    className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                    onChange={sendGSTCertificate}
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
                  onChange={(event) => setCinNumber(event.target.value)}
                />
              </div>
              <form onSubmit={sendUpdateData}>
                <div className="flex justify-end">
                  <Button className="bg-blue-600 text-white" type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
