import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import Navbar from './Navbar';


const BlogDetails = () => {
  const { BlogId } = useParams();
  const {
    data: blog,
    isPending,
    error,
  } = useFetch('http://localhost:8000/blogs/' + BlogId);

  return (
    <div>
      <Navbar />

      {isPending && <div className='text-center'>Loading...</div>}
      {error && <div className='text-center'>{error}</div>}
      {blog && (
        <div className='container mx-auto mt-40 w-[50%] p-4 border border-gray-300 rounded-xl '>
          <h2 className='text-2xl font-bold mb-4'>{blog.title}</h2>
          <h4 className='text-lg font-semibold mb-4'>{blog.author}</h4>
          <p className='text-gray-600'>{blog.content}</p>
          <p className='text-gray-600'>{blog.createdAt}</p>

        </div>
      )}
    </div>
  );
};

export default BlogDetails;
