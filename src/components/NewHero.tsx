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
      <header className="flex justify-between items-center p-4">
        <div>
          <img
            src="/logo/Logo4-01-removebg-preview.png"
            alt=""
            className="w-56 h-20"
          />
        </div>
        <nav className="flex space-x-6">
          <a
            href="#agency"
            className="text-gray-600 hover:text-gray-800 font-bold"
          >
            for agencies
          </a>
          <a
            href="#advertiser"
            className="text-gray-600 hover:text-gray-800 font-bold"
          >
            for advertisers
          </a>
          <a
            href="#publisher"
            className="text-gray-600 hover:text-gray-800 font-bold"
          >
            for publishers
          </a>
        </nav>
        <button className="border border-purple-800 hover:bg-purple-800 hover:text-white text-purple-800 px-4 py-2 rounded">
          <Link to={'/auth/sign-up'}>sign-in/sign-up</Link>
        </button>
      </header>
      <main className="flex flex-col items-center text-center mt-20">
        <h1 className="text-7xl font-bold">
          Revolutionize{' '}
          <span className="relative inline-block">
            <span className="relative z-10">Your Advertising</span>
            <span className="absolute inset-0 bg-purple-300 rounded transform -skew-x-6 -skew-y-6" />
          </span>
        </h1>
        <p className="mt-10 text-lg text-gray-600">
          Empowering Your Digital Presence Smart Advertising Made Easy
          Transforming Ads, Amplifying Impact Innovate Your Ad Strategy
        </p>

        <div className="flex justify-center mt-36 space-x-8 lg:space-x-20">
          <div className="bg-white border-[0.5px] border-grey-secondary rounded-xl h-fit z-10 sm:w-64 md:hover:scale-110 md:transition-all duration-1000">
            <img
              src={advertiser1}
              alt="For agencies"
              className="w-full h-full object-cover rounded-t-lg"
              width="300"
              height="238"
              style={{ aspectRatio: '320/320', objectFit: 'cover' }}
            />
            <div className="bottom-0 left-0 right-0 p-4 bg-white rounded-b-lg">
              <a href="#agency">
                <p className="text-gray-800 font-semibold">for agencies</p>
                <ArrowRightIcon className="w-5 h-5 text-purple-800" />
              </a>
            </div>
          </div>
          <div className="bg-white border-[0.5px] border-grey-secondary rounded-xl h-fit z-10 sm:w-64 md:hover:scale-110 md:transition-all duration-1000">
            <img
              src={advertiser2}
              alt="For advertisers"
              className="w-full h-full object-cover rounded-t-lg"
              width="320"
              height="320"
              style={{ aspectRatio: '320/320', objectFit: 'cover' }}
            />
            <div className="bottom-0 left-0 right-0 p-4 bg-white rounded-b-lg">
              <a href="#advertiser">
                <p className="text-gray-800 font-semibold">for advertisers</p>
                <ArrowRightIcon className="w-5 h-5 text-purple-800" />
              </a>
            </div>
          </div>
          <div className="bg-white border-[0.5px] border-grey-secondary rounded-xl h-fit z-10 sm:w-64 md:hover:scale-110 md:transition-all duration-1000">
            <img
              src={advertiser3}
              alt="For publishers"
              className="w-full h-full object-cover rounded-t-lg"
              width="320"
              height="320"
              style={{ aspectRatio: '320/320', objectFit: 'cover' }}
            />
            <div className="bottom-0 left-0 right-0 p-4 bg-white rounded-b-lg">
              <a href="#publisher">
                <p className="text-gray-800 font-semibold">for publishers</p>
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
