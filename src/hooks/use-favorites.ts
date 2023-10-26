import { useAppSelector } from './redux-hooks';

export function useFavorites() {
  const { favorites } = useAppSelector((state) => state.userData);

  return {
    favorites
  };
}
