import { UserContext } from '@/utils/UserContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoginFailed(false);
    e.preventDefault();
    const response = await fetch('http://localhost:4000/Login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        console.log('Login successful', userInfo);
        setUserInfo(userInfo);
        navigate('/Blogs');
      });
    } else {
      setLoginFailed(true);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-background via-background to-muted/20 pt-48'>
      <div className='container px-4 sm:px-6 lg:px-8 mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-background/80 backdrop-blur-lg rounded-3xl shadow-lg border p-8 sm:p-10 w-full max-w-2xl mx-auto'
        >
          <h2 className='text-3xl font-bold mb-6 text-center text-foreground'>
            Sign In
          </h2>
          <form onSubmit={login} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='md:col-span-2'>
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  type='text'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder='Enter your username'
                  required
                />
              </div>
              <div className='md:col-span-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder='Enter your password'
                  required
                />
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <Button type='submit' className='w-full'>
                Sign In
              </Button>
            </div>
          </form>
          <div className='mt-6 text-center'>
            <p className='text-sm text-muted-foreground'>
              Don't have an account?{' '}
              <Button
                variant='link'
                className='p-0 h-auto font-normal text-primary hover:underline'
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </p>
          </div>
          {loginFailed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center'
            >
              <AlertCircle className='w-5 h-5 mr-2' />
              Login failed. Please check your credentials and try again.
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
