import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, User, ThumbsUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow';
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const dummyNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: { name: 'John Doe', avatar: '/placeholder.svg?height=32&width=32' },
    content: 'liked your post "Getting Started with React"',
    time: '2 minutes ago',
  },
  {
    id: '2',
    type: 'comment',
    user: { name: 'Jane Smith', avatar: '/placeholder.svg?height=32&width=32' },
    content: 'commented on your post "Advanced TypeScript Techniques"',
    time: '1 hour ago',
  },
  {
    id: '3',
    type: 'follow',
    user: {
      name: 'Alice Johnson',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    content: 'started following you',
    time: '3 hours ago',
  },
  // Add more dummy notifications as needed
];

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='fixed inset-y-0 right-0 w-full sm:w-96 bg-background shadow-lg z-[10000] border-l'
        >
          <div className='flex items-center justify-between p-4 border-b'>
            <h2 className='text-lg font-semibold flex items-center'>
              <Bell className='w-5 h-5 mr-2' />
              Notifications
            </h2>
            <Button variant='ghost' size='icon' onClick={onClose}>
              <X className='w-5 h-5' />
            </Button>
          </div>
          <ScrollArea className='h-[calc(100vh-64px)] p-4'>
            {dummyNotifications.map(notification => (
              <div
                key={notification.id}
                className='flex items-start space-x-4 mb-4 p-3 rounded-lg hover:bg-muted/50 transition-colors'
              >
                <Avatar>
                  <AvatarImage src={notification.user.avatar} />
                  <AvatarFallback>
                    <User className='w-4 h-4' />
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <p className='text-sm'>
                    <span className='font-semibold'>
                      {notification.user.name}
                    </span>{' '}
                    {notification.content}
                  </p>
                  <p className='text-xs text-muted-foreground mt-1'>
                    {notification.time}
                  </p>
                </div>
                {notification.type === 'like' && (
                  <ThumbsUp className='w-4 h-4 text-blue-500' />
                )}
                {notification.type === 'comment' && (
                  <MessageCircle className='w-4 h-4 text-green-500' />
                )}
                {notification.type === 'follow' && (
                  <User className='w-4 h-4 text-purple-500' />
                )}
              </div>
            ))}
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
