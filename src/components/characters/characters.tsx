import { Link } from 'react-router-dom';
import { ICharacter } from '../../types/types';
import cls from './characters.module.css';
import React from 'react';
import FavButton from '../fav-button';

interface Props {
  characters: ICharacter[];
}

const Characters: React.FC<Props> = ({ characters }) => {
  return (
    <div className={cls.card__list}>
      {characters.map(({ id, image, name }) => (
        <div className={cls.card__item} key={id}>
          <Link className={cls.card__link} to={`/characters/${id}`}>
            <img className={cls.card__image} src={image} alt="" />
            <div className={cls.card__name}>{name}</div>
          </Link>
          <FavButton id={id} />
        </div>
      ))}
    </div>
  );
};

export default Characters;
