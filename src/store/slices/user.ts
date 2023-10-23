import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import firebase from 'firebase/compat/app';
import { User } from 'firebase/auth';

const initialState: { user: User | null } = {
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
      // state.email = action.payload.email;
      // state.token = action.payload.token;
      // state.id = action.payload.id;
      // state.name = action.payload.name;
    },
    removeUser(state) {
      state.user = null;
      // state.email = null;
      // state.token = null;
      // state.id = null;
    }
  }
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
