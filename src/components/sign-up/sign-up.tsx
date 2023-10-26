import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';
import Form from '../form';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';

export const SignUp = () => {
  const navigate = useNavigate();
  const { signUpCall, errMessage } = useAuth();
  const { user } = useAppSelector(({ userData }) => userData)

  useEffect(() => {
    if (user) navigate('/');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleRegister = (email: string, password: string, name?: string) => {
    name && signUpCall({ email, password, name });
  };
  return <Form signUp handleClick={handleRegister} errMessage={errMessage} />;
};
