import './App.css';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import NewBlogs from './pages/NewBlogs';
import About from './pages/About';
import BlogDetails from './components/BlogDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className='App'>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Blogs' element={<Blogs />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/NewBlogs' element={<NewBlogs />} />
            <Route path='/About' element={<About />} />
            <Route path='/BlogDetails/:BlogId' element={<BlogDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
 
export default App;