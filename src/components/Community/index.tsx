import { Link } from 'react-router-dom';

const Community = () => {
  return (
    <div className="w-full md:px-52 px-0 md:pt-44 pt-28 pb-16">
      <div className="flex w-full md:rounded-3xl relative md:h-[40vh] items-center justify-center md:p-0 p-8">
        <div className="w-full h-full absolute md:rounded-3xl left-0 top-0 bg-gradient-to-br from-[#1E40AF] to-[#701A75] z-10"></div>
        <div className="flex flex-col gap-8 md:w-[55%] w-full z-20">
          <span className="font-bold md:text-[60px] text-center text-white text-[50px] max-w-full md:leading-[80px] leading-[70px]">
            Join the community today
          </span>
          <p className="leading-7 text-white text-center">
            Are you passionate about the future of advertising and technology?
            Join our vibrant ad tech community where industry professionals,
            innovators, and enthusiasts come together to share insights, trends,
            and opportunities. Connect with like-minded individuals, participate
            in engaging discussions, and stay ahead of the curve in the dynamic
            world of ad tech. Whether you're a seasoned expert or just starting
            out, there's a place for you here. Let's shape the future of
            advertising together!
          </p>

          <button className="bg-blue-600 text-white rounded-lg px-8 h-12 max-w-[180px] self-center whitespace-nowrap">
            <Link to={'/auth/sign-up'}>Sign Up For Free</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
