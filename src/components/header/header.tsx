import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';

import { Link, NavLink } from 'react-router-dom';

import { Logo } from '../logo/logo';

import cls from './header.module.css';
import signOut from '../../auth/signOut';

export const Header = () => {
  const user = useContext(AuthContext);

  const handleSignout = () => {
    signOut();
  };

  return (
    <header className={cls.header}>
      <Link to="/">
        <Logo />
      </Link>
      {user ? (
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
          <li>
            <NavLink to="/history" className={cls.link}>
              История поиска
            </NavLink>
          </li>
          <li>
            <NavLink to="/signout" className={cls.link} onClick={handleSignout}>
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
