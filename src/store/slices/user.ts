import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

const initialState: { 
  user: User | null,
  favorites: number[]
} = {
  user: null,
  favorites: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
    },
    removeUser(state) {
      state.user = null;
    },
    addToFavorites(state, action: PayloadAction<number>) {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(e => e!== action.payload);
    }
  }
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
