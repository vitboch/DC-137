// import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCharacters } from '../../store/slices/characters';
// import Loader from '../loader';
import { ICharacter } from '../../types/types';
import cls from './characters.module.css';
import React from 'react';

interface Props {
  characters: ICharacter[];
}

const Characters: React.FC<Props> = ({ characters }) => {
  // const dispatch = useDispatch();
  // const characters: ICharacter[] = useSelector(
  //   (state: any) => state.characters.characters
  // );
  // const status: string = useSelector((state: any) => state.characters.status);
  // const error: string | null = useSelector(
  //   (state: any) => state.characters.error
  // );
  //
  // useEffect(() => {
  //   dispatch(fetchCharacters() as any);
  // }, [dispatch]);
  //
  // if (status === 'loading') {
  //   return <Loader />;
  // }
  //
  // if (status === 'failed') {
  //   return <div>Error: {error}</div>;
  // }

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

export default Characters;
