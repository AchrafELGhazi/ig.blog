import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: 'Home', link: '/' },
    { name: 'New Blog', link: '/NewBlogs' },
    { name: 'Blogs', link: '/Blogs' },
    { name: 'About', link: '/About' },
    { name: 'Contact', link: '/Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
  className={`sticky top-7 z-50 mx-[15%] h-20 rounded-3xl bg-white shadow-xl transition-all duration-300 ${
    isScrolled ? 'shadow-md backdrop-blur-md' : ''
  }`}
>
      <div className="mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <svg
                className="h-7 w-auto"
                viewBox="0 0 100 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 30L30 10M30 10V25M30 10H15"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M40 10L60 30M60 30H45M60 30V15"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M70 10V30M70 20H90M90 10V30"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0"
                    y1="0"
                    x2="100"
                    y2="40"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4F46E5" />
                    <stop offset="1" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="ml-2 text-[22px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-600">
                IG.Blog
              </span>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
          <div className="hidden md:flex justify-center flex-1">
            <div className="flex items-center gap-2">
              {links.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className="group relative flex h-12 w-24 items-center justify-center rounded-full bg-gray-100/80 text-sm font-medium text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:text-gray-900"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-24" aria-hidden="true" />
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white p-6 rounded-xl shadow-lg">
          <div className="flex flex-col w-full items-center">
            {links.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="py-3 text-gray-600 text-lg w-full font-medium hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}