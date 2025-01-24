import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Clock,
  MapPin,
  Send,
  Sparkles,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function Contact() {
  const [isMessageSent, setIsMessageSent] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    formData.append('access_key', '8e608923-e7e2-495a-97c8-093d6fd17840');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setIsMessageSent(true);
      e.currentTarget.reset();
    } else {
      console.log('Error', data);
      setIsMessageSent(false);
    }
  };

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('+212 698 20 45 60');
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Hide the popup after 2 seconds
  };
  const contactMethods = [
    {
      icon: <MessageSquare className='w-6 h-6' />,
      title: 'Chat with us',
      description: "We're here to help.",
      action: (
        <a
          href='mailto:a.elghazi@aui.ma'
          className='text-primary hover:text-primary/80'
        >
          a.elghazi@aui.ma
        </a>
      ),
    },
    {
      icon: <Clock className='w-6 h-6' />,
      title: '24/7 Support',
      description: 'Round the clock assistance',
      action: (
        <button
          onClick={handleCopy}
          className='text-primary hover:text-primary/80'
        >
          +212 698 20 45 60
        </button>
        
      ),
    },
    {
      icon: <MapPin className='w-6 h-6' />,
      title: 'Visit us',
      description: 'Ifrane, Morocco',
      action: (
        <a
          href='https://www.google.com/maps/search/?api=1&query=Ifrane,+Morocco'
          target='_blank'
          rel='noopener noreferrer'
          className='text-primary hover:text-primary/80'
        >
          Get directions
        </a>
      ),
    },
  ];

  
  return (
    <section className='container px-4 sm:px-6 lg:px-8 py-20 mx-auto'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center'
      >
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground'>
          Get in Touch{' '}
          <Sparkles className='inline-block w-8 h-8 text-primary' />
        </h2>
        <p className='text-base sm:text-lg text-muted-foreground mb-12'>
          We'd love to hear from you. Let's create something amazing together.
        </p>
      </motion.div>

      <div className='container mx-auto max-w-7xl'>
        <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 sm:mx-4 md:mx-20 lg:mx-0'>
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='relative group'
            >
              <div className='p-6 sm:p-8 bg-background/50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border'>
                <div className='inline-flex p-3 rounded-lg bg-primary/10 text-primary ring-4 ring-primary/5 group-hover:ring-primary/10 transition-all duration-300'>
                  {method.icon}
                </div>
                <h3 className='mt-4 text-xl font-semibold text-foreground'>
                  {method.title}
                </h3>
                <p className='mt-2 text-muted-foreground'>
                  {method.description}
                </p>
                <p className='mt-4 text-primary font-medium cursor-pointer hover:text-primary/80'>
                  {method.action}
                </p>
                {method.title === '24/7 Support' && isCopied && (
                  <div className='text-green-500 mt-2'>Number was copied!</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='max-w-xl mx-auto'
      >
        <form onSubmit={onSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-foreground mb-2'
            >
              Name
            </label>
            <Input
              type='text'
              id='name'
              name='name'
              placeholder='John Doe'
              required
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-foreground mb-2'
            >
              Email Address
            </label>
            <Input
              type='email'
              id='email'
              name='email'
              placeholder='john@example.com'
              required
            />
          </div>
          <div>
            <label
              htmlFor='message'
              className='block text-sm font-medium text-foreground mb-2'
            >
              Message
            </label>
            <Textarea
              id='message'
              name='message'
              rows={4}
              placeholder='Your message here...'
              required
            />
          </div>
          <Button type='submit' size='lg' className='w-full'>
            Send Message
            <Send className='ml-2 h-5 w-5' />
          </Button>
          <AnimatePresence>
            {isMessageSent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className='text-center mt-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg'
              >
                Message sent successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className='mt-16 text-center'
      >
        <h2 className='text-2xl font-semibold text-foreground mb-6'>
          Connect with Us
        </h2>
        <div className='flex justify-center space-x-6'>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href='https://github.com/AchrafELGhazi'
            target='_blank'
            rel='noopener noreferrer'
            className='p-3 bg-background rounded-full shadow-md text-muted-foreground hover:text-primary transition-colors duration-300'
          >
            <Github className='w-6 h-6' />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href='https://www.linkedin.com/in/achraf-el-ghazi-16b8bb2a7/'
            target='_blank'
            rel='noopener noreferrer'
            className='p-3 bg-background rounded-full shadow-md text-muted-foreground hover:text-primary transition-colors duration-300'
          >
            <Linkedin className='w-6 h-6' />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href='mailto:a.elghazi@aui.ma'
            className='p-3 bg-background rounded-full shadow-md text-muted-foreground hover:text-primary transition-colors duration-300'
          >
            <Mail className='w-6 h-6' />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
