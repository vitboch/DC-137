import cls from './episodes-item.module.css';

export const EpisodesItem = ({ episode }) => {
  return (
    <div className={cls.card}>
      <a href={`/episode/${episode.id}`}>
        <img
          className={cls.card__pictures}
          src={`/episodes/${episode.episode}.png`}
          alt=""
        />
        <div className={cls.card__episode}>{episode.episode}</div>
        <div className={cls.card__name}>{episode.name}</div>
      </a>
    </div>
  );
};
