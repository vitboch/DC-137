import initFirebase from '../services/initFirebase';
import { signOut as fbSignOut, getAuth } from 'firebase/auth';

const auth = getAuth(initFirebase);

export default async function signOut() {
  let result = null,
    error = null;
  try {
    result = await fbSignOut(auth);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
