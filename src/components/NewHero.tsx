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
    // <div className="w-full md:h-[70vh] h-auto border-b border-slate-300 flex md:flex-row flex-col items-center justify-between gap-8 md:px-24 px-5 box-border md:py-0 py-5">
    //   <div className="flex flex-col gap-7">
    //     <span className="font-bold md:text-[75px] text-[50px] max-w-[650px] md:leading-[90px] leading-[70px]">
    //       Team projects, done well
    //     </span>
    //     <span className="leading-7 text-gray-600 md:max-w-[550px]">
    //       The only platform that gives your team all the tools needed to work
    //       together on their awesome projects.
    //     </span>
    //     <div className="flex items-center gap-3">
    //       <input
    //         type="text"
    //         placeholder="Enter your email"
    //         className="rounded-lg border border-slate-300 outline-none px-3 h-12 w-full"
    //       />
    //       <button className="bg-blue-600 text-white rounded-lg px-8 h-12 whitespace-nowrap">
    //         Sign Up For Free
    //       </button>
    //     </div>
    //     <div className="w-full bg-[#F1F5F9] rounded-lg py-5 flex items-center justify-between px-3">
    //       {logos.map((logo) => {
    //         return <img src={logo.image} key={logo.id} />;
    //       })}
    //     </div>
    //   </div>
    //   <img src={heroImage} className="md:w-[45%] w-[90%]" alt="heroImage" />
    // </div>
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-yellow-50">
      <header className="flex items-center justify-between px-8 py-4">
        <div className="text-2xl font-bold text-purple-800">crib</div>
        <nav className="flex space-x-8 text-gray-700">
          <a href="#" className="hover:underline">
            for entrepreneurs
          </a>
          <a href="#" className="hover:underline">
            for tenants
          </a>
          <a href="#" className="hover:underline">
            for landlords
          </a>
        </nav>
        <button className="px-4 py-2 font-semibold text-purple-800 border border-purple-800 rounded hover:bg-purple-800 hover:text-white">
          landlord sign-in
        </button>
      </header>
      <main className="flex flex-col items-center justify-center py-16 space-y-8">
        <h1 className="text-5xl font-bold text-center">
          the ultimate{' '}
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-purple-200 rounded-md -rotate-2" />
            <span className="relative">property solution</span>
          </span>
        </h1>
        <p className="text-lg text-center text-gray-700">
          a digital ecosystem that connects landlords, tenants, and
          entrepreneurs
        </p>

        <div className="flex justify-center space-x-8">
          <div className="relative p-4 bg-white rounded-lg shadow-lg">
            <img
              src="/placeholder.svg"
              alt="For Entrepreneurs"
              className="w-48 h-48 rounded-lg"
              width="200"
              height="200"
              style={{ aspectRatio: '200/200', objectFit: 'cover' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white rounded-b-lg">
              <span className="font-semibold">for entrepreneurs</span>
              <ArrowRightIcon className="inline-block ml-2 h-4 w-4" />
            </div>
          </div>
          <div className="relative p-4 bg-white rounded-lg shadow-lg">
            <img
              src="/placeholder.svg"
              alt="For Tenants"
              className="w-48 h-48 rounded-lg"
              width="200"
              height="200"
              style={{ aspectRatio: '200/200', objectFit: 'cover' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white rounded-b-lg">
              <span className="font-semibold">for tenants</span>
              <ArrowRightIcon className="inline-block ml-2 h-4 w-4" />
            </div>
          </div>
          <div className="relative p-4 bg-white rounded-lg shadow-lg">
            <img
              src="/placeholder.svg"
              alt="For Landlords"
              className="w-48 h-48 rounded-lg"
              width="200"
              height="200"
              style={{ aspectRatio: '200/200', objectFit: 'cover' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white rounded-b-lg">
              <span className="font-semibold">for landlords</span>
              <ArrowRightIcon className="inline-block ml-2 h-4 w-4" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
