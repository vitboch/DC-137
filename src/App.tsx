import { RouterProvider } from 'react-router-dom';

import { router } from './routes/router';

import './reset.css';
import './index.css';
import { AuthContextProvider } from './auth/AuthContext';

export const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};
