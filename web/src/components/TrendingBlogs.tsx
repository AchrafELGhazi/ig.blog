import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Blog } from '@/utils/types';
import BlogCard from './BLogCard';

interface TrendingPostsProps {
  posts: Blog[];
  isLoading: boolean;
  error: string | null;
}

const TrendingBlogs = ({ posts, isLoading, error }: TrendingPostsProps) => {
  return (
    <Card className='lg:w-1/3 xl:w-1/4 rounded-xl overflow-hidden border shadow-lg'>
      <CardHeader>
        <h2 className='text-2xl font-bold flex items-center'>
          <TrendingUp className='mr-2 text-primary' />
          Trending Blogs
        </h2>
      </CardHeader>
      <div className='p-6'>
        <ScrollArea className='h-[calc(100vh-250px)]'>
          {isLoading ? (
            <p className='text-center text-muted-foreground'>
              Loading trending posts...
            </p>
          ) : error ? (
            <p className='text-center text-red-500'>{error}</p>
          ) : (
            posts.map((blog, index) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                index={index}
                variant='trending'
              />
            ))
          )}
        </ScrollArea>
      </div>
    </Card>
  );
};

export default TrendingBlogs;
