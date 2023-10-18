import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import cls from './characters.module.css';
import { ICharacter } from '../../types/types';

export const Characters = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  const fetchCharacters = async () => {
    const data = await fetch('https://rickandmortyapi.com/api/character');
    const json = await data.json();
    setCharacters(json.results);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <>
      <div className={cls.list}>
        {characters.length > 0 &&
          characters.map((character) => (
            <div className={cls.card} key={character.id}>
              <Link to={`/characters/${character.id}`}>
                <img
                  className={cls.card__pictures}
                  src={character.image}
                  alt=""
                />
                <div className={cls.card__name}>{character.name}</div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};
