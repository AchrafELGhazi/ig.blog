import { useContext } from 'react';
import { UserContext } from '@/utils/UserContext';
import { PublicNavbar } from './PublicNavBar';
import AuthenticatedNavbar from './AuthenticatedNavBar';


export default function Navbar() {
  const { userInfo } = useContext(UserContext);

  if (userInfo?.username) {
    return (
      <AuthenticatedNavbar
        username={userInfo.username}
        userImage={''}
      />
    );
  }

  return <PublicNavbar />;
}

// import { UserContext } from '@/utils/UserContext';
// import { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const { setUserInfo, userInfo } = useContext(UserContext);
//   const username = userInfo?.username;
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch('http://localhost:3000/profile', {
//       credentials: 'include',
//     }).then(response => {
//       response.json().then(userInfo => {
//         setUserInfo(userInfo);
//       });
//     });
//   }, []);

//   const logout = () => {
//     fetch('http://localhost:3000/logout', {
//       credentials: 'include',
//       method: 'POST',
//     });
//     setUserInfo({});
//     navigate('/');
//   };
//   console.log(username)
//   const getLinks = () => {
//     const publicLinks = [
//       { name: 'Home', link: '/' },
//       { name: 'About', link: '/About' },
//       { name: 'Contact', link: '/Contact' },
//       { name: 'Sign In', link: '/Login' },
//       { name: 'Sign Up', link: '/Register' },
//     ];

//     if (userInfo) {
//       return [
//         ...publicLinks,
//         { name: 'Blogs', link: '/Blogs' },
//         { name: 'New Blog', link: '/NewBlog' },
//         { name: 'Notifications', link: '/Notifications' },
//         { name: 'Settings', link: '/Settings' },
//         { name: 'Profile', link: '/Profile' },
//       ];
//     }
//   };

//   const links = getLinks();

// }
