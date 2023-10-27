import { RouterProvider } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import router from './routes';
import { store } from './store';
import './firebase';
import './styles/normalize.css';
import './styles/reset.css';
import './styles/index.css';
import { useEffect } from 'react';
import { checkAuthStatus } from './store/slices/userData';
import { AppDispatch } from './store';
import { ReactNode } from 'react';
import { useAppSelector } from './hooks/redux-hooks';
import Loader from './components/loader';

const Wrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useAppSelector((state) => state.userData);

  useEffect(() => {
    dispatch(checkAuthStatus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{status === 'loading' ? <Loader /> : <>{children}</>}</>;
};

export const App = () => {
  return (
    <Provider store={store}>
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    </Provider>
  );
};
