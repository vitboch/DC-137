import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  isAnyOf
} from '@reduxjs/toolkit';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import initFirebase from '../../services/initFirebase';
import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { IUserState, IState } from '../../types/types';

const initialState: IUserState = {
  user: getAuth().currentUser,
  favorites: [],
  status: 'loading'
};

const db = getFirestore(initFirebase);

export const addCharacterToFavorites = createAsyncThunk<
  void,
  number,
  { state: IState }
>(
  'user/addCharacterToFavorites',
  async (characterId, { getState, dispatch }) => {
    try {
      const {
        userData: { user }
      } = getState();
      if (user?.uid) {
        const docRef = doc(db, 'favorites', user.uid);
        const docSnap = getDoc(docRef);
        if ((await docSnap).exists()) {
          await updateDoc(docRef, {
            characters: arrayUnion(characterId)
          });
        } else {
          await setDoc(docRef, {
            characters: arrayUnion(characterId)
          });
        }

        dispatch(
          userDataSlice.actions.addCharacterToLocalFavorites(characterId)
        );
      }
    } catch (error) {
      throw new Error('Failed to update user favorites');
    }
  }
);

export const removeCharacterFromFavorites = createAsyncThunk<
  void,
  number,
  { state: IState }
>(
  'user/removeCharacterFromFavorites',
  async (characterId, { getState, dispatch }) => {
    try {
      const {
        userData: { user }
      } = getState();
      if (user?.uid) {
        await updateDoc(doc(db, 'favorites', user.uid), {
          characters: arrayRemove(characterId)
        });
        dispatch(
          userDataSlice.actions.removeCharacterFromLocalFavorites(characterId)
        );
      }
    } catch (error) {
      throw new Error('Failed to update user favorites');
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'user/checkAuthStatus',
  async (_, { dispatch }) => {
    const auth = getAuth(initFirebase);
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      dispatch(authStateCallback(user))
    );
    return unsubscribe;
  }
);

export const authStateCallback = createAsyncThunk(
  'user/authStateCallback',
  async (user: User | null, { dispatch }) => {
    dispatch(setUser(user));
    await dispatch(getFavorites());
  }
);

export const getFavorites = createAsyncThunk(
  'user/getFavorites',
  async (_, { getState }) => {
    try {
      const {
        userData: { user }
      } = getState() as IState;
      if (user?.uid) {
        const result = await getDoc(doc(db, 'favorites', user.uid));
        return result.data()?.characters;
      }
    } catch (error) {
      throw new Error('Failed to fetch user favorites');
    }
  }
);

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = null;
    },
    addCharacterToLocalFavorites(state, action: PayloadAction<number>) {
      state.favorites = [
        ...(state.favorites?.length ? (state.favorites as number[]) : []),
        action.payload
      ];
    },
    removeCharacterFromLocalFavorites(state, action: PayloadAction<number>) {
      state.favorites = state.favorites?.filter((el) => el !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = action.payload as number[] | undefined;
      })
      .addCase(authStateCallback.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addMatcher(
        isAnyOf(getFavorites.pending, checkAuthStatus.pending, authStateCallback.pending),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(getFavorites.rejected, checkAuthStatus.rejected, authStateCallback.rejected),
        (state) => {
          state.status = 'failed';
        }
      );
  }
});

export const { setUser, removeUser } = userDataSlice.actions;

export default userDataSlice.reducer;
