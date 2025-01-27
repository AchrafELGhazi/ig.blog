import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import type { Blog } from '@/utils/types';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/utils/UserContext';
import TrendingBlogs from '@/components/TrendingBlogs';
import BlogCard from '@/components/BLogCard';

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
        const response = await fetch(
          'http://localhost:4000/api/Blogs/getBlogs'
        );
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

  if (!userInfo) {
    navigate('/Login');
  }

  const filteredPosts = allPosts.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-gradient-to-b from-background via-background to-muted/20 pt-8 pb-12 -z-50'>
      <div className='container px-4 sm:px-6 lg:px-8 mx-auto'>
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className='mb-6 text-left'
        >
          <h1 className='text-2xl font-semibold text-zinc-900 flex items-center gap-2'>
            <span>👋</span>
            <span>Welcome back, {userInfo?.username || 'Guest'} !</span>
          </h1>
          <p className='text-sm text-zinc-500 mt-1 flex items-center gap-2'>
            <span>✨</span>
            <span>Explore stories and share your thoughts</span>
          </p>
        </motion.div>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Main Content */}
          <div className='lg:w-3/4'>
            <Card className='rounded-xl overflow-hidden border shadow-lg mb-8'>
              <CardHeader className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-2xl font-bold flex items-center'>
                    <PenTool className='mr-2 text-primary' />
                    All Blogs
                  </h2>
                </div>
                <div className='relative'>
                  <Input
                    type='text'
                    placeholder='Search blogs...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='rounded-full pl-10'
                  />
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
                </div>
              </CardHeader>
              <CardContent className='p-6'>
                {isLoading ? (
                  <p className='text-center text-muted-foreground'>
                    Loading posts...
                  </p>
                ) : error ? (
                  <p className='text-center text-red-500'>{error}</p>
                ) : (
                  <div className='space-y-4'>
                    {filteredPosts.map((blog, index) => (
                      <BlogCard key={blog._id} blog={blog} index={index} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Trending Section */}
          <div className='lg:w-1/4'>
            <TrendingBlogs
              blogs={trendingPosts}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
