import { motion } from 'framer-motion';

export function About() {

  return (
    <section className=' px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-4xl mx-auto'
      >
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-foreground text-center'>
          About IG.Blog Manager
        </h2>
        <div className='text-sm sm:text-base md:text-lg font-light text-center mb-8 sm:mb-10 md:mb-12 text-muted-foreground'>
          Empowering creators with powerful content management tools
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='relative group'
          >
            <div className='h-full p-6 sm:p-8 bg-background/50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border'>
              <h3 className='text-lg sm:text-xl font-semibold text-foreground text-center mb-4'>
                Our Mission
              </h3>
              <p className='text-sm sm:text-base text-muted-foreground text-center'>
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
            <div className='h-full p-6 sm:p-8 bg-background/50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border'>
              <h3 className='text-lg sm:text-xl font-semibold text-foreground text-center mb-4'>
                Key Features
              </h3>
              <ul className='space-y-2 text-sm sm:text-base text-muted-foreground text-center'>
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
          className='mt-12 sm:mt-16 md:mt-20 text-center'
        >
          <h2 className='text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-foreground'>
            Meet the Creator
          </h2>
          <div className='inline-block relative'>
            <img
              src='/placeholder.svg'
              alt='Achraf EL GHAZI'
              className='w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-primary/20 transform transition-all duration-300 hover:scale-105'
            />

            <motion.div
              className='absolute -bottom-2 -right-2 bg-primary rounded-full p-2'
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <code className='text-primary-foreground text-xs font-bold'>
                {'{ }'}
              </code>
            </motion.div>
          </div>
          <h3 className='text-lg sm:text-xl font-semibold text-foreground mt-4'>
            Achraf EL GHAZI
          </h3>
          <p className='text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6'>
            Full-Stack Software Developer @neoCedrus & Creator of IG.Blog
            Manager
          </p>
         
        </motion.div>

       
      </motion.div>
    </section>
  );
}
