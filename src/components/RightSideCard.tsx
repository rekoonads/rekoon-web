import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';

// Updated interface to include campaign status properties
interface RightSideCardProps {
  title: string;
  dailyEstimate: string;
  weeklyEstimate: string;
  impressionsRange: string;
  householdsRange: string;
  dailyBudget: number;
  // New props for campaign status
  campaignStatus?: string;
  remainingTime?: number | null;
  startDate?: string;
  endDate?: string;
}

export default function RightSideCard({
  title,
  dailyEstimate,
  weeklyEstimate,
  impressionsRange,
  householdsRange,
  dailyBudget,
  // Destructure new props
  campaignStatus = 'scheduled',
  remainingTime = null,
  startDate,
  endDate,
}: RightSideCardProps) {
  // Helper function to format remaining time
  const formatRemainingTime = (time: number | null) => {
    if (!time) return '';
    const days = Math.floor(time / (60 * 60 * 24));
    const hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
    return `${days}d ${hours}h`;
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'scheduled':
        return 'text-blue-500';
      case 'expired':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Card className="w-full max-w-md rounded-lg flex flex-col p-5 gap-4">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {/* Add campaign status badge */}
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            campaignStatus,
          )}`}
        >
          {campaignStatus}
        </div>
      </CardHeader>

      {/* Add campaign timing information */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-md">
        <div className="text-sm space-y-1">
          {remainingTime && (
            <p className="font-medium">
              {campaignStatus === 'scheduled'
                ? `Starts in: ${formatRemainingTime(remainingTime)}`
                : `Ends in: ${formatRemainingTime(remainingTime)}`}
            </p>
          )}
          {startDate && (
            <p className="text-gray-600 dark:text-gray-300">
              Start: {new Date(startDate).toLocaleDateString()}
            </p>
          )}
          {endDate && (
            <p className="text-gray-600 dark:text-gray-300">
              End: {new Date(endDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      <CardContent>
        <Tabs defaultValue="daily">
          <TabsList className="grid w-full grid-cols-2 mb-5">
            <TabsTrigger
              value="weekly"
              className="border rounded-lg shadow-lg text-lg active:scale-75 mr-2 text-blue-900 font-semibold dark:text-slate-100"
            >
              Weekly
            </TabsTrigger>
            <TabsTrigger
              value="daily"
              className="border rounded-lg shadow-lg text-lg active:scale-75 ml-2 text-blue-900 font-semibold dark:text-slate-100"
            >
              Daily
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <p className="text-sm text-blue-900 font-semibold dark:text-slate-100">
              Based on your weekly budget of {weeklyEstimate}, your campaign
              estimated results are:
            </p>
            {/* Add campaign status information */}
            {campaignStatus === 'active' && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                <p className="text-sm text-green-700 dark:text-green-300">
                  Campaign is currently running
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="daily">
            <p className="text-sm text-blue-900 font-semibold dark:text-slate-100">
              Based on your daily budget of {dailyBudget}, your campaign
              estimated results are:
            </p>
            {/* Add campaign status information */}
            {campaignStatus === 'scheduled' && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Campaign will start soon
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Add campaign progress bar for active campaigns */}
      {campaignStatus === 'active' && remainingTime && (
        <div className="px-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${(remainingTime / (24 * 60 * 60)) * 100}%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Campaign Progress</p>
        </div>
      )}
    </Card>
  );
}
