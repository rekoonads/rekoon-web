'use client';

import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
const domainName = import.meta.env.VITE_DOMAIN;
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
  Search,
  Settings,
  Users,
} from 'lucide-react';
import axios from 'axios';

async function fetchCampaignData() {
  try {
    const response = await axios.get(`${domainName}/api/campaign-data`);
    const campaign_data = response.data; // Extract the data from the response
    return campaign_data; // Do something with the fetched data
  } catch (error) {
    console.error("Error fetching campaign data:", error);
  }
}
export default function AdminDashboard() {
let campaign_data;

  useEffect(() => {
    const campaign_data_get = async ()=> {
       campaign_data = await fetchCampaignData();
       console.log(campaign_data?.totalCampaign.length)
    }
    campaign_data_get();
   
  }, [])
  
  
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const campaigns = [
    {
      customerId: 'C001',
      customerName: 'Acme Corp',
      campaignName: 'Summer Sale',
      campaignId: 'CAM001',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      amount: '$5,000',
    },
    {
      customerId: 'C002',
      customerName: 'TechGiant Inc',
      campaignName: 'Product Launch',
      campaignId: 'CAM002',
      startDate: '2023-07-15',
      endDate: '2023-09-15',
      amount: '$10,000',
    },
    {
      customerId: 'C003',
      customerName: 'Global Services LLC',
      campaignName: 'Brand Awareness',
      campaignId: 'CAM003',
      startDate: '2023-08-01',
      endDate: '2023-10-31',
      amount: '$7,500',
    },
    {
      customerId: 'C004',
      customerName: 'Local Shop Co',
      campaignName: 'Holiday Special',
      campaignId: 'CAM004',
      startDate: '2023-11-15',
      endDate: '2023-12-31',
      amount: '$3,000',
    },
    {
      customerId: 'C005',
      customerName: 'StartUp Innovators',
      campaignName: 'Q4 Push',
      campaignId: 'CAM005',
      startDate: '2023-10-01',
      endDate: '2023-12-15',
      amount: '$6,000',
    },
  ];

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
            { icon: Package, label: 'Campaigns' },
            { icon: Users, label: 'Customers' },
            { icon: BarChart3, label: 'Analytics' },
            { icon: Settings, label: 'Settings' },
          ].map((item, index) => (
            <li key={index}>
              <Button
                variant="ghost"
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
            <h2 className="text-3xl font-bold text-white">Campaign Overview</h2>
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Search..."
                className="mr-4 bg-zinc-700 text-white placeholder-zinc-400 border-zinc-600"
              />
              <Button variant="outline" size="icon" className="text-white">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="ml-2">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                  className="rounded-full"
                  width={32}
                  height={32}
                />
              </Button>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Campaigns', value: `${campaign_data ? campaign_data?.totalCampaign.length:"10"}` },
              { label: 'Active Campaigns', value: '5' },
              { label: 'Total Revenue', value: '$31,500' },
              { label: 'Avg. Campaign Duration', value: '45 days' },
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
                  <TableHead className="text-zinc-300">Customer ID</TableHead>
                  <TableHead className="text-zinc-300">Customer Name</TableHead>
                  <TableHead className="text-zinc-300">Campaign Name</TableHead>
                  <TableHead className="text-zinc-300">Campaign ID</TableHead>
                  <TableHead className="text-zinc-300">Start Date</TableHead>
                  <TableHead className="text-zinc-300">End Date</TableHead>
                  <TableHead className="text-zinc-300">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow
                    key={campaign.campaignId}
                    className="hover:bg-zinc-700"
                  >
                    <TableCell className="font-medium">
                      {campaign.customerId}
                    </TableCell>
                    <TableCell>{campaign.customerName}</TableCell>
                    <TableCell>{campaign.campaignName}</TableCell>
                    <TableCell>{campaign.campaignId}</TableCell>
                    <TableCell>{campaign.startDate}</TableCell>
                    <TableCell>{campaign.endDate}</TableCell>
                    <TableCell>{campaign.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
