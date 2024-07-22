import {
  ChevronUpIcon,
  ClockIcon,
  InfoIcon,
  PlusIcon,
  RotateCcwIcon,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../components/ui/select';

export default function DateSection() {
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
        <Button variant="outline" className="px-4 py-1">
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
        {[
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ].map((day) => (
          <div
            key={day}
            className="flex items-center justify-between p-2 border rounded-md"
          >
            <div className="flex items-center">
              <Checkbox id={day.toLowerCase()} defaultChecked />
              <label
                htmlFor={day.toLowerCase()}
                className="ml-2 text-sm font-medium"
              >
                {day}
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger
                  id={`${day.toLowerCase()}-start`}
                  aria-label="Start Time"
                  className="relative z-10"
                >
                  <SelectValue placeholder="12:00 am" />
                </SelectTrigger>
                <SelectContent className="absolute z-20 mt-2">
                  <SelectItem value="12:00 am">12:00 am</SelectItem>
                  <SelectItem value="1:00 am">1:00 am</SelectItem>
                  <SelectItem value="2:00 am">2:00 am</SelectItem>
                  <SelectItem value="3:00 am">3:00 am</SelectItem>
                  <SelectItem value="4:00 am">4:00 am</SelectItem>
                  <SelectItem value="5:00 am">5:00 am</SelectItem>
                  <SelectItem value="6:00 am">6:00 am</SelectItem>
                  <SelectItem value="7:00 am">7:00 am</SelectItem>
                  <SelectItem value="8:00 am">8:00 am</SelectItem>
                  <SelectItem value="9:00 am">9:00 am</SelectItem>
                  <SelectItem value="10:00 am">10:00 am</SelectItem>
                  <SelectItem value="11:00 am">11:00 am</SelectItem>
                  <SelectItem value="12:00 pm">12:00 pm</SelectItem>
                  <SelectItem value="1:00 pm">1:00 pm</SelectItem>
                  <SelectItem value="2:00 pm">2:00 pm</SelectItem>
                  <SelectItem value="3:00 pm">3:00 pm</SelectItem>
                  <SelectItem value="4:00 pm">4:00 pm</SelectItem>
                  <SelectItem value="5:00 pm">5:00 pm</SelectItem>
                  <SelectItem value="6:00 pm">6:00 pm</SelectItem>
                  <SelectItem value="7:00 pm">7:00 pm</SelectItem>
                  <SelectItem value="8:00 pm">8:00 pm</SelectItem>
                  <SelectItem value="9:00 pm">9:00 pm</SelectItem>
                  <SelectItem value="10:00 pm">10:00 pm</SelectItem>
                  <SelectItem value="11:00 pm">11:00 pm</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger
                  id={`${day.toLowerCase()}-end`}
                  aria-label="End Time"
                  className="relative z-10"
                >
                  <SelectValue placeholder="11:59 pm" />
                </SelectTrigger>
                <SelectContent className="absolute mt-2">
                  <SelectItem value="12:00 am">12:00 am</SelectItem>
                  <SelectItem value="1:00 am">1:00 am</SelectItem>
                  <SelectItem value="2:00 am">2:00 am</SelectItem>
                  <SelectItem value="3:00 am">3:00 am</SelectItem>
                  <SelectItem value="4:00 am">4:00 am</SelectItem>
                  <SelectItem value="5:00 am">5:00 am</SelectItem>
                  <SelectItem value="6:00 am">6:00 am</SelectItem>
                  <SelectItem value="7:00 am">7:00 am</SelectItem>
                  <SelectItem value="8:00 am">8:00 am</SelectItem>
                  <SelectItem value="9:00 am">9:00 am</SelectItem>
                  <SelectItem value="10:00 am">10:00 am</SelectItem>
                  <SelectItem value="11:00 am">11:00 am</SelectItem>
                  <SelectItem value="12:00 pm">12:00 pm</SelectItem>
                  <SelectItem value="1:00 pm">1:00 pm</SelectItem>
                  <SelectItem value="2:00 pm">2:00 pm</SelectItem>
                  <SelectItem value="3:00 pm">3:00 pm</SelectItem>
                  <SelectItem value="4:00 pm">4:00 pm</SelectItem>
                  <SelectItem value="5:00 pm">5:00 pm</SelectItem>
                  <SelectItem value="6:00 pm">6:00 pm</SelectItem>
                  <SelectItem value="7:00 pm">7:00 pm</SelectItem>
                  <SelectItem value="8:00 pm">8:00 pm</SelectItem>
                  <SelectItem value="9:00 pm">9:00 pm</SelectItem>
                  <SelectItem value="10:00 pm">10:00 pm</SelectItem>
                  <SelectItem value="11:00 pm">11:00 pm</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-4">
        <Button variant="link" className="text-primary">
          <RotateCcwIcon className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
