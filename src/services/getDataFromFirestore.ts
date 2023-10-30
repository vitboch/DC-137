import initFirebase from './initFirebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore(initFirebase);
export default async function getDocument(collection: string, id: string) {
  const docRef = doc(db, collection, id);

  let result, error;

  try {
    result = await getDoc(docRef);
  } catch (e: unknown) {
    error = e;
  }

  return { result, error };
}
