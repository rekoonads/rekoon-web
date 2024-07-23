import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CampaignGoalSelector from '../../components/CampaignGoalSelector';
import Advertiser from '../../components/Advertiser';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import MultiSelect from '../../components/Forms/MultiSelect';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import RightSideCard from '../../components/RightSideCard';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

const Campaigns = () => {
  const [campaignName, setCampaignName] = useState('');
  const [campaignGoal, setCampaignGoal] = useState<string | null>(null);
  const [advertiser, setAdvertiser] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [selectInput, setSelectInput] = useState<string>('');

  const isFormValid = () => {
    console.log({
      campaignName,
      campaignGoal,
      advertiser,
      date,
      file,
      selectInput,
    });
    return (
      campaignName.length > 0 &&
      campaignGoal !== null &&
      advertiser !== null &&
      date !== null &&
      file !== null &&
      selectInput.length > 0
    );
  };

  return (
    <>
      <Breadcrumb pageName="Campaigns" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Campaign Name --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Campaign Name
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Name your campaign
                </label>
                <input
                  type="text"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* <!-- Campaign Goal --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Select your campaign goal
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <CampaignGoalSelector
                onSelect={(goal) => setCampaignGoal(goal)}
              />
            </div>
          </div>

          {/* <!-- Advertiser --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Advertiser
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <Advertiser onSelect={(adv) => setAdvertiser(adv)} />
            </div>
          </div>

          {/* <!-- Date Picker --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Time and date
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <DatePickerOne onDateSelect={setDate} />
            </div>
          </div>

          {/* <!-- File Upload --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                File upload
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  onChange={(e) =>
                    setFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Right Side Card --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-6.5">
              <RightSideCard />
            </div>
          </div>

          {/* <!-- Select Input --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Select Country
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SelectGroupOne
                label="Select the specific country"
                options={[
                  { value: 'india', label: 'India' },
                  { value: 'usa', label: 'USA' },
                  { value: 'uk', label: 'UK' },
                ]}
                onSelect={(selected) => setSelectInput(selected)}
              />
            </div>
          </div>

          {/* <!-- Go to Strategy Button --> */}
          <Button className="w-30 text-white" disabled={!isFormValid()}>
            <Link to={'/strategy'}>Go to Starategy</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Campaigns;
