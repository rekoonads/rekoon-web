import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Plus } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import InviteModal from '../../components/InviteModal'; // Import the new InviteModal component

export default function Members() {
  const user = {
    name: 'John Doe',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKzB6aXwSBg-gdQmdoPkfcTXXpGrTF3u_mFA&s',
  };

  const [selectInput, setSelectInput] = useState<string>('');
  const [tabValue, setTabValue] = useState<string>('memberships');
  const [isInviteModalOpen, setInviteModalOpen] = useState<boolean>(false); // State to manage modal visibility

  const invitations: any[] = []; // Explicitly declare the type as any[]

  return (
    <main className="w-full py-12 px-4 md:px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Members</h1>

        <Button
          className="ml-auto text-white"
          onClick={() => setInviteModalOpen(true)}
        >
          <Plus size={20} />
          Invite a new member
        </Button>
      </header>

      <Tabs
        defaultValue="memberships"
        className="w-full"
        value={tabValue}
        onValueChange={setTabValue}
      >
        <TabsList>
          <TabsTrigger
            value="memberships"
            className={`px-4 py-2 cursor-pointer ${
              tabValue === 'memberships'
                ? 'bg-blue-500 text-white rounded-md'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Memberships
          </TabsTrigger>
          <TabsTrigger
            value="invitations"
            className={`px-4 py-2 cursor-pointer ${
              tabValue === 'invitations'
                ? 'bg-blue-500 text-white rounded-md'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Invitations
          </TabsTrigger>
        </TabsList>
        <TabsContent value="memberships">
          <div className="flex items-center justify-between p-4 w-full">
            <div className="flex items-center">
              <img
                src={user.imageUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <span className="text-lg font-medium">{user.name}</span>
            </div>
            <div className="ml-auto">
              <SelectGroupOne
                label="Select the specific role"
                options={[
                  { value: 'admin', label: 'Admin' },
                  { value: 'member', label: 'Member' },
                ]}
                onSelect={(selected) => setSelectInput(selected)}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="invitations">
          {invitations.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_2409_46672"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="48"
                  height="48"
                >
                  <rect width="48" height="48" fill="#D9D9D9"></rect>
                </mask>
                <g mask="url(#mask0_2409_46672)">
                  <path
                    d="M4.64999 37.9V34.8C4.64999 33.7996 4.88646 32.977 5.35939 32.332C5.83229 31.6871 6.52898 31.1579 7.44944 30.7445C9.24981 29.9482 10.9661 29.3 12.5984 28.8C14.2307 28.3 16.3063 28.05 18.825 28.05C21.3437 28.05 23.4109 28.3 25.0265 28.8C26.6422 29.3 28.3676 29.9485 30.2027 30.7456C31.0613 31.1491 31.7338 31.6748 32.2203 32.3226C32.7068 32.9704 32.95 33.7962 32.95 34.8V37.9H4.64999ZM36.8 37.9V34.85C36.8 33.6167 36.5842 32.4586 36.1526 31.3759C35.7211 30.2932 35.1202 29.3679 34.35 28.6C35.4833 28.8667 36.5833 29.175 37.65 29.525C38.7167 29.875 39.7153 30.2744 40.646 30.7232C41.4433 31.1333 42.1016 31.7097 42.6209 32.4522C43.1403 33.1948 43.4 33.994 43.4 34.85V37.9H36.8ZM18.825 22.2C17.105 22.2 15.6792 21.6342 14.5475 20.5025C13.4158 19.3708 12.85 17.9533 12.85 16.25C12.85 14.5467 13.4158 13.1292 14.5475 11.9975C15.6792 10.8658 17.0967 10.3 18.8 10.3C20.5033 10.3 21.9208 10.864 23.0525 11.9919C24.1842 13.1198 24.75 14.5308 24.75 16.225C24.75 17.945 24.186 19.3708 23.0581 20.5025C21.9302 21.6342 20.5192 22.2 18.825 22.2ZM33.2 16.225C33.2 17.945 32.6362 19.3708 31.5086 20.5025C30.3811 21.6342 28.9645 22.2 27.2589 22.2C27.153 22.2 27.0583 22.1917 26.975 22.175C26.8917 22.1583 26.8167 22.1333 26.75 22.1C27.3607 21.2942 27.8134 20.4006 28.108 19.4194C28.4027 18.4381 28.55 17.3845 28.55 16.2585C28.55 15.1325 28.3833 14.0996 28.05 13.1598C27.7167 12.2199 27.2833 11.2833 26.75 10.35C26.8083 10.3583 26.8917 10.3521 27 10.3312C27.1083 10.3104 27.1917 10.3 27.25 10.3C28.9608 10.3 30.3802 10.864 31.5081 11.9919C32.636 13.1198 33.2 14.5308 33.2 16.225ZM6.39999 36.15H31.2V34.8C31.2 34.2667 31.0779 33.8054 30.8337 33.4163C30.5896 33.0272 30.1283 32.6551 29.45 32.3C27.7833 31.4667 26.15 30.8417 24.55 30.425C22.95 30.0083 21.0333 29.8 18.8 29.8C16.5667 29.8 14.65 30.0083 13.05 30.425C11.45 30.8417 9.83333 31.4667 8.19999 32.3C7.52166 32.6551 7.05208 33.0272 6.79124 33.4163C6.53041 33.8054 6.39999 34.2667 6.39999 34.8V36.15ZM18.7854 20.45C19.9618 20.45 20.9583 20.0465 21.775 19.2396C22.5917 18.4327 23 17.441 23 16.2646C23 15.0882 22.5896 14.0917 21.7688 13.275C20.948 12.4583 19.9494 12.05 18.773 12.05C17.5966 12.05 16.607 12.4604 15.8042 13.2812C15.0014 14.102 14.6 15.1006 14.6 16.277C14.6 17.4534 15.0035 18.443 15.8104 19.2458C16.6173 20.0486 17.609 20.45 18.7854 20.45Z"
                    fill="#94A3B8"
                  ></path>
                </g>
              </svg>
              <p className="mt-4 text-gray-500">No invitations found.</p>
            </div>
          ) : (
            <div>
              {invitations.map((invitation, index) => (
                <div key={index} className="p-4 border-b">
                  {invitation}
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add InviteModal component */}
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />
    </main>
  );
}
