import './App.css';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { UserContextProvider } from './utils/UserContext';
import Profile from './pages/Profile';
import SingleBlog from './pages/SingleBlog';
import { EditBlog } from './pages/EditBlog';
import NewBlog from './pages/NewBlog';
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='content'>
            <Routes>
              {/* Public Routes */}
              <Route path='/' element={<Home />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Register' element={<Register />} />

              {/* Private Routes */}
              <Route element={<ProtectedRoutes />}>
                <Route path='/Blogs' element={<Blogs />} />
                <Route path='/NewBlog' element={<NewBlog />} />
                <Route path='/Profile' element={<Profile />} />
                <Route path='/Blog/:id' element={<SingleBlog />} />
                <Route path='/Edit/:id' element={<EditBlog />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
