import React, { useState, useEffect } from 'react';
import {
  ChevronUpIcon,
  ClockIcon,
  InfoIcon,
  RotateCcwIcon,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import DateSelectionComp from './DateSelectionComp';
import DateBox from './DateBox';

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

const resetAllDays = (): DaySettingsState => {
  return daysOfWeek.reduce((acc, day) => {
    acc[day] = { startTime: '12:00am', endTime: '12:00am', selected: false };
    return acc;
  }, {} as DaySettingsState);
};

interface DateSectionProps {
  daySettings: DaySettingsState;
  onDaySettingsChange: (newDaySettings: DaySettingsState) => void;
}

export default function DateSection({
  daySettings: initialDaySettings,
  onDaySettingsChange,
}: DateSectionProps) {
  const [daySettings, setDaySettings] =
    useState<DaySettingsState>(initialDaySettings);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    setDaySettings(initialDaySettings);
  }, [initialDaySettings]);

  useEffect(() => {
    onDaySettingsChange(daySettings);
  }, [daySettings, onDaySettingsChange]);

  const handleReset = () => {
    const resetSettings = resetAllDays();
    setDaySettings(resetSettings);
    setSelectedSlot(null);
    onDaySettingsChange(resetSettings);
  };

  const handleSelectAnyTimeAnyDay = () => {
    const newDaySettings = resetAllDays();
    daysOfWeek.forEach((day) => {
      newDaySettings[day] = {
        startTime: '12:00am',
        endTime: '11:59pm',
        selected: true,
      };
    });
    setDaySettings(newDaySettings);
    setSelectedSlot('Any time, Any day');
  };

  const handleSelectPrimetime = () => {
    const newDaySettings = resetAllDays();
    daysOfWeek.forEach((day) => {
      newDaySettings[day] = {
        startTime: '8:00pm',
        endTime: '11:00pm',
        selected: true,
      };
    });
    setDaySettings(newDaySettings);
    setSelectedSlot('Primetime');
  };

  const handleSelectAfterWork = () => {
    const newDaySettings = resetAllDays();
    (
      ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as Array<
        keyof DaySettingsState
      >
    ).forEach((day) => {
      newDaySettings[day] = {
        startTime: '6:00pm',
        endTime: '10:00pm',
        selected: true,
      };
    });
    setDaySettings(newDaySettings);
    setSelectedSlot('After work');
  };

  const handleSelectWorkHours = () => {
    const newDaySettings = resetAllDays();
    (
      ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as Array<
        keyof DaySettingsState
      >
    ).forEach((day) => {
      newDaySettings[day] = {
        startTime: '9:00am',
        endTime: '6:00pm',
        selected: true,
      };
    });
    setDaySettings(newDaySettings);
    setSelectedSlot('Work hours');
  };

  const handleSelectSleepingTime = () => {
    const newDaySettings = resetAllDays();
    daysOfWeek.forEach((day) => {
      newDaySettings[day] = {
        startTime: '10:00pm',
        endTime: '11:59pm',
        selected: true,
      };
    });
    setDaySettings(newDaySettings);
    setSelectedSlot('Sleeping time');
  };

  const handleSelectWeekend = () => {
    const newDaySettings = resetAllDays();
    newDaySettings['Saturday'] = {
      startTime: '12:00am',
      endTime: '11:59pm',
      selected: true,
    };
    newDaySettings['Sunday'] = {
      startTime: '12:00am',
      endTime: '11:59pm',
      selected: true,
    };
    setDaySettings(newDaySettings);
    setSelectedSlot('Weekend');
  };

  const handleSelectWorkDays = () => {
    const newDaySettings = resetAllDays();
    daysOfWeek.forEach((day) => {
      newDaySettings[day] = {
        startTime: '12:00am',
        endTime: '11:59pm',
        selected: true,
      };
    });
    setDaySettings(newDaySettings);
    setSelectedSlot('Work days');
  };

  const handleSelectCustomTime = () => {
    setSelectedSlot('Custom time');
  };

  const handleDayChange = (
    day: (typeof daysOfWeek)[number],
    changes: Partial<DaySettings>,
  ) => {
    setDaySettings((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        ...changes,
      },
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-4 gap-2">
        <div className="flex items-center relative left-1">
          {' '}
          <ClockIcon className="w-8 h-w-8 mr-2 text-blue-700" />
          <h3 className="text-lg font-medium text-blue-700">Date and Time</h3>
        </div>
         

        <p className="ml-4 text-sm text-blue-700 flex items-center">
          <InfoIcon className="w-4 h-4 mr-1" />
          Ads will be delivered in the respective timezone of the locations you
          targeted.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant="outline"
          className={`px-4 py-2 border rounded-lg ${
            selectedSlot === 'Any time, Any day'
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={handleSelectAnyTimeAnyDay}
        >
          Any time, Any day
        </Button>
        <Button
          variant="outline"
          className={`px-4 py-2 border rounded-lg ${
            selectedSlot === 'Primetime'
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={handleSelectPrimetime}
        >
          Primetime
        </Button>
        <Button
          variant="outline"
          className={`px-4 py-2 border rounded-lg ${
            selectedSlot === 'After work'
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={handleSelectAfterWork}
        >
          After work
        </Button>
        <Button
          variant="outline"
          className={`px-4 py-2 border rounded-lg ${
            selectedSlot === 'Work hours'
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={handleSelectWorkHours}
        >
          Work hours
        </Button>
        <Button
          variant="outline"
          className={`px-4 py-2 border rounded-lg ${
            selectedSlot === 'Sleeping time'
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={handleSelectSleepingTime}
        >
          Sleeping time
        </Button>
        <Button
          variant="outline"
          className={`px-4 py-2 border rounded-lg ${
            selectedSlot === 'Weekend'
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={handleSelectWeekend}
        >
          Weekend
        </Button>
        <Button
          variant="outline"
          className={`px-4 py-2 border rounded-lg ${
            selectedSlot === 'Work days'
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={handleSelectWorkDays}
        >
          Work days
        </Button>
        <Button
          variant="outline"
          className={`px-4 py-2 border rounded-lg ${
            selectedSlot === 'Custom time'
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={handleSelectCustomTime}
        >
          Custom time
        </Button>
      </div>
      <div className="space-y-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className={`flex items-center justify-between p-3 border rounded-lg ${
              selectedSlot !== 'Custom time' ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <div className="flex items-center">
              <DateBox
                id={day.toLowerCase()}
                checked={daySettings[day]?.selected}
                onChange={(e) =>
                  handleDayChange(day, { selected: e.target.checked })
                }
                disabled={selectedSlot !== 'Custom time'}
              />
              <label
                htmlFor={day.toLowerCase()}
                className={`ml-2 text-sm font-medium ${
                  selectedSlot !== 'Custom time'
                    ? 'text-gray-500'
                    : 'text-gray-700'
                }`}
              >
                {day}
              </label>
            </div>
            <div className="flex items-center gap-4">
              <DateSelectionComp
                options={startTimeOptions}
                value={daySettings[day]?.startTime}
                onChange={(value: string) =>
                  handleDayChange(day, { startTime: value })
                }
                disabled={selectedSlot !== 'Custom time'}
              />
              <DateSelectionComp
                options={endTimeOptions}
                value={daySettings[day]?.endTime}
                onChange={(value: string) =>
                  handleDayChange(day, { endTime: value })
                }
                disabled={selectedSlot !== 'Custom time'}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-4">
        <Button variant="link" className="text-blue-700" onClick={handleReset}>
          <RotateCcwIcon className="w-5 h-5 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
