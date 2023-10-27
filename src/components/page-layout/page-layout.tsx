import React, { memo, ReactNode } from 'react';
import cls from './page-layout.module.css';

interface PageLayoutProps {
  head: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ head, footer, children }) => {
  return (
    <div className={cls.PageLayout}>
      <div className={cls.head}>{head}</div>
      <div className={cls.center}>{children}</div>
      <div className={cls.footer}>{footer}</div>
    </div>
  );
};

export default memo(PageLayout);
