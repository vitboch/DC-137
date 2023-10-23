import { useEffect, useState } from 'react';
import Characters from "../components/characters";
import { ICharacter } from '../types/types.ts';

export const CharactersPage = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  const fetchCharacters = async () => {
    const data = await fetch('https://rickandmortyapi.com/api/character');
    const json = await data.json();
    setCharacters(json.results);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <section className="section">
      <Characters characters={characters} />
    </section>
  );
};
