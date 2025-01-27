import { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import type { Blog } from '@/utils/types';
import { UserContext } from '@/utils/UserContext';
import CommentsSection from '@/components/CommentSection';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Edit,
  Trash2,
  ThumbsUp,
  User as UserIcon,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const SingleBlog = () => {
  const { id } = useParams<{ id: string }>();
  const [blogInfo, setBlogInfo] = useState<Blog | null>(null);
  const { userInfo } = useContext(UserContext);
  const [likes, setLikes] = useState<string[]>([]);
  const [likeCount, setLikeCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:4000/api/Blogs/${id}`, { method: 'GET' })
      .then(response => response.json())
      .then((data: Blog) => {
        setBlogInfo(data);
        setLikes(data.likes);
        setLikeCount(data.likes.length);
      })
      .catch(error => {
        console.error('Error fetching the blog:', error);
        toast({
          title: 'Error',
          description: 'Failed to load blog. Please try again.',
          variant: 'destructive',
        });
      });
  }, [id]);

  if (!blogInfo) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary'></div>
      </div>
    );
  }

  const formattedDate = new Date(blogInfo.createdAt).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const deleteBlog = async () => {
    if (!id) return;

    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/Blogs/deleteBlog/${id}`,
          {
            method: 'DELETE',
            credentials: 'include',
          }
        );

        if (response.ok) {
          toast({
            title: 'Success',
            description: 'Blog deleted successfully',
          });
          navigate('/Blogs');
        } else {
          const errorData = await response.json();
          toast({
            title: 'Error',
            description: errorData.message,
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error deleting the blog:', error);
        toast({
          title: 'Error',
          description:
            'An error occurred while deleting the blog. Please try again later.',
          variant: 'destructive',
        });
      }
    }
  };

  const likeBlog = async () => {
    if (!id) return;

    try {
      const response = await fetch(
        `http://localhost:4000/api/Blogs/${id}/likeBlog`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setLikes(data.likes);
        setLikeCount(data.likes.length);
        toast({
          title: likes.includes(userInfo._id) ? 'Unliked' : 'Liked',
          description: likes.includes(userInfo._id)
            ? "You've unliked this blog"
            : "You've liked this blog",
        });
      } else {
        toast({
          title: 'Error',
          description: data.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error liking the blog:', error);
      toast({
        title: 'Error',
        description: 'Failed to like the blog. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const shareBlog = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link Copied',
      description: 'Blog link has been copied to clipboard',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-gradient-to-b from-background via-background to-muted/20 pt-20 pb-12'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <Button
          variant='ghost'
          onClick={() => navigate('/Blogs')}
          className='mb-6 hover:bg-primary/10'
        >
          <ArrowLeft className='mr-2 h-4 w-4' /> Back to Blogs
        </Button>

        <article className='bg-card shadow-xl rounded-2xl overflow-hidden'>
          <div className='relative h-[60vh]'>
            <img
              className='w-full h-full object-cover'
              src={`http://localhost:4000/api/${blogInfo.cover}`}
              alt={blogInfo.title}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent'></div>
            <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
              <h1 className='text-4xl sm:text-5xl font-bold mb-4 leading-tight'>
                {blogInfo.title}
              </h1>
              <div className='flex items-center space-x-4'>
                <Avatar className='h-12 w-12 border-2 border-white'>
                  <AvatarImage
                    src={
                      blogInfo.author.img ||
                      `https://api.dicebear.com/6.x/initials/svg?seed=${blogInfo.author.username}`
                    }
                  />
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-semibold text-lg'>
                    @{blogInfo.author.username}
                  </p>
                  <p className='text-sm opacity-75'>{formattedDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='p-6 lg:p-10'>
            <div className='flex flex-wrap items-center justify-between mb-6 gap-4'>
              <div className='flex items-center space-x-4'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={likes.includes(userInfo.id) ? 'liked' : 'not-liked'}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant={
                        likes.includes(userInfo.id) ? 'default' : 'outline'
                      }
                      onClick={likeBlog}
                      className={`transition-all duration-300 ${
                        likes.includes(userInfo.id)
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : 'hover:bg-blue-100'
                      }`}
                    >
                      <ThumbsUp
                        className={`mr-2 h-4 w-4 ${
                          likes.includes(userInfo.id) ? 'fill-current' : ''
                        }`}
                      />
                      {likes.includes(userInfo.id) ? 'Liked' : 'Like'} (
                      {likeCount})
                    </Button>
                  </motion.div>
                </AnimatePresence>
                <Button variant='outline' onClick={shareBlog}>
                  <Share2 className='mr-2 h-4 w-4' /> Share
                </Button>
              </div>
              {userInfo.id === blogInfo.author._id && (
                <div className='flex items-center space-x-4'>
                  <Button variant='outline' asChild>
                    <Link to={`/Edit/${blogInfo._id}`}>
                      <Edit className='mr-2 h-4 w-4' /> Edit
                    </Link>
                  </Button>
                  <Button variant='destructive' onClick={deleteBlog}>
                    <Trash2 className='mr-2 h-4 w-4' /> Delete
                  </Button>
                </div>
              )}
            </div>

            <div className='flex items-center space-x-4 text-muted-foreground mb-6'>
              {blogInfo.tags &&
                blogInfo.tags[0]?.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className='text-xs bg-primary/10 text-primary px-2 py-1 rounded-full'
                  >
                    {tag.trim()}
                  </span>
                ))}
            </div>

            <Separator className='my-6' />

            <div className='prose prose-lg max-w-none dark:prose-invert'>
              <p className='text-xl text-muted-foreground mb-6 leading-relaxed'>
                {blogInfo.summary}
              </p>
              <div
                dangerouslySetInnerHTML={{ __html: blogInfo.content }}
                className='mt-6'
              />
            </div>
          </div>
        </article>

        <Separator className='my-10' />

        <CommentsSection blogId={blogInfo._id} />
      </div>
    </motion.div>
  );
};

export default SingleBlog;
