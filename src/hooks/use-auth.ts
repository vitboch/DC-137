import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { setUser, removeUser } from '../store/slices/user-data';
import initFirebase from '../services/initFirebase';
import { getAuth, updateProfile } from 'firebase/auth';
import { ISignInData, ISignUpData } from '../types/types';
import { FirebaseError } from '@firebase/util';

export default function useAuth() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [isAuth] = useState(false);

  const auth = getAuth(initFirebase);

  const signInCall = async ({ email, password }: ISignInData) => {
    setIsLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(user));
    } catch (err: unknown) {
      if (err instanceof FirebaseError) setErrMessage(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const signUpCall = async ({ email, password, name }: ISignUpData) => {
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName: name
      });
      dispatch(setUser({ ...user, displayName: name }));
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setErrMessage(err.message);
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const signOutCall = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      dispatch(removeUser());
    } catch (err: unknown) {
      if (err instanceof FirebaseError) setErrMessage(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, signInCall, signUpCall, signOutCall, errMessage, isAuth };
}
