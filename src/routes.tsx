import { createBrowserRouter, Outlet } from 'react-router-dom';

import { ErrorPage } from './pages/error-page.tsx';
import { MainPage } from './pages/main-page.tsx';
import { SigninPage } from './pages/signin-page.tsx';
import { SignupPage } from './pages/signup-page.tsx';
import { SignoutPage } from './pages/signout-page.tsx';
import { FavoritesPage } from './pages/favorites-page.tsx';
import { HistoryPage } from './pages/history-page.tsx';
import { CharactersPage } from './pages/characters-page.tsx';
import { CharacterPage } from './pages/character-page.tsx';
import { SearchPage } from './pages/search-page.tsx';
import Header from './components/header';

const router = createBrowserRouter([
  {
    element: (
      <div className="main">
        <Header />
        <Outlet />
      </div>
    ),
    children: [
      {
        path: '/',
        index: true,
        element: <MainPage />,
        errorElement: <ErrorPage />
      },
      { path: 'signin', element: <SigninPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'signout', element: <SignoutPage /> },
      {
        path: 'characters',
        element: <CharactersPage />
      },
      {
        path: 'characters/:id',
        element: <CharacterPage />
      },
      {
        path: 'favorites',
        element: <FavoritesPage />
      },
      {
        path: 'history',
        element: <HistoryPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      }
    ]
  }
]);

export default router;
