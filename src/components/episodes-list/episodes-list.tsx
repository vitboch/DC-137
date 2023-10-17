import React from 'react';

import { EpisodesItem } from '../episodes-item/episodes-item.tsx';

import cls from './episodes-list.module.css';

export const EpisodesList = () => {
  const [episodes, setEpisodes] = React.useState([]);

  const fetchEpisodes = async () => {
    const data = await fetch('https://rickandmortyapi.com/api/episode/');
    const json = await data.json();
    setEpisodes(json.results);
  };

  console.log(episodes);

  React.useEffect(() => {
    fetchEpisodes();
  }, []);

  return (
    <div className={cls.list}>
      {episodes.length > 0 &&
        episodes.map((episode) => (
          <EpisodesItem episode={episode} key={episode.id} />
        ))}
    </div>
  );
};
