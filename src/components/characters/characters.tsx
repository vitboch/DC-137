import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../../store/slices/characters';
import Loader from '../loader';
import { ICharacter } from '../../types/types';
import cls from './characters.module.css';

const Characters: React.FC = () => {
  const dispatch = useDispatch();
  const characters: ICharacter[] = useSelector(
    (state: any) => state.characters.characters
  );
  const status: string = useSelector((state: any) => state.characters.status);
  const error: string | null = useSelector(
    (state: any) => state.characters.error
  );

  useEffect(() => {
    dispatch(fetchCharacters() as any);
  }, [dispatch]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className={cls.list}>
        {characters.map((character: ICharacter) => (
          <div className={cls.card} key={character.id}>
            <Link to={`/characters/${character.id}`}>
              <img
                className={cls.card__pictures}
                src={character.image}
                alt={`image_${character.id}`}
              />
              <div className={cls.card__name}>{character.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Characters;
