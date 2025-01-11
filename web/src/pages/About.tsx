'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function About() {
  const currentYear = new Date().getFullYear();

  return (
    <div className='min-h-screen px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32  bg-gradient-to-br from-gray-50 to-gray-200'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='container mx-auto max-w-4xl'
      >
        <h1 className='text-3xl sm:text-4xl  font-bold mt-4 sm:mt-7 mb-3 sm:mb-5 text-gray-800 text-center'>
          About IG.Blog Manager
        </h1>
        <div className='text-base sm:text-lg font-poppins font-light text-center mb-6 sm:mb-8 text-gray-800'>
          Empowering creators with powerful content management tools
        </div>

        <div className='mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:gap-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='relative group'
          >
            <div className='p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
              <h3 className='text-lg sm:text-xl font-semibold text-gray-800 text-center mb-4'>
                Our Mission
              </h3>
              <p className='text-sm sm:text-base text-gray-600 text-center'>
                IG.Blog Manager is here to transform how bloggers manage
                content. Our mission is to offer an intuitive, powerful platform
                that lets creators focus on what they do best — creating amazing
                content.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='relative group'
          >
            <div className='p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
              <h3 className='text-lg sm:text-xl font-semibold text-gray-800 text-center mb-4'>
                Key Features
              </h3>
              <ul className='space-y-2 text-sm sm:text-base text-gray-600 text-center'>
                <li>⚙️ Intuitive content organization</li>
                <li>🔍 Advanced SEO tools</li>
                <li>📝 Real-time collaboration</li>
                <li>🚀 Customizable workflows</li>
                <li>📊 Comprehensive analytics</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='mt-8 sm:mt-12 text-center'
        >
          <h2 className='text-xl sm:text-2xl font-semibold mb-4 text-gray-800'>
            Meet the Creator
          </h2>
          <div className='inline-block relative'>
            <img
              src='src/assets/ACHRAF EL GHAZI.jpg'
              alt='Achraf EL GHAZI'
              className='w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-gray-600 transform transition-all duration-300 hover:scale-95'
            />

            <motion.div
              className='absolute -bottom-2 -right-2 bg-teal-400 rounded-full p-1 sm:p-2'
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <code className='text-white text-xs font-bold'>{'{ }'}</code>
            </motion.div>
          </div>
          <h3 className='text-lg sm:text-xl font-semibold text-gray-800 mt-3'>
            Achraf EL GHAZI
          </h3>
          <p className='text-sm sm:text-base text-gray-600 mb-4'>
            Full-Stack Software Developer @neoCedrus & Creator of IG.Blog
            Manager
          </p>
          <div className='flex justify-center space-x-4'>
            <a
              href='https://github.com/AchrafELGhazi'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 hover:text-blue-500'
            >
              <Github size={20} className='sm:w-6 sm:h-6' />
            </a>
            <a
              href='https://www.linkedin.com/in/achraf-el-ghazi-16b8bb2a7/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 hover:text-blue-500'
            >
              <Linkedin size={20} className='sm:w-6 sm:h-6' />
            </a>
            <a
              href='mailto:a.elghazi@aui.ma'
              className='text-gray-600 hover:text-blue-500'
            >
              <Mail size={20} className='sm:w-6 sm:h-6' />
            </a>
          </div>
        </motion.div>

        <footer className='mt-8 sm:mt-12 text-center text-gray-500 text-xs sm:text-sm'>
          <p>© {currentYear} IG.Blog Manager. All rights reserved.</p>
          <p className='mt-2'>
            Crafted with <span className='text-red-500'>♥</span> by Achraf EL
            GHAZI
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
