import Characters from '../components/characters';
import { ICharacter } from '../types/types';
import { useEffect, useState } from 'react';
import Loader from '../components/loader';
import { useFavorites } from '../hooks/use-favorites';

export const FavoritesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const { favorites } = useFavorites();

  const fetchCharacters = async () => {
    setIsLoading(true);
    if (favorites?.length) {
      const data = await fetch(
        `https://rickandmortyapi.com/api/character/[${favorites?.join(',')}]`
      );
      const json = await data.json();
      setCharacters(json);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    setCharacters(
      characters.filter((character) => favorites?.includes(character.id))
    );
  }, [favorites]);

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
