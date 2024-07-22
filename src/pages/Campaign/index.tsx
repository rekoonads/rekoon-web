import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

import Advertiser from '../../components/Advertiser';
import CampaignGoalSelector from '../../components/CampaignGoalSelector';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import MultiSelect from '../../components/Forms/MultiSelect';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import RightSideCard from '../../components/RightSideCard';
import { Button } from '../../components/ui/button';

const Campaigns = () => {
  return (
    <>
      <Breadcrumb pageName="Campaigns" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
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
                />
              </div>
            </div>
          </div>

          {/* <!-- Time and date --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Select your campaign goal
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <CampaignGoalSelector />
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Time and date
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <Advertiser />
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Time and date
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <DatePickerOne />
            </div>
          </div>

          {/* <!-- File upload --> */}
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
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Textarea Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-6.5">
              <RightSideCard />
            </div>
          </div>

          {/* <!-- Select input --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Select input
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SelectGroupTwo />
              <MultiSelect id="multiSelect" />
            </div>
          </div>
          <Button className="w-30 text-white">Go to Strategy</Button>
        </div>
      </div>
    </>
  );
};

export default Campaigns;
