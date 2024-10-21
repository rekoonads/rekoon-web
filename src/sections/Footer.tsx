import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="bg-[#1f1f1f] text-white text-sm py-10 text-center">
      <div className="container mx-auto px-4">
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-[linear-gradient(to_right,#f87bff,#fb92cf,#ffdd9b,#c2f0b1,,#2fd8fe)] before:absolute">
          <Image
            src="/logo/SWEVEN_LOGO.png"
            width={150}
            height={150}
            alt="my12twelve logo"
            className="relative"
          />
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <Link href="/about" className="hover:text-gray-300 transition-colors">
            About
          </Link>
          <Link
            href="/features"
            className="hover:text-gray-300 transition-colors"
          >
            Features
          </Link>
          <Link href="/help" className="hover:text-gray-300 transition-colors">
            Help
          </Link>
          <Link
            href="/careers"
            className="hover:text-gray-300 transition-colors"
          >
            Careers
          </Link>
          <a
            href="https://utfs.io/f/e4a9e629-d2b5-4c3c-b087-24bd8b8363e9-skm4rz.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            Privacy & Policy
          </a>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <a
            href="https://x.com/getsweven"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Twitter"
          >
            <Twitter className="w-6 h-6 hover:text-blue-400 transition-colors" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="w-6 h-6 hover:text-pink-400 transition-colors" />
          </a>
          <a
            href="https://www.linkedin.com/company/getsweven"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with us on LinkedIn"
          >
            <Linkedin className="w-6 h-6 hover:text-blue-700 transition-colors" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Subscribe to our YouTube channel"
          >
            <Youtube className="w-6 h-6 hover:text-red-600 transition-colors" />
          </a>
        </div>
        <div className="flex justify-center gap-6 mt-6">
          <address className="not-italic">Delhi, India 110055</address>
        </div>
      </div>
      <p className="mt-6">
        &copy; {new Date().getFullYear()} Lemonade Digital Media Technology Pvt
        Ltd. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
