import { useState } from 'react';
import { Bell, ThumbsUp, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Notification {
  id: string;
  type: 'like' | 'comment';
  blogTitle: string;
  blogId: string;
  user: {
    username: string;
    image?: string;
  };
  timestamp: Date;
  read: boolean;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'like',
    blogTitle: 'Getting Started with React',
    blogId: 'blog-1',
    user: {
      username: 'sarah_dev',
      image: '/sarah.jpg',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    blogTitle: 'TypeScript Best Practices',
    blogId: 'blog-2',
    user: {
      username: 'john_coder',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60), 
    read: false,
  },
  {
    id: '3',
    type: 'like',
    blogTitle: 'Modern CSS Techniques',
    blogId: 'blog-3',
    user: {
      username: 'emma_ui',
      image: '/emma.jpg',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
  },
];

export function NotificationsPanel({
  isOpen,
  onClose,
}: NotificationsPanelProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(DUMMY_NOTIFICATIONS);

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/20 z-10ujyhhyuhj0'
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className='fixed right-2 top-16 z-50 w-full max-w-sm rounded-lg bg-background border shadow-lg'
          >
            <div className='flex items-center justify-between p-4 border-b'>
              <h2 className='font-semibold'>Notifications</h2>
              <Button variant='ghost' size='icon' onClick={onClose}>
                <X className='h-4 w-4' />
              </Button>
            </div>

            <ScrollArea className='h-[70vh] max-h-[600px]'>
              <div className='flex flex-col p-2'>
                {notifications.length === 0 ? (
                  <p className='text-center text-muted-foreground p-4'>
                    No notifications yet
                  </p>
                ) : (
                  notifications.map(notification => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-muted/30' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Avatar className='h-9 w-9'>
                        <AvatarImage src={notification.user.image} />
                        <AvatarFallback>
                          {notification.user.username[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className='flex-1 space-y-1'>
                        <p className='text-sm'>
                          <span className='font-medium'>
                            {notification.user.username}
                          </span>{' '}
                          {notification.type === 'like'
                            ? 'liked your blog post'
                            : 'commented on your blog post'}{' '}
                          <span className='font-medium'>
                            "{notification.blogTitle}"
                          </span>
                        </p>
                        <div className='flex items-center space-x-2'>
                          {notification.type === 'like' ? (
                            <ThumbsUp className='h-3.5 w-3.5 text-primary' />
                          ) : (
                            <MessageCircle className='h-3.5 w-3.5 text-primary' />
                          )}
                          <span className='text-xs text-muted-foreground'>
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                        </div>
                      </div>

                      {!notification.read && (
                        <div className='h-2 w-2 rounded-full bg-primary' />
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
