import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '@/utils/UserContext';
import { useContext } from 'react';

const ProtectedRoutes = () => {
  
  const { userInfo } = useContext(UserContext);

  return userInfo ? <Outlet /> : <Navigate to='/Login' />;
};

export default ProtectedRoutes;