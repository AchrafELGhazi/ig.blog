import { UserContext } from '@/utils/UserContext';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { setUserInfo, userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch('http://localhost:3000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo({});
    navigate('/');
  };

  const getLinks = () => {
    const baseLinks = [
      { name: 'Home', link: '/' },
      { name: 'Blogs', link: '/Blogs' },
      { name: 'About', link: '/About' },
      { name: 'Contact', link: '/Contact' },
    ];

    if (username) {
      return [...baseLinks, { name: 'New Blog', link: '/NewBlogs' }];
    } else {
      return [
        ...baseLinks,
        { name: 'Login', link: '/Login' },
        { name: 'Register', link: '/Register' },
      ];
    }
  };

  const links = getLinks();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='fixed top-4 sm:top-7 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8'>
      <nav
        className={`mx-auto max-w-7xl rounded-2xl sm:rounded-3xl transition-all duration-300 ${
          isScrolled
            ? 'bg-white/20 backdrop-blur-md shadow-lg'
            : 'bg-white shadow-xl'
        }`}
      >
        <div className='px-2 sm:px-4 lg:px-8'>
          <div className='flex items-center justify-between h-16 sm:h-20'>
            <div className='flex-shrink-0'>
              <Link to='/' className='flex items-center'>
                <svg
                  className='h-8 w-auto'
                  viewBox='0 0 100 40'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10 30L30 10M30 10V25M30 10H15'
                    stroke='url(#gradient)'
                    strokeWidth='4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M40 10L60 30M60 30H45M60 30V15'
                    stroke='url(#gradient)'
                    strokeWidth='4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M70 10V30M70 20H90M90 10V30'
                    stroke='url(#gradient)'
                    strokeWidth='4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <defs>
                    <linearGradient
                      id='gradient'
                      x1='0'
                      y1='0'
                      x2='100'
                      y2='40'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stopColor='#4F46E5' />
                      <stop offset='1' stopColor='#06B6D4' />
                    </linearGradient>
                  </defs>
                </svg>
                <span className='ml-2 text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-600'>
                  IG.Blog
                </span>
              </Link>
            </div>
            <div className='hidden lg:flex justify-center flex-1'>
              <div className='flex items-center gap-1 sm:gap-2'>
                {links.map(item => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className='group relative flex h-9 sm:h-12 w-20 sm:w-24 items-center justify-center rounded-full bg-gray-200 text-xs sm:text-sm font-medium text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:text-gray-900'
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className='hidden lg:block'>
              {username ? (
                <div className='ml-4 flex items-center'>
                  <Link
                    to='/profile'
                    className='flex items-center gap-2 rounded-full bg-white px-3 sm:px-4 py-1 sm:py-2 text-sm hover:bg-gray-50 transition-all duration-300 shadow-lg'
                  >
                    {userInfo?.img && (
                      <img
                        src={userInfo.img}
                        alt='Profile'
                        className='w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover'
                      />
                    )}
                    <span className='text-gray-600 font-medium'>
                      {username}
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className='ml-2 sm:ml-3 flex items-center justify-center rounded-full bg-white px-3 sm:px-4 py-1 sm:py-2 text-sm font-medium text-gray-600 transition-all duration-300 hover:bg-gray-100 shadow-lg'
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
            <div className='flex lg:hidden items-center'>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className='p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 mr-2'
                aria-label='Toggle search'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                aria-label='Toggle menu'
              >
                <span className='sr-only'>Open main menu</span>
                {isMenuOpen ? (
                  <svg
                    className='block h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                ) : (
                  <svg
                    className='block h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isSearchOpen ? 'max-h-16' : 'max-h-0'
          }`}
        >
          <div className='px-2 pb-3'>
            <input
              type='search'
              placeholder='Search...'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <div className='px-2 pt-2 pb-3 space-y-1'>
            {links.map(item => (
              <Link
                key={item.name}
                to={item.link}
                className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {username && (
            <div className='pt-4 pb-3 border-t border-gray-200'>
              <div className='flex items-center px-5'>
                {userInfo?.img && (
                  <div className='flex-shrink-0'>
                    <img
                      className='h-10 w-10 rounded-full'
                      src={userInfo.img}
                      alt='Profile'
                    />
                  </div>
                )}
                <div className='ml-3'>
                  <div className='text-base font-medium text-gray-800'>
                    {username}
                  </div>
                </div>
              </div>
              <div className='mt-3 px-2 space-y-1'>
                <Link
                  to='/profile'
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
