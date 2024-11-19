import { UserCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

interface BlogCardProps {
  blog: {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string | null;
  };
  handleDelete: (id: number) => void;
}

const BlogCard = ({ blog, handleDelete }: BlogCardProps) => {
  const navigate = useNavigate();
  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);

  const handleDeleteClick = () => {
    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: 'DELETE',
    }).then(() => {
      console.log('Blog deleted');
      handleDelete(blog.id);
      navigate('/');
      setIsDeleteModalOpen(false);
    });
  };
  // const formattedDate = blog.createdAt
  // ? new Date(blog.createdAt).toLocaleDateString('en-US', {
  //     month: 'short',
  //     day: 'numeric',
  //     year: 'numeric',
  //   })
  // : new Date().toLocaleDateString('en-US', {
  //     month: 'short',
  //     day: 'numeric',
  //     year: 'numeric',
  //   });

  return (
    <div key={blog.id} className='sm:w-1/2 lg:w-1/3 px-4 mb-8'>
      <article className='flex flex-col h-full bg-white rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg border border-gray-100'>
        <div className='flex flex-col h-full p-6'>
          <header className='mb-4'>
            <h2 className='text-2xl font-poppins-600 text-gray-800 mb-2 text-left line-clamp-2'>
              {blog.title}
            </h2>
            <div className='flex items-center justify-between text-sm text-gray-500'>
              <div className='flex items-center gap-1'>
                <UserCircle className='w-4 h-4 text-blue-600' />
                <span className='text-blue-600 font-poppins-400'>
                  {blog.author}
                </span>
              </div>
              {/* <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500 font-poppins-400">{formattedDate}</span>
              </div> */}
            </div>
          </header>
          <div className='flex-grow'>
            <p className='text-gray-600 text-sm font-poppins-400 text-left leading-relaxed mb-4 line-clamp-4'>
              {blog.content}
            </p>
          </div>
          <footer className='mt-auto pt-4 border-t flex justify-between border-gray-100'>
            <Link to={`/BlogDetails/${blog.id}`}>
              <button className='text-blue-500 hover:text-blue-700 transition-colors duration-300 text-sm font-semibold flex items-center'>
                Read more
                <svg
                  className='w-4 h-4 ml-1'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </button>
            </Link>
            <button
              className='flex items-center text-red-600 hover:text-red-700 hover:bg-red-100 px-4 py-2 rounded-md transition ease-in-out duration-200'
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <TrashIcon className='h-5 w-5 mr-2' />
              Delete
            </button>
          </footer>
        </div>
      </article>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDeleteClick()}
      />
    </div>
  );
};

export default BlogCard;
