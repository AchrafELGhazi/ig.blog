import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  const title = 'Welcome to the new blog';
  const likes = 50;
  const person = { name:'yoshi', age:30 };
  

  return (
    <div className='w-full h-screen m-0 bg-gray-100'>    
      <Navbar />
    </div>
  )
}

export default App
