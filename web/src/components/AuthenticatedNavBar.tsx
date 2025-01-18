import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Leaf,
  LogOut,
  Plus,
  Search,
  Settings,
  Menu,
  X,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserContext } from '@/utils/UserContext';

interface AuthenticatedNavbarProps {
  username: string;
  userImage?: string;
}

export default function AuthenticatedNavbar({
  username,
  userImage,
}: AuthenticatedNavbarProps) {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

const logout = async () => {
  try {
    const response = await fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });

    if (response.ok) {
      setUserInfo({});
      navigate('/');
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto max-w-7xl px-2 sm:px-4'>
        {/* Search Overlay for Mobile */}
        {isSearchOpen && (
          <div className='absolute inset-0 bg-background z-50 p-2'>
            <div className='flex items-center h-16 space-x-2'>
              <Button
                variant='ghost'
                size='icon'
                className='shrink-0'
                onClick={() => setIsSearchOpen(false)}
              >
                <X className='h-5 w-5' />
              </Button>
              <div className='relative w-full'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Search...'
                  className='pl-10 pr-4 py-2 w-full bg-muted/30 border-none focus:ring-2 focus:ring-primary/50 rounded-full text-sm'
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}

        <div className='flex h-14 sm:h-16 items-center justify-between'>
          {/* Logo and brand */}
          <div className='flex items-center'>
            <Link to='/Blogs' className='flex items-center space-x-2'>
              <Leaf className='h-5 w-5 sm:h-6 sm:w-6 text-primary' />
              <span className='font-bold text-base sm:text-lg text-foreground'>
                IG.Blog
              </span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className='hidden lg:block lg:flex-1 lg:mx-8'>
            <div className='relative max-w-2xl mx-auto'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search posts, topics, or users...'
                className='pl-10 pr-4 py-2 w-full bg-muted/30 border-none focus:ring-2 focus:ring-primary/50 rounded-full text-sm'
              />
            </div>
          </div>

          {/* Actions container */}
          <div className='flex items-center space-x-1 sm:space-x-4'>
            {/* Mobile Search Trigger */}
            <Button
              variant='ghost'
              size='icon'
              className='lg:hidden'
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className='h-5 w-5' />
            </Button>

            {/* Main actions - Tablet and up */}
            <div className='hidden sm:flex items-center space-x-1'>
              <Button
                variant='ghost'
                size='icon'
                className='text-muted-foreground hover:text-foreground'
                asChild
              >
                <Link to='/NewBlog'>
                  <Plus className='h-5 w-5' />
                </Link>
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='text-muted-foreground hover:text-foreground'
              >
                <Bell className='h-5 w-5' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='text-muted-foreground hover:text-foreground'
              >
                <Settings className='h-5 w-5' />
              </Button>
            </div>

            {/* User profile */}
            <Link to='/Profile'>
              <div className='flex items-center space-x-2 hover:bg-muted/50 py-1 px-1.5 rounded-lg'>
                <Avatar className='h-7 w-7 sm:h-8 sm:w-8 transition-transform hover:scale-110'>
                  <AvatarImage src={userImage} alt={username} />
                  <AvatarFallback>{username[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className='text-sm font-medium hidden md:inline-block'>
                  {username}
                </span>
              </div>
            </Link>

            {/* Logout button - Desktop only */}
            <Button
              variant='ghost'
              size='sm'
              onClick={logout}
              className='hidden md:flex items-center space-x-2 text-muted-foreground hover:text-foreground'
            >
              <LogOut className='h-4 w-4' />
              <span>Logout</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant='ghost'
              size='icon'
              className='sm:hidden'
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
          <div className='sm:hidden py-2 px-2 space-y-2 border-t'>
            <Button
              variant='ghost'
              size='sm'
              className='w-full justify-start text-muted-foreground hover:text-foreground'
              asChild
            >
              <Link to='/NewBlog' className='flex items-center'>
                <Plus className='h-5 w-5 mr-3' />
                New Post
              </Link>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='w-full justify-start text-muted-foreground hover:text-foreground'
            >
              <Bell className='h-5 w-5 mr-3' />
              Notifications
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='w-full justify-start text-muted-foreground hover:text-foreground'
            >
              <Settings className='h-5 w-5 mr-3' />
              Settings
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='w-full justify-start text-muted-foreground hover:text-foreground'
              onClick={logout}
            >
              <LogOut className='h-5 w-5 mr-3' />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
