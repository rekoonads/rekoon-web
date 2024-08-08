import { Link } from 'react-router-dom';

const Community = () => {
  return (
    <div className="w-full px-4 md:px-8 pt-12 md:pt-24 pb-8 md:pb-16">
      <div className="relative w-full h-[300px] md:h-[40vh] bg-gradient-to-br from-[#1E40AF] to-[#701A75] rounded-lg md:rounded-3xl overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF] to-[#701A75] z-10"></div>
        <div className="relative z-20 flex flex-col gap-6 md:gap-8 items-center text-center px-4 md:px-8">
          <span className="font-bold text-3xl md:text-5xl lg:text-6xl text-white leading-tight md:leading-[80px]">
            Join the community today
          </span>
          <p className="text-white text-sm md:text-base lg:text-lg max-w-full md:max-w-[700px] leading-relaxed">
            Are you passionate about the future of advertising and technology?
            Join our vibrant ad tech community where industry professionals,
            innovators, and enthusiasts come together to share insights, trends,
            and opportunities. Connect with like-minded individuals, participate
            in engaging discussions, and stay ahead of the curve in the dynamic
            world of ad tech. Whether you're a seasoned expert or just starting
            out, there's a place for you here. Let's shape the future of
            advertising together!
          </p>
          <button className="bg-blue-600 text-white rounded-lg px-6 md:px-8 py-2 md:py-3 max-w-[200px] self-center">
            <Link to={'/auth/sign-up'} className="block text-center">
              Sign Up For Free
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
