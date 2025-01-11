import './App.css';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import NewBlogs from './pages/NewBlogs';
import About from './pages/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { UserContextProvider } from './utils/UserContext';
import Profile from './pages/Profile';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Blogs' element={<Blogs />} />
              <Route path='/Contact' element={<Contact />} />
              <Route path='/NewBlogs' element={<NewBlogs />} />
              <Route path='/About' element={<About />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Register' element={<Register />} />
              <Route path='/Profile' element={<Profile/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
