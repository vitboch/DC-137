import React from 'react';
import cls from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <>
      <div className={cls.container}></div>
      <div className={cls.footer}>
        <div className={cls.footer_center}>
          <h3>Rick and Morty Info</h3>
          <p>
            This project is a React.js web app that displays details of
            characters from the Rick and Morty show
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
