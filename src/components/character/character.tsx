import React from 'react';
import { CharacterProps } from '../../types/types.ts';
import cls from './character.module.css';
import FavButton from '../fav-button';

const Character: React.FC<CharacterProps> = ({
  character: { name, image, id, species, status, gender, origin, location }
}) => {
  return (
    <article className={cls.character}>
      <h2 className={cls.character__name}>{name}</h2>
      <div className={cls.character__info}>
        <div style={{ position: 'relative' }}>
          <img className={cls.character__image} src={image} alt={name} />
          <FavButton id={id} />
        </div>

        <div>
          <div>
            Name: <b>{name}</b>
          </div>
          <div>
            Species: <b>{species}</b>
          </div>
          <div>
            Status: <b>{status}</b>
          </div>
          <div>
            Gender: <b>{gender}</b>
          </div>
          <div>
            Origin name: <b>{origin.name}</b>
          </div>
          <div>
            Location name: <b>{location.name}</b>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Character;
