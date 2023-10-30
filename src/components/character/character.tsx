import React from 'react';
import { ICharacter } from '../../types/types.ts';
import cls from './character.module.css';
import FavButton from '../fav-button';

interface Props {
  character: ICharacter;
}
// import { useParams } from 'react-router-dom';
// import { useCharacters } from '../../hooks/use-characters';
// import { ICharacter } from '../../types/types';
// import cls from './character.module.css';
//
// const Character = () => {
//   const { id } = useParams<{ id: string }>();
//   const { characters } = useCharacters();
//   const character = characters.find(
//     (character: ICharacter) => character.id === Number(id)
//   );

const Character: React.FC<Props> = ({
  character: { name, image, id, species, status, gender, origin, location }
}) => {
  return (
    <div className={cls.character}>
      <div className={cls.character__name}>{name}</div>
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
    </div>
  );
};

export default Character;
