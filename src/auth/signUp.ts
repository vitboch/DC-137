import initFirebase from '../services/initFirebase';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const auth = getAuth(initFirebase);

export default async function signUp(email: string, password: string) {
  let result = null, error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);    
  } catch (e) {
    error = e;
  }

  return { result, error }
};
