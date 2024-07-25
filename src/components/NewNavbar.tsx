import { Link } from 'react-router-dom';

const NavbarNew = () => {
  const links = [
    { title: 'Products', path: '/' },
    { title: 'Solutions', path: '/' },
    { title: 'Services', path: '/' },
    { title: 'Help Center', path: '/' },
    { title: 'Pricing', path: '/' },
  ];
  return (
    <div className="w-full h-24 px-5 flex items-center justify-between border-b border-slate-300">
      <span className="font-bold text-2xl">
        <img src="/logo/Logo4-01.png" width={120} height={60} />
      </span>
      <div className="md:flex hidden items-center gap-6">
        {links.map((link) => {
          return (
            <a
              className="font-medium text-[15px]"
              href={link.path}
              key={link.title}
            >
              {link.title}
            </a>
          );
        })}
      </div>
      <div className="flex items-center gap-5">
        <Link to="/auth/sign-in" className="text-blue-600 font-semibold">
          Log In
        </Link>
        <Link to={'/auth/sign-up'}>
          <button className="bg-blue-600 text-white rounded-lg w-40 h-12">
            Sign Up For Free
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavbarNew;
