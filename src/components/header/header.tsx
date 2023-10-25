import { Link, NavLink } from 'react-router-dom';
import Logo from '../logo';
import cls from './header.module.css';
import { useAppSelector } from '../../hooks/redux-hooks';
import useAuth from '../../hooks/use-auth';

const Header = () => {
  const { user } = useAppSelector((state) => state.user);
  const { signOutCall, isAuth } = useAuth();

  const handleSignOut = () => {
    signOutCall();
  };

  return (
    <header className={cls.header}>
      <Link to="/">
        <Logo />
      </Link>
      {isAuth ? (
        <ul className={cls.nav}>
          <li>
            <NavLink to="/characters" className={cls.link}>
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className={cls.link}>
              Search
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className={cls.link}>
              Favorites
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className={cls.link}>
              History
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className={cls.link}>
              История
            </NavLink>
          </li>
          <li>👤{user?.displayName}</li>
          <li>
            <NavLink to="/" className={cls.link} onClick={handleSignOut}>
              Log out
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className={cls.nav}>
          <li>
            <NavLink to="/signin" className={cls.link}>
              Sign in
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className={cls.link}>
              Sign up
            </NavLink>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
