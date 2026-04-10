import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../../app/store';
import {
  fetchArtists,
  deleteArtist,
  toggleArtistPublished,
} from './artistsThunks';
import type {Artist} from '../../types';

interface ArtistsState {
  items: Artist[];
  loading: boolean;
}

const initialState: ArtistsState = {
  items: [],
  loading: false,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteArtist.fulfilled, (state, {payload}) => {
        state.items = state.items.filter((artist) => artist._id !== payload);
      })
      .addCase(toggleArtistPublished.fulfilled, (state, {payload}) => {
        const foundArtist = state.items.find((artist) => artist._id === payload);

        if (foundArtist) {
          foundArtist.isPublished = !foundArtist.isPublished;
        }
      });
  },
});

export const selectArtists = (state: RootState) => state.artists.items;
export const selectArtistsLoading = (state: RootState) => state.artists.loading;

export default artistsSlice.reducer;