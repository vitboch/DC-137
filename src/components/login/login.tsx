import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';
import Form from '../form';
import { useAppSelector } from '../../hooks/redux-hooks';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signInCall, errMessage } = useAuth();
  const { user } = useAppSelector(({ userData }) => userData);

  useEffect(() => {
    if (user) navigate('/');
  }, []);

  const handleLogin = (email: string, password: string) => {
    signInCall({ email, password });
  };

  return (
    <Form signUp={false} handleClick={handleLogin} errMessage={errMessage} />
  );
};

export default Login;
