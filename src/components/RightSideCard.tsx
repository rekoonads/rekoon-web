import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../components/ui/tabs';
import { BsCalendar } from 'react-icons/bs';
import { LuSettings } from 'react-icons/lu';

interface RightSideCardProps {
  title: string;
  tab1Label: string;
  tab1Content: string;
  tab2Label: string;
  tab2Content: string;
  campaignBudget: string;
  startTime: string;
  endTime: string
}

export default function RightSideCard({
  title,
  tab1Label,
  tab1Content,
  tab2Label,
  tab2Content,
  campaignBudget,
  startTime,
  endTime
}: RightSideCardProps) {
  return (
    <Card className="w-full max-w-md  rounded-lg  flex flex-col p-5 gap-4">
      <div className="flex items-center justify-between">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </div>
      {tab1Label && (
        <div className="flex items-center justify-between">
          <h3 className="text-xl text-blue-900 font-semibold dark:text-white">{tab1Label}</h3>
          <p className="text-blue-900 font-semibold dark:text-white text-sm mt-2">₹{tab1Content}</p>
        </div>
      )}

      {tab2Label && (
        <div className="flex items-center justify-center text-center">
          <h3 className="text-lg text-blue-900 font-semibold dark:text-white">{tab2Label}</h3>
        </div>
      )}
       {startTime && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-blue-900 font-semibold dark:text-white">Start Time :</h3>
          <p className="text-blue-900 font-semibold dark:text-white text-sm mt-2">{startTime}</p>
        </div>
      )}
       {endTime && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-blue-900 font-semibold dark:text-white">End Time :</h3>
          <p className="text-blue-900 font-semibold dark:text-white text-sm mt-2">{endTime}</p>
        </div>
      )}

      {campaignBudget && (
        <div className="mt-6 text-center flex items-center gap-4 justify-center">
          <h3 className="text-xl font-medium">Payable :</h3>
          <p className="text-blue-900 font-semibold dark:text-white text-sm mt-1">{campaignBudget}</p>
        </div>
      )}
    </Card>
  );
}
