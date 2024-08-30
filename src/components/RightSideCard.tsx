import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

interface RightSideCardProps {
  title: string;
  dailyEstimate: string;
  weeklyEstimate: string;
  impressionsRange: string;
  householdsRange: string;
  dailyBudget: string;
}

export default function RightSideCard({
  title,
  dailyEstimate,
  weeklyEstimate,
  impressionsRange,
  householdsRange,
  dailyBudget,
}: RightSideCardProps) {
  return (
    <Card className="w-full max-w-md rounded-lg flex flex-col p-5 gap-4">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Button variant="ghost" size="sm" className="p-2">
          <i className="icon-class-here" /> 
        </Button>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="daily">
          <TabsList className="grid w-full grid-cols-2 mb-5">
            <TabsTrigger value="weekly" className="border rounded-lg shadow-lg text-lg active:scale-75   mr-2 text-blue-900 font-semibold dark:text-slate-100">Weekly</TabsTrigger>
            <TabsTrigger value="daily" className="border rounded-lg shadow-lg text-lg active:scale-75 ml-2 text-blue-900 font-semibold dark:text-slate-100">Daily</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <p className="text-sm text-blue-900 font-semibold dark:text-slate-100">
              Based on your weekly budget of {weeklyEstimate}, your campaign estimated results are:
            </p>
            <div className="flex justify-between mt-4">
              {/* <div className="text-center">
                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">Impressions</h3>
                <p className="text-lg font-bold">{impressionsRange}</p>
              </div> */}
            </div>
          </TabsContent>

          <TabsContent value="daily">
            <p className="text-sm text-blue-900 font-semibold dark:text-slate-100">
              Based on your daily budget of {dailyBudget}, your campaign estimated results are:
            </p>
            <div className="flex justify-between mt-4">
              {/* <div className="text-center">
                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">Impressions</h3>
                <p className="text-lg font-bold">{impressionsRange}</p>
              </div> */}
              {/* <div className="text-center">
                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">Households</h3>
                <p className="text-lg font-bold">{householdsRange}</p>
              </div> */}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

    </Card>
  );
}
