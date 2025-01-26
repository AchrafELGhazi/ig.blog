import { UserContext } from '@/utils/UserContext';
import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {  User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { userInfo } = useContext(UserContext);
  const { toast } = useToast();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        'http://localhost:4000/api/auth/changePassword',
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            oldPassword,
            newPassword,
            confirmPassword,
            id: userInfo?.id,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        toast({
          title: 'Password changed successfully',
          description: 'Your password has been updated.',
          duration: 3000,
        });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error',
          description:
            errorData.message || 'Failed to change password. Please try again.',
          variant: 'destructive',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className='min-h-screen bg-gradient-to-b from-background via-background to-muted/20 pt-20'>
      <div className='container px-4 sm:px-6 lg:px-8 mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='max-w-2xl mx-auto'
        >
          <Card className='bg-background/80 backdrop-blur-lg rounded-3xl shadow-lg border'>
            <CardHeader>
              <h2 className='text-3xl font-bold text-center text-foreground flex items-center justify-center'>
                <User className='mr-2' />
                Profile
              </h2>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div>
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  type='text'
                  value={userInfo?.username}
                  readOnly
                  className='mt-1'
                />
              </div>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  value={userInfo?.email}
                  readOnly
                  className='mt-1'
                />
              </div>
              <div>
                <Label htmlFor='bio'>Bio</Label>
                <Textarea
                  id='bio'
                  value={userInfo?.bio}
                  readOnly
                  className='mt-1 resize-none'
                />
              </div>
              <div>
                <Label htmlFor='preferences'>Preferences</Label>
                <Input
                  id='preferences'
                  type='text'
                  value={userInfo?.preferences?.join(', ')}
                  readOnly
                  className='mt-1'
                />
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={changePassword} className='space-y-6 w-full'>
                <h3 className='text-xl font-semibold text-center'>
                  Change Password
                </h3>
                <div>
                  <Label htmlFor='oldPassword'>Old Password</Label>
                  <Input
                    id='oldPassword'
                    type='password'
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    className='mt-1'
                    required
                  />
                </div>
                <div>
                  <Label htmlFor='newPassword'>New Password</Label>
                  <Input
                    id='newPassword'
                    type='password'
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className='mt-1'
                    required
                  />
                </div>
                <div>
                  <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                  <Input
                    id='confirmPassword'
                    type='password'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className='mt-1'
                    required
                  />
                </div>
                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? 'Changing Password...' : 'Change Password'}
                </Button>
              </form>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
