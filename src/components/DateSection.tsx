import React, { useState } from 'react';
import {
  ChevronUpIcon,
  ClockIcon,
  InfoIcon,
  RotateCcwIcon,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import SelectGroupOne from './Forms/SelectGroup/SelectGroupOne';

const defaultTimes = [
  { value: '12:00pm', label: '12:00pm' },
  { value: '1:00pm', label: '1:00pm' },
  { value: '2:00pm', label: '2:00pm' },
  { value: '3:00pm', label: '3:00pm' },
  { value: '4:00pm', label: '4:00pm' },
  { value: '5:00pm', label: '5:00pm' },
  { value: '6:00pm', label: '6:00pm' },
  { value: '7:00pm', label: '7:00pm' },
  { value: '8:00pm', label: '8:00pm' },
  { value: '9:00pm', label: '9:00pm' },
  { value: '10:00pm', label: '10:00pm' },
  { value: '11:00pm', label: '11:00pm' },
];

const startTimeOptions = defaultTimes;
const endTimeOptions = [
  { value: '11:59pm', label: '11:59pm' },
  { value: '12:00am', label: '12:00am' },
  { value: '1:00am', label: '1:00am' },
  { value: '2:00am', label: '2:00am' },
  { value: '3:00am', label: '3:00am' },
  { value: '4:00am', label: '4:00am' },
  { value: '5:00am', label: '5:00am' },
  { value: '6:00am', label: '6:00am' },
  { value: '7:00am', label: '7:00am' },
  { value: '8:00am', label: '8:00am' },
  { value: '9:00am', label: '9:00am' },
  { value: '10:00am', label: '10:00am' },
  { value: '11:00am', label: '11:00am' },
];

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

interface DaySettings {
  startTime: string;
  endTime: string;
  selected: boolean;
}

type DaySettingsState = {
  [key in (typeof daysOfWeek)[number]]: DaySettings;
};

const defaultDaySettings: DaySettings = {
  startTime: '12:00pm',
  endTime: '11:59pm',
  selected: true,
};

export default function DateSection() {
  const [daySettings, setDaySettings] = useState<DaySettingsState>(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = { ...defaultDaySettings };
      return acc;
    }, {} as DaySettingsState)
  );

  const handleSelectAnyTimeAnyDay = () => {
    const newDaySettings = { ...daySettings };
    daysOfWeek.forEach(day => {
      newDaySettings[day] = { ...defaultDaySettings, selected: true };
    });
    setDaySettings(newDaySettings);
  };

  const handleDayChange = (day: (typeof daysOfWeek)[number], changes: Partial<DaySettings>) => {
    setDaySettings(prevState => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        ...changes,
      },
    }));
  };

  const handleReset = () => {
    setDaySettings(
      daysOfWeek.reduce((acc, day) => {
        acc[day] = { ...defaultDaySettings };
        return acc;
      }, {} as DaySettingsState)
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center">
          <ClockIcon className="w-6 h-6 text-primary" />
          <h2 className="ml-2 text-lg font-semibold text-primary">
            Delivery Time Slots
          </h2>
          <span className="ml-2 text-sm text-muted-foreground">
            Any Time, Any Day
          </span>
        </div>
        <ChevronUpIcon className="w-6 h-6 text-muted-foreground" />
      </div>
      <div className="p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-700">
          <InfoIcon className="inline-block w-4 h-4 mr-2 text-blue-700" />
          Ads will be delivered in the respective timezone of the locations you
          targeted.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 my-4">
        <Button
          variant="outline"
          className="px-4 py-1"
          onClick={handleSelectAnyTimeAnyDay}
        >
          Any time, Any day
        </Button>
        <Button variant="outline" className="px-4 py-1">
          Primetime
        </Button>
        <Button variant="outline" className="px-4 py-1">
          After work
        </Button>
        <Button variant="outline" className="px-4 py-1">
          Work hours
        </Button>
        <Button variant="outline" className="px-4 py-1">
          Sleeping time
        </Button>
        <Button variant="outline" className="px-4 py-1">
          Weekend
        </Button>
        <Button variant="outline" className="px-4 py-1">
          Work days
        </Button>
      </div>
      <div className="space-y-4">
        {daysOfWeek.map(day => (
          <div
            key={day}
            className="flex items-center justify-between p-2 border rounded-md"
          >
            <div className="flex items-center">
              <Checkbox
                id={day.toLowerCase()}
                checked={daySettings[day].selected}
                onChange={e =>
                  handleDayChange(day, { selected: e.target.checked })
                }
              />
              <label
                htmlFor={day.toLowerCase()}
                className="ml-2 text-sm font-medium"
              >
                {day}
              </label>
            </div>
            <div className="flex items-center gap-2">
              <SelectGroupOne
                options={startTimeOptions}
                value={daySettings[day].startTime}
                onChange={value =>
                  handleDayChange(day, { startTime: value })
                }
              />
              <SelectGroupOne
                options={endTimeOptions}
                value={daySettings[day].endTime}
                onChange={value => handleDayChange(day, { endTime: value })}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-4">
        <Button variant="link" className="text-primary" onClick={handleReset}>
          <RotateCcwIcon className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
