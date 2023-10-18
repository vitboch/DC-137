import { RouterProvider } from 'react-router-dom';

import { router } from './routes/router';

import './reset.css';
import './index.css';

export const App = () => <RouterProvider router={router} />;
