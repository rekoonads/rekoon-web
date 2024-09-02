import { ArrowRight, MenuIcon } from 'lucide-react';
import Logo from '../assets/logosaas.png';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <img src={Logo} alt="Saas Logo" height={40} width={40} />
            <MenuIcon className="h-5 w-5 md:hidden" />
            <nav className="hidden md:flex gap-6 text-black font-bold items-center">
              <a href="#">About</a>
              <a href="#features">Features</a>
              <a href="#updates">Updates</a>
              <a href="#">Help</a>
              <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">
                <Link to={'/auth/sign-up'}>Sign Up For Free</Link>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
