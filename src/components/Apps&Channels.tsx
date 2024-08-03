import React, { useState, useEffect } from 'react';
import { ChevronUpIcon, FolderIcon, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useUser } from '@clerk/clerk-react';

// Define the channel type
interface Channel {
  id: number;
  name: string;
  logo: string;
  reach: string;
}

// Example channel data
const channelsData: Channel[] = [
  {
    id: 1,
    name: 'Samsung TV Plus',
    logo: '/channels/tvplus-logo2_cpydbg.avif',
    reach: '18.8M',
  },
  {
    id: 2,
    name: 'Roku Channel',
    logo: '/channels/ajucj1L7HYkhsZT8eFvV9t5L63j4czOp_CRR4eqoGzFcqf11FzoZYI_dR-1HzyqdBm42=w240-h480-rw.avif',
    reach: '13.8M',
  },
  {
    id: 3,
    name: 'Tubi',
    logo: '/channels/slZYN_wnlAZ4BmyTZZakwfwAGm8JE5btL7u7AifhqCtUuxhtVVxQ1mcgpGOYC7MsAaU.avif',
    reach: '12.8M',
  },
  {
    id: 4,
    name: 'FOX Sports',
    logo: '/channels/31m0ineBrcL.avif',
    reach: '10.3M',
  },
  {
    id: 5,
    name: 'Plex',
    logo: '/channels/JD6jTbbH6qKs2QhSOIdEPcKGbOhHrK1LDHas_WzbnmP8cOLzStJyn0usiIE3drV6Iik.avif',
    reach: '10M',
  },
  {
    id: 6,
    name: 'CBS Sports Stream & Watch Live',
    logo: '/channels/71yF0Wo5UcL.avif',
    reach: '8.7M',
  },
  {
    id: 7,
    name: 'Pluto TV',
    logo: '/channels/JD6jTbbH6qKs2QhSOIdEPcKGbOhHrK1LDHas_WzbnmP8cOLzStJyn0usiIE3drV6Iik.avif',
    reach: '7.8M',
  },
];

interface ChannelsProps {
  onSelectedChannelsChange: (channels: string[]) => void; 
}

const Channels: React.FC<ChannelsProps> = ({ onSelectedChannelsChange }) => {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { user } = useUser();

  useEffect(() => {
    onSelectedChannelsChange(selectedChannels);
  }, [selectedChannels, onSelectedChannelsChange]);

  const handleCheckboxChange = (name: string) => {
    setSelectedChannels((prevSelectedChannels) => {
      const updated = prevSelectedChannels.includes(name)
        ? prevSelectedChannels.filter((channelName) => channelName !== name)
        : [...prevSelectedChannels, name];
      return updated;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedChannels([]);
    } else {
      setSelectedChannels(channelsData.map((channel) => channel.name));
    }
    setSelectAll(!selectAll);
  };

  const filteredChannels = channelsData.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedChannels = [
    ...filteredChannels,
    ...channelsData.filter((channel) => !filteredChannels.includes(channel)),
  ];

  
  return (
    <div className="p-4">
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center space-x-2">
          <FolderIcon className="w-6 h-6 text-blue-500" />
          <h1 className="text-lg font-semibold">Inventory</h1>
          <span className="text-sm text-gray-500">All Apps & Channels</span>
        </div>
      </div>
      <div className="flex items-center py-4 space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for channels"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Available ({channelsData.length})
        </div>
        <Button variant="outline" size="sm" onClick={handleSelectAll}>
          {selectAll ? 'Deselect All' : 'Select All'}
        </Button>
        <div className="text-sm text-muted-foreground">
          Selected ({selectedChannels.length})
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="border rounded-md">
          <div className="flex justify-between p-4 border-b">
            <div className="text-sm text-muted-foreground">
              Weekly estimated reach
            </div>
            <div className="text-sm text-muted-foreground">
              Weekly total estimated reach 204.9M
            </div>
          </div>
          <div className="p-4">
            {sortedChannels.map((channel) => (
              <div
                key={channel.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedChannels.includes(channel.name)}
                    onChange={() => handleCheckboxChange(channel.name)}
                    className="form-checkbox h-5 w-5 text-blue-600 mr-2"
                  />
                  <img
                    src={channel.logo}
                    alt={channel.name}
                    className="w-10 h-10"
                  />
                  <span>{channel.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {channel.reach}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
