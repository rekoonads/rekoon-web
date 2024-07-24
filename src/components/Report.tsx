import React, { useState } from 'react';
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

type MenuType =
  | 'strategies'
  | 'time'
  | 'ads'
  | 'screens'
  | 'inventory'
  | 'geography'
  | 'age'
  | 'gender'
  | 'audiences';

const Report = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType | ''>('');
  const [activeInnerMenu, setActiveInnerMenu] = useState<string>('');

  const handleButtonClick = (menu: MenuType) => {
    setActiveMenu(menu);
    setActiveInnerMenu(''); // Reset inner menu when switching main menus
  };

  const handleInnerMenuClick = (item: string) => {
    setActiveInnerMenu(item);
  };

  const getMenuItems = (menu: MenuType) => {
    switch (menu) {
      case 'time':
        return ['Day', 'Hour of Day'];
      case 'inventory':
        return ['Apps & Channels', 'Live Sports'];
      case 'geography':
        return ['State', 'City', 'Zip Code', 'Metro'];
      case 'audiences':
        return ['Predefined Audiences', 'Custom Audiences'];
      default:
        return [];
    }
  };

  const menuItems: { label: string; type: MenuType }[] = [
    { label: 'Strategies', type: 'strategies' },
    { label: 'Time', type: 'time' },
    { label: 'Ads', type: 'ads' },
    { label: 'Screens', type: 'screens' },
    { label: 'Inventory', type: 'inventory' },
    { label: 'Geography', type: 'geography' },
    { label: 'Age', type: 'age' },
    { label: 'Gender', type: 'gender' },
    { label: 'Audiences', type: 'audiences' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between p-4 border-b">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/manage-advertise" className="hover:underline">
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
                  <SelectValue placeholder="Spend" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spend">Households</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">-</p>
            </CardContent>
          </Card>
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
          {/* Repeat other cards as in your original code */}
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
          <Button className="mt-4 text-white">
            <Link to={'/campaign'}>Edit campaign</Link>
          </Button>
        </div>
        <div className="flex items-center justify-between p-4 border-t">
          <div className="flex space-x-4">
            {menuItems.map((item) => (
              <Button
                key={item.type}
                variant={activeMenu === item.type ? 'default' : 'ghost'}
                className={activeMenu === item.type ? 'text-white' : ''}
                onClick={() => handleButtonClick(item.type)}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <div className="flex space-x-4">
            <Button variant="default" className="text-white">
              Edit columns
            </Button>
            <Button variant="outline">Download report</Button>
          </div>
        </div>
        {['time', 'inventory', 'geography', 'audiences'].includes(
          activeMenu,
        ) && (
          <div className="p-4">
            <div className="flex flex-wrap gap-1">
              {getMenuItems(activeMenu as MenuType).map((item, index) => (
                <Button
                  key={index}
                  variant={activeInnerMenu === item ? 'default' : 'ghost'}
                  className={`text-sm px-2 py-1 ${
                    activeInnerMenu === item ? 'text-white' : ''
                  }`}
                  style={{ minWidth: '80px' }} // Adjust width as needed
                  onClick={() => handleInnerMenuClick(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        )}
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
};

export default Report;
