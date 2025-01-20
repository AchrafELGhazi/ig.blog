import { motion } from 'framer-motion';
import { TrendingUp, ThumbsUp } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Blog } from '@/utils/types';

interface TrendingBlogsProps {
  blogs: Blog[];
  isLoading: boolean;
  error: string | null;
}

const TrendingBlogs: React.FC<TrendingBlogsProps> = ({
  blogs,
  isLoading,
  error,
}) => {
  return (
    <Card className='rounded-xl overflow-hidden border shadow-lg'>
      <CardHeader>
        <h2 className='text-2xl font-bold flex items-center'>
          <TrendingUp className='mr-2 text-primary' />
          Trending Blogs
        </h2>
      </CardHeader>
      <CardContent className='p-4'>
        <ScrollArea className='h-[calc(100vh-250px)]'>
          {isLoading ? (
            <p className='text-center text-muted-foreground'>
              Loading trending posts...
            </p>
          ) : error ? (
            <p className='text-center text-red-500'>{error}</p>
          ) : (
            blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className='mb-4 p-4 bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'
              >
                <h3 className='text-lg font-semibold mb-2 line-clamp-2'>
                  {blog.title}
                </h3>
                <p className='text-sm text-muted-foreground mb-2 line-clamp-2'>
                  {blog.summary}
                </p>
                <div className='flex justify-between items-center text-sm'>
                  <span className='flex items-center'>
                    <ThumbsUp className='w-4 h-4 mr-1 text-primary' />
                    {blog.likes.length}
                  </span>
                  <Badge variant='secondary'>#{index + 1}</Badge>
                </div>
              </motion.div>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TrendingBlogs;
