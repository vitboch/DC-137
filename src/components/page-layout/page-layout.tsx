import React, { memo } from 'react';
import { IPageLayoutProps } from '../../types/types';
import cls from './page-layout.module.css';

const PageLayout: React.FC<IPageLayoutProps> = ({ head, footer, children }) => {
  return (
    <div className={cls.PageLayout}>
      <header className={cls.head}>{head}</header>
      <main className={cls.center}>{children}</main>
      <footer className={cls.footer}>{footer}</footer>
    </div>
  );
};

export default memo(PageLayout);
