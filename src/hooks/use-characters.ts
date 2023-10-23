import { useAppSelector } from './redux-hooks';

export function useCharacters() {
  const { characters } = useAppSelector((state) => state.characters);

  return {
    characters
  };
}
