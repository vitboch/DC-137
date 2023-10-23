import React from 'react';
import { ICharacter } from '../../types/types.ts';
import cls from './character.module.css';

interface Props {
  character: ICharacter;
}

export const Character: React.FC<Props> = ({ character }) => {
  return (
    <div className={cls.character}>
      <div className={cls.character__name}>{character.name}</div>
      <div className={cls.character__info}>
        <img
          className={cls.character__image}
          src={character.image}
          alt={character.name}
        />
        <div>
          <div>
            Name: <b>{character.name}</b>
          </div>
          <div>
            Species: <b>{character.species}</b>
          </div>
          <div>
            Status: <b>{character.status}</b>
          </div>
          <div>
            Gender: <b>{character.gender}</b>
          </div>
          <div>
            Origin name: <b>{character.origin.name}</b>
          </div>
          <div>
            Location name: <b>{character.location.name}</b>
          </div>
        </div>
      </div>
    </div>
  );
};
