import { motion } from 'framer-motion';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Blog } from '@/utils/types';
import { Badge } from './ui/badge';

interface BlogCardProps {
  blog: Blog;
  index: number;
  variant?: 'full' | 'trending';
}

const BlogCard = ({ blog, index, variant = 'full' }: BlogCardProps) => {
  if (variant === 'trending') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className='mb-4 p-4 bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'
      >
        <h3 className='text-lg font-semibold mb-2'>{blog.title}</h3>
        <p className='text-sm text-muted-foreground mb-2'>{blog.summary}</p>
        <div className='flex justify-between items-center text-sm'>
          <span className='flex items-center'>
            <ThumbsUp className='w-4 h-4 mr-1 text-primary' />
            {blog.likes.length}
          </span>
          <Badge variant='secondary'>#{index + 1}</Badge>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className='bg-card text-card-foreground rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
    >
      <img
        src={'http://localhost:4000/' + blog.cover}
        alt={blog.title}
        className='w-full h-48 object-cover'
      />
      <div className='p-6'>
        <h3 className='text-xl font-semibold mb-2'>{blog.title}</h3>
        <p className='text-muted-foreground text-sm mb-4'>{blog.summary}</p>
        <div className='flex items-center justify-between text-sm text-muted-foreground'>
          <span>{blog.author.username}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        <div className='flex items-center justify-between mt-4 text-sm'>
          <div className='flex items-center space-x-4'>
            <span className='flex items-center'>
              <ThumbsUp className='w-4 h-4 mr-1 text-primary' />
              {blog.likes.length}
            </span>
            <span className='flex items-center'>
              <MessageCircle className='w-4 h-4 mr-1 text-primary' />
              {blog.comments.length}
            </span>
          </div>
          <Button variant='outline' size='sm'>
            Read More
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
