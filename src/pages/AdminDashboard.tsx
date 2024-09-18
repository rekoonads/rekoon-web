import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  BarChart3,
  ChevronLeft,
  Menu,
  Package,
  Settings,
  Users,
  MoreHorizontal,
  Edit,
  Trash2,
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import BrandsTable from './BrandsTable';
import Charts from './Charts';

interface Campaign {
  campaignId: string;
  campaignName: string;
  agencyId?: string;
  advertiserId?: string;
  startDate: string;
  endDate: string;
  campaignBudget: string;
}

interface CampaignData {
  totalCampaign: Campaign[];
  activeCampaign: Campaign[];
  average: string;
}

export default function AdminDashboard() {
  const domainName = import.meta.env.VITE_DOMAIN;
  const [campaignData, setCampaignData] = useState<CampaignData>({
    totalCampaign: [],
    activeCampaign: [],
    average: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);
  const [campaignToUpdate, setCampaignToUpdate] = useState<Campaign | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState('campaigns');

  const navigate = useNavigate();

  useEffect(() => {
    const getCampData = async () => {
      try {
        const response = await axios.get<CampaignData>(
          `${domainName}/api/get-all-campaigns`,
        );
        setCampaignData(response.data);
      } catch (error) {
        console.error('Error fetching campaign data:', error);
      }
    };
    getCampData();
  }, [domainName]);

  const filteredCampaigns = campaignData.totalCampaign.filter((campaign) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      campaign.campaignName.toLowerCase().includes(searchLower) ||
      campaign.campaignId.toLowerCase().includes(searchLower) ||
      (campaign.advertiserId &&
        campaign.advertiserId.toLowerCase().includes(searchLower))
    );
  });

  const numbersCollection = campaignData.totalCampaign.map(
    (item) => item.campaignBudget,
  );

  function rupeeSegregatorAndSummer(arr: string[]): [string[], number] {
    const onlyNumberArr = arr.map((number) =>
      number.charAt(0) === '₹' ? number.substring(1) : number,
    );
    const totalSum = onlyNumberArr.reduce((acc, crnt) => acc + Number(crnt), 0);
    return [onlyNumberArr, totalSum];
  }

  const [_, totalSum] = rupeeSegregatorAndSummer(numbersCollection);

  const handleUpdateClick = (campaign: Campaign) => {
    setCampaignToUpdate(campaign);
    setUpdateDialogOpen(true);
  };

  const handleUpdateSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (campaignToUpdate) {
      try {
        const response = await axios.post(`${domainName}/api/edit-campaign`, {
          campaignId: campaignToUpdate.campaignId,
          campaignName: campaignToUpdate.campaignName,
        });

        if (response.status === 200) {
          // Assuming the response contains updated campaign data
          const updatedCampaign = response.data;
          // Update the campaign data state with the new details
          setCampaignData((prevData) => ({
            ...prevData,
            totalCampaign: prevData.totalCampaign.map((campaign) =>
              campaign.campaignId === updatedCampaign.campaignId
                ? updatedCampaign
                : campaign,
            ),
          }));
          console.log(
            `Updated campaign with ID: ${campaignToUpdate.campaignId}`,
          );
          location.reload();
        } else {
          console.error('Failed to update campaign');
        }
      } catch (error) {
        console.error('Error updating campaign:', error);
      } finally {
        setUpdateDialogOpen(false);
        setCampaignToUpdate(null);
      }
    }
  };
  const handleDeleteClick = (campaignId: string) => {
    setCampaignToDelete(campaignId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (campaignToDelete) {
      try {
        // Send a DELETE request to the server to delete the campaign
        const response = await axios.delete(
          `${domainName}/api/delete-campaign?campaignId=${campaignToDelete.campaignId}`,
          {
            data: { campaignId: campaignToDelete },
          },
        );

        if (response.status === 200) {
          // Remove the deleted campaign from the state
          setCampaignData((prevData) => ({
            ...prevData,
            totalCampaign: prevData.totalCampaign.filter(
              (campaign) => campaign.campaignId !== campaignToDelete,
            ),
          }));
          console.log(`Deleted campaign with ID: ${campaignToDelete}`);
        } else {
          console.error('Failed to delete campaign');
        }
      } catch (error) {
        console.error('Error deleting campaign:', error);
      } finally {
        setDeleteDialogOpen(false);
        setCampaignToDelete(null);
      }
    }
  };

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <nav
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-zinc-800 transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${sidebarOpen ? '' : 'hidden'}`}>
            Dashboard
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white"
          >
            {sidebarOpen ? <ChevronLeft /> : <Menu />}
          </Button>
        </div>
        <ul className="mt-4">
          {[
            { icon: Package, label: 'Campaigns', value: 'campaigns' },
            { icon: Users, label: 'Customers', value: 'customers' },
            { icon: BarChart3, label: 'Analytics', value: 'analytics' },
            { icon: Settings, label: 'Settings', value: 'settings' },
          ].map((item, index) => (
            <li key={index}>
              <Button
                variant="ghost"
                onClick={() => setActiveTab(item.value)} // Set the active tab
                className={`w-full justify-start text-white hover:bg-zinc-700 ${
                  sidebarOpen ? 'px-4' : 'px-0'
                }`}
              >
                <item.icon className={`${sidebarOpen ? 'mr-2' : 'mx-auto'}`} />
                {sidebarOpen && <span>{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-zinc-800 shadow-md">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">
              {activeTab === 'campaigns' && 'Campaign Overview'}
              {activeTab === 'customers' && 'Customers Overview'}
              {activeTab === 'analytics' && 'Analytics Overview'}
            </h2>
            <div className="flex items-center">
              <Button
                onClick={() => navigate('/manage-advertise')}
                className="bg-yellow-950 mr-4 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Return to Dashboard
              </Button>
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mr-4 bg-zinc-700 text-white placeholder-zinc-400 border-zinc-600"
              />
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {activeTab === 'campaigns' && (
            <div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    label: 'Total Campaigns',
                    value: campaignData.totalCampaign.length || 'Nil',
                  },
                  {
                    label: 'Active Campaigns',
                    value: campaignData.activeCampaign.length || 'Nil',
                  },
                  { label: 'Total Revenue', value: `₹${totalSum || 0}` },
                  {
                    label: 'Avg. Campaign Duration',
                    value: campaignData.average,
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-zinc-800 overflow-hidden shadow rounded-lg"
                  >
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                          <BarChart3 className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-zinc-400 truncate">
                              {stat.label}
                            </dt>
                            <dd className="text-lg font-semibold text-white">
                              {stat.value}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-zinc-800 shadow-md rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-zinc-300">
                        Customer ID
                      </TableHead>
                      <TableHead className="text-zinc-300">
                        Customer Name
                      </TableHead>
                      <TableHead className="text-zinc-300">
                        Campaign Name
                      </TableHead>
                      <TableHead className="text-zinc-300">
                        Campaign ID
                      </TableHead>
                      <TableHead className="text-zinc-300">
                        Start Date
                      </TableHead>
                      <TableHead className="text-zinc-300">End Date</TableHead>
                      <TableHead className="text-zinc-300">Amount</TableHead>
                      <TableHead className="text-zinc-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.map((campaign) => (
                      <TableRow
                        key={campaign.campaignId}
                        className="hover:bg-zinc-700"
                      >
                        <TableCell className="font-medium">
                          {campaign.agencyId || campaign.advertiserId}
                        </TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell>{campaign.campaignName}</TableCell>
                        <TableCell>{campaign.campaignId}</TableCell>
                        <TableCell>{campaign.startDate}</TableCell>
                        <TableCell>{campaign.endDate}</TableCell>
                        <TableCell>{campaign.campaignBudget}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-36 bg-zinc-700 text-white border border-zinc-600"
                            >
                              <DropdownMenuItem
                                onClick={() => handleUpdateClick(campaign)}
                                className="flex items-center cursor-pointer hover:bg-zinc-600 focus:bg-zinc-600 text-black hover:text-white"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Update</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeleteClick(campaign.campaignId)
                                }
                                className="flex items-center cursor-pointer hover:bg-zinc-600 focus:bg-zinc-600 text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Dialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
              >
                <DialogContent className="sm:max-w-[425px] bg-zinc-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                      Are you sure you want to delete this campaign? This action
                      cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-start">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={handleDeleteConfirm}
                    >
                      Yes, Delete
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDeleteDialogOpen(false)}
                      className="ml-3"
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog
                open={updateDialogOpen}
                onOpenChange={setUpdateDialogOpen}
              >
                <DialogContent className="sm:max-w-[425px] bg-zinc-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Update Campaign</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                      Make changes to the campaign details below.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleUpdateSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="campaignName" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="campaignName"
                          value={campaignToUpdate?.campaignName}
                          onChange={(e) =>
                            setCampaignToUpdate(
                              (prev) =>
                                prev && {
                                  ...prev,
                                  campaignName: e.target.value,
                                },
                            )
                          }
                          className="col-span-3 bg-zinc-700 text-white border-zinc-600"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="startDate" className="text-right">
                          Start Date
                        </Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={campaignToUpdate?.startDate}
                          onChange={(e) =>
                            setCampaignToUpdate(
                              (prev) =>
                                prev && { ...prev, startDate: e.target.value },
                            )
                          }
                          className="col-span-3 bg-zinc-700 text-white border-zinc-600"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="endDate" className="text-right">
                          End Date
                        </Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={campaignToUpdate?.endDate}
                          onChange={(e) =>
                            setCampaignToUpdate(
                              (prev) =>
                                prev && { ...prev, endDate: e.target.value },
                            )
                          }
                          className="col-span-3 bg-zinc-700 text-white border-zinc-600"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="budget" className="text-right">
                          Budget
                        </Label>
                        <Input
                          id="budget"
                          value={campaignToUpdate?.campaignBudget}
                          onChange={(e) =>
                            setCampaignToUpdate(
                              (prev) =>
                                prev && {
                                  ...prev,
                                  campaignBudget: e.target.value,
                                },
                            )
                          }
                          className="col-span-3 bg-zinc-700 text-white border-zinc-600"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
          {activeTab === 'customers' && <BrandsTable />}
          {activeTab === 'analytics' && <Charts />}
        </div>
      </main>
    </div>
  );
}
