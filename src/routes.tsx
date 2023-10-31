import { createHashRouter, Outlet } from 'react-router-dom';
import { ErrorPage } from './pages/error-page';
import { MainPage } from './pages/main-page';
import { SigninPage } from './pages/signin-page';
import { SignupPage } from './pages/signup-page';
import { SignoutPage } from './pages/signout-page.tsx';
import { FavoritesPage } from './pages/favorites-page';
import { HistoryPage } from './pages/history-page';
import { CharactersPage } from './pages/characters-page';
import { CharacterPage } from './pages/character-page';
import { SearchPage } from './pages/search-page';
import Header from './components/header';
import Footer from './components/footer';
import ProtectedRoute from './hoc/protected-route.tsx';
import PageLayout from './components/page-layout';

const router = createHashRouter([
  {
    element: (
      <PageLayout head={<Header />} footer={<Footer />}>
        <Outlet />
      </PageLayout>
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
        element: (
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'history',
        element: (
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'search',
        element: <SearchPage />
      }
    ]
  }
]);

export default router;
