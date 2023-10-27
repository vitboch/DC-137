import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';
import Form from '../form';
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const { signInCall, errMessage, isAuth } = useAuth();

  useEffect(() => {
    isAuth && navigate('/');
  });

  const handleLogin = (email: string, password: string) => {
    signInCall({ email, password });
  };

  return (
    <Form signUp={false} handleClick={handleLogin} errMessage={errMessage} />
  );
};

export default Login;
