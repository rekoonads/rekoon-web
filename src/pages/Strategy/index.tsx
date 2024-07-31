import { TabsTrigger } from '@radix-ui/react-tabs';
import { ArrowUp, Redo2, Smartphone, Tablet, Tv } from 'lucide-react';
import { useEffect, useState } from 'react';
import Channels from '../../components/Apps&Channels';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CheckboxOne from '../../components/Checkboxes/CheckboxOne';
import DateSection from '../../components/DateSection';
import { Button } from '../../components/ui/button';
import { Tabs, TabsList } from '../../components/ui/tabs';

import { BsThunderboltFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { LuRadioReceiver } from 'react-icons/lu';
import { RiCheckFill } from 'react-icons/ri';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import RightSideCard from '../../components/RightSideCard';
import { Card, CardContent } from '../../components/ui/card';
import { GiBrain } from "react-icons/gi";
import { FaSearchDollar } from "react-icons/fa";
import { LuHeartHandshake } from "react-icons/lu";
import { FaGenderless } from "react-icons/fa";
import { FaPeopleArrows } from "react-icons/fa";
import { MdOutlineScreenshotMonitor } from "react-icons/md";

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
  const [selectedGender, setSelectedGender] = useState('Women');
  const [selectedDevice, setSelectedDevice] = useState('TV');
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleReset = () => {
    setSelectedTab('18-20');
    setSelectedGender('Women');
    setSelectedDevice('TV');
  };

  const handleCheckboxChange = (text: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCheckbox(text);
    } else {
      setSelectedCheckbox(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        setIsScrollingDown(true);
      } else if (currentScrollTop < lastScrollTop) {
        setIsScrollingDown(false);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

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
            <div className="flex gap-2 items-center border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <GiBrain className='text-[20px]' />
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
              <h3 className="flex gap-2 item-center font-medium text-black dark:text-white">
                <FaSearchDollar className='text-[20px]' />
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
            <div className=" flex gap-2 item-center border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <LuHeartHandshake className='text-[20px]'/>
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
          {isScrollingDown && (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-boxdark shadow-md flex justify-center">
              <Button variant={'outline'} className="gap-2">
                <ArrowUp /> Back to campaign settings
              </Button>
              <Button variant={'outline'} disabled>
                Continue to Summary
              </Button>
            </div>
          )}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex gap-1 item-center border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <FaGenderless className='text-[22px]' />
              <h3 className="font-medium text-black dark:text-white">
                
                Genders
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <Tabs
                value={selectedGender}
                onValueChange={setSelectedGender}
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
            <div className=" flex gap-2 item-center border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <FaPeopleArrows className='text-[20px]' />
              <h3 className="font-medium text-black dark:text-white">
                Audiences
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5 ">
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
              <div className="flex flex-col gap-5.5 p-6.5 overflow-y-scroll h-[50vh] pb-2 cursor-all-scroll">
              <CheckboxOne
                text="Arts & Entertainment"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Arts & Entertainment' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Books & Literature" />
                  <CheckboxOne text="Celebrity Fan/Gossip" />
                  <CheckboxOne text="Fine Art" />
                  <CheckboxOne text="Humor" />
                  <CheckboxOne text="Movies" />
                  <CheckboxOne text="Music" />
                  <CheckboxOne text="Television" />
                </div>
              )}
            
             
              <CheckboxOne
                text="Automotive"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Automotive' && (
                <div className='ml-2 flex flex-col gap-2'>
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
                </div>
              )}
              <CheckboxOne
                text="Business"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Business' && (
                <div className='ml-2 flex flex-col gap-2'>
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
                </div>
              )}
              <CheckboxOne
                text="Careers"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Careers' && (
                <div className='ml-2 flex flex-col gap-2'>
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
                </div>
              )}
              <CheckboxOne
                text="Education"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Education' && (
                <div className='ml-2 flex flex-col gap-2'>
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
                </div>
              )}
              <CheckboxOne
                text="Family & Parenting"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Family & Parenting' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Adoption" />
                  <CheckboxOne text="Babies & Toddlers" />
                  <CheckboxOne text="Daycare/Pre School" />
                  <CheckboxOne text="Family Intent" />
                  <CheckboxOne text="Parenting -K-6 Kids" />
                  <CheckboxOne text="Parenting teens" />
                  <CheckboxOne text="Pregnancy" />
                  <CheckboxOne text="Special Needs Kids" />
                  <CheckboxOne text="Eldcare" />
                </div>
              )}
              <CheckboxOne
                text="Health & Fitness"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Health & Fitness' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Exercise" />
                  <CheckboxOne text="ADD" />
                  <CheckboxOne text="AIDS/HIV" />
                  <CheckboxOne text="Allergies" />
                  <CheckboxOne text="Alternative Medicine" />
                  <CheckboxOne text="Arthritis" />
                  <CheckboxOne text="Asthma" />
                  <CheckboxOne text="Autism/PDD" />
                  <CheckboxOne text="Bipolar Disorder" />
                  <CheckboxOne text="Brain Tumor" />
                  <CheckboxOne text="Cancer" />
                  <CheckboxOne text="Cholesterol" />
                  <CheckboxOne text="Chronic Fatigue Syndrome" />
                  <CheckboxOne text="Chronic Pain" />
                  <CheckboxOne text="Deafness" />
                  <CheckboxOne text="Dental Care" />
                  <CheckboxOne text="Depression" />
                  <CheckboxOne text="Dermatology" />
                  <CheckboxOne text="Diabetes" />
                  <CheckboxOne text="Epilepsy" />
                  <CheckboxOne text="GERD/Acid Reflux" />
                  <CheckboxOne text="Headaches/Migraines" />
                  <CheckboxOne text="Heart Disease" />
                  <CheckboxOne text="Herbs for Health" />
                  <CheckboxOne text="Holistic Healing" />
                  <CheckboxOne text="IBS/Crohn’s Disease" />
                  <CheckboxOne text="Incest/Abuse Support" />
                  <CheckboxOne text="Incontinence" />
                  <CheckboxOne text="Infertility" />
                  <CheckboxOne text="Men’s Health" />
                  <CheckboxOne text="Nutrition" />
                  <CheckboxOne text="Orthopedics" />
                  <CheckboxOne text="Panic/Anxiety Disorders" />
                  <CheckboxOne text="Pediatrics" />
                  <CheckboxOne text="Physical Therapy" />
                  <CheckboxOne text="Psychology/Psychiatry" />
                  <CheckboxOne text="Senior Health" />
                  <CheckboxOne text="Sexuality" />
                  <CheckboxOne text="Sleep Disorders" />
                  <CheckboxOne text="Smoking Cessation" />
                  <CheckboxOne text="Substance Abuse" />
                  <CheckboxOne text="Thyroid Disease" />
                  <CheckboxOne text="Weight Loss" />
                  <CheckboxOne text="Women's Health" />
                </div>
              )}

              <CheckboxOne
                text="Hobbies & Interests"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Hobbies & Interests' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Art/Technology" />
                  <CheckboxOne text="Arts & Crafts" />
                  <CheckboxOne text="Beadwork" />
                  <CheckboxOne text="Bird-Watching" />
                  <CheckboxOne text="Board Games/Puzzles" />
                  <CheckboxOne text="Candle & Soap Making" />
                  <CheckboxOne text="Cuisine-Specific" />
                  <CheckboxOne text="Card Games" />
                  <CheckboxOne text="Chess" />
                  <CheckboxOne text="Cigars" />
                  <CheckboxOne text="Collecting" />
                  <CheckboxOne text="Comic Books" />
                  <CheckboxOne text="Drawing/Sketching" />
                  <CheckboxOne text="Freelance Writing" />
                  <CheckboxOne text="Genealogy" />
                  <CheckboxOne text="Getting Published" />
                  <CheckboxOne text="Guitar" />
                  <CheckboxOne text="Home Recording" />
                  <CheckboxOne text="Investors & Patents" />
                  <CheckboxOne text="Jewelry Making" />
                  <CheckboxOne text="Magic & Illusion" />
                  <CheckboxOne text="Needlework" />
                  <CheckboxOne text="Painting" />
                  <CheckboxOne text="Photography" />
                  <CheckboxOne text="Radio" />
                  <CheckboxOne text="Roleplaying Games" />
                  <CheckboxOne text="Sci-Fi & Fantasy" />
                  <CheckboxOne text="Scrapbooking" />
                  <CheckboxOne text="Screenwriting" />
                  <CheckboxOne text="Stamps & Coins" />
                  <CheckboxOne text="Video & Computer Games" />
                  <CheckboxOne text="Woodworking" />
                </div>
              )}
              <CheckboxOne
                text="Home & Garden"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Home & Garden' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Appliances" />
                  <CheckboxOne text="Entertaining" />
                  <CheckboxOne text="Environmental Safety" />
                  <CheckboxOne text="Gardening" />
                  <CheckboxOne text="Home Repair" />
                  <CheckboxOne text="Home Theater" />
                  <CheckboxOne text="Interior Decorating" />
                  <CheckboxOne text="Landscaping" />
                  <CheckboxOne text="Remodeling & Construction" />
                </div>
              )}
              <CheckboxOne
                text="Law, Government, & Politics"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Law, Government, & Politics' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Immigration" />
                  <CheckboxOne text="Legal Issues" />
                  <CheckboxOne text="U.S. Government Resources" />
                  <CheckboxOne text="Politics" />
                  <CheckboxOne text="Commentary" />
                </div>
              )}
              <CheckboxOne
                text="News"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'News' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="International News" />
                  <CheckboxOne text="National News" />
                  <CheckboxOne text="Local News" />=
                </div>
              )}
              <CheckboxOne
                text="Personal Finance"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Personal Finance' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Beginning Investing" />
                  <CheckboxOne text="Credit/Debt & Loans" />
                  <CheckboxOne text="Financial News" />
                  <CheckboxOne text="Financial Planning" />
                  <CheckboxOne text="Hedge Fund" />
                  <CheckboxOne text="Insurance" />
                  <CheckboxOne text="Investing" />
                  <CheckboxOne text="Mutual Funds" />
                  <CheckboxOne text="Options" />
                  <CheckboxOne text="Retirement Planning" />
                  <CheckboxOne text="Stocks" />
                  <CheckboxOne text="Tax Planning" />
                </div>
              )}
              <CheckboxOne
                text="Society"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Society' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Dating" />
                  <CheckboxOne text="Divorce Support" />
                  <CheckboxOne text="Gay Life" />
                  <CheckboxOne text="Marriage" />
                  <CheckboxOne text="Senior Living" />
                  <CheckboxOne text="Teens" />
                  <CheckboxOne text="Weddings" />
                  <CheckboxOne text="Ethnic Specific" />
                </div>
              )}
              <CheckboxOne
                text="Science"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Science' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Astrology" />
                  <CheckboxOne text="Biology" />
                  <CheckboxOne text="Chemistry" />
                  <CheckboxOne text="Geology" />
                  <CheckboxOne text="Paranormal Phenomena" />
                  <CheckboxOne text="Physics" />
                  <CheckboxOne text="Space/Astronomy" />
                  <CheckboxOne text="Geography" />
                  <CheckboxOne text="Botany" />
                  <CheckboxOne text="Weather" />
                </div>
              )}
              <CheckboxOne
                text="Pets"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Pets' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Aquariums" />
                  <CheckboxOne text="Birds" />
                  <CheckboxOne text="Cats" />
                  <CheckboxOne text="Dogs" />
                  <CheckboxOne text="Large Animals" />
                  <CheckboxOne text="Reptiles" />
                  <CheckboxOne text="Veterinary Medicine" />
                </div>
              )}
              <CheckboxOne
                text="Sports"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Sports' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Auto Racing" />
                  <CheckboxOne text="Baseball" />
                  <CheckboxOne text="Bicycling" />
                  <CheckboxOne text="Bodybuilding" />
                  <CheckboxOne text="Boxing" />
                  <CheckboxOne text="Canoeing/Kayaking" />
                  <CheckboxOne text="Cheerleading" />
                  <CheckboxOne text="Climbing" />
                  <CheckboxOne text="Cricket" />
                  <CheckboxOne text="Figure Skating" />
                  <CheckboxOne text="Fly Fishing" />
                  <CheckboxOne text="Football" />
                  <CheckboxOne text="Freshwater Fishing" />
                  <CheckboxOne text="Game & Fish" />
                  <CheckboxOne text="Golf" />
                  <CheckboxOne text="Horse Racing" />
                  <CheckboxOne text="Horses" />
                  <CheckboxOne text="Hunting/Shooting" />
                  <CheckboxOne text="Inline Skating" />
                  <CheckboxOne text="Martial Arts" />
                  <CheckboxOne text="Mountain Biking" />
                  <CheckboxOne text="NASCAR Racing" />
                  <CheckboxOne text="Olympics" />
                  <CheckboxOne text="Paintball" />
                  <CheckboxOne text="Power & Motorcycles" />
                  <CheckboxOne text="Pro Basketball" />
                  <CheckboxOne text="Pro Ice Hockey" />
                  <CheckboxOne text="Rodeo" />
                  <CheckboxOne text="Rugby" />
                  <CheckboxOne text="Running/Jogging" />
                  <CheckboxOne text="Sailing" />
                  <CheckboxOne text="Saltwater Fishing" />
                  <CheckboxOne text="Scuba Diving" />
                  <CheckboxOne text="Skateboarding" />
                  <CheckboxOne text="Snowboarding" />
                  <CheckboxOne text="Surfing/Body-Boarding" />
                  <CheckboxOne text="Swimming" />
                  <CheckboxOne text="Table Tennis/Ping-Pong" />
                  <CheckboxOne text="Tennis" />
                  <CheckboxOne text="Volleyball" />
                  <CheckboxOne text="Walking" />
                  <CheckboxOne text="Waterski/Wakeboard" />
                  <CheckboxOne text="World Soccer" />
                </div>
              )}
              <CheckboxOne
                text="Style & Fashion"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Style & Fashion' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Beauty" />
                  <CheckboxOne text="Body Art" />
                  <CheckboxOne text="Fashion" />
                  <CheckboxOne text="Jewelry" />
                  <CheckboxOne text="Clothing" />
                  <CheckboxOne text="Accessories" />
                </div>
              )}
              <CheckboxOne
                text="Technology & Computing"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Technology & Computing' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="3-D Graphics" />
                  <CheckboxOne text="Animation" />
                  <CheckboxOne text="Antivirus Software" />
                  <CheckboxOne text="C/C++" />
                  <CheckboxOne text="Cameras & Camcorders" />
                  <CheckboxOne text="Cell Phones" />
                  <CheckboxOne text="Computer Certification" />
                  <CheckboxOne text="Computer Networking" />
                  <CheckboxOne text="Computer Peripherals" />
                  <CheckboxOne text="Computer Reviews" />
                  <CheckboxOne text="Data Centers" />
                  <CheckboxOne text="Databases" />
                  <CheckboxOne text="Desktop Publishing" />
                  <CheckboxOne text="Desktop Video" />
                  <CheckboxOne text="Email" />
                  <CheckboxOne text="Graphics Software" />
                  <CheckboxOne text="Home Video/DVD" />
                  <CheckboxOne text="Internet Technology" />
                  <CheckboxOne text="Java" />
                  <CheckboxOne text="JavaScript" />
                  <CheckboxOne text="Mac Support" />
                  <CheckboxOne text="MP3/MIDI" />
                  <CheckboxOne text="Net Conferencing" />
                  <CheckboxOne text="Net for Beginners" />
                  <CheckboxOne text="Network Security" />
                  <CheckboxOne text="Palmtops/PDAs" />
                  <CheckboxOne text="PC Support" />
                  <CheckboxOne text="Portable" />
                  <CheckboxOne text="Entertainment" />
                  <CheckboxOne text="Shareware/Freeware" />
                  <CheckboxOne text="Unix" />
                  <CheckboxOne text="Visual Basic" />
                  <CheckboxOne text="Web Clip Art" />
                  <CheckboxOne text="Web Search" />
                  <CheckboxOne text="Windows" />
                </div>
              )}
              <CheckboxOne
                text="Travel"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Travel' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Adventure Trave" />
                  <CheckboxOne text="Africa" />
                  <CheckboxOne text="Air Travel" />
                  <CheckboxOne text="Australia & New Zealand" />
                  <CheckboxOne text="Bed & Breakfasts" />
                  <CheckboxOne text="Budget Travel" />
                  <CheckboxOne text="Business Travel" />
                  <CheckboxOne text="By US Locale" />
                  <CheckboxOne text="Camping" />
                  <CheckboxOne text="Canada" />
                  <CheckboxOne text="Caribbean" />
                  <CheckboxOne text="Cruises" />
                  <CheckboxOne text="Eastern Europe" />
                  <CheckboxOne text="Europe" />
                  <CheckboxOne text="France" />
                  <CheckboxOne text="Greece" />
                  <CheckboxOne text="Honeymoons/Getaways" />
                  <CheckboxOne text="Hotels" />
                  <CheckboxOne text="Italy" />
                  <CheckboxOne text="Japan" />
                  <CheckboxOne text="Mexico & Central America" />
                  <CheckboxOne text="National Parks" />
                  <CheckboxOne text="South America" />
                  <CheckboxOne text="Spas" />
                  <CheckboxOne text="Theme Parks" />
                  <CheckboxOne text="Traveling with Kids" />
                  <CheckboxOne text="United Kingdom" />
                </div>
              )}
              <CheckboxOne
                text="Real Estate"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Real Estate' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Apartments" />
                  <CheckboxOne text="Architects" />
                  <CheckboxOne text="Buying/Selling Homes" />
                </div>
              )}
              <CheckboxOne
                text="Shopping"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Shopping' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Contests & Freebies" />
                  <CheckboxOne text="Couponing" />
                  <CheckboxOne text="Comparison" />
                  <CheckboxOne text="Engines" />
                </div>
              )}
              <CheckboxOne
                text="Religion & Spirituality"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Religion & Spirituality' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Alternative Religions" />
                  <CheckboxOne text="Atheism/Agnosticism" />
                  <CheckboxOne text="Buddhism" />
                  <CheckboxOne text="Catholicism" />
                  <CheckboxOne text="Christianity" />
                  <CheckboxOne text="Hinduism" />
                  <CheckboxOne text="Islam" />
                  <CheckboxOne text="Judaism" />
                  <CheckboxOne text="Latter-Day Saints" />
                  <CheckboxOne text="Pagan/Wiccan" />
                </div>
              )}
              <CheckboxOne
                text="Uncategorized"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              <CheckboxOne
                text="Non-Standard Conten"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Non-Standard Content' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Unmoderated UGC" />
                  <CheckboxOne text="Extreme Graphic/Explicit Violence" />
                  <CheckboxOne text="Pornography" />
                  <CheckboxOne text="Profane Content" />
                  <CheckboxOne text="Hate Content" />
                  <CheckboxOne text="Under Construction" />
                  <CheckboxOne text="Incentivized" />
                </div>
              )}
              <CheckboxOne
                text="Illegal Content"
                className="font-bold"
                onChange={(text, isChecked) =>
                  handleCheckboxChange(text, isChecked)
                }
              />
              {selectedCheckbox === 'Illegal Content' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Illegal Content" />
                  <CheckboxOne text="Warez" />
                  <CheckboxOne text="Spyware/Malware" />
                  <CheckboxOne text="Copyright Infringemen" />
                </div>
              )}
              </div>
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
            <div className="flex gap-2 item-center border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <MdOutlineScreenshotMonitor className='text-[20px]' />
              <h3 className="font-medium text-black dark:text-white">
                Screens
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <Tabs
                value={selectedDevice}
                onValueChange={setSelectedDevice}
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

        <div className="flex flex-col gap-9 fixed right-5">
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
