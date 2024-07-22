import { ChevronUpIcon, FolderIcon, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import SelectGroupOne from './Forms/SelectGroup/SelectGroupOne';

export default function Channels() {
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
        <Button variant="outline" className="flex-1">
          Apps & Channels
        </Button>
        <Button variant="outline" className="flex-1">
          Live Sports
        </Button>
      </div>
      <div className="flex items-center py-4 space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for channels"
            className="pl-8"
          />
        </div>
      </div>
      <SelectGroupOne />
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">Available (547)</div>
        <Button variant="outline" size="sm">
          Select all
        </Button>
        <div className="text-sm text-muted-foreground">Selected (0)</div>
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
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <img
                  src="/channels/tvplus-logo2_cpydbg.avif"
                  alt="Samsung TV Plus"
                  className="w-10 h-10"
                />
                <span>Samsung TV Plus</span>
              </div>
              <span className="text-sm text-muted-foreground">18.8M</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <img
                  src="/channels/ajucj1L7HYkhsZT8eFvV9t5L63j4czOp_CRR4eqoGzFcqf11FzoZYI_dR-1HzyqdBm42=w240-h480-rw.avif"
                  alt="Roku Channel"
                  className="w-10 h-10"
                />
                <span>Roku Channel</span>
              </div>
              <span className="text-sm text-muted-foreground">13.8M</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <img
                  src="/channels/slZYN_wnlAZ4BmyTZZakwfwAGm8JE5btL7u7AifhqCtUuxhtVVxQ1mcgpGOYC7MsAaU.avif"
                  alt="Tubi"
                  className="w-10 h-10"
                />
                <span>Tubi</span>
              </div>
              <span className="text-sm text-muted-foreground">12.8M</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <img
                  src="/channels/31m0ineBrcL.avif"
                  alt="FOX Sports"
                  className="w-10 h-10"
                />
                <span>FOX Sports</span>
              </div>
              <span className="text-sm text-muted-foreground">10.3M</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <img
                  src="/channels/JD6jTbbH6qKs2QhSOIdEPcKGbOhHrK1LDHas_WzbnmP8cOLzStJyn0usiIE3drV6Iik.avif"
                  alt="Plex"
                  className="w-10 h-10"
                />
                <span>Plex</span>
              </div>
              <span className="text-sm text-muted-foreground">10M</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <img
                  src="/channels/71yF0Wo5UcL.avif"
                  alt="CBS Sports Stream & Watch Live"
                  className="w-10 h-10"
                />
                <span>CBS Sports Stream & Watch Live</span>
              </div>
              <span className="text-sm text-muted-foreground">8.7M</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <img
                  src="/channels/JD6jTbbH6qKs2QhSOIdEPcKGbOhHrK1LDHas_WzbnmP8cOLzStJyn0usiIE3drV6Iik.avif"
                  alt="Pluto TV"
                  className="w-10 h-10"
                />
                <span>Pluto TV</span>
              </div>
              <span className="text-sm text-muted-foreground">7.8M</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-4">
        <Button variant="outline">Back to campaign settings</Button>
        <Button className="text-white">Continue to Summary</Button>
      </div>
    </div>
  );
}
