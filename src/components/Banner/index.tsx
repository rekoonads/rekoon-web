import baloons from '../../assets/images/baloons.jpg';

const Banner = () => {
  return (
    <div className="w-full px-4 md:px-8 pt-12 md:pt-24">
      <div
        className="relative w-full h-[300px] md:h-[50vh] bg-cover bg-center rounded-lg md:rounded-3xl overflow-hidden flex items-center justify-center"
        style={{ backgroundImage: `url(${baloons})` }}
      >
        <div className="absolute inset-0 bg-[#581C87] opacity-75 z-10"></div>
        <div className="relative z-20 text-center md:text-left p-4 md:p-8">
          <span className="font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight md:leading-[80px]">
            Innovate and Overcome: Master Problem-Solving in Ad Tech
          </span>
          <p className="mt-4 text-white text-sm md:text-base lg:text-lg max-w-full md:max-w-[580px] mx-auto md:mx-0 leading-relaxed">
            In the fast-evolving world of advertising technology, innovative
            solutions are key to overcoming the unique challenges we face.
            Whether you're tackling issues related to ad targeting, campaign
            optimization, data privacy, or cross-channel integration, our
            community is here to support you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
