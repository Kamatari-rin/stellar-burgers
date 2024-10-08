import { Preloader } from '@ui';
import { useLocation, Navigate } from 'react-router-dom';
import authDepot from '../../services/authSlice';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  allowOnly?: 'authorized' | 'unauthorized';
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  allowOnly,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();

  const isPending = useSelector(authDepot.selectIsPending);
  const isLoggedIn = useSelector(authDepot.selectIsLoggedIn);

  if (isPending) {
    return <Preloader />;
  }

  if (allowOnly === 'unauthorized' && !isLoggedIn) return children;

  if (allowOnly === 'authorized' && !isLoggedIn) {
    return <Navigate replace to='/login' state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL
  }

  if (allowOnly === 'unauthorized' && isLoggedIn) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
