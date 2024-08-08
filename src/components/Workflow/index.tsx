import workflowImage from '../../assets/images/campaign.png';

const Workflow = () => {
  return (
    <div
      id="advertiser"
      className="w-full pt-12 md:pt-24 px-4 md:px-8 flex flex-col md:flex-row items-center md:justify-between justify-center gap-8 md:gap-10 mt-12 mb-24"
    >
      <img
        src={workflowImage}
        className="md:w-1/2 w-full md:order-1 order-2 shadow-xl object-cover"
        alt="Workflow"
      />
      <div className="flex flex-col gap-6 md:w-1/2 w-full md:order-2 order-1">
        <span className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
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
