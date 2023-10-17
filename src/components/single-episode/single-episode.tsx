import cls from './single-episode.module.css';
import React from 'react';

export const SingleEpisode = () => {
  const [episode, setEpisode] = React.useState('');

  const fetchEpisode = async () => {
    const data = await fetch('https://rickandmortyapi.com/api/episode/1');
    const json = await data.json();
    setEpisode(json);
  };

  console.log(episode);

  React.useEffect(() => {
    fetchEpisode();
  }, []);

  return (
    <div className={cls['single-episode']}>
      <div className={cls['single-episode__title']}>
        {episode.episode} / {episode.name}
      </div>
      <img
        className={cls['single-episode__pictures']}
        src={`/episodes/${episode.episode}.png`}
        alt=""
      />
    </div>
  );
};
