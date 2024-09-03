import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

interface RightSideCardProps {
  title: string;
  dailyEstimate: string;
  weeklyEstimate: string;
  impressionsRange: string;
  householdsRange: string;
  dailyBudget: number;
  userId: string;
  ageRange: string;
  gender: string;
  screens: string[];
  audiences: string[];
  strategyName: string;
  strategyDailyBudget: number;
  selectedGoal: string;
  selectedOption: string;
  selectedChannels: string[];
  deliveryTimeSlots: string[];
  deliveryType: string;
  campaignId: string;
}

export default function RightSidedStrategyCard({
  title,
  dailyEstimate,
  weeklyEstimate,
  impressionsRange,
  householdsRange,
  dailyBudget,
  userId,
  ageRange,
  gender,
  screens,
  audiences,
  strategyName,
  strategyDailyBudget,
  selectedGoal,
  selectedOption,
  selectedChannels,
  deliveryTimeSlots,
  deliveryType,
  campaignId,
}: RightSideCardProps) {
  return (
    <Card className="w-full max-w-md rounded-lg flex flex-col p-5 gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">Campaign ID: {campaignId}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">User ID: {userId}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Age Range: {ageRange}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Gender: {gender}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Strategy: {strategyName}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Daily Budget: {strategyDailyBudget}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Goal: {selectedGoal}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Option: {selectedOption}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Channels: {selectedChannels.join(", ")}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Delivery Slots: {deliveryTimeSlots.join(", ")}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Delivery Type: {deliveryType}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Devices: {screens.join(", ")}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Audiences: {audiences.join(", ")}</p>
    </Card>
  );
}
