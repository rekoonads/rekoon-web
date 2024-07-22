import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CalendarIcon, ClipboardPenIcon, PresentationIcon } from 'lucide-react';

export default function SummaryComponent() {
  return (
    <Card className="w-full max-w-lg p-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-blue-700">
          <PresentationIcon className="inline-block w-5 h-5 mr-2" />
          Campaign summary
        </CardTitle>
        <CardDescription>
          Review carefully your campaign details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">darksihsolu</p>
            <Button variant="ghost" className="p-0 text-sm text-blue-700">
              <ClipboardPenIcon className="inline-block w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="text-right">
            <p className="font-semibold">$100 daily budget</p>
          </div>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2" />
          <p>
            Between <span className="font-semibold">06/23/24</span> and the end
            date of your choice
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-semibold">Strategy #1</p>
          <div className="flex items-center justify-between">
            <p>3 Apps & Channels - TV - Entire US</p>
            <Button variant="ghost" className="p-0 text-sm text-blue-700">
              <ClipboardPenIcon className="inline-block w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <p>Deliverability forecast</p>
            <Badge variant="secondary" className="text-green-700">
              Excellent
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t">
        <p className="text-muted-foreground">Total campaign budget</p>
        <p className="text-lg font-semibold">$100/day</p>
      </CardFooter>
    </Card>
  );
}
