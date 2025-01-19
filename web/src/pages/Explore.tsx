import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Tag, ThumbsUp, MessageCircle, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockPosts = [
  {
    id: 1,
    title: 'Getting Started with React',
    excerpt:
      'Learn the basics of React and start building your first application.',
    author: 'Jane Doe',
    date: '2023-05-15',
    tags: ['React', 'JavaScript', 'Web Development'],
    likes: 120,
    comments: 25,
    views: 1500,
    image: '/1.jpg',
  },
  {
    id: 2,
    title: 'Advanced TypeScript Techniques',
    excerpt:
      'Dive deep into TypeScript and learn advanced concepts for better type safety.',
    author: 'John Smith',
    date: '2023-05-20',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    likes: 85,
    comments: 12,
    views: 950,
    image: '/2.jpg',
  },
  {
    id: 3,
    title: 'Building Responsive Layouts with Tailwind CSS',
    excerpt:
      'Master the art of creating beautiful, responsive designs using Tailwind CSS.',
    author: 'Emily Johnson',
    date: '2023-05-25',
    tags: ['CSS', 'Tailwind', 'Web Design'],
    likes: 200,
    comments: 40,
    views: 2200,
    image: '/3.png',
  },
  {
    id: 4,
    title: 'Introduction to GraphQL',
    excerpt:
      'Understand the basics of GraphQL and how it differs from REST APIs.',
    author: 'Michael Brown',
    date: '2023-05-30',
    tags: ['GraphQL', 'API', 'Web Development'],
    likes: 150,
    comments: 30,
    views: 1800,
    image: '/4.png',
  },
  {
    id: 5,
    title: 'State Management with Redux Toolkit',
    excerpt:
      'Simplify your Redux code and boost productivity with Redux Toolkit.',
    author: 'Sarah Lee',
    date: '2023-06-05',
    tags: ['Redux', 'React', 'State Management'],
    likes: 180,
    comments: 35,
    views: 2000,
    image: '/5.png',
  },
  {
    id: 6,
    title: 'Mastering CSS Grid Layout',
    excerpt: 'Learn how to create complex layouts easily with CSS Grid.',
    author: 'David Wilson',
    date: '2023-06-10',
    tags: ['CSS', 'Web Design', 'Layout'],
    likes: 130,
    comments: 20,
    views: 1600,
    image: '/6.png',
  },
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = mockPosts.filter(
    post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className='min-h-screen bg-gradient-to-b from-background via-background to-muted/20 pt-32 pb-20'>
      <div className='container px-4 sm:px-20 lg:px-20 mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='text-4xl font-bold text-center mb-8'>
            Explore Amazing Content
          </h1>
          <div className='max-w-xl mx-auto mb-12'>
            <div className='relative'>
              <Input
                type='text'
                placeholder='Search posts or tags...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='pl-10'
              />
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredPosts.map(post => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className='bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'
              >
                <img
                  src={post.image || '/placeholder.svg'}
                  alt={post.title}
                  className='w-full h-48 object-cover'
                />
                <div className='p-6'>
                  <h2 className='text-2xl font-semibold mb-2'>{post.title}</h2>
                  <p className='text-muted-foreground mb-4'>{post.excerpt}</p>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {post.tags.map(tag => (
                      <Badge key={tag} variant='secondary'>
                        <Tag className='w-3 h-3 mr-1' />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className='flex items-center justify-between text-sm text-muted-foreground'>
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  <div className='flex items-center justify-between mt-4 text-sm'>
                    <div className='flex items-center space-x-2'>
                      <Button variant='ghost' size='sm' className='px-1'>
                        <ThumbsUp className='w-4 h-4 mr-1' />
                        {post.likes}
                      </Button>
                      <Button variant='ghost' size='sm' className='px-1'>
                        <MessageCircle className='w-4 h-4 mr-1' />
                        {post.comments}
                      </Button>
                    </div>
                    <div className='flex items-center'>
                      <Eye className='w-4 h-4 mr-1' />
                      {post.views}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Explore;
