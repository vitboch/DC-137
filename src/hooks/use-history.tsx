import initFirebase from '../services/initFirebase';
import {
  getFirestore,
  getDocs,
  addDoc,
  collection,
  query,
  serverTimestamp
} from 'firebase/firestore';
import { ISearchParams, IHistoryRecord } from '../types/types';
import { useAppSelector } from './redux-hooks';

export default function useHistory() {
  const db = getFirestore(initFirebase);
  const { user } = useAppSelector((state) => state.userData);

  const addToHistory = async ({ name, status, gender }: ISearchParams) => {
    if (user) {
      const collectionRef = collection(db, 'history', user.uid, 'data');

      await addDoc(collectionRef, {
        name,
        status,
        gender,
        timestamp: serverTimestamp()
      });
    }
  };

  const getFromHistory = async (): Promise<IHistoryRecord[] | undefined> => {
    if (user) {
      const collectionRef = collection(db, 'history', user.uid, 'data');
      const q = query(collectionRef);
      const querySnapshot = await getDocs(q);
      const result: IHistoryRecord[] = [];
      querySnapshot.forEach((e) => result.push(e.data() as IHistoryRecord));
      return result;
    }
  };

  return { addToHistory, getFromHistory };
}
