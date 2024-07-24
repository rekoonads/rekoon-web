import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../components/ui/select';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../components/ui/table';
import { BarChartIcon, InfoIcon } from 'lucide-react';

export default function Report() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between p-4 border-b">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="#" className="hover:underline">
            Campaigns
          </Link>
          <span>›</span>
          <Link to="#" className="hover:underline">
            Test My first commercial
          </Link>
        </nav>
        <Button variant="outline" className="ml-auto">
          Jul 18, 2024 - Jul 24, 2024
        </Button>
      </header>
      <main className="p-4 space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Spend</CardTitle>
              <Select>
                <SelectTrigger className="text-muted-foreground">
                  <SelectValue placeholder="Spend" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spend">Spend</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">-</p>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Households</CardTitle>
              <Select>
                <SelectTrigger className="text-muted-foreground">
                  <SelectValue placeholder="Households" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="households">Households</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">-</p>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Impressions</CardTitle>
              <Select>
                <SelectTrigger className="text-muted-foreground">
                  <SelectValue placeholder="Impressions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="impressions">Impressions</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">-</p>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">CPM</CardTitle>
              <Select>
                <SelectTrigger className="text-muted-foreground">
                  <SelectValue placeholder="CPM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cpm">CPM</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">-</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col items-center justify-center p-8 border rounded-md">
          <BarChartIcon className="w-12 h-12 text-muted-foreground" />
          <p className="text-center text-muted-foreground">
            Reporting is only available once your campaign is launched.
          </p>
          <div className="flex items-center mt-4 space-x-2">
            <InfoIcon className="w-4 h-4 text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              Reports can take up to 2 hours to process data once the campaign
              is launched.
            </p>
          </div>
          <Button className="mt-4 text-white">Edit campaign</Button>
        </div>
        <div className="flex items-center justify-between p-4 border-t">
          <div className="flex space-x-4">
            <Button variant="secondary">Strategies</Button>
            <Button variant="ghost">Time</Button>
            <Button variant="ghost">Ads</Button>
            <Button variant="ghost">Screens</Button>
            <Button variant="ghost">Inventory</Button>
            <Button variant="ghost">Geography</Button>
            <Button variant="ghost">Age</Button>
            <Button variant="ghost">Gender</Button>
            <Button variant="ghost">Audiences</Button>
          </div>
          <div className="flex space-x-4">
            <Button variant="default" className="text-white">
              Edit columns
            </Button>
            <Button variant="outline">Download report</Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Spend</TableHead>
              <TableHead>Households</TableHead>
              <TableHead>Impressions</TableHead>
              <TableHead>CPM</TableHead>
              <TableHead>Completed</TableHead>
              <TableHead>Cost Per View</TableHead>
              <TableHead>View-Through Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
