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




export default function AdminDashboard() {

  //____________________________________________________________________________________________________
  // for getting Campaign Data

  const [campaignData, setCampaignData] = useState<any>([]); 
  useEffect(()=>{
    const getCampData = async() =>{
      try {
        const dataCamp = await axios.get(`${domainName}/api/get-all-campaigns`); 
        console.log(dataCamp); 
        setCampaignData(dataCamp?.data)
      } catch (error) {
        console.log(error)
      }
      
    }
    getCampData()
  },[domainName])

  console.log(campaignData);
//________________________________________________________________________________
//The Campaign Budget data has '₹' symbol to it for some and many numbers, which are in a string format, in order to have there sum it was required to create this function which is written down bellow 
const numbersCollection = campaignData.map(item => item?.campaignBudget);
console.log(numbersCollection)
function rupeeSegregatorAndSummer (arr){
  let onlyNumberArr = [];
  for (let numbers of arr){
    console.log(numbers); 
    if(numbers.charAt(0) === '₹'){
      onlyNumberArr.push(numbers.substring(1))
    } else {
      onlyNumberArr.push(numbers)
    }
  };
  const totalSum = onlyNumberArr.reduce((acc, crnt) => acc + Number(crnt) , 0)
  console.log(totalSum);
  return [onlyNumberArr,totalSum]
}
const [_,totalSum] = rupeeSegregatorAndSummer(numbersCollection)
console.log(totalSum)




//______________________________________________________________________________
  //for side bar

  const [sidebarOpen, setSidebarOpen] = useState(true);

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
              { label: 'Total Campaigns', value:  campaignData.length || `Nill` },
              { label: 'Active Campaigns', value: 'Later Work' },
              { label: 'Total Revenue', value: '₹' +totalSum || `₹0` },
              { label: 'Avg. Campaign Duration', value: 'Later Work' },
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
              {/* <TableBody>
                {campaignData.map((campaign) => (
                  <TableRow
                    key={campaign.campaignId}
                    className="hover:bg-zinc-700"
                  >
                    <TableCell className="font-medium">
                      {campaign.campaignId}
                    </TableCell>
                    <TableCell>{campaign.customerName}</TableCell>
                    <TableCell>{campaign.campaignName}</TableCell>
                    <TableCell>{campaign.campaignId}</TableCell>
                    <TableCell>{campaign.startDate}</TableCell>
                    <TableCell>{campaign.endDate}</TableCell>
                    <TableCell>{campaign.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
