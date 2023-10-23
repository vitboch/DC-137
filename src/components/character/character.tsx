import { useParams } from 'react-router-dom';
import { useCharacters } from '../../hooks/use-characters';
import { ICharacter } from '../../types/types';
import cls from './character.module.css';

const Character = () => {
  const { id } = useParams<{ id: string }>();
  const { characters } = useCharacters();
  const character = characters.find(
    (character: ICharacter) => character.id === Number(id)
  );

  return (
    <div className={cls.character}>
      <img src={character.image} alt={`image_${character.image}`} />
      <div className={cls.name}>{character.name}</div>
    </div>
  );
};

export default Character;
