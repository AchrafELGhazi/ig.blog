import { UserContext } from '@/utils/UserContext';
import { useContext, useState } from 'react';

const Profile = () => {
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  const email = userInfo?.email;
  const bio = userInfo?.bio;
  const preferences = userInfo?.preferences;
  const id = userInfo.id;


  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 

    const response = await fetch(`http://localhost:4000/changePassword`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ oldPassword, newPassword, confirmPassword,id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
      console.log(response)
  };

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

        <form
          onSubmit={changePassword}
          className='space-y-6'
        >
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='oldPassword'
            >
              Old Password
            </label>
            <input
              type='password'
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='newPassword'
            >
              New Password
            </label>
            <input
              type='password'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='confirmPassword'
            >
              Confirm New Password
            </label>
            <input
              type='password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
