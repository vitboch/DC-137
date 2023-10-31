import { useLocation, Navigate } from 'react-router-dom';
import { IProtectedRouteProps } from '../types/types';
import { useAppSelector } from '../hooks/redux-hooks';

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAppSelector(({ userData }) => userData);

  return (
    <>
      {!user ? <Navigate to="/signin" state={{ from: location }} /> : children}
    </>
  );
};

export default ProtectedRoute;
