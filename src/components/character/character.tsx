import { useEffect, useState } from 'react';

import { ICharacter } from '../../types/types';
import { initialStateCharacter } from '../../types/initialStateCharacter.ts';

import cls from './character.module.css';

export const Character = () => {
  const [character, setCharacter] = useState<ICharacter>(initialStateCharacter);

  const fetchCharacter = async () => {
    const data = await fetch('https://rickandmortyapi.com/api/character/1');
    const json = await data.json();
    setCharacter(json);
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  return (
    <div className={cls.character}>
      <div className={cls.name}>{character.name}</div>
    </div>
  );
};
