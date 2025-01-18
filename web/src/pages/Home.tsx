import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Sparkles, PenLine, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicNavbar } from '@/components/PublicNavBar';
import { Contact } from '@/components/Contact';
import { About } from '@/components/About';

export default function Home() {
  const currentYear = new Date().getFullYear();
  return (
    <div className='min-h-screen bg-gradient-to-b from-background via-background to-muted/20'>
      <PublicNavbar />

      {/* Hero Section */}
      <section className='container px-8 mx-auto pt-32 pb-20'>
        <div className='max-w-5xl mx-auto text-center space-y-8'>
          <div className='inline-flex items-center justify-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full animate-fade-in'>
            <Leaf className='h-5 w-5' />
            <span className='text-sm font-medium'>Welcome to IG.Blog</span>
          </div>
          <h1 className='text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight'>
            <span className='bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
              Inspire
            </span>{' '}
            <span className='bg-gradient-to-l from-foreground to-foreground/70 bg-clip-text text-transparent'>
              and Grow
            </span>
          </h1>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
            Join a vibrant community where stories come to life. Share your
            voice, discover new perspectives, and grow together.
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-6'>
            <Button
              size='lg'
              className='rounded-full px-8 h-14 text-lg group relative overflow-hidden transition-transform hover:scale-105'
              asChild
            >
              <Link to='/register'>
                Start Your Journey
                <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
              </Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='rounded-full px-8 h-14 text-lg group hover:bg-primary/5'
              asChild
            >
              <Link to='/explore'>
                Explore Stories
                <Sparkles className='ml-2 h-5 w-5 group-hover:rotate-12 transition-transform' />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className='container px-8 mx-auto py-20'>
        <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          <div className='group p-8 rounded-3xl bg-background/50 border backdrop-blur-sm hover:bg-primary/5 transition-colors'>
            <div className='mb-6 p-3 rounded-2xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors'>
              <PenLine className='h-6 w-6 text-primary' />
            </div>
            <h3 className='text-2xl font-semibold mb-3'>Express Yourself</h3>
            <p className='text-muted-foreground leading-relaxed'>
              Create beautiful blog posts with our intuitive editor. Customize
              your space and let your creativity flow.
            </p>
          </div>
          <div className='group p-8 rounded-3xl bg-background/50 border backdrop-blur-sm hover:bg-primary/5 transition-colors'>
            <div className='mb-6 p-3 rounded-2xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors'>
              <Users className='h-6 w-6 text-primary' />
            </div>
            <h3 className='text-2xl font-semibold mb-3'>Connect & Engage</h3>
            <p className='text-muted-foreground leading-relaxed'>
              Join meaningful discussions, receive valuable feedback, and build
              lasting connections with fellow writers.
            </p>
          </div>
          <div className='group p-8 rounded-3xl bg-background/50 border backdrop-blur-sm hover:bg-primary/5 transition-colors'>
            <div className='mb-6 p-3 rounded-2xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors'>
              <Zap className='h-6 w-6 text-primary' />
            </div>
            <h3 className='text-2xl font-semibold mb-3'>Grow Your Audience</h3>
            <p className='text-muted-foreground leading-relaxed'>
              Reach readers worldwide and build your personal brand through
              authentic storytelling and engagement.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />
      {/* Contact Section */}
      <Contact />

      {/* CTA Section */}
      <section className='container px-8 mx-auto py-20'>
        <div className='max-w-4xl mx-auto text-center space-y-8'>
          <h2 className='text-3xl md:text-4xl font-bold'>
            Ready to Share Your Story?
          </h2>
          <p className='text-lg text-muted-foreground'>
            Join our community of writers and start sharing your unique
            perspective with the world.
          </p>
          <Button
            size='lg'
            className='rounded-full px-8 h-14 text-lg group relative overflow-hidden'
            asChild
          >
            <Link to='/register'>
              Get Started
              <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
            </Link>
          </Button>
        </div>
      </section>
      <footer className='mb-8 text-center text-gray-500 text-xs sm:text-sm'>
        <p>© {currentYear} IG.Blog Manager. All rights reserved.</p>
        <p className='m-2'>
          Crafted with <span className='text-red-500'>♥</span> by Achraf EL
          GHAZI
        </p>
      </footer>
    </div>
  );
}
