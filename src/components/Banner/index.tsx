import baloons from '../../assets/images/baloons.jpg';

const Banner = () => {
  return (
    <div className="w-full md:px-52 px-0 md:pt-44 pt-28">
      <div
        className="flex w-full md:rounded-3xl relative md:h-[50vh] items-center justify-between bg-cover bg-center md:p-0 p-8"
        style={{ backgroundImage: `url(${baloons})` }}
      >
        <div className="w-full h-full absolute md:rounded-3xl left-0 top-0 bg-[#581C87] opacity-75 z-10"></div>
        <div></div>
        <div className="flex flex-col gap-8 md:w-[55%] w-full z-20">
          <span className="font-bold md:text-[70px] text-white text-[50px] max-w-full md:leading-[80px] leading-[70px]">
            Innovate and Overcome: Master Problem-Solving in Ad Tech
          </span>
          <p className="leading-7 text-white md:max-w-[580px] max-w-[95%]">
            n the fast-evolving world of advertising technology, innovative
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
