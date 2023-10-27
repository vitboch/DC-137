import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <section className="section">
      <h1>Произошла неизвестная ошибка!</h1>
      <Link to="/">Вернуться на главную страницу.</Link>
    </section>
  );
};
