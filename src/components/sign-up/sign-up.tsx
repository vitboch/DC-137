import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';
import Form from '../form';
import { useEffect } from 'react';

export const SignUp = () => {
  const navigate = useNavigate();
  const { signUpCall, errMessage, isAuth } = useAuth();

  useEffect(() => {
    isAuth && navigate('/');
  });

  const handleRegister = (email: string, password: string, name?: string) => {
    name && signUpCall({ email, password, name });
  };
  return <Form signUp handleClick={handleRegister} errMessage={errMessage} />;
};
