import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Building2, Plus, Copy } from 'lucide-react';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';

export default function WebTracking() {
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
    id: '', // Added ID field
  });

  const handleCopyId = () => {
    if (advertiser.id) {
      navigator.clipboard.writeText(advertiser.id).then(() => {
        alert('Advertiser ID copied to clipboard');
      });
    }
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

  return (
    <main className="w-full py-12 px-4 md:px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Web tracking</h1>
            <p className="text-gray-600 mt-2 font-semibold">
              Use a web tracking code to track conversions and set up Google
              Analytics.
            </p>
          </div>
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
          <Button onClick={openEditAdvertiserDrawer} className="text-white">
            Setup
          </Button>
        </div>
      </div>

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
                <h2 className="text-xl font-semibold">
                  Select installation method
                </h2>
                <Button
                  onClick={closeEditAdvertiserDrawer}
                  className="bg-red-500 text-white hover:bg-red-700"
                >
                  Close
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-6">
              <button
                type="button"
                className="cursor-pointer whitespace-nowrap normal-case ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md text-base font-semibold flex h-full w-full items-center justify-start space-x-3 border border-slate-300 px-6 py-5 shadow-sm"
              >
                <img src="/connections/javascript.jpg" alt="" />
                <h5 className="scroll-m-20 text-base font-bold text-accent-foreground truncate">
                  Manual (Javascript)
                </h5>
              </button>
              <button
                type="button"
                className="cursor-pointer whitespace-nowrap normal-case ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md text-base font-semibold flex h-full w-full items-center justify-start space-x-3 border border-slate-300 px-6 py-5 shadow-sm"
              >
                <img src="/connections/wordpress.avif" alt="" />
                <h5 className="scroll-m-20 text-base font-bold text-accent-foreground truncate">
                  Wordpress
                </h5>
              </button>
              <button
                type="button"
                className="cursor-pointer whitespace-nowrap normal-case ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md text-base font-semibold flex h-full w-full items-center justify-start space-x-3 border border-slate-300 px-6 py-5 shadow-sm"
              >
                <img src="/connections/shopify.avif" alt="" />
                <h5 className="scroll-m-20 text-base font-bold text-accent-foreground truncate">
                  Shopify
                </h5>
              </button>
              <button
                type="button"
                className="cursor-pointer whitespace-nowrap normal-case ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md text-base font-semibold flex h-full w-full items-center justify-start space-x-3 border border-slate-300 px-6 py-5 shadow-sm"
              >
                <img src="/connections/wix.avif" alt="" />
                <h5 className="scroll-m-20 text-base font-bold text-accent-foreground truncate">
                  Wix
                </h5>
              </button>
              <button
                type="button"
                className="cursor-pointer whitespace-nowrap normal-case ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md text-base font-semibold flex h-full w-full items-center justify-start space-x-3 border border-slate-300 px-6 py-5 shadow-sm"
              >
                <img src="/connections/big-commerce.avif" alt="" />
                <h5 className="scroll-m-20 text-base font-bold text-accent-foreground truncate">
                  BigCommerce
                </h5>
              </button>
              <button
                type="button"
                className="cursor-pointer whitespace-nowrap normal-case ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md text-base font-semibold flex h-full w-full items-center justify-start space-x-3 border border-slate-300 px-6 py-5 shadow-sm"
              >
                <img src="/connections/gtm.avif" alt="" />
                <h5 className="scroll-m-20 text-base font-bold text-accent-foreground truncate">
                  Google Tag Manager
                </h5>
              </button>
              <button
                type="button"
                className="cursor-pointer whitespace-nowrap normal-case ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md text-base font-semibold flex h-full w-full items-center justify-start space-x-3 border border-slate-300 px-6 py-5 shadow-sm"
              >
                <img src="/connections/woocommerce.avif" alt="" />
                <h5 className="scroll-m-20 text-base font-bold text-accent-foreground truncate">
                  WooCommerce
                </h5>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
