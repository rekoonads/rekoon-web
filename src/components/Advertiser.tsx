import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui/card';
import { RiAdvertisementFill } from 'react-icons/ri';
import { CurrencyIcon, InfoIcon } from 'lucide-react';
import CheckboxTwo from './Checkboxes/CheckboxTwo';
import SelectGroupOne from './Forms/SelectGroup/SelectGroupOne';
import CheckboxOne from './Checkboxes/CheckboxOne';

interface AdvertiserProps {
  onSelect: (advertiser: string) => void;
}

export default function Advertiser({ onSelect }: AdvertiserProps) {
  const handleSelect = (value: string) => {
    onSelect(value);
  };

  return (
    <div className="space-y-6 p-4">
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
          <div className="flex items-center space-x-4 w-full">
            <SelectGroupOne
              className="w-full" // Ensuring the dropdown takes the full width
              label="Budget"
              options={[
                { value: '100', label: '100' },
                { value: '200', label: '200' },
                { value: '300', label: '300' },
              ]}
              onSelect={handleSelect}
            />
          </div>
        </CardContent>
      </Card>

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
            <CheckboxOne text="Daily Budget" className="font-semibold" />
            <CheckboxOne text="Weekly Budget" className="font-semibold" />
          </div>

          <div className="flex flex-col gap-5.5">
            <div>
              <label className="mb-3 block text-black dark:text-white font-semibold">
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
