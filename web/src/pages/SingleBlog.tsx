import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogsDataTypes } from '@/utils/interfaces';
import { UserContext } from '@/utils/UserContext';

const SingleBlog = () => {
  const { id } = useParams<{ id: string }>();
  const [blogInfo, setBlogInfo] = useState<blogsDataTypes | null>(null);
  const { userInfo } = useContext(UserContext);
  const [likes, setLikes] = useState();
  const [likeCount, setLikeCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/Blog/${id}`)
      .then(response => response.json())
      .then(data => {
        setBlogInfo(data);
        setLikeCount(data.likeCount);
      })
      .catch(error => {
        console.error('Error fetching the blog:', error);
      });
  }, [id]);

  if (!blogInfo) {
    return <div className='text-center py-10'>Loading...</div>;
  }

  const formattedDate = new Date(blogInfo.createdAt).toLocaleString();

  const deleteBlog = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/Blog/deleteBlog/${id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (response.ok) {
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting the blog:', error);
      alert(
        'An error occurred while deleting the blog. Please try again later.'
      );
    }
  };

  const likeBlog = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/Blog/${id}/likeBlog`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setLikes(data.likes);
        setLikeCount(data.likeCount);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error liking the blog', error);
    }
  };

  return (
    <div className='  px-4 mt-28 mx-20 py-10'>
      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        {/* Blog Header */}
        <div className='relative'>
          <img
            className='w-full h-72 object-cover'
            src={`http://localhost:4000/${blogInfo.cover}`}
            alt={blogInfo.title}
          />
          <div className='absolute top-0 left-0 w-full h-full bg-black opacity-40'></div>
          <div className='absolute bottom-5 left-6 text-white'>
            <h2 className='text-3xl font-semibold'>{blogInfo.title}</h2>
            <p className='text-lg'>{formattedDate}</p>
            <h3 className='text-md mt-2'>@{blogInfo.author.username}</h3>
            {userInfo.id === blogInfo.author._id && (
              <>
                <Link
                  className='bg-red border-black b-3 rounded-3xl py-4 px-3'
                  to={`/Edit/${blogInfo._id}`}
                >
                  edit this blog
                </Link>
                <button onClick={deleteBlog}>delete blog</button>
              </>
            )}
            <button className='mx-20' onClick={likeBlog}>
              Like blog
            </button>
            <div>Likes: {likeCount}</div>
          </div>
        </div>

        {/* Blog Content */}
        <div className='p-6'>
          <p className='text-lg text-gray-700'>{blogInfo.summary}</p>
          <div
            dangerouslySetInnerHTML={{ __html: blogInfo.content }}
            className='mt-6 text-base text-gray-800'
          />
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
