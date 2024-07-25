import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Building2, Check, Radio } from 'lucide-react';

export default function AppTracking() {
  const [isEditAdvertiserDrawerVisible, setIsEditAdvertiserDrawerVisible] =
    useState(false);
  const [isEditAdvertiserDrawerOpen, setIsEditAdvertiserDrawerOpen] =
    useState(false);
  const [activeTab, setActiveTab] = useState<string>('Adjust');
  const [activeSubTab, setActiveSubTab] = useState<string>('iOS');

  const [advertiser, setAdvertiser] = useState({
    name: 'Rekoon',
    category: 'Business',
    website: 'https://imaginify-ayan471.vercel.app',
    id: '', // Added ID field
  });

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

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSubTabClick = (tab: string) => {
    setActiveSubTab(tab);
  };

  return (
    <main className="w-full py-12 px-4 md:px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">App tracking</h1>
            <p className="text-gray-600 mt-2 font-semibold">
              Integrate with mobile measurement platforms to boost campaign
              performance.
            </p>
          </div>
        </div>
      </header>
      <div className="flex items-center justify-between p-4 w-full">
        <div className="w-full">
          <div className="flex space-x-4 border-b border-slate-200">
            {['Adjust', 'Appsflyer', 'Singular'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => handleTabClick(tab)}
                className={`text-sm font-semibold py-4 px-1 border-b-2 ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="ml-auto">
          <Button onClick={openEditAdvertiserDrawer} className="text-white">
            Setup
          </Button>
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <Building2 />
          <div className="flex flex-col text-left space-y-2">
            <div className="duration-600 block truncate font-semibold text-accent-foreground text-base">
              {advertiser.name}
            </div>
          </div>
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
                  {activeTab === 'Appsflyer'
                    ? 'Appsflyer apps for Rekoon'
                    : activeTab === 'Singular'
                    ? 'Singular apps for Rekoon'
                    : 'Adjust apps for Rekoon'}
                </h2>
                <Button
                  onClick={closeEditAdvertiserDrawer}
                  className="bg-red-500 text-white hover:bg-red-700"
                >
                  Close
                </Button>
              </div>
            </div>
            <div className="w-full">
              <div className="flex space-x-4 border-b border-slate-200">
                {['iOS', 'Android'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleSubTabClick(tab)}
                    className={`text-sm font-semibold py-4 px-1 border-b-2 ${
                      activeSubTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {activeSubTab === 'Android'
                      ? 'Play Store URL'
                      : 'App Store URL'}
                  </label>
                  <input
                    type="text"
                    placeholder="https://"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Connected TV tracker
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-8 mt-4 flex items-end text-xs text-indigo-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    className="mr-2 inline-block h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                    ></path>
                  </svg>
                  <p>
                    Find support on how to integrate Adjust with Vibe on our
                    dedicated{' '}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                      href="https://help.vibe.co/en/articles/6530649-adjust-integration"
                    >
                      blog post
                    </a>
                  </p>
                </div>
                <div className="mb-4 font-semibold">Events</div>
                <div className="mb-3 text-sm text-slate-500">
                  The following events are tracked by default.
                </div>
                <div className="grid gap-3 text-xs text-slate-500 grid-cols-2">
                  <div className="rounded-lg bg-slate-50 px-4 py-2">
                    <div className="flex h-5 items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Radio />
                        <div className="text-sm">Install</div>
                      </div>
                      <Check className="text-green-500" />
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-50 px-4 py-2">
                    <div className="flex h-5 items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Radio />
                        <div className="text-sm">Impression</div>
                      </div>
                      <Check className="text-green-500" />
                    </div>
                  </div>
                  {activeTab !== 'Appsflyer' && activeTab !== 'Singular' && (
                    <div className="rounded-lg bg-slate-50 px-4 py-2">
                      <div className="flex h-5 items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Radio />
                          <div className="text-sm">Session</div>
                        </div>
                        <Check className="text-green-500" />
                      </div>
                    </div>
                  )}
                  <div className="rounded-lg bg-slate-50 px-4 py-2">
                    <div className="flex h-5 items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Radio />
                        <div className="text-sm">Reattribution</div>
                      </div>
                      <Check className="text-green-500" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-blue-600 text-white">Save</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
