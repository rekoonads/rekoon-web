import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import logo from '../assets/logosaas.png';

export const Footer = () => {
  return (
    <footer className="bg-black text-[#bcbcbc] text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-[linear-gradient(to_right,#f87bff,#fb92cf,#ffdd9b,#c2f0b1,,#2fd8fe)] before:absolute">
          <img src={logo} height={40} alt="SaaS logo" className="relative" />
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Customers</a>
          <a href="#">Pricing</a>
          <a href="#">Help</a>
          <a href="#">Careers</a>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <Twitter />
          <Instagram />
          <Linkedin />
          <Youtube />
        </div>
      </div>
      <p className="mt-6">
        &copy; 2024 Your Companny, Inc. All rights reserved.
      </p>
    </footer>
  );
};
