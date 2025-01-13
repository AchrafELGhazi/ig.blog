import { useEffect, useState } from 'react';
import { blogsDataTypes } from '@/utils/interfaces';
import BlogCard from '@/components/BLogCard';

function Blogs() {
  const [blogs, setBlogs] = useState<blogsDataTypes[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:4000/getBlogs');
        if (!response.ok) throw new Error('Network response was not ok');
        const blogsData: blogsDataTypes[] = await response.json();
        setBlogs(blogsData);
      } catch (error) {
        setError('Failed to fetch blogs');
        console.error('Error:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className='bg-gray-100 p h-full'>
      <div className='container text-center mt-11 mx-auto px-4 py-16'>
        <h1 className='text-4xl md:text-5xl font-normal text-center text-gray-800 tracking-widest relative inline-block'>
          BLOGS
          <span className='absolute -bottom-2 left-0 w-full h-0.5 bg-gray-800 transform -skew-x-12'></span>
        </h1>
      </div>

      <div className='text-center pt-16 sm:pt-28 px-3 sm:px-20'>
        {error && <p className='text-red-500'>{error}</p>}
        {blogs.length > 0
          ? blogs.map(blog => <BlogCard key={blog._id} {...blog} />)
          : !error && <p>Loading blogs...</p>}
      </div>
    </div>
  );
}

export default Blogs;
