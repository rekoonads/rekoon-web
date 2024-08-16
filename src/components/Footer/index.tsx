import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold">
            <img
              src="/logo/Logo-01-removebg-preview.png"
              alt="logo"
              className="w-16 h-16 mx-auto md:mx-0"
            />
          </h1>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            where connections flourish, <br />
            dreams find a home, and possibilities become <br />a reality
          </p>
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
            <LinkedinIcon className="w-6 h-6 text-gray-600 hover:text-blue-700 transition-colors" />
            <MailIcon className="w-6 h-6 text-gray-600 hover:text-blue-500 transition-colors" />
            <InstagramIcon className="w-6 h-6 text-gray-600 hover:text-pink-500 transition-colors" />
            <TwitterIcon className="w-6 h-6 text-gray-600 hover:text-blue-400 transition-colors" />
            <FacebookIcon className="w-6 h-6 text-gray-600 hover:text-blue-800 transition-colors" />
          </div>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-lg md:text-xl font-bold">
            Lemonade Digital Media Technology pvt limited. Rekoon Technology
            INC.
          </h2>
          {/* <p className="mt-2 text-gray-600 text-sm md:text-base">
            91 Spring Board,
            <br />
            Jhandewalan Delhi-110093, INDIA.
          </p> */}
          <div className="mt-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              contact@rekoonads.tech
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 border-t pt-4 text-center text-gray-600">
        <p className="text-sm md:text-base">
          © 2024 Lemonade Digital Media Technology pvt limited. All rights
          reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2 text-sm md:text-base">
          <a href="#" className="text-gray-600 hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 hover:underline">
            Terms and Conditions
          </a>
          <a href="#" className="text-gray-600 hover:underline">
            Refund Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
