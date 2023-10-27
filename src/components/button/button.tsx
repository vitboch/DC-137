import React from 'react';

import cls from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'success' | 'danger';
}

export const Button = ({
  variant,
  onClick,
  children,
  ...props
}: ButtonProps) => {
  const className = `${cls.button} ${cls[`${variant}`]}`;

  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
