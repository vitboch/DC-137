import { useAppSelector } from './redux-hooks';
import { useDispatch } from 'react-redux';
import {
  addCharacterToFavorites,
  removeCharacterFromFavorites
} from '../store/slices/userData';
import { AppDispatch } from '../store';

export function useFavorites() {
  const { favorites } = useAppSelector(({ userData }) => userData);
  const dispatch = useDispatch<AppDispatch>();

  const callAddCharacterToFavorites = (id: number) => {
    dispatch(addCharacterToFavorites(id));
  };

  const callRemoveCharacterToFavorites = (id: number) => {
    dispatch(removeCharacterFromFavorites(id));
  };

  return {
    favorites,
    callAddCharacterToFavorites,
    callRemoveCharacterToFavorites
  };
}
