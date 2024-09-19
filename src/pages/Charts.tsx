'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  DollarSignIcon,
  UsersIcon,
} from 'lucide-react';

const data = [
  { month: 'Jan', sales: 4000, customers: 240 },
  { month: 'Feb', sales: 3000, customers: 198 },
  { month: 'Mar', sales: 5000, customers: 300 },
  { month: 'Apr', sales: 2780, customers: 180 },
  { month: 'May', sales: 1890, customers: 120 },
  { month: 'Jun', sales: 2390, customers: 150 },
];

export default function Charts() {
  const [activeMetric, setActiveMetric] = useState('sales');
  const [hoveredData, setHoveredData] = useState(null);

  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalCustomers = data.reduce((sum, item) => sum + item.customers, 0);
  const averageSales = totalSales / data.length;
  const averageCustomers = totalCustomers / data.length;

  const lastMonthSales = data[data.length - 1].sales;
  const lastMonthCustomers = data[data.length - 1].customers;
  const salesTrend = lastMonthSales > averageSales;
  const customersTrend = lastMonthCustomers > averageCustomers;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev === 'sales' ? 'customers' : 'sales'));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <MetricCard
          title="Total Sales"
          value={`$${totalSales.toLocaleString()}`}
          icon={<DollarSignIcon className="w-6 h-6" />}
          trend={salesTrend}
        />
        <MetricCard
          title="Total Customers"
          value={totalCustomers.toLocaleString()}
          icon={<UsersIcon className="w-6 h-6" />}
          trend={customersTrend}
        />
        <MetricCard
          title="Avg Monthly Sales"
          value={`$${averageSales.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}`}
          icon={<DollarSignIcon className="w-6 h-6" />}
        />
        <MetricCard
          title="Avg Monthly Customers"
          value={averageCustomers.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
          icon={<UsersIcon className="w-6 h-6" />}
        />
      </div>
      <Card className="bg-gray-800 border-gray-700 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Performance Overview</h2>
            <div className="space-x-2">
              <Button
                variant={activeMetric === 'sales' ? 'default' : 'outline'}
                onClick={() => setActiveMetric('sales')}
              >
                Sales
              </Button>
              <Button
                variant={activeMetric === 'customers' ? 'default' : 'outline'}
                onClick={() => setActiveMetric('customers')}
              >
                Customers
              </Button>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                onMouseMove={(e) => {
                  if (e.activePayload) {
                    setHoveredData(e.activePayload[0].payload);
                  }
                }}
                onMouseLeave={() => setHoveredData(null)}
              >
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey={activeMetric}
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <AnimatePresence>
        {hoveredData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-2">{hoveredData.month}</h3>
            <p>Sales: ${hoveredData.sales.toLocaleString()}</p>
            <p>Customers: {hoveredData.customers.toLocaleString()}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MetricCard({ title, value, icon, trend }) {
  return (
    <Card className="bg-gray-800 border-gray-700 shadow-2xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {icon}
        </div>
        <p className="text-3xl font-bold mb-2">{value}</p>
        {trend !== undefined && (
          <div
            className={`flex items-center ${
              trend ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {trend ? (
              <ArrowUpIcon className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 mr-1" />
            )}
            <span>{trend ? 'Uptrend' : 'Downtrend'}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 p-4 rounded shadow-lg border border-gray-700">
        <p className="text-lg font-semibold mb-2">{label}</p>
        <p className="text-sm">Sales: ${payload[0].value.toLocaleString()}</p>
        <p className="text-sm">
          Customers: {payload[0].payload.customers.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
}
