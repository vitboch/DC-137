import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';
import Form from '../form';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';

const Login = () => {
  const navigate = useNavigate();
  const { signInCall, errMessage } = useAuth();
  const { user } = useAppSelector(({ userData }) => userData)

  useEffect(() => {
    if (user) navigate('/');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (email: string, password: string) => {
    signInCall({ email, password });
  };

  return (
    <Form signUp={false} handleClick={handleLogin} errMessage={errMessage} />
  );
};

export default Login;
