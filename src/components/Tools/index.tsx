import toolsImage from '../../assets/image.png';

const Tools = () => {
  return (
    <div
      id="agency"
      className="w-full md:pt-44 pt-36 md:px-24 px-5 flex md:flex-row flex-col items-center md:justify-around justify-center md:gap-0 gap-10 mt-24 mb-48"
    >
      <div className="flex flex-col gap-5 md:w-[35%] w-full">
        <span className="font-bold md:text-[60px] text-[50px] max-w-full md:leading-[75px] leading-[70px]">
          Start your agency journey with Us
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
          <p className="flex items-center">
            ✅ <span className="ml-2">Strategic Expertise</span>
          </p>
          <p className="flex items-center">
            ✅ <span className="ml-2">Creative Excellence</span>
          </p>
          <p className="flex items-center">
            ✅ <span className="ml-2">Multichannel Integration</span>
          </p>
          <p className="flex items-center">
            ✅ <span className="ml-2">Technological Innovation</span>
          </p>
          <p className="flex items-center">
            ✅ <span className="ml-2">Performance Measurement</span>
          </p>
          <p className="flex items-center">
            ✅ <span className="ml-2">Building Brand Identity</span>
          </p>
        </div>
      </div>
      <img src={toolsImage} className="md:w-[50%] w-full shadow-xl" />
    </div>
  );
};

export default Tools;
