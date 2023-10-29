import { RouterProvider } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import router from './routes';
import { store } from './store';
import './firebase';
import './styles/normalize.css';
import './styles/reset.css';
import './styles/index.css';
import { useLayoutEffect } from 'react';
import { checkAuthStatus } from './store/slices/user-data';
import { AppDispatch } from './store';
import { ReactNode } from 'react';
import { useAppSelector } from './hooks/redux-hooks';
import Loader from './components/loader';
import { unwrapResult } from '@reduxjs/toolkit';

const Wrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useAppSelector(({ userData }) => userData);

  useLayoutEffect(() => {
    const unsubscribePromise = dispatch(checkAuthStatus());
    return () => {
      unsubscribePromise
        .then(unwrapResult)
        .then((unsubscribe) => unsubscribe())
        .catch((err: unknown) => console.error(err));
    };
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
