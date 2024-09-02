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
import { useEffect, useState, useRef } from 'react';
import { Toast } from '@radix-ui/react-toast';

interface AdvertiserProps {
  onSelect: (advertiser: string) => void;
  adBud: (advertiser: string) => void;
  campBud: (advertiser: string) => void;
  budget: any;
}

export default function Advertiser({
  onSelect,
  adBud,
  campBud,
  budget,
}: AdvertiserProps) {
  const [calculatedBudget, setCalculatedBudget] = useState<string>('');
  const [selectBudType, setSelectBudType] = useState<string>('');
  const [advertiserBud, setAdvertiserBud] = useState<string>('');
  const [moneyValue, setMoneyValue] = useState<any>();

  console.log(budget);

  const calculateCampaignBudgetDaily = (budget: string) => {
    let budDailyData = Number(budget) * 7;
    return budDailyData;
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setMoneyValue(value);
  };
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectBudType(event.target.value);
    setSelectedOption(event.target.value);
    onSelect(event.target.value);
  };
  const advertiserBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdvertiserBud(event.target.value);
    campBud(String(calculatedBudget));
    adBud(String(event.target.value));
  };
  const campaignBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCalculatedBudget(event.target.value);
    campBud(calculatedBudget);
  };

  //money parsing
  useEffect(() => {
    if (moneyValue) {
      setAdvertiserBud(moneyValue);
      campBud(String(calculatedBudget));
      adBud(String(moneyValue));
    }
  }, [moneyValue]);

  //money blocker ui
  const [poper, setPoper] = useState<boolean>(true);
  useEffect(() => {
    if (advertiserBud < '5000') {
      setPoper(true);
    } else {
      setPoper(false);
    }
  }, [advertiserBud]);

  // before last part
  useEffect(() => {
    if (calculatedBudget) {
      campBud(String(calculatedBudget));
    }
  }, [calculatedBudget]);

  // last part


  useEffect(() => {
    if (selectBudType === 'Weekly Budget') {
      const weeklyData = calculateCampaignBudgetDaily(advertiserBud);
      setCalculatedBudget(String(weeklyData));
    } else if (selectBudType === 'Daily Budget') {
      setCalculatedBudget(String(advertiserBud));
    }
  }, [advertiserBud, selectBudType]);

  useEffect(() => {
    if (budget !== '0') {
      setCalculatedBudget(String(budget));
    }
  }, []);

  console.log(advertiserBud);
  console.log(calculatedBudget);
  console.log(selectBudType);
  return (
    <div className="space-y-6 p-4">
      <Card className="border-2 border-gray-300 rounded-lg w-full">
        <CardHeader className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-1">
            <RiAdvertisementFill className="text-blue-900 font-semibold  dark:text-white" />
            <CardTitle className="text-blue-900 font-semibold text-lg dark:text-white">
              Advertiser Budget
            </CardTitle>
            <InfoIcon className="w-4 h-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-between p-4">
          {/* <Toast/> */}
          <div className="flex items-center space-x-4 w-full">
            {advertiserBud !== '0' ? (
              <>
                <input
                  onChange={advertiserBudget}
                  value={budget || advertiserBud}
                  type="number"
                  min="5000"
                  placeholder="Minimum ₹5000"
                  className="block w-full px-3 py-2 rounded-md bg-slate-200 text-blue-900 font-semibold dark:bg-black dark:text-white shadow-md outline-none
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </>
            ) : budget !== '' ? (
              <>
                <input
                  onChange={advertiserBudget}
                  value={budget || advertiserBud}
                  type="number"
                  min="5000"
                  placeholder="Minimum ₹5000"
                  className="block w-full px-3 py-2 rounded-md bg-slate-200 text-blue-900 font-semibold dark:bg-black dark:text-white shadow-md outline-none
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-gray-300 rounded-lg">
        <CardHeader className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-1">
            <CurrencyIcon className="text-blue-900 font-sm  dark:text-white" />
            <CardTitle className="text-blue-900 font-semibold text-lg dark:text-white">
              Campaign Budget
            </CardTitle>
            <InfoIcon className="w-4 h-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4 ">
          <div className="flex items-center gap-1 justify-between">
            <div className="flex gap-2 items-center border rounded-xl text-sm px-3 py-5 relative left-1">
              <span className="text-blue-900 font-semibold dark:text-white">
                Weekly Budget
              </span>
              <input
                type="radio"
                name="budget"
                id="weekly-budget"
                className="w-[16px] h-[16px] checked:from-amber-600"
                value="Weekly Budget"
                checked={selectedOption === 'Weekly Budget'}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 items-center border rounded-xl text-sm px-4 py-5 relative right-5">
              <span className="text-blue-900 font-semibold dark:text-white">
                Daily Budget
              </span>
              <input
                type="radio"
                name="budget"
                id="daily-budget"
                className="w-[16px] h-[16px] checked:from-amber-600"
                value="Daily Budget"
                checked={selectedOption === 'Daily Budget'}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="mt-1 p-2 w-full text-center border-none outline-none rounded-md text-blue-900 font-semibold  dark:text-yellow-100 transition ">
              {budget !== ''
                ? '₹' + budget
                : advertiserBud === '' && selectBudType === ''
                ? 'Please Enter Advertisement Budget and Select The Budget Type'
                : advertiserBud && selectBudType === ''
                ? 'Please Select The Budget Type'
                : calculatedBudget === '' && selectBudType
                ? 'Please Enter Advertisement Budget'
                : calculatedBudget === '0'
                ? 'Please Enter Advertisement Budget'
                : '₹' + calculatedBudget}
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
