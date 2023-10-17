import { Characters, Header } from './components';

import './reset.css';
import './index.css';

export const App = () => {
  return (
    <>
      <main className="main">
        <Header />
        <Characters />
      </main>
    </>
  );
};
