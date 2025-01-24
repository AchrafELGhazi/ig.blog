import { motion } from 'framer-motion';
import { ThumbsUp, MessageCircle, User, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Blog } from '@/utils/types';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  blog: Blog;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className='overflow-hidden hover:shadow-lg transition-all duration-300 bg-background/60 backdrop-blur-sm'>
        <div className='flex flex-col sm:flex-row'>
          {/* Image Section */}
          <div className='sm:w-48 h-48'>
            <img
              src={`http://localhost:4000/${blog.cover}`}
              alt={blog.title}
              className='w-full h-full object-cover'
            />
          </div>

          {/* Content Section */}
          <div className='flex-1 p-4 flex flex-col'>
            {/* Author Info */}
            <div className='flex items-center space-x-3 mb-3'>
              <Avatar className='h-8 w-8'>
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${blog.author.username}`}
                />
                <AvatarFallback>
                  <User className='h-4 w-4' />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='font-medium text-sm'>{blog.author.username}</p>
                <p className='text-xs text-muted-foreground'>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Blog Content */}
            <h3 className='text-lg font-semibold mb-2 line-clamp-1'>
              {blog.title}
            </h3>
            <p className='text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow'>
              {blog.summary}
            </p>

            {/* Tags */}
            <div className='flex flex-wrap gap-2 mb-4'>
              {blog.tags &&
                blog.tags[0]?.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className='text-xs bg-primary/10 text-primary px-2 py-1 rounded-full'
                  >
                    {tag.trim()}
                  </span>
                ))}
            </div>

            {/* Interaction Buttons */}
            <div className='flex items-center justify-between mt-auto'>
              <div className='flex items-center space-x-2'>
                <Button variant='ghost' size='sm' className='h-8 px-2'>
                  <ThumbsUp className='h-4 w-4 mr-1' />
                  <span className='text-xs'>{blog.likes.length}</span>
                </Button>
                <Button variant='ghost' size='sm' className='h-8 px-2'>
                  <MessageCircle className='h-4 w-4 mr-1' />
                  <span className='text-xs'>{blog.comments.length}</span>
                </Button>
                <Button variant='ghost' size='sm' className='h-8 px-2'>
                  <Eye className='h-4 w-4 mr-1' />
                  <span className='text-xs'>{blog.views.toString()}</span>
                </Button>
              </div>
              <Link to={`/Blog/${blog._id}`}>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-8 px-3 text-xs font-medium hover:bg-primary hover:text-primary-foreground'
                >
                  Read More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
