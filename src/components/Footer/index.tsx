import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">
            <img
              src="/logo/Logo-01-removebg-preview.png"
              alt="logo"
              className="w-16 h-16"
            />
          </h1>
          <p className="mt-2 text-gray-600">
            where connections flourish, <br />
            dreams find a home, and possibilities become <br />a reality
          </p>
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
            <LinkedinIcon className="w-6 h-6 text-gray-600" />
            <MailIcon className="w-6 h-6 text-gray-600" />
            <InstagramIcon className="w-6 h-6 text-gray-600" />
            <TwitterIcon className="w-6 h-6 text-gray-600" />
            <FacebookIcon className="w-6 h-6 text-gray-600" />
          </div>
        </div>
        <div className="text-center md:text-left mt-8 md:mt-0">
          <h2 className="text-lg font-bold">Rekoon Technology INC.</h2>
          <p className="mt-2 text-gray-600">
            91 Spring board ,<br />
            Jhandewalan Delhi-110093,INDIA.
          </p>
          <div className="mt-4">
            <h3 className="text-lg font-bold">contact us</h3>
            {/* <p className="mt-2 text-gray-600">+91-8069451894</p> */}
            <p className="mt-2 text-gray-600"> contact@rekoonads.tech</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t pt-4 text-center text-gray-600">
        <p>
          © 2024 purple stack ventures private limited. all rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-gray-600 hover:underline">
            privacy policy
          </a>
          <a href="#" className="text-gray-600 hover:underline">
            terms and conditions
          </a>
          <a href="#" className="text-gray-600 hover:underline">
            refund policy
          </a>
        </div>
      </div>
    </footer>
  );
}
