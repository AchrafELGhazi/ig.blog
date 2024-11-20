import BlogList from '../components/BlogLIst';
import Navbar from '../components/Navbar';
import useFetch from '../hooks/useFetch';

const Blogs = () => {
  const {
    data: blogs,
    error: blogError,
    isPending: blogIsPending,
  } = useFetch('http://localhost:8500/blogs');

  return (
    <div className='bg-gray-100  h-full'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <h1 className=' text-4xl mt-16 font-bold text-center text-gray-800'>
          Our Latest Blog Posts
        </h1>
        <div>
          {blogError && <div>{blogIsPending}</div>}
          {blogIsPending && <div>loading...</div>}
          {blogs && <BlogList blogs={blogs} />}
        </div>
      </div>{' '}
    </div>
  );
};

export default Blogs;
