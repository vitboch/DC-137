import cls from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <>
      <div className={cls.footer__up}></div>
      <div className={cls.footer__down}>
        <div className={cls.footer__center}>
          <h3 className={cls.footer__title}>Rick and Morty Info</h3>
          <p className={cls.footer__descr}>
            This project is a React.js web app that displays details of
            characters from the Rick and Morty show
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
