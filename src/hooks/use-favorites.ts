import { useEffect, useState } from 'react';
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import initFirebase from '../services/initFirebase';
import { useAppSelector } from './redux-hooks';

export default function useFavorites() {
  const { user } = useAppSelector((state) => state.user);
  const db = getFirestore(initFirebase);

  const [ favorites, setFavorites ] = useState<number[]>([]);

  useEffect(() => {
    if (user) {
      const q = doc(db, 'favorites', user.uid);
      const unsubsribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.data()?.characters as number[];
      console.log(data);
      setFavorites([...data]);
    });
    return unsubsribe;
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToFavorites = async (characterId: number) => {
    if (user) {
      await updateDoc(doc(db, 'favorites', user.uid), {
        characters: arrayUnion(characterId)
      })
    }
  };

  const removeFromFavorites = async (characterId: number) => {
    if (user) {
      await updateDoc(doc(db, 'favorites', user.uid), {
        characters: arrayRemove(characterId)
      })
    }
  };

  
  return { addToFavorites, removeFromFavorites, favorites }
}