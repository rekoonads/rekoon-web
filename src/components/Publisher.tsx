import workflowImage from '../assets/images/publisher.png';

const Publisher = () => {
  return (
    <div
      id="publisher"
      className="w-full md:pt-44 pt-36 md:px-24 px-5 flex md:flex-row flex-col items-center md:justify-around justify-center md:gap-0 gap-10 mt-24 mb-48"
    >
      <div className="flex flex-col gap-5 md:w-[35%] w-full">
        <span className="font-bold md:text-[75px] text-[50px] max-w-full md:leading-[90px] leading-[70px]">
          Publish your ads flawlessly
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
          <p className="flex items-center">
            ✅ <span className="ml-2">Content Curation</span>
          </p>
          <p className="flex items-center">
            ✅ <span className="ml-2">Audience Engagement</span>
          </p>
          <p className="flex items-center">
            ✅ <span className="ml-2">Revenue Generation</span>
          </p>
          <p className="flex items-center">
            ✅ <span className="ml-2">Platform Optimization</span>
          </p>
          <p className="flex items-center">
            ✅ <span className="ml-2">Data Insights</span>
          </p>
          <p className="flex items-center">
            ✅ <span className="ml-2">Brand Partnerships</span>
          </p>
        </div>
      </div>
      <img src={workflowImage} className="md:w-[55%] w-full shadow-xl" />
    </div>
  );
};

export default Publisher;
