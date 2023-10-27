import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
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
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const initialState: IUserState = {
  user: null,
  favorites: [],
  status: 'idle'
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
        await setDoc(doc(db, 'favorites', user.uid), {
          characters: arrayUnion(characterId)
        });
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ user }));
        dispatch(getFavorites());
      }
      return unsubscribe;
    });
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
    setUser(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
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
      // .addCase(addCharacterToFavorites.pending, (state) => {
      //   // state.status = 'loading';
      // })
      .addCase(addCharacterToFavorites.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addCharacterToFavorites.rejected, (state) => {
        state.status = 'failed';
      })
      // .addCase(removeCharacterFromFavorites.pending, (state) => {
      //   // state.status = 'loading';
      // })
      .addCase(removeCharacterFromFavorites.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(removeCharacterFromFavorites.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = action.payload as number[] | undefined;
      })
      .addCase(getFavorites.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const {
  setUser,
  removeUser,
  addCharacterToLocalFavorites,
  removeCharacterFromLocalFavorites
} = userDataSlice.actions;

export default userDataSlice.reducer;
