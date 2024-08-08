import workflowImage from '../../assets/images/campaign.png';

const Workflow = () => {
  return (
    <div
      id="advertiser"
      className="w-full md:pt-44 pt-36 md:px-24 px-5 flex md:flex-row flex-col items-center md:justify-around justify-center md:gap-10 gap-5 mt-24 mb-48"
    >
      <img
        src={workflowImage}
        className="md:w-[50%] w-full md:order-1 order-2  shadow-xl"
        alt="Workflow"
      />
      <div className="flex flex-col gap-5 md:w-[35%] w-full md:order-2 order-1">
        <span className="font-bold md:text-[75px] text-[50px] max-w-full md:leading-[90px] leading-[70px]">
          Join Us as an Advertiser
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
          <p className="flex items-center">
            ✅ <span className="ml-2">Leverage Strategic Insights</span>
          </p>
          <p className="flex items-center">
            ✅ <span className="ml-2">Drive Creative Innovation</span>
          </p>
          <p className="flex items-center">
            ✅ <span className="ml-2">Expand Multichannel Reach</span>
          </p>
          <p className="flex items-center">
            ✅ <span className="ml-2">Technological Innovation</span>
          </p>
          <p className="flex items-center">
            ✅ <span className="ml-2">Adapt in Real-Time</span>
          </p>
          <p className="flex items-center">
            ✅ <span className="ml-2">Build Strong Brands</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Workflow;
