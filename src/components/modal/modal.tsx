import { useEffect, ReactNode, MouseEvent } from 'react';
import { createPortal } from 'react-dom';

import cls from './modal.module.css';

type ModalInnerProps = {
  closeHandler: () => void;
  children: ReactNode;
};

const ModalInner = ({ closeHandler, children }: ModalInnerProps) => {
  useEffect(() => {
    const closeModalByEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    };
    document.addEventListener('keydown', closeModalByEscape);
    return () => {
      document.removeEventListener('keydown', closeModalByEscape);
    };
  }, [closeHandler]);

  const closeModalByClickX = () => closeHandler();

  return (
    <div className={cls.modal__inner}>
      <div onClick={closeModalByClickX} className={cls.close}>
        Закрыть
      </div>
      {children}
    </div>
  );
};

type ModalProps = {
  isOpen: boolean;
  closeHandler: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, closeHandler, children }: ModalProps) => {
  if (!isOpen) return null;

  const closeModalByClickWrapper = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeHandler();
    }
  };

  return createPortal(
    <div onMouseDown={closeModalByClickWrapper} className={cls.modal}>
      <ModalInner closeHandler={closeHandler}>{children}</ModalInner>
    </div>,
    document.getElementById('modal') as HTMLElement
  );
};
