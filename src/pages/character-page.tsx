import Character from '../components/character';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ICharacter } from '../types/types.ts';
import { initialStateCharacter } from '../types/initialStateCharacter.ts';

export const CharacterPage: React.FC = () => {
  const { id } = useParams();

  const [character, setCharacter] = useState<ICharacter>(initialStateCharacter);

  const fetchCharacter = async () => {
    const data = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const json = await data.json();
    setCharacter(json);
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  return (
    <section className="section">
      <Character character={character} />
    </section>
  );
};
