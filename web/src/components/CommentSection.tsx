import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '@/utils/UserContext';
import { Comment } from '@/utils/types';

interface CommentComponentProps {
  comment: Comment;
  onReply: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
}

interface CommentsSectionProps {
  blogId: string;
}

const CommentComponent: React.FC<CommentComponentProps> = ({
  comment,
  onReply,
  onDelete,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const { userInfo } = useContext(UserContext);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onReply(comment._id, replyContent);
    setReplyContent('');
    setShowReplyForm(false);
  };

  return (
    <div className='ml-4 mt-4 border-l-2 border-gray-200 pl-4'>
      <div className='bg-gray-50 p-4 rounded-lg'>
        <div className='flex items-center gap-2 mb-2'>
          <span className='font-medium'>@{comment.user.username}</span>
          <span className='text-sm text-gray-500'>
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>
        <p className='text-gray-700'>{comment.content}</p>

        <div className='mt-2 flex gap-4'>
          {userInfo && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className='text-blue-600 text-sm hover:underline'
            >
              Reply
            </button>
          )}
          {userInfo?.id === comment.user._id && (
            <button
              onClick={() => onDelete(comment._id)}
              className='text-red-600 text-sm hover:underline'
            >
              Delete
            </button>
          )}
        </div>

        {showReplyForm && (
          <form onSubmit={handleReplySubmit} className='mt-3'>
            <textarea
              value={replyContent}
              onChange={e => setReplyContent(e.target.value)}
              className='w-full p-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500'
              placeholder='Write a reply...'
              rows={3}
            />
            <div className='flex gap-2 mt-2'>
              <button
                type='submit'
                disabled={!replyContent.trim()}
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50'
              >
                Submit
              </button>
              <button
                type='button'
                onClick={() => setShowReplyForm(false)}
                className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300'
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {comment.replies.map(reply => (
          <div
            key={reply._id}
            className='ml-8 mt-4 border-l border-gray-200 pl-4'
          >
            <div className='flex items-center gap-2 mb-1'>
              <span className='font-medium'>@{reply.user.username}</span>
              <span className='text-sm text-gray-500'>
                {new Date(reply.createdAt).toLocaleString()}
              </span>
            </div>
            <p className='text-gray-700'>{reply.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommentsSection: React.FC<CommentsSectionProps> = ({ blogId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const { userInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:4000/Blog/getComments/${blogId}`,
        {
          credentials: 'include', // Include if you need to send cookies
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch comments');
      }

      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to fetch comments'
      );
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:4000/Blog/postComment/${blogId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Important for sending cookies
          body: JSON.stringify({
            comment: newComment, // Make sure to use 'comment' as the key
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to post comment');
      }

      await response.json();
      setNewComment(''); // Clear the input
      await fetchComments(); // Refresh comments
    } catch (error) {
      console.error('Error posting comment:', error);
      // Show error to user (you can set an error state here)
    }
  };
  const handleReply = async (commentId: string, content: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/Blog/${blogId}/replyComment/${commentId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ content }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post reply');
      }

      await fetchComments();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to post reply');
    }
  };
  const handleDelete = async (commentId: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/Blog/${blogId}/deleteComment/${commentId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete comment');
      }

      await fetchComments();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to delete comment'
      );
    }
  };

  if (isLoading) {
    return <div className='mt-8 text-center'>Loading comments...</div>;
  }

  return (
    <div className='mt-8 p-6 bg-white rounded-lg shadow-lg'>
      <h3 className='text-2xl font-semibold mb-6'>Comments</h3>

      {error && (
        <div className='mb-4 p-4 bg-red-100 text-red-700 rounded-lg'>
          {error}
        </div>
      )}

      {userInfo ? (
        <form onSubmit={handleCommentSubmit} className='mb-8'>
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            className='w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500'
            placeholder='Write a comment...'
            rows={4}
          />
          <button
            type='submit'
            disabled={!newComment.trim()}
            className='mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50'
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className='mb-8 text-gray-600'>Please log in to comment.</p>
      )}

      <div className='space-y-6'>
        {comments.map(comment => (
          <CommentComponent
            key={comment._id}
            comment={comment}
            onReply={handleReply}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
