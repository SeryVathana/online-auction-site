// import MaxWidthWrapper from './MaxWidthWrapper';

import { Link } from 'react-router-dom';
import MaxWidthWrapper from './MaxWidthWrapper';
import NavActions from './NavActions';

const NAVLINK = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Browse',
    to: '/browse',
  },
  {
    label: 'About',
    to: '/about',
  },
  {
    label: 'Contact',
    to: '/contact',
  },
];

const Header = () => {
  return (
    <div className=' bg-white sticky top-0 left-0 z-50  border-b border-b-gray-100 h-16 flex items-center'>
      <MaxWidthWrapper>
        <div className='flex items-center'>
          <Link to={'/'}>
            <h1 className=' text-xl text-blue-500 font-semibold mr-20'>auctionaire</h1>
          </Link>

          <nav className='hidden lg:flex lg:items-center lg:gap-10'>
            {NAVLINK.map((link) => {
              return (
                <Link key={link.label} to={link.to} className='transition-all hover:opacity-50'>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <NavActions />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Header;
