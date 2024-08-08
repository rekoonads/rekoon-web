import toolsImage from '../../assets/image.png';

const Tools = () => {
  return (
    <div
      id="agency"
      className="w-full pt-12 md:pt-24 px-4 md:px-8 flex flex-col md:flex-row items-center md:justify-between justify-center gap-8 md:gap-12 mt-12 mb-24"
    >
      <div className="flex flex-col gap-6 md:w-1/2 w-full">
        <span className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight max-w-full">
          Start Your Agency Journey with Us
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
      <img
        src={toolsImage}
        className="md:w-1/2 w-full shadow-xl object-cover"
        alt="Tools"
      />
    </div>
  );
};

export default Tools;
