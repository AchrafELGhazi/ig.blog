import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [registerFailed, setRegisterFailed] = useState(false);
  const [registerSuccessful, setRegisterSuccessful] = useState(false);
  const navigate = useNavigate();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterFailed(false);
    setRegisterSuccessful(false);
    const response = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, bio, email, preferences }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      setRegisterFailed(true);
    } else if (response.ok) {
      setRegisterSuccessful(true);
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-background via-background to-muted/20 pt-32'>
      <div className='container px-4 sm:px-6 lg:px-8 mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-background/80 backdrop-blur-lg rounded-3xl shadow-lg border p-8 sm:p-10 w-full max-w-4xl mx-auto'
        >
          <h2 className='text-3xl font-bold mb-6 text-center text-foreground'>
            Sign Up
          </h2>
          <form onSubmit={register} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
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
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  required
                />
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
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
              <div>
                <Label htmlFor='preferences'>Preferences</Label>
                <Input
                  id='preferences'
                  type='text'
                  value={preferences.join(', ')}
                  onChange={e =>
                    setPreferences(
                      e.target.value.split(',').map(pref => pref.trim())
                    )
                  }
                  placeholder='Enter preferences separated by commas'
                />
              </div>
            </div>
            <div>
              <Label htmlFor='bio'>Bio</Label>
              <Textarea
                id='bio'
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder='Tell us about yourself'
                className='resize-none h-32'
              />
            </div>
            <Button type='submit' className='w-full'>
              Register
            </Button>
           
            <div className='mt-6 text-center'>
              <p className='text-sm text-muted-foreground'>
                Already have an account?
                <Button
                  variant='link'
                  className='p-0 h-auto font-normal text-primary hover:underline'
                  onClick={() => navigate('/Login')}
                >
                  Sign In
                </Button>
              </p>
            </div>
          </form>
          {registerFailed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center'
            >
              <AlertCircle className='w-5 h-5 mr-2' />
              Registration failed. Try with another unique username.
            </motion.div>
          )}
          {registerSuccessful && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center'
            >
              <CheckCircle2 className='w-5 h-5 mr-2' />
              You registered successfully. Redirecting to login...
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
