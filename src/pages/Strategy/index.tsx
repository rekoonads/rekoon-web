import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CheckboxFive from '../../components/Checkboxes/CheckboxFive';
import CheckboxFour from '../../components/Checkboxes/CheckboxFour';
import CheckboxOne from '../../components/Checkboxes/CheckboxOne';
import CheckboxThree from '../../components/Checkboxes/CheckboxThree';
import CheckboxTwo from '../../components/Checkboxes/CheckboxTwo';
import { TabsTrigger } from '@radix-ui/react-tabs';
import { ArrowUp, Check, Redo2, Smartphone, Tablet, Tv } from 'lucide-react';
import MultiSelect from '../../components/Forms/MultiSelect';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import { Button } from '../../components/ui/button';
import { Tabs, TabsList } from '../../components/ui/tabs';
import Channels from '../../components/Apps&Channels';
import DateSection from '../../components/DateSection';

import { FaInfoCircle, FaPlay } from 'react-icons/fa';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { IoMdRefreshCircle } from 'react-icons/io';
import { LuAirplay, LuRadioReceiver, LuSmartphone } from 'react-icons/lu';
import { Card, CardContent } from '../../components/ui/card';
import { BsThunderboltFill } from 'react-icons/bs';
import RightSideCard from '../../components/RightSideCard';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import { RiCheckFill } from 'react-icons/ri';

interface Goal {
  id: string;
  icon: React.ElementType[];
  title: string;
  description: string;
}

const goals: Goal[] = [
  {
    id: 'automatic',
    icon: [LuRadioReceiver],
    title: 'Automatic',
    description: 'I want to reach as many different viewers as possible.',
  },
  {
    id: 'manual',
    icon: [LuRadioReceiver],
    title: 'Manual',
    description: 'I want TV audiences to visit my website.',
  },
];

const Strategy = () => {
  const [selectedTab, setSelectedTab] = useState('18-20');
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);

  const handleReset = () => {
    setSelectedTab('18-20');
  };

  const handleCheckboxChange = (text: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCheckbox(text);
    } else {
      setSelectedCheckbox(null);
    }
  };

  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  return (
    <>
      <Breadcrumb pageName="Strategy" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Strategy Name
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <input
                  type="text"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>
          {/* <!-- Time and date --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Strategy Daily Budget
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <input
                  type="text"
                  placeholder="$100"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              $0.00 left in your total campaign budget
            </div>
          </div>
          {/* <!-- File upload --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Ages</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <Tabs
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="flex flex-col justify-between"
              >
                <TabsList className="space-x-4">
                  <TabsTrigger
                    value="18-20"
                    className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    18-20
                  </TabsTrigger>
                  <TabsTrigger
                    value="21-24"
                    className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    21-24
                  </TabsTrigger>
                  <TabsTrigger
                    value="25-34"
                    className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    25-34
                  </TabsTrigger>
                  <TabsTrigger
                    value="35-44"
                    className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    35-44
                  </TabsTrigger>
                  <TabsTrigger
                    value="45-54"
                    className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    45-54
                  </TabsTrigger>
                  <TabsTrigger
                    value="55-64"
                    className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    55-64
                  </TabsTrigger>
                  <TabsTrigger
                    value="64+"
                    className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    64+
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex justify-end">
                <Button
                  variant={'ghost'}
                  className="text-black gap-2"
                  onClick={handleReset}
                >
                  <Redo2 /> Reset
                </Button>
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex gap-5.5 p-6.5">
              <Button variant={'outline'} className="gap-2">
                <ArrowUp /> Back to campaign settings
              </Button>
              <Button variant={'outline'} disabled>
                Continue to Summary
              </Button>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Genders
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <Tabs
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="flex flex-col justify-between"
              >
                <TabsList className="space-x-4">
                  <TabsTrigger
                    value="women"
                    className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Women
                  </TabsTrigger>
                  <TabsTrigger
                    value="men"
                    className="px-4 py-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Men
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex justify-end">
                <Button
                  variant={'ghost'}
                  className="text-black gap-2"
                  onClick={handleReset}
                >
                  <Redo2 /> Reset
                </Button>
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Audiences
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  <h1 className="font-semibold">Predefined audiences</h1>
                  <p>Target audiences from their points of interest</p>
                </label>
                <input
                  type="text"
                  placeholder="🔍 Search for audience criteria"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <CheckboxOne
                text="Arts & Entertainment"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Arts & Entertainment' && (
                <>
                  <CheckboxOne text="Books & Literature" />
                  <CheckboxOne text="Celebrity Fan/Gossip" />
                  <CheckboxOne text="Fine Art" />
                  <CheckboxOne text="Humor" />
                  <CheckboxOne text="Movies" />
                  <CheckboxOne text="Music" />
                  <CheckboxOne text="Television" />
                </>
              )}
              <CheckboxOne
                text="Automotive"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Automotive' && (
                <>
                  <CheckboxOne text="Auto Parts" />
                  <CheckboxOne text="Auto Repair" />
                  <CheckboxOne text="Buying/Selling Cars" />
                  <CheckboxOne text="Car Culture" />
                  <CheckboxOne text="Certified Pre-Owned" />
                  <CheckboxOne text="Convertible" />
                  <CheckboxOne text="Coupe" />
                  <CheckboxOne text="Crossover" />
                  <CheckboxOne text="Diesel" />
                  <CheckboxOne text="Electric Vehicle" />
                  <CheckboxOne text="Hatchback" />
                  <CheckboxOne text="Hybrid" />
                  <CheckboxOne text="Luxury" />
                  <CheckboxOne text="Minivan" />
                  <CheckboxOne text="Motorcycles" />
                  <CheckboxOne text="Off-Road Vehicles" />
                  <CheckboxOne text="Permanent Vehicles" />
                  <CheckboxOne text="Pickup" />
                  <CheckboxOne text="Road-Side Assistance" />
                  <CheckboxOne text="Sedan" />
                  <CheckboxOne text="Trucks & Accessories" />
                  <CheckboxOne text="Vintage Cars" />
                  <CheckboxOne text="Wagon" />
                </>
              )}
              <CheckboxOne
                text="Business"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Business' && (
                <>
                  <CheckboxOne text="Advertising" />
                  <CheckboxOne text="Agriculture" />
                  <CheckboxOne text="Biotech/Biomedical" />
                  <CheckboxOne text="Business Software" />
                  <CheckboxOne text="Construction" />
                  <CheckboxOne text="Forestry" />
                  <CheckboxOne text="Government" />
                  <CheckboxOne text="Green Solutions" />
                  <CheckboxOne text="Human Resources" />
                  <CheckboxOne text="Logistics" />
                  <CheckboxOne text="Marketing" />
                  <CheckboxOne text="Metals" />
                </>
              )}
              <CheckboxOne
                text="Careers"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Careers' && (
                <>
                  <CheckboxOne text="Career Planning" />
                  <CheckboxOne text="College" />
                  <CheckboxOne text="Financial Aid" />
                  <CheckboxOne text="Job Fairs" />
                  <CheckboxOne text="Job Search" />
                  <CheckboxOne text="Resume Writing/Advice" />
                  <CheckboxOne text="Nursing" />
                  <CheckboxOne text="Scholarships" />
                  <CheckboxOne text="Telecommuting" />
                  <CheckboxOne text="Career Advice" />
                </>
              )}
              <CheckboxOne
                text="Education"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Education' && (
                <>
                  <CheckboxOne text="7-12 Education" />
                  <CheckboxOne text="Adult Education" />
                  <CheckboxOne text="Art History" />
                  <CheckboxOne text="College Administration" />
                  <CheckboxOne text="College Life" />
                  <CheckboxOne text="Distance Learning" />
                  <CheckboxOne text="English as a 2nd Language" />
                  <CheckboxOne text="Language Learning" />
                  <CheckboxOne text="Graduate School" />
                  <CheckboxOne text="Homeschooling" />
                  <CheckboxOne text="Homwork/Study Tips" />
                  <CheckboxOne text="K-6 Educators" />
                  <CheckboxOne text="Private School" />
                  <CheckboxOne text="Special Education" />
                  <CheckboxOne text="Studying Business" />
                </>
              )}
              <CheckboxOne
                text="Family & Parenting"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Family & Parenting' && (
                <>
                  <CheckboxOne text="Adoption" />
                  <CheckboxOne text="Babies & Toddlers" />
                  <CheckboxOne text="Daycare/Pre School" />
                  <CheckboxOne text="Family Intent" />
                  <CheckboxOne text="Parenting -K-6 Kids" />
                  <CheckboxOne text="Parenting teens" />
                  <CheckboxOne text="Pregnancy" />
                  <CheckboxOne text="Special Needs Kids" />
                  <CheckboxOne text="Eldcare" />
                </>
              )}
              <div className="border-t border-stroke py-4 px-6.5 dark:border-strokedark">
                <div className="flex items-center gap-2 justify-between font-medium text-black dark:text-white">
                  <h2>Audience located in</h2>
                  <Button variant={'outline'}>Upload ZIP codes in bulk</Button>
                </div>
                <div className="mt-4 mb-4">
                  <input
                    type="text"
                    placeholder="🔍 Search for audience criteria"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <input
                  type="text"
                  placeholder="India"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  variant={'ghost'}
                  className="text-black gap-2"
                  onClick={handleReset}
                >
                  <Redo2 /> Reset
                </Button>
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Screens
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <Tabs
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="flex flex-col justify-between"
              >
                <TabsList className="space-x-4">
                  <TabsTrigger
                    value="tv"
                    className="flex items-center gap-4 px-4 py-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    <Tv /> TV
                  </TabsTrigger>
                  <TabsTrigger
                    value="tablet"
                    className="flex items-center gap-4 px-4 py-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    <Tablet /> Tablet
                  </TabsTrigger>
                  <TabsTrigger
                    value="mobile"
                    className="flex items-center gap-4 px-4 py-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    <Smartphone /> Mobile
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex justify-end">
                <Button
                  variant={'ghost'}
                  className="text-black gap-2"
                  onClick={handleReset}
                >
                  <Redo2 /> Reset
                </Button>
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <Channels />
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <DateSection />
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-2">
                <BsThunderboltFill className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Bidding</h2>
                <FaInfoCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {goals.map((goal) => (
                  <Card
                    key={goal.id}
                    className={`border-2 ${
                      selectedGoal === goal.id
                        ? 'border-primary'
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleSelect(goal.id)}
                  >
                    <CardContent className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        {goal.icon.map((Icon, index) => (
                          <Icon
                            key={index}
                            className={`h-5 w-5 ${
                              selectedGoal === goal.id
                                ? 'text-primary'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <h3 className="text-base font-semibold">{goal.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {goal.description}
                      </p>
                      <a href="#" className="text-sm font-medium text-primary">
                        Learn more
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="border-t border-stroke py-4 px-6.5 dark:border-strokedark">
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-semibold">Advance Options</h2>
                  <FaInfoCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <SelectGroupOne label="Choose maximum ad frequency per household" />
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h2 className="font-medium text-black dark:text-white">
                Creatives
              </h2>
              <p className="mt-2 font-medium text-black dark:text-white">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure,
                necessitatibus.
              </p>
              <h3 className="mt-8 font-medium text-black dark:text-white text-lg">
                Guidelines for video creatives
              </h3>

              <div className="flex items-center gap-2">
                <RiCheckFill className="text-green-500" /> Resolutionn: 1080p
                (HD): 1920x1080
              </div>
              <div className="flex items-center gap-2">
                <RiCheckFill className="text-green-500" /> Aspect ratio: 16:9
              </div>
              <div className="flex items-center gap-2">
                <RiCheckFill className="text-green-500" /> Format: .mp4
              </div>
              <div className="flex items-center gap-2">
                <RiCheckFill className="text-green-500" /> Maximum file size: Up
                to 500MB
              </div>
              <div className="flex items-center gap-2">
                <RiCheckFill className="text-green-500" /> Length between 5 and
                30 seconds
              </div>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-6.5">
              <RightSideCard />
            </div>
          </div>
          <Button className="w-30 text-white">Go to Summary</Button>
        </div>
      </div>
    </>
  );
};

export default Strategy;
