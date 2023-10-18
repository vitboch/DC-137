import initFirebase from '../services/initFirebase';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

const auth = getAuth(initFirebase);

export default async function signIn(email: string, password: string) {
  let result = null, error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);    
  } catch (e) {
    error = e;
  }
  return { result, error }
};
