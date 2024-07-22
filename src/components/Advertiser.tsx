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
import CheckboxTwo from './Checkboxes/CheckboxTwo';
import SelectGroupOne from './Forms/SelectGroup/SelectGroupOne';

export default function Advertiser() {
  return (
    <div className="space-y-6 p-4">
      <DropdownMenu>
        <div>
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
                <SelectGroupOne />
              </div>
              <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>
        <DropdownMenuContent className="w-full">
          <DropdownMenuItem></DropdownMenuItem>
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
          <div className="flex items-center gap-4">
            <CheckboxTwo />
            <CheckboxTwo />
          </div>

          <div className="flex flex-col gap-5.5">
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
