import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import authDepot, { loginUser } from '../../services/authSlice';
import { Preloader } from '../../components/ui/preloader';
import { useForm } from 'src/hooks/useForm';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const isPending = useSelector(authDepot.selectIsPending);
  const error = useSelector(authDepot.selectError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return isPending ? (
    <Preloader />
  ) : (
    <LoginUI
      errorText={error || undefined}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
