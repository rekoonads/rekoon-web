import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Building2, Plus, Copy } from 'lucide-react';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useToast } from '../../components/ui/use-toast';

interface UserData {
  type_of_user: string;
}

export default function Advertisers() {
  const [isNewAdvertiserDrawerVisible, setIsNewAdvertiserDrawerVisible] =
    useState(false);
  const [isNewAdvertiserDrawerOpen, setIsNewAdvertiserDrawerOpen] =
    useState(false);
  const [isEditAdvertiserDrawerVisible, setIsEditAdvertiserDrawerVisible] =
    useState(false);
  const [isEditAdvertiserDrawerOpen, setIsEditAdvertiserDrawerOpen] =
    useState(false);
  const [selectInput, setSelectInput] = useState<string>('');
  const [advertiser, setAdvertiser] = useState({
    name: 'Rekoon',
    category: 'Business',
    website: 'https://imaginify-ayan471.vercel.app',
    id: '', 
  });
  const { toast } = useToast();
  const handleCopyId = () => {
    if (advertiser.id) {
      navigator.clipboard.writeText(advertiser.id).then(() => {
        alert('Advertiser ID copied to clipboard');
      });
    }
  };

  const openNewAdvertiserDrawer = () => {
    setIsNewAdvertiserDrawerVisible(true);
    setTimeout(() => {
      setIsNewAdvertiserDrawerOpen(true);
    }, 0);
  };

  const closeNewAdvertiserDrawer = () => {
    setIsNewAdvertiserDrawerOpen(false);
    setTimeout(() => {
      setIsNewAdvertiserDrawerVisible(false);
    }, 500); // Duration should match the transition duration
  };

  const openEditAdvertiserDrawer = () => {
    setIsEditAdvertiserDrawerVisible(true);
    setTimeout(() => {
      setIsEditAdvertiserDrawerOpen(true);
    }, 0);
  };

  const closeEditAdvertiserDrawer = () => {
    setIsEditAdvertiserDrawerOpen(false);
    setTimeout(() => {
      setIsEditAdvertiserDrawerVisible(false);
    }, 500); // Duration should match the transition duration
  };
  const { orgId } = useAuth();
  const { user } = useUser();
  const [websiteName, setWebsiteName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [businessEmail, setBusinessEmail] = useState<string>('');
  const [businessContact, setBusinessContact] = useState<string>('');
  const [respondedData, setRespondedData] = useState<any>();

  //type of user
  const [isAdd, setIsAdd] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const response = await fetch(`/api/search-user/${id}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Cache-Control': 'no-cache',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: UserData = await response.json();
        setIsAdd(data);
        console.log(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    if (user?.id) {
      fetchData(user.id);
    }
  }, [user?.id]);

  console.log(isAdd?.type_of_user);

  const [adId, setAdId] = useState<string>('');
  useEffect(() => {
    if (isAdd?.type_of_user === 'Advertiser') {
      const getAdvertiserId = async () => {
        try {
          const response = await axios.get(`/api/advertisers/${user?.id}`, {
            headers: { 'Content-Type': 'application/json' },
            params: {
              _: new Date().getTime(),
            },
          });
          console.log(response.data);
          setAdId(response.data?.advertiserId);
        } catch (error) {
          console.error('Axios error:', error);
        }
      };
      getAdvertiserId();
    }
  }, [isAdd?.type_of_user, user?.id]);
  console.log(adId);

  //Handling Save and Posting to the route

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      let postData: any; // Define the type if possible based on your API response

      if (isAdd?.type_of_user === 'Agency') {
        postData = await axios.post(
          '/api/add-website',
          {
            websiteName,
            websiteUrl: website,
            websiteContact: businessContact,
            websiteEmail: businessEmail,
            agencyId: orgId,
            createdBy: user?.id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      } else if (isAdd?.type_of_user === 'Advertiser') {
        postData = await axios.post(
          '/api/add-website',
          {
            websiteName,
            websiteUrl: website,
            websiteContact: businessContact,
            websiteEmail: businessEmail,
            advertiserId: adId,
            createdBy: user?.id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      }

      if (postData && postData.data) {
        // Update the advertiser state with the new website data
        setAdvertiser({
          name: postData.data.name,
          category: postData.data.category,
          website: postData.data.websiteUrl,
          id: postData.data.id, // assuming the response includes an id
        });

        // Close the drawer
        closeNewAdvertiserDrawer();

        // Show a success toast
        toast({
          title: 'Website added successfully!',
          description: `The website ${postData.data.websiteUrl} has been added.`,
        });

        console.log(postData);
        setRespondedData(postData);
      }
    } catch (error) {
      console.log(error);

      // Show an error toast
      toast({
        title: 'Error adding website',
        description: 'There was an issue adding the website. Please try again.',
      });
    }
  };

  console.log(respondedData);
  return (
    <main className="w-full py-12 px-4 md:px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Members</h1>
            <p className="text-gray-600 mt-2 font-semibold">
              Manage your brand or clients by listing them as separate
              Advertisers within your account.
            </p>
          </div>
          <Button className="text-white" onClick={openNewAdvertiserDrawer}>
            <Plus size={20} />
            New advertiser
          </Button>
        </div>
      </header>
      <div className="flex items-center justify-between p-4 w-full">
        <div className="flex items-center gap-2">
          <Building2 />
          <div className="flex flex-col text-left space-y-2">
            <div className="duration-600 block truncate font-semibold text-accent-foreground text-base">
              {advertiser.name}
            </div>
            <div className="duration-600 flex items-center space-x-3 truncate text-slate-500 text-sm">
              <div className="flex min-w-0 items-center space-x-2 whitespace-nowrap font-medium text-slate-500">
                <span>{advertiser.category}</span>
                <span className="text-slate-300">·</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  className="h-5 w-5 text-slate-400"
                >
                  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z"></path>
                  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z"></path>
                </svg>
                <a
                  className="truncate"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={advertiser.website}
                >
                  {advertiser.website}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <Button variant={'outline'} onClick={openEditAdvertiserDrawer}>
            Edit advertiser
          </Button>
        </div>
      </div>

      {/* New Advertiser Drawer */}
      {isNewAdvertiserDrawerVisible && (
        <div className="overflow-auto fixed inset-0 flex items-start justify-end bg-black bg-opacity-50 z-50 transition-opacity duration-500">
          <div
            className={`bg-white w-1/3 h-full p-8 overflow-y-auto shadow-lg transition-transform duration-500 ${
              isNewAdvertiserDrawerOpen
                ? 'transform translate-x-0'
                : 'transform translate-x-full'
            }`}
            style={{ marginTop: '64px' }} // Adjust this value to be below your top nav menu
          >
            <div className="flex flex-col mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">New Advertiser</h2>
                <Button
                  onClick={closeNewAdvertiserDrawer}
                  className="bg-red-500 text-white hover:bg-red-700"
                >
                  Close
                </Button>
              </div>
              <p className="mt-2 text-gray-600">
                Provide details to add a new advertiser.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  onChange={(event) => setWebsiteName(event.target.value)}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <SelectGroupOne
                  options={[
                    { value: 'arts', label: 'Arts & Entertainment' },
                    { value: 'automotive', label: 'Automotive' },
                    { value: 'business', label: 'Business' },
                    { value: 'careers', label: 'Careers' },
                    { value: 'education', label: 'Education' },
                  ]}
                  onSelect={(selected) => setSelectInput(selected)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="text"
                  placeholder="www.yourbrand.com"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Email
                </label>
                <input
                  type="text"
                  placeholder="www.yourbrand.com"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  onChange={(event) => setBusinessEmail(event.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Contact
                </label>
                <input
                  type="text"
                  placeholder="www.yourbrand.com"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  onChange={(event) => setBusinessContact(event.target.value)}
                />
              </div>
              <form onSubmit={handleSubmit}>
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

      {/* Edit Advertiser Drawer */}
      {isEditAdvertiserDrawerVisible && (
        <div className="fixed inset-0 flex items-start justify-end bg-black bg-opacity-50 z-50 transition-opacity duration-500">
          <div
            className={`bg-white w-1/3 h-full p-8 overflow-y-auto shadow-lg transition-transform duration-500 ${
              isEditAdvertiserDrawerOpen
                ? 'transform translate-x-0'
                : 'transform translate-x-full'
            }`}
            style={{ marginTop: '64px' }} // Adjust this value to be below your top nav menu
          >
            <div className="flex flex-col mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Edit Advertiser</h2>
                <Button
                  onClick={closeEditAdvertiserDrawer}
                  className="bg-red-500 text-white hover:bg-red-700"
                >
                  Close
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={advertiser.name}
                  onChange={(e) =>
                    setAdvertiser({ ...advertiser, name: e.target.value })
                  }
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <SelectGroupOne
                  options={[
                    { value: 'arts', label: 'Arts & Entertainment' },
                    { value: 'automotive', label: 'Automotive' },
                    { value: 'business', label: 'Business' },
                    { value: 'careers', label: 'Careers' },
                    { value: 'education', label: 'Education' },
                  ]}
                  selected={advertiser.category}
                  onSelect={(selected) =>
                    setAdvertiser({ ...advertiser, category: selected })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="text"
                  value={advertiser.website}
                  onChange={(e) =>
                    setAdvertiser({ ...advertiser, website: e.target.value })
                  }
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advertiser ID
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={advertiser.id}
                    readOnly
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />

                  <Button onClick={handleCopyId} className=" text-white">
                    <Copy size={16} />
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-blue-600 text-white">Save</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
