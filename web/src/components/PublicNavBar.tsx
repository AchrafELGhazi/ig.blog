import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function PublicNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('');

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveLink(`#${sectionId}`);
      closeMenu();
    }
  };

  return (
    <header className='fixed top-7 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4'>
      <div className='bg-background/80 backdrop-blur-lg rounded-full border'>
        <div className='container mx-auto'>
          <div className='flex h-16 items-center justify-between px-4'>
            <Link to='/' className='flex items-center space-x-3'>
              <Leaf className='h-6 w-6 text-primary' />
              <span className='text-lg font-semibold tracking-tight'>
                IG.Blog
              </span>
            </Link>

            <nav className='hidden md:flex items-center space-x-1'>
              <button
                onClick={() => scrollToSection('About')}
                className={`px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10 ${
                  activeLink === '#About' ? 'text-primary bg-primary/10' : ''
                }`}
              >
                About
              </button>
              <Link
                to='/Explore'
                className='px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10'
              >
                Explore
              </Link>
              <button
                onClick={() => scrollToSection('Contact')}
                className={`px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10 ${
                  activeLink === '#Contact' ? 'text-primary bg-primary/10' : ''
                }`}
              >
                Contact
              </button>
            </nav>

            <div className='flex items-center space-x-2'>
              <Button
                variant='ghost'
                size='sm'
                className='rounded-full'
                asChild
              >
                <Link to='/login'>Sign in</Link>
              </Button>
              <Button size='sm' className='rounded-full px-4' asChild>
                <Link to='/register'>Sign up</Link>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant='ghost'
                size='icon'
                className='md:hidden'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className='h-5 w-5' />
                ) : (
                  <Menu className='h-5 w-5' />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className='md:hidden py-4 px-2 space-y-2'>
              <button
                onClick={() => scrollToSection('About')}
                className='w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10'
              >
                About
              </button>
              <Link
                to='/Explore'
                className='block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10'
                onClick={closeMenu}
              >
                Explore
              </Link>
              <button
                onClick={() => scrollToSection('Contact')}
                className='w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10'
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
