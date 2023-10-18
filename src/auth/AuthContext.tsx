/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import initFirebase from '../services/initFirebase';
import getDataFromFirestore from '../services/getDataFromFirestore';
import firebase from 'firebase/compat/app';

interface IUser {
  user: firebase.User,
  name: string
}

interface ContextProps {
  children?: ReactNode
}

const auth = getAuth(initFirebase);

export const AuthContext = createContext<IUser | null>(null);

export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }: ContextProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const name = (await getDataFromFirestore('users', user.uid))?.result?.data()?.name;
        setUser({ user: user as firebase.User, name });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={ user }>
      { loading ? <div>Loading...</div> : children }
    </AuthContext.Provider>
  )
}
