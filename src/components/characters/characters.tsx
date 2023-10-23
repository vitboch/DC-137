import React from 'react';
import { Link } from 'react-router-dom';
import { ICharacter } from '../../types/types.ts';
import cls from './characters.module.css';

interface Props {
  characters: ICharacter[];
}

export const Characters: React.FC<Props> = ({ characters }) => {
  return (
    <div className={cls.card__list}>
      {characters.map((character) => (
        <div className={cls.card__item} key={character.id}>
          <Link className={cls.card__link} to={`/characters/${character.id}`}>
            <img className={cls.card__image} src={character.image} alt="" />
            <div className={cls.card__name}>{character.name}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};
