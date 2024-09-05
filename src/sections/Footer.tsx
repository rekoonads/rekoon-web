import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#1f1f1f] text-white text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-[linear-gradient(to_right,#f87bff,#fb92cf,#ffdd9b,#c2f0b1,,#2fd8fe)] before:absolute">
          <img
            src={'/logo/SWEVEN_LOGO.png'}
            width={150}
            height={150}
            alt="SaaS logo"
            className="relative"
          />
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Help</a>
          <a href="#">Careers</a>

          <a
            href="https://utfs.io/f/e4a9e629-d2b5-4c3c-b087-24bd8b8363e9-skm4rz.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy & Policy
          </a>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <Twitter />
          <Instagram />
          <Linkedin />
          <Youtube />
        </div>
        <div className="flex justify-center gap-6 mt-6">Delhi India 110055</div>
      </div>
      <p className="mt-6">
        &copy; 2024 Lemonade Digital Media Technology Pvt Ltd. All rights
        reserved.
      </p>
    </footer>
  );
};
