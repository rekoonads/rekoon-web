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
  
  userId: string;
  ageRange: string;
  gender: string;
  screens: string;
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

  console.log(screens)
  console.log(audiences)
  return (
    
  
      <div className="overflow-auto flex flex-col p-5 gap-2 h-fit">
        <p>Strategy Card</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Campaign ID: {campaignId}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">User ID: {userId}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Age Range: {ageRange || `Not Selected`}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Gender: {gender || `Not Selected`}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Strategy Name: {strategyName || `Not Set`}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Strategy Daily Budget: {strategyDailyBudget || `Not Set`}</p>
       <p className="text-sm text-gray-600 dark:text-gray-400">Goal: {selectedGoal || `Not Selected`}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Option: {selectedOption}</p>
        {/* <p className="text-sm text-gray-600 dark:text-gray-400">Channels: {selectedChannels.join(", ")}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Delivery Slots: {deliveryTimeSlots.join(", ")}</p> */}
        <p className="text-sm text-gray-600 dark:text-gray-400">Delivery Type: {deliveryType}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Devices: {screens}</p> 
       {/* <p className="text-sm text-gray-600 dark:text-gray-400">Audiences: {audiences.map(item => <>{item}</>) || `Not Selected`}</p>   */}
          {(<p className="text-sm text-gray-600 dark:text-gray-400 flex flex-col items-center" >Audiences: {audiences.length !== 0 && audiences.map(item => (<>{item + ', '}</>))}</p>)|| (<p className="text-sm text-gray-600 dark:text-gray-400 " >Audiences: Not Selected Any</p>)}
          </div>

   
  );
}
