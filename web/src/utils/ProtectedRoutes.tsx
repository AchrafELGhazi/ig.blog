import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/utils/UserContext';

const ProtectedRoutes = () => {
  const { userInfo, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return userInfo && userInfo.username ? <Outlet /> : <Navigate to='/Login' />;
};

export default ProtectedRoutes;
