import { Link, NavLink } from 'react-router-dom';

import { Logo } from '../logo/logo';

import cls from './header.module.css';

export const Header = () => {
  // temp
  const logIn = true;

  return (
    <header className={cls.header}>
      <Link to="/">
        <Logo />
      </Link>
      {logIn ? (
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
