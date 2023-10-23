import { ICharactersState } from './../../types/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: ICharactersState = {
  characters: [],
  status: 'idle',
  error: null
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async () => {
    try {
      const response = await axios.get(
        'https://rickandmortyapi.com/api/character'
      );
      return response.data.results;
    } catch (error) {
      throw new Error('Failed to fetch characters');
    }
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  }
});

export default charactersSlice.reducer;
