import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { setUser, removeUser } from '../store/slices/user';
import initFirebase from '../services/initFirebase';
import { getAuth, updateProfile } from 'firebase/auth';
import { ISignInData, ISignUpData } from '../types/types';
import { FirebaseError } from '@firebase/util';

export default function useAuth() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  const auth = getAuth(initFirebase);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ user }));
        setIsAuth(true);
      } else {
        dispatch(removeUser());
        setIsAuth(false);
      }
      return unsubscribe;
    });
  });

  const signInCall = async ({ email, password }: ISignInData) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
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
      dispatch(setUser({ user: { ...user, displayName: name } }));
    } catch (err) {
      if (err instanceof FirebaseError) {
        setErrMessage(err.message);
        console.log('here');
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
    } catch (err) {
      if (err instanceof FirebaseError) setErrMessage(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, signInCall, signUpCall, signOutCall, errMessage, isAuth };
}
