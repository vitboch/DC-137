import { createBrowserRouter, Outlet } from 'react-router-dom';

import { ErrorPage } from '../pages/error-page';
import { MainPage } from '../pages/main-page';
import { SigninPage } from '../pages/signin-page';
import { SignupPage } from '../pages/signup-page';
import { FavoritesPage } from '../pages/favorites-page';
import { HistoryPage } from '../pages/history-page';
import { CharactersPage } from '../pages/characters-page';
import { CharacterPage } from '../pages/character-page';
import { SearchPage } from '../pages/search-page.tsx';
import { Header } from '../components';

export const router = createBrowserRouter([
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
