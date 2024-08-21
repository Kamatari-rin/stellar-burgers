import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import authDepot, { registerUser } from '../../services/authSlice';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const isPending = useSelector(authDepot.selectIsPending);
  const error = useSelector(authDepot.selectError) || undefined;

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name: userName, email, password }));
  };

  return isPending ? (
    <Preloader />
  ) : (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
