import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user-data';
import charactersReducer from './slices/characters';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  reducer: {
    userData: userReducer,
    characters: charactersReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
