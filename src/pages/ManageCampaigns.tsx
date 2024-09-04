import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { MoreVertical, Clock } from 'lucide-react';

export default function ManageCampaign() {
  return (
    <div className="container mx-auto p-6 mt-6 bg-white shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground">
            Create campaigns and deliver your ads across channels.
          </p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Link to={'/campaign'}>+ Create campaign</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center p-4 border-b">
            <img
              src="/placeholder.svg?height=48&width=48"
              alt="Campaign thumbnail"
              width={48}
              height={48}
              className="rounded mr-4"
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">
                Test My first commercial
              </h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-2">Draft</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>Jul 18, 2024 - Jul 25, 2024</span>
              </div>
            </div>
            <div className="flex items-center">
              <Button className="bg-black text-white mr-2 hover:bg-slate-700">
                Continue editing
              </Button>
              <Button variant={'outline'}>View reports</Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 p-4 text-sm">
            <div>
              <div className="font-medium">Daily Budget</div>
              <div className="text-2xl font-bold">$100</div>
            </div>
            <div>
              <div className="font-medium">Spend</div>
              <div className="text-2xl font-bold">-</div>
            </div>
            <div>
              <div className="font-medium">Cost Per View</div>
              <div className="text-2xl font-bold">-</div>
            </div>
            <div>
              <div className="font-medium">Impressions</div>
              <div className="text-2xl font-bold">-</div>
            </div>
            <div>
              <div className="font-medium">Delivered on</div>
              <div className="text-2xl font-bold">-</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
