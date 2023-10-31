import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';
import { useAppSelector } from '../../hooks/redux-hooks';
import Form from '../form';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signUpCall, errMessage } = useAuth();
  const { user } = useAppSelector(({ userData }) => userData);

  useEffect(() => {
    if (user) navigate('/');
  }, []);

  const handleRegister = (email: string, password: string, name?: string) => {
    name && signUpCall({ email, password, name });
  };
  return <Form signUp handleClick={handleRegister} errMessage={errMessage} />;
};
