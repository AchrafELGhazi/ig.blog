import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/utils/UserContext';

const ProtectedRoutes = () => {
  const { userInfo } = useContext(UserContext);

  return userInfo.username ? <Outlet /> : <Navigate to='/Login' />;
};

export default ProtectedRoutes;
