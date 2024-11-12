import './App.css';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import NewBlogs from './pages/NewBlogs';
import About from './pages/About';


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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
