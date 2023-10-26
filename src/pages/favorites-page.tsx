import Characters from '../components/characters';
import { useAppSelector } from '../hooks/redux-hooks';
import { ICharacter } from '../types/types';
import { useEffect, useState } from 'react';
import Loader from '../components/loader';

export const FavoritesPage = () => {
  const { favorites } = useAppSelector(({ userData }) => userData);
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  const fetchCharacters = async () => {
    setIsLoading(true);
    if (favorites?.length) {
      const data = await fetch(
        `https://rickandmortyapi.com/api/character/[${favorites?.join(',')}]`
      );
      const json = await data.json();
      setCharacters(json);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="section">
      <h2>Favorites</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {Array.isArray(characters) && <Characters characters={characters} />}
        </>
      )}
    </section>
  );
};
