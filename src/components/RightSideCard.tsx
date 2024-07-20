/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FjARN1dfpRz
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { BsCalendar } from 'react-icons/bs';
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
import { LuSettings } from 'react-icons/lu';

export default function RightSideCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Campaign Estimate</CardTitle>
          <div className="flex items-center gap-2">
            <BsCalendar className="h-5 w-5 text-muted-foreground" />
            <LuSettings className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="border-b">
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly">
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl, eget
              aliquam nisl nisl sit amet nisl.
            </p>
          </TabsContent>
          <TabsContent value="daily">
            <p className="text-muted-foreground">
              Donec auctor, nisl vel tincidunt lacinia, nisl nisl aliquam nisl,
              eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel
              tincidunt lacinia.
            </p>
          </TabsContent>
        </Tabs>
        <div className="mt-4">
          <h3 className="text-lg font-medium">Impressions</h3>
          <p className="text-muted-foreground">
            Budget range: ${new Intl.NumberFormat().format(24400)} -$
            {new Intl.NumberFormat().format(56500)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
