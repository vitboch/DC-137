import Search from '../components/search';

export const MainPage = () => {
  return (
    <section className="section">
      <p>
        На главной странице (/) располагается вступительный текст с описанием
        сайта и панель поиска: input и если необходимо, всякого рода фильтры.
      </p>
      <Search />
    </section>
  );
};
