import { UserContext } from '@/utils/UserContext';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      return baseLinks;
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
    <div className='relative top-7'>
      {/* User profile section - Positioned absolutely */}
      {username && (
        <div className='fixed top-7 right-[5%] z-50 flex flex-col gap-2'>
          <Link
            to='/profile'
            className='flex items-center gap-2 rounded-full bg-white px-4 py-2 hover:bg-gray-100 transition-all duration-300 shadow-lg'
          >
            {userInfo?.img && (
              <img
                src={userInfo.img}
                alt='Profile'
                className='w-8 h-8 rounded-full object-cover'
              />
            )}
            <span className='text-gray-600 font-medium'>{username}</span>
          </Link>
          <button
            onClick={logout}
            className='flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-300 hover:bg-gray-100 shadow-lg'
          >
            Logout
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <nav
        className={`sticky top-7 z-40 mx-[15%] h-20 rounded-3xl transition-all duration-300 ${
          isScrolled
            ? 'bg-white/20 backdrop-blur-md shadow-lg'
            : 'bg-white shadow-xl'
        }`}
      >
        <div className='mx-auto px-8 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex-shrink-0'>
              <Link to='/' className='flex items-center'>
                <svg
                  className='h-7 w-auto'
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
                <span className='ml-2 text-[22px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-600'>
                  IG.Blog
                </span>
              </Link>
            </div>
            <div className='md:hidden flex items-center'>
              <button
                className='text-gray-600 hover:text-gray-900'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
            <div className='hidden md:flex justify-center flex-1'>
              <div className='flex items-center gap-2'>
                {links.map(item => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className='group relative flex h-12 w-24 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:text-gray-900'
                  >
                    {item.name}
                  </Link>
                ))}
                {username && (
                  <Link
                    to='/NewBlogs'
                    className='group relative flex h-12 w-24 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:text-gray-900'
                  >
                    New Blog
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className='md:hidden absolute top-20 left-0 w-full bg-white p-6 rounded-xl shadow-lg'>
            <div className='flex flex-col w-full items-center'>
              {links.map(item => (
                <Link
                  key={item.name}
                  to={item.link}
                  className='py-3 text-gray-600 text-lg w-full font-medium hover:text-gray-900'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {username && (
                <>
                  <Link
                    to='/NewBlogs'
                    className='py-3 text-gray-600 text-lg w-full font-medium hover:text-gray-900'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    New Blog
                  </Link>
                  <Link
                    to='/profile'
                    className='py-3 text-gray-600 text-lg w-full font-medium hover:text-gray-900'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <a
                    onClick={logout}
                    className='py-3 text-gray-600 text-lg w-full font-medium hover:text-gray-900 cursor-pointer'
                  >
                    Logout
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
