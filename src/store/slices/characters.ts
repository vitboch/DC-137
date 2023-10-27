import { ICharactersState } from './../../types/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: ICharactersState = {
  characters: {
    info: {
      count: 0,
      pages: 0,
      next: '',
      prev: ''
    },
    results: []
  },
  status: 'idle',
  error: null
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (page: number) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );
      return response.data;
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
