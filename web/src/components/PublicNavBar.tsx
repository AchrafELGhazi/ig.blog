import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PublicNavbar() {
  return (
    <header className='fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4'>
      <div className='bg-background/80 backdrop-blur-lg rounded-full border '>
        <div className='container mx-auto'>
          <div className='flex h-16 items-center justify-between px-4'>
            <Link to='/' className='flex items-center space-x-3'>
              <Leaf className='h-6 w-6 text-primary' />
              <span className='text-lg font-semibold tracking-tight'>
                IG.Blog
              </span>
            </Link>

            <nav className='hidden md:flex items-center space-x-1'>
              <Link
                to='/about'
                className='px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10'
              >
                About
              </Link>
              <Link
                to='/explore'
                className='px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10'
              >
                Explore
              </Link>
              <Link
                to='/contact'
                className='px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10'
              >
                Contact
              </Link>
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
