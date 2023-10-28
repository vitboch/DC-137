import React, { memo } from 'react';
import { IPageLayoutProps } from '../../types/types';
import cls from './page-layout.module.css';

const PageLayout: React.FC<IPageLayoutProps> = ({ head, footer, children }) => {
  return (
    <div className={cls.PageLayout}>
      <div className={cls.head}>{head}</div>
      <div className={cls.center}>{children}</div>
      <div className={cls.footer}>{footer}</div>
    </div>
  );
};

export default memo(PageLayout);
