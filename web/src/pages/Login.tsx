import { UserContext } from '@/utils/UserContext';
import { useContext, useState } from 'react';
import { Navigate } from 'react-router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoginFailed(false);
    e.preventDefault();
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // when we do this we get cors error we need to handle it by setting credentials
      // to true in the cors fct in the server with the origin being the host of our react app
    });
    if (response.ok) {
      response.json().then(userInfo => {
        console.log('messi hhahaha', userInfo);
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      setLoginFailed(true);
    }
  };

  if (redirect) {
    return <Navigate to={'/'}></Navigate>;
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        <form onSubmit={login}>
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
        {loginFailed && <div>Login failed</div>}
      </div>
    </div>
  );
};

export default Login;
