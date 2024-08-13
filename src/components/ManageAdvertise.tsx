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
import { PlusCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import PaymentPopup from './popup/addBalance';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentData {
  amount: number;
  currency: string;
  id: string;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

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
  const [ balance, setBalance] = useState<number>(0);
 

  // handlePayment Function
  
    const [isPopupOpen, setPopupOpen] = useState(false);
  
    const handleOpenPopup = () => {
      setPopupOpen(true);
    };
  
    const handleClosePopup = () => {
      setPopupOpen(false);
    };
  
    const handlePaymentSubmit = async (amount: number) => {
      try {
        setBalance(amount);
        const res = await fetch('/api/payment/order', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            amount,
          }),
        });
  
        const data = await res.json();
        console.log(data);
        handlePaymentVerify(data.data);
      } catch (error) {
        console.error('Error creating order:', error);
        toast.error('Failed to create order. Please try again.');
      }
    };


  // handlePaymentVerify Function
  const [successPaymentId, setSuccessPaymentId] = useState<string>('');
  const handlePaymentVerify = async (data: PaymentData) => {
    console.log(data);
    const options = {
      key: 'rzp_test_SZrvteybFNdghB', // Use your Razorpay Test Key
      amount: data.amount,
      currency: data.currency,
      name: 'Rekoon Ads',
      description: 'Test Mode',
      order_id: data.id,
      handler: async (response: RazorpayResponse) => {
        console.log('response', response);
        try {
          const res = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await res.json();

          if (verifyData.message) {
            const updated_user = await fetch('/api/update-balance', {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify({
                userId : userId, 
                addedBalance : data.amount
              })
            });
            console.log(updated_user);
            toast.success(verifyData.message);
            console.log('Payment ID:', response.razorpay_payment_id);
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          toast.error('Payment verification failed. Please contact support.');
        }
      },
      theme: {
        color: '#5f63b8',
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  //REST
  const appId = '1pamnh';
  const appKey = 'pmzmvrg9legon1ky2uwm';
  const transactionId = '05szuy8uajfo-DEMO';

  const url = 'https://ind-lookup.hyperverge.co/api/lookup/searchGSTIN';

  const [cinNumber, setCinNumber] = useState<string>('');
  const cinChange = (event: React.ChangeEvent) => {
    setCinNumber(event.target.value);
  };

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

  console.log(user);
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

  console.log(isAdd?.user?.walletBalance);


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

  console.log(legalName);
  console.log(cinNumber);
  console.log(agencyData?.agencyId);
  console.log(isAdd?.data[0]?.advertiserId);
  const [name, setName] = useState<string>('');
  const [responseFile, setResponseFile] = useState<any>();

  //Send GST Certificate
  const sendGSTCertificate = async (event: any) => {
    const gstData = event.target.files[0];
    const formData = new FormData();
    formData.append('file', gstData);

    try {
      const response = await axios.post('/api/file-cloud', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setResponseFile(response.data);
    } catch (error) {
      console.error('Error uploading the file', error);
    }
  };
  console.log(responseFile?.url);
  useEffect(() => {
    if (responseFile) {
      alert(`Certificate Updated Successfully`);
    }
  }, [responseFile]);

  // Sending GST logo
  const [imageData, setImageData] = useState<any>();
  const [imgFile, setImgFile] = useState<any>();
  const sendGSTLogo = async (event: any) => {
    const gstLogo = event.target.files[0];

    const formData = new FormData();
    formData.append('file', gstLogo);

    try {
      const response = await axios.post('/api/file-cloud', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setImageData(response.data);
    } catch (error) {
      console.error('Error uploading the file', error);
    }
  };
  useEffect(() => {
    if (imageData) {
      alert(`Image Updated Successfully`);
    }
  }, [imageData]);

  console.log(imageData?.url);

  console.log(agencyData);
  console.log(name);
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

  useEffect(() => {
    if (respondedData) {
      alert(`The data has been stored`);
    }
  }, [respondedData]);

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
          <div className="flex flex-col">
            <p className="flex flex-col text-sm mb-1 font-[400] text-slate-600 dark:text-white">
              Account balance
            </p>
            <div className="flex items-center -mt-3 ml-4">
              <p className="text-slate-600">₹{isAdd?.user?.walletBalance}</p>
              <Button
                variant={'outline'}
                className="border-none"
                onClick={handleOpenPopup}
              >
                <PaymentPopup open={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handlePaymentSubmit} />
                <PlusCircle className="text-slate-600 w-4 h-4 -ml-3" />
              </Button>
            </div>
          </div>
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
                <span>GST Number: </span>
                <span>
                  {(isAdd?.type_of_user === 'Agency'
                    ? agencyData?.gstNumber
                    : isAdd?.type_of_user === 'Advertiser'
                    ? isAdd?.data[0]?.gstNumber
                    : null) || gstNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Legal Name:</span>
                <span>
                  {(isAdd?.type_of_user === 'Agency'
                    ? agencyData?.legalName
                    : isAdd?.type_of_user === 'Advertiser'
                    ? isAdd?.data[0]?.legalName
                    : null) || legalName}
                </span>
              </div>
              <div className="flex justify-between ">
                <span>Address: </span>
                <span className="  pl-6 relative left-10 ">
                  {' '}
                  {(isAdd?.type_of_user === 'Agency'
                    ? agencyData?.address
                    : isAdd?.type_of_user === 'Advertiser'
                    ? isAdd?.data[0]?.address
                    : null) || address}
                </span>
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
                  value={
                    isAdd?.type_of_user === 'Agency'
                      ? agencyData?.agencyName
                      : isAdd?.type_of_user === 'Advertiser'
                      ? isAdd?.data[0].advertiserName
                      : 'No Name'
                  }
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
                  {agencyData?.advertiserLogo ||
                  isAdd?.data[0]?.advertiserLogo ? (
                    <>
                      <img
                        src={
                          isAdd?.type_of_user === 'Agency'
                            ? agencyData?.gstCertificate
                            : isAdd?.type_of_user === 'Advertiser'
                            ? isAdd?.data[0]?.advertiserLogo
                            : null
                        }
                        alt="logo-img"
                        className="w-[100px] h-[100px] rounded-md relative left-[30%]"
                      />
                    </>
                  ) : null}
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
                  value={
                    gstNumber || isAdd?.type_of_user === 'Agency'
                      ? agencyData?.gstNumber
                      : isAdd?.type_of_user === 'Advertiser'
                      ? isAdd?.data[0]?.gstNumber
                      : null
                  }
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
                    value={
                      (isAdd?.type_of_user === 'Agency'
                        ? agencyData?.legalName
                        : isAdd?.type_of_user === 'Advertiser'
                        ? isAdd?.data[0]?.legalName
                        : null) || legalName
                    }
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
                    value={
                      (isAdd?.type_of_user === 'Agency'
                        ? agencyData?.address
                        : isAdd?.type_of_user === 'Advertiser'
                        ? isAdd?.data[0]?.address
                        : null) || address
                    }
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
                  {agencyData?.gstCertificate ||
                  isAdd?.data[0]?.gstCertificate ? (
                    <>
                      <a
                        href={
                          isAdd?.type_of_user === 'Agency'
                            ? agencyData?.gstCertificate
                            : isAdd?.type_of_user === 'Advertiser'
                            ? isAdd?.data[0]?.gstCertificate
                            : null
                        }
                      >
                        Click to see the certificate
                      </a>
                    </>
                  ) : null}
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
                  onChange={cinChange}
                  value={
                    cinNumber || isAdd?.type_of_user === 'Agency'
                      ? agencyData?.cinNumber
                      : isAdd?.type_of_user === 'Advertiser'
                      ? isAdd?.data[0]?.cinNumber
                      : null
                  }
                />
              </div>
              <form onSubmit={sendUpdateData}>
                <div className="flex justify-end">
                  <>
                    {' '}
                    <Button
                      disabled={false}
                      className="bg-blue-600 text-white"
                      type="submit"
                    >
                      Save
                    </Button>
                  </>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
