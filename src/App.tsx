import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './routes';
import { store } from './store';
import './firebase';
import './styles/normalize.css';
import './styles/reset.css';
import './styles/index.css';

export const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
