import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Sparkles, PenLine, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
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
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='container px-4 sm:px-6 lg:px-8 pt-32 pb-20 mx-auto'
      >
        <div className='max-w-5xl mx-auto text-center space-y-8'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='inline-flex items-center justify-center space-x-2 bg-primary/10 text-primary px-4 py-2 mt-0 sm:mt-10 rounded-full'
          >
            <Leaf className='h-5 w-5' />
            <span className='text-sm font-medium'>Welcome to IG.Blog</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight'
          >
            <span className='bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
              Inspire
            </span>{' '}
            <span className='bg-gradient-to-l from-foreground to-foreground/70 bg-clip-text text-transparent'>
              and Grow
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='text-base text-gray-600 sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'
          >
            Join a vibrant community where stories come to life. Share your
            voice, discover new perspectives, and grow together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-6'
          >
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
              <Link to='/Explore'>
                Explore Stories
                <Sparkles className='ml-2 h-5 w-5 group-hover:rotate-12 transition-transform' />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='container px-4 sm:px-6 lg:px-8 py-20 mx-auto'
      >
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {[
            {
              icon: PenLine,
              title: 'Express Yourself',
              description:
                'Create beautiful blog posts with our intuitive editor. Customize your space and let your creativity flow.',
            },
            {
              icon: Users,
              title: 'Connect & Engage',
              description:
                'Join meaningful discussions, receive valuable feedback, and build lasting connections with fellow writers.',
            },
            {
              icon: Zap,
              title: 'Grow Your Audience',
              description:
                'Reach readers worldwide and build your personal brand through authentic storytelling and engagement.',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className='group p-8 rounded-3xl bg-background/50 border backdrop-blur-sm hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1'
            >
              <div className='mb-6 p-3 rounded-2xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors'>
                <feature.icon className='h-6 w-6 text-primary' />
              </div>
              <h3 className='text-xl sm:text-2xl font-semibold mb-3'>
                {feature.title}
              </h3>
              <p className='text-muted-foreground leading-relaxed'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* About Section */}
      <div id='About'>
        <About />
      </div>

      {/* Contact Section */}
      <div id='Contact'>
        <Contact />
      </div>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='container px-4 sm:px-6 lg:px-8  mx-auto'
      >
        <div className='max-w-4xl mx-auto text-center space-y-8'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold'>
            Ready to Share Your Story?
          </h2>
          <p className='text-base sm:text-lg text-muted-foreground'>
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
      </motion.section>

      <footer className='container px-4 sm:px-6 lg:px-8 py-8 mx-auto text-center text-muted-foreground text-sm'>
        <p>© {currentYear} IG.Blog Manager. All rights reserved.</p>
        <p className='mt-2'>
          Crafted with <span className='text-red-500'>♥</span> by Achraf EL
          GHAZI
        </p>
      </footer>
    </div>
  );
}
