import { Link, NavLink } from 'react-router-dom';
import Logo from '../logo';
import cls from './header.module.css';
import { useAppSelector } from '../../hooks/redux-hooks';
import useAuth from '../../hooks/use-auth';
import { UserProfilePic } from './user-profile-pic';

const Header = () => {
  const { user } = useAppSelector((state) => state.userData);
  const { signOutCall } = useAuth();

  const handleSignOut = () => {
    signOutCall();
  };

  return (
    <header className={cls.header}>
      <div className={cls.header__container}>
        <Link to="/">
          <Logo />
        </Link>
        {user ? (
          <>
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
            </ul>
            <div className={cls['header__user-section']}>
              <span className={cls['profile']}>
                <UserProfilePic />
                <span className={cls['profile__user-name']}>
                  {user?.displayName}
                </span>
              </span>
              <span>
                <NavLink to="/" className={cls.link} onClick={handleSignOut}>
                  Log out
                </NavLink>
              </span>
            </div>
          </>
        ) : (
          <>
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
            </ul>
            <div className={cls['header__user-section']}>
              <span>
                <NavLink to="/signin" className={cls.link}>
                  Sign in
                </NavLink>
              </span>
              <span>
                <NavLink to="/signup" className={cls.link}>
                  Sign up
                </NavLink>
              </span>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
