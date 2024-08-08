import logo1 from '../assets/images/logo1.svg';
import heroImage from '../assets/images/hero.png';
import { ArrowRightIcon } from 'lucide-react';

const Hero = () => {
  const logos = [
    { id: 1, image: logo1 },
    { id: 2, image: logo1 },
    { id: 3, image: logo1 },
    { id: 4, image: logo1 },
  ];
  return (
    <div className="w-full md:h-[70vh] h-auto border-b border-slate-300 flex md:flex-row flex-col items-center justify-between gap-8 md:px-24 px-5 box-border md:py-0 py-5">
      <div className="flex flex-col gap-7">
        <span className="font-bold md:text-[75px] text-[50px] max-w-[650px] md:leading-[90px] leading-[70px]">
          Team projects, done well
        </span>
        <span className="leading-7 text-gray-600 md:max-w-[550px]">
          The only platform that gives your team all the tools needed to work
          together on their awesome projects.
        </span>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Enter your email"
            className="rounded-lg border border-slate-300 outline-none px-3 h-12 w-full"
          />
          <button className="bg-blue-600 text-white rounded-lg px-8 h-12 whitespace-nowrap">
            Sign Up For Free
          </button>
        </div>
        <div className="w-full bg-[#F1F5F9] rounded-lg py-5 flex items-center justify-between px-3">
          {logos.map((logo) => {
            return <img src={logo.image} key={logo.id} />;
          })}
        </div>
      </div>
      <img src={heroImage} className="md:w-[45%] w-[90%]" alt="heroImage" />
    </div>
    // <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
    //   <header className="flex justify-between items-center p-4">
    //     <div className="text-3xl font-bold text-purple-800">crib</div>
    //     <nav className="flex space-x-6">
    //       <a href="#" className="text-gray-600 hover:text-gray-800">
    //         for entrepreneurs
    //       </a>
    //       <a href="#" className="text-gray-600 hover:text-gray-800">
    //         for tenants
    //       </a>
    //       <a href="#" className="text-gray-600 hover:text-gray-800">
    //         for landlords
    //       </a>
    //     </nav>
    //     <button className="border border-purple-800 text-purple-800 px-4 py-2 rounded">
    //       sign-in/sign-up
    //     </button>
    //   </header>
    //   <main className="flex flex-col items-center text-center mt-8">
    //     <h1 className="text-5xl font-bold">
    //       the ultimate{' '}
    //       <span className="relative inline-block">
    //         <span className="relative z-10">property solution</span>
    //         <span className="absolute inset-0 bg-purple-200 rounded transform -skew-x-6 -skew-y-6" />
    //       </span>
    //     </h1>
    //     <p className="mt-4 text-lg text-gray-600">
    //       a digital ecosystem that connects landlords, tenants, and
    //       entrepreneurs
    //     </p>

    //     <div className="flex justify-center mt-12 space-x-8 lg:space-x-20">
    //       <div className="relative w-80 h-80 bg-white rounded-lg shadow-lg">
    //         <img
    //           src="/placeholder.svg"
    //           alt="For entrepreneurs"
    //           className="w-full h-full object-cover rounded-t-lg"
    //           width="320"
    //           height="320"
    //           style={{ aspectRatio: '320/320', objectFit: 'cover' }}
    //         />
    //         <div className="absolute bottom-0 left-0 right-0 p-4 bg-white rounded-b-lg">
    //           <p className="text-gray-800 font-semibold">for entrepreneurs</p>
    //           <ArrowRightIcon className="w-5 h-5 text-purple-800" />
    //         </div>
    //       </div>
    //       <div className="relative w-80 h-80 bg-white rounded-lg shadow-lg">
    //         <img
    //           src="/placeholder.svg"
    //           alt="For tenants"
    //           className="w-full h-full object-cover rounded-t-lg"
    //           width="320"
    //           height="320"
    //           style={{ aspectRatio: '320/320', objectFit: 'cover' }}
    //         />
    //         <div className="absolute bottom-0 left-0 right-0 p-4 bg-white rounded-b-lg">
    //           <p className="text-gray-800 font-semibold">for tenants</p>
    //           <ArrowRightIcon className="w-5 h-5 text-purple-800" />
    //         </div>
    //       </div>
    //       <div className="relative w-80 h-80 bg-white rounded-lg shadow-lg">
    //         <img
    //           src="/placeholder.svg"
    //           alt="For landlords"
    //           className="w-full h-full object-cover rounded-t-lg"
    //           width="320"
    //           height="320"
    //           style={{ aspectRatio: '320/320', objectFit: 'cover' }}
    //         />
    //         <div className="absolute bottom-0 left-0 right-0 p-4 bg-white rounded-b-lg">
    //           <p className="text-gray-800 font-semibold">for landlords</p>
    //           <ArrowRightIcon className="w-5 h-5 text-purple-800" />
    //         </div>
    //       </div>
    //     </div>
    //   </main>
    // </div>
  );
};

export default Hero;
