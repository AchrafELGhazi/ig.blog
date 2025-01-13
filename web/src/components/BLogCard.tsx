import { blogsDataTypes } from '@/utils/interfaces';
import { format } from 'date-fns'; // You can install date-fns with npm or yarn
import { Link } from 'react-router-dom';

function BlogCard({
  _id,
  title,
  summary,
  cover,
  createdAt,
  content,
  author,
}: blogsDataTypes) {
  // Format the createdAt date
  const formattedDate = format(new Date(createdAt), 'PPP p'); // 'PPP p' for date and time

  return (
    <div className='blog-card bg-white rounded-lg shadow-lg overflow-hidden mb-6'>
      <img
        className='w-full h-48 object-cover'
        src={'http://localhost:4000/' + cover}
        alt={title}
      />
      <div className='p-6'>
        <Link to={`/Blog/${_id}`}>
          <h2 className='text-2xl cursor-auto font-semibold mb-2'>{title}</h2>
        </Link>
        <h2 className='text-2xl font-semibold mb-2'>
          @{author?.username || 'Unknown Author'}
        </h2>
        <p className='text-gray-500 text-sm mb-4'>{formattedDate}</p>
        <p className='text-gray-700 text-base mb-4'>{summary}</p>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className='mt-6 text-base text-gray-800'
        />
      </div>
    </div>
  );
}

export default BlogCard;
