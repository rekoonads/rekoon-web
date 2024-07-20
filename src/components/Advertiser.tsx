import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../components/ui/dropdown-menu';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { RiAdvertisementFill } from 'react-icons/ri';
import {
  Building,
  BuildingIcon,
  ChevronDownIcon,
  CurrencyIcon,
  InfoIcon,
} from 'lucide-react';

export default function Advertiser() {
  return (
    <div className="space-y-6 p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Card className="border border-gray-200 rounded-lg w-full">
            <CardHeader className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <RiAdvertisementFill className="w-5 h-5 text-primary" />
                <CardTitle className="text-sm font-medium text-primary">
                  Advertiser
                </CardTitle>
                <InfoIcon className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <Building className="w-10 h-10 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">yashika</div>
                  <div className="text-sm text-muted-foreground">
                    Business - https://taare.rekoon.tech/
                  </div>
                </div>
              </div>
              <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuItem>
            <div className="flex items-center space-x-4">
              <BuildingIcon className="w-10 h-10 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">yashika</div>
                <div className="text-sm text-muted-foreground">
                  Business - https://taare.rekoon.tech/
                </div>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Card className="border border-gray-200 rounded-lg">
        <CardHeader className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <CurrencyIcon className="w-5 h-5 text-primary" />
            <CardTitle className="text-sm font-medium text-primary">
              Campaign Budget
            </CardTitle>
            <InfoIcon className="w-4 h-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <RadioGroup defaultValue="daily">
            <div className="flex space-x-4">
              <div className="flex items-start space-x-2">
                <RadioGroupItem
                  value="daily"
                  id="daily"
                  className="w-5 h-5 rounded-full border-gray-300 checked:bg-primary checked:border-primary focus:ring-0"
                />
                <div>
                  <Label
                    htmlFor="daily"
                    className="text-sm font-medium leading-none"
                  >
                    Daily Budget
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Set a maximum amount of budget you are willing to spend per
                    day.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem
                  value="lifetime"
                  id="lifetime"
                  className="w-5 h-5 rounded-full border-gray-300 checked:bg-primary checked:border-primary focus:ring-0"
                />
                <div>
                  <Label
                    htmlFor="lifetime"
                    className="text-sm font-medium leading-none"
                  >
                    Lifetime Budget
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Set a maximum amount of budget you are willing to spend over
                    the lifetime of the campaign.
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Budget
              </label>
              <input
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
