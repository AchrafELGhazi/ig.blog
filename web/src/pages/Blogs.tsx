import BlogList from '../components/BlogLIst';
import useFetch from '../hooks/useFetch';

const Blogs = () => {
  const {
    data: blogs,
    error: blogError,
    isPending: blogIsPending,
  } = useFetch('http://localhost:8500/blogs');

  return (
    <div className='bg-gray-100  h-full'>
      <div className=' mx-3 md:mx-20 pt-8 sm:pt-20 px-4'>
        <h1 className=' text-3xl md:text-3xl mt-20  font-bold text-center text-gray-800'>
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
