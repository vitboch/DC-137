import { Link } from 'react-router-dom';

export const ErrorPage: React.FC = () => {
  return (
    <section className="section">
      <h2>An unknown error has occurred!</h2>
      <Link to="/">Go back to main page</Link>
    </section>
  );
};
