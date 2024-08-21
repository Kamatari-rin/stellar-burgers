import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { authDepot } from '../../services/authSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(authDepot.selectUser);

  return <AppHeaderUI userName={user?.name} />;
};
