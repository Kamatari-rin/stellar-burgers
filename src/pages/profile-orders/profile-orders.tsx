import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import authDepot from '../../services/authSlice';
import { useDispatch, useSelector } from '../../services/store';
import userOrdersDepot from '../../services/userOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(userOrdersDepot.selectOrders) || [];
  const isPending = useSelector(userOrdersDepot.selectIsPending);
  const user = useSelector(authDepot.selectUser);

  useEffect(() => {
    dispatch(userOrdersDepot.getUserOrders());
  }, [user]);

  return isPending ? <Preloader /> : <ProfileOrdersUI orders={orders} />;
};
