import logo1 from '../assets/images/logo1.svg';
import heroImage from '../assets/images/hero.png';
import { ArrowRightIcon } from 'lucide-react';
import advertiser1 from '../../src/assets/images/advertiser1.jpg';
import advertiser2 from '../../src/assets/images/advertiser2.jpg';
import advertiser3 from '../../src/assets/images/advertiser3.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <header className="flex flex-col md:flex-row justify-between items-center p-4 md:p-8">
        <div className="mb-4 md:mb-0">
          <img src={logo1} alt="Logo" className="w-40 md:w-56 h-auto" />
        </div>
        <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <a
            href="#agency"
            className="text-gray-600 hover:text-gray-800 font-semibold text-lg md:text-base"
          >
            For Agencies
          </a>
          <a
            href="#advertiser"
            className="text-gray-600 hover:text-gray-800 font-semibold text-lg md:text-base"
          >
            For Advertisers
          </a>
          <a
            href="#publisher"
            className="text-gray-600 hover:text-gray-800 font-semibold text-lg md:text-base"
          >
            For Publishers
          </a>
        </nav>
        <button className="border border-purple-800 hover:bg-purple-800 hover:text-white text-purple-800 px-4 py-2 rounded mt-4 md:mt-0">
          <Link to={'/auth/sign-up'}>Sign In/Sign Up</Link>
        </button>
      </header>
      <main className="flex flex-col items-center text-center mt-10 md:mt-20 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
          Revolutionize{' '}
          <span className="relative inline-block">
            <span className="relative z-10">Your Advertising</span>
            <span className="absolute inset-0 bg-purple-300 rounded transform -skew-x-6 -skew-y-6" />
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl lg:text-2xl text-gray-600">
          Empowering Your Digital Presence | Smart Advertising Made Easy |
          Transforming Ads, Amplifying Impact | Innovate Your Ad Strategy
        </p>

        <div className="flex flex-wrap justify-center mt-12 md:mt-24 space-x-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md w-full sm:w-64 md:w-80 lg:w-96 transition-transform transform hover:scale-105 duration-300">
            <img
              src={advertiser1}
              alt="For agencies"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <a
                href="#agency"
                className="flex items-center justify-between text-gray-800 font-semibold"
              >
                <p>For Agencies</p>
                <ArrowRightIcon className="w-5 h-5 text-purple-800" />
              </a>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md w-full sm:w-64 md:w-80 lg:w-96 transition-transform transform hover:scale-105 duration-300">
            <img
              src={advertiser2}
              alt="For advertisers"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <a
                href="#advertiser"
                className="flex items-center justify-between text-gray-800 font-semibold"
              >
                <p>For Advertisers</p>
                <ArrowRightIcon className="w-5 h-5 text-purple-800" />
              </a>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md w-full sm:w-64 md:w-80 lg:w-96 transition-transform transform hover:scale-105 duration-300">
            <img
              src={advertiser3}
              alt="For publishers"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <a
                href="#publisher"
                className="flex items-center justify-between text-gray-800 font-semibold"
              >
                <p>For Publishers</p>
                <ArrowRightIcon className="w-5 h-5 text-purple-800" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
