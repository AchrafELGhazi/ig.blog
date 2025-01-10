import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, bio, email, preferences }), // why: send the data to the server in JSON format (as a string)
      headers: {
        'Content-Type': 'application/json', // why: tell the server that the data is in JSON format
      },
    });
    if (!response.ok) {
      setRegisterFailed(true);
    } else if (response.ok) {
      setRegisterSuccessful(true);
      navigate('/login');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
        <form onSubmit={register}>
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
              onChange={e => {
                setUsername(e.target.value);
              }}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter your username'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter your password'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='emal'
            >
              email
            </label>
            <input
              type='email'
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter your email'
            />
          </div>{' '}
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='bio'
            >
              Bio
            </label>
            <input
              type='bio'
              value={bio}
              onChange={e => {
                setBio(e.target.value);
              }}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter your Bio'
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700'>Preferences</label>
          <input
            type='text'
            value={preferences.join(', ')}
            onChange={(e) => setPreferences(e.target.value.split(',').map(pref => pref.trim()))}
            className='w-full p-2 border border-gray-300 rounded mt-1'
            placeholder='Enter preferences separated by commas'
          />
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Sign In
            </button>
            {/* <a
              className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
              href='#'
            >
              Forgot Password?
            </a> */}
          </div>
        </form>
        {registerFailed && (
          <div>Registration failed. Try with another unique username</div>
        )}
        {registerSuccessful && <div>You registered successfully</div>}
      </div>
    </div>
  );
};

export default Register;
