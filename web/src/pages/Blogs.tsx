import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
  PenTool,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader } from '@/components/ui/card';
import { Blog } from '@/utils/types';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/utils/UserContext';

const Blogs = () => {
  const [allPosts, setAllPosts] = useState<Blog[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:4000/getBlogs');
        if (!response.ok) throw new Error('Network response was not ok');
        const blogsData: Blog[] = await response.json();
        setAllPosts(blogsData);
        const sortedByLikes = [...blogsData].sort(
          (a, b) => b.likes.length - a.likes.length
        );
        setTrendingPosts(sortedByLikes.slice(0, 5));
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch blogs');
        console.error('Error:', error);
        setIsLoading(false);
      }
      if (!userInfo) {
        navigate('/Login');
      }
    };

    fetchBlogs();
  }, [navigate, userInfo]);

  const filteredPosts = allPosts.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-gradient-to-b from-background via-background to-muted/20 pt-9 pb-12'>
      <div className='container px-4 sm:px-6 lg:px-8 mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className='mb-6 text-left'
        >
          <h1 className='text-2xl font-semibold text-zinc-900 flex items-center gap-2'>
            <span>👋</span>
            <span>Welcome, {userInfo?.username || 'Guest'}</span>
          </h1>
          <p className='text-sm text-zinc-500 mt-1 flex items-center gap-2'>
            <span>✨</span>
            <span>Explore stories and share your thoughts</span>
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col lg:flex-row gap-8'
        >
          {/* All Blogs Section */}
          <Card className='lg:w-2/3 xl:w-3/4 rounded-xl overflow-hidden border shadow-lg'>
            <CardHeader>
              <h2 className='text-3xl font-bold flex items-center'>
                <PenTool className='mr-2 text-primary' />
                All Blogs
              </h2>
              <div className='mt-4'>
                <div className='relative'>
                  <Input
                    type='text'
                    placeholder='Search blogs...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='pl-10'
                  />
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
                </div>
              </div>
            </CardHeader>
            <div className='p-6'>
              {isLoading ? (
                <p className='text-center text-muted-foreground'>
                  Loading posts...
                </p>
              ) : error ? (
                <p className='text-center text-red-500'>{error}</p>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {filteredPosts.map((blog, index) => (
                    <motion.div
                      key={blog._id}
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
                        <h3 className='text-xl font-semibold mb-2'>
                          {blog.title}
                        </h3>
                        <p className='text-muted-foreground text-sm mb-4'>
                          {blog.summary}
                        </p>
                        <div className='flex items-center justify-between text-sm text-muted-foreground'>
                          <span>{blog.author.username}</span>
                          <span>
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
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
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Trending Blogs Section */}
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
                  trendingPosts.map((blog, index) => (
                    <motion.div
                      key={blog._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className='mb-4 p-4 bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'
                    >
                      <h3 className='text-lg font-semibold mb-2'>
                        {blog.title}
                      </h3>
                      <p className='text-sm text-muted-foreground mb-2'>
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
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Blogs;
