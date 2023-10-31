import { useEffect, useState } from 'react';
import { ICharacter } from '../types/types.ts';
import Characters from '../components/characters';

export const MainPage: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getRandomDigits = (
    amount: number,
    min: number,
    max: number
  ): number[] => {
    const digits = [];
    for (let i = 0; i < amount; i++) {
      digits.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return digits;
  };

  const fetchCharacters = async (randomDigits: number[]) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${randomDigits.join(',')}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }
      const data = await response.json();
      setCharacters(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const randomDigits = getRandomDigits(8, 1, 826);
    fetchCharacters(randomDigits);
  }, []);

  return (
    <section className="section">
      <h1>The Rick and Morty Characters </h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : characters.length > 0 ? (
        <Characters characters={characters} />
      ) : (
        <div>No characters found.</div>
      )}
    </section>
  );
};
