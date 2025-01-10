import { UserContext } from '@/utils/UserContext';
import { useContext } from 'react';

const Profile = () => {
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  const email = userInfo?.email;
  const bio = userInfo?.bio;
  const preferences = userInfo?.preferences;

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Profile</h2>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'
          >
            Username
          </label>
          <input
            type='text'
            value={username}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            readOnly
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email
          </label>
          <input
            type='text'
            value={email}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            readOnly
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='bio'
          >
            Bio
          </label>
          <textarea
            value={bio}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            readOnly
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='preferences'
          >
            Preferences
          </label>
          <input
            type='text'
            value={preferences?.join(', ')}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;