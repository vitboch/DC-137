import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ICharacter } from '../../types/types';
import { initialStateCharacter } from '../../types/initialStateCharacter';

import cls from './character.module.css';

export const Character = () => {
  const { id } = useParams();

  const [character, setCharacter] = useState<ICharacter>(initialStateCharacter);

  const fetchCharacter = async () => {
    const data = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const json = await data.json();
    setCharacter(json);
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  return (
    <div className={cls.character}>
      <img src={character.image} alt="" />
      <div className={cls.name}>{character.name}</div>
    </div>
  );
};
