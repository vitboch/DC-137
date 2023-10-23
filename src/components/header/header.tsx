import { Link, NavLink } from 'react-router-dom';

import Logo from '../logo';

import cls from './header.module.css';

import { useAuth } from '../../hooks/use-auth';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { removeUser } from '../../store/slices/user';

const Header = () => {
  const dispatch = useAppDispatch();
  const { isAuth, email } = useAuth();

  const handleSignOut = () => {
    dispatch(removeUser());
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
              Персонажи
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className={cls.link}>
              Поиск
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className={cls.link}>
              Избранное
            </NavLink>
          </li>
          <li>{email}</li>
          <li>
            <NavLink to="/history" className={cls.link}>
              История поиска
            </NavLink>
          </li>
          <li>
            <NavLink to="/signout" className={cls.link} onClick={handleSignOut}>
              Выйти
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className={cls.nav}>
          <li>
            <NavLink to="/signin" className={cls.link}>
              Вход
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className={cls.link}>
              Регистрация
            </NavLink>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
