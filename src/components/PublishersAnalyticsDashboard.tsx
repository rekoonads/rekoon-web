'use client';

import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Calendar } from '../components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import {
  ArrowDown,
  ArrowUp,
  CalendarIcon,
  Download,
  FileText,
  HelpCircle,
  MoreVertical,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// Sample data - replace with real data
const data = [
  { name: 'Jan', earnings: 400 },
  { name: 'Feb', earnings: 300 },
  { name: 'Mar', earnings: 200 },
  { name: 'Apr', earnings: 278 },
  { name: 'May', earnings: 189 },
  { name: 'Jun', earnings: 239 },
  { name: 'Jul', earnings: 349 },
];

const dailyData = [
  { hour: '00:00', value: 12 },
  { hour: '04:00', value: 15 },
  { hour: '08:00', value: 35 },
  { hour: '12:00', value: 45 },
  { hour: '16:00', value: 38 },
  { hour: '20:00', value: 25 },
];

const detailedData = [
  {
    date: '2023-07-01',
    pageViews: 5000,
    uniqueVisitors: 3500,
    bounceRate: 35,
    avgTimeOnPage: 120,
  },
  {
    date: '2023-07-02',
    pageViews: 5500,
    uniqueVisitors: 3800,
    bounceRate: 32,
    avgTimeOnPage: 135,
  },
  {
    date: '2023-07-03',
    pageViews: 4800,
    uniqueVisitors: 3300,
    bounceRate: 38,
    avgTimeOnPage: 110,
  },
  {
    date: '2023-07-04',
    pageViews: 6000,
    uniqueVisitors: 4200,
    bounceRate: 30,
    avgTimeOnPage: 145,
  },
  {
    date: '2023-07-05',
    pageViews: 5200,
    uniqueVisitors: 3600,
    bounceRate: 33,
    avgTimeOnPage: 130,
  },
  {
    date: '2023-07-06',
    pageViews: 5800,
    uniqueVisitors: 4000,
    bounceRate: 31,
    avgTimeOnPage: 140,
  },
  {
    date: '2023-07-07',
    pageViews: 6200,
    uniqueVisitors: 4300,
    bounceRate: 29,
    avgTimeOnPage: 150,
  },
];

const trafficSourceData = [
  { name: 'Direct', value: 400 },
  { name: 'Organic Search', value: 300 },
  { name: 'Paid Search', value: 300 },
  { name: 'Social', value: 200 },
  { name: 'Referral', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const reportTypes = [
  {
    name: 'Revenue Report',
    description: 'Detailed breakdown of your earnings',
    icon: FileText,
  },
  {
    name: 'Traffic Report',
    description: 'Analysis of your website traffic sources',
    icon: TrendingUp,
  },
  {
    name: 'Content Performance',
    description: 'Insights into your best performing content',
    icon: BarChart,
  },
  {
    name: 'Ad Performance',
    description: 'Metrics on your ad placements and CTR',
    icon: TrendingUp,
  },
];

export default function AnalyticsDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-800">
          Analytics Dashboard
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="bg-white border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <Alert
        variant="destructive"
        className="bg-gradient-to-r from-red-50 to-red-100 border-red-200 shadow-lg"
      >
        <AlertDescription className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-red-600 font-medium">
              Earnings at risk – You need to fix some ads.txt file issues to
              avoid severe impact to your revenue.
            </span>
            <HelpCircle className="h-4 w-4 text-red-600" />
          </div>
          <div className="space-x-4">
            <Button
              variant="link"
              className="text-blue-600 p-0 h-auto font-semibold hover:text-blue-800"
            >
              Fix now
            </Button>
            <Button
              variant="link"
              className="text-blue-600 p-0 h-auto font-semibold hover:text-blue-800"
            >
              Learn more
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-white border border-gray-200 p-1 rounded-lg shadow-sm">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700"
          >
            Detailed Analytics
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700"
          >
            Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-gradient-to-br from-white to-blue-50 border-none shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium text-gray-800">
                  Estimated earnings
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-blue-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Today so far</p>
                    <p className="text-2xl font-bold text-gray-900">US$0.00</p>
                    <div className="flex items-center space-x-1 text-green-600">
                      <ArrowUp className="h-4 w-4" />
                      <p className="text-xs">+US$0.00 vs. same day last week</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Yesterday</p>
                    <p className="text-2xl font-bold text-gray-900">US$0.00</p>
                    <div className="h-4" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Last 7 days</p>
                    <p className="text-2xl font-bold text-gray-900">US$0.00</p>
                    <div className="flex items-center space-x-1 text-red-600">
                      <ArrowDown className="h-4 w-4" />
                      <p className="text-xs">vs previous 7 days</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">This month</p>
                    <p className="text-2xl font-bold text-gray-900">US$0.00</p>
                    <div className="flex items-center space-x-1 text-red-600">
                      <TrendingDown className="h-4 w-4" />
                      <p className="text-xs">▼ US$0.31 (-100%) vs last year</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <XAxis
                        dataKey="name"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'white',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="earnings"
                        stroke="#4f46e5"
                        strokeWidth={2}
                        dot={{ fill: '#818cf8', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#4f46e5' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3 bg-gradient-to-br from-white to-purple-50 border-none shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium text-gray-800">
                  Balance
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-purple-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-3xl font-bold text-gray-900">$45.04</p>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <p className="text-xs text-green-600">
                        +12.5% from last month
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">
                      Last payment
                    </p>
                    <p className="text-2xl font-bold text-gray-900">US$0.00</p>
                    <p className="text-xs text-gray-500">
                      Processed on Dec 15, 2023
                    </p>
                  </div>
                  <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dailyData}>
                        <XAxis
                          dataKey="hour"
                          stroke="#94a3b8"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="#94a3b8"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            background: 'white',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                          }}
                        />
                        <Bar
                          dataKey="value"
                          fill="#8b5cf6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-gradient-to-br from-white to-green-50 border-none shadow-lg transition-transform duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Page RPM
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-green-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-900">$2.45</p>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <p className="text-xs text-green-600">
                      +5.2% from last week
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-white to-yellow-50 border-none shadow-lg transition-transform duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Impressions
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-yellow-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-900">12,234</p>
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <p className="text-xs text-red-600">-2.1% from last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-white to-pink-50 border-none shadow-lg transition-transform duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Click-through Rate
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-pink-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-900">1.8%</p>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <p className="text-xs text-green-600">
                      +0.3% from last week
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2 bg-gradient-to-br from-white to-blue-50 border-none shadow-lg">
              <CardHeader>
                <CardTitle>Page Views & Unique Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={detailedData}>
                      <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        yAxisId="left"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'white',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                      />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="pageViews"
                        stroke="#4f46e5"
                        strokeWidth={2}
                        dot={{ fill: '#818cf8', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#4f46e5' }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="uniqueVisitors"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        dot={{ fill: '#67e8f9', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#06b6d4' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-white to-green-50 border-none shadow-lg">
              <CardHeader>
                <CardTitle>Bounce Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={detailedData}>
                      <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'white',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                      />
                      <Bar
                        dataKey="bounceRate"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-2 bg-gradient-to-br from-white to-yellow-50 border-none shadow-lg">
              <CardHeader>
                <CardTitle>Average Time on Page</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={detailedData}>
                      <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'white',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="avgTimeOnPage"
                        stroke="#eab308"
                        strokeWidth={2}
                        dot={{ fill: '#fde047', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#eab308' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-white to-purple-50 border-none shadow-lg">
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {trafficSourceData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: 'white',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reportTypes.map((report, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white to-indigo-50 border-none shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="p-2 bg-indigo-100 rounded-full">
                    <report.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <CardTitle>{report.name}</CardTitle>
                    <p className="text-sm text-gray-500">
                      {report.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
