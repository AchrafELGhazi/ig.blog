import './App.css'

function App() {
  const title = 'Welcome to the new blog';
  const likes = 50;
  const person = { name:'yoshi', age:30 };
  

  return (
    <div className='w-full h-screen m-0 bg-gray-300'>    
      <h1 className=' text-center p-10 text-9xl font-poppins-700 '>IKRAM GHALA</h1>
      <h1 className='text-7xl font-semibold m-10 text-center p-0   '>{title}</h1>
      <p className='text-5xl font-light m-10 text-center p-0 '> Ikram ghala is thinking of suicide, of ending it all</p>
      <p className='text-5xl font-light m-10 text-center p-0 '>Liked {likes} times</p>
    </div>
  )
}

export default App
