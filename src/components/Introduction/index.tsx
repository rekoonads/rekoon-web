import intro1 from '../../assets/images/intro1.png';
import intro2 from '../../assets/images/intro2.png';
import intro3 from '../../assets/images/intro3.png';

const Introduction = () => {
  const images = [{ src: intro1 }, { src: intro2 }, { src: intro3 }];
  return (
    <div className="w-full pt-12 md:pt-20 px-4 md:px-8 flex flex-col md:flex-row items-center md:justify-between gap-8">
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        {images.map((image, index) => (
          <img
            src={image.src}
            key={index}
            className={`w-32 md:w-48 lg:w-56 ${
              index === 1 ? 'md:mt-[-40px]' : ''
            } object-cover`}
            alt={`Introduction ${index + 1}`}
          />
        ))}
      </div>
      <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg md:max-w-xl">
        <span className="font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
          Who We Are
        </span>
        <p className="mt-4 text-gray-600 text-sm md:text-base lg:text-lg">
          Welcome to Rekoon Ads, where technology meets creativity to
          revolutionize the advertising landscape. Our mission is to empower
          businesses with cutting-edge ad tech solutions that drive engagement,
          boost conversions, and deliver measurable results.
        </p>
        <a
          href="#"
          className="mt-4 text-blue-600 font-semibold text-sm md:text-base hover:underline"
        >
          See how it helped others
        </a>
      </div>
    </div>
  );
};

export default Introduction;
