import cls from './button.module.css';
import { ButtonProps } from '../../types/types';

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
