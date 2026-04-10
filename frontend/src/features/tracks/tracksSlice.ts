import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../../app/store';
import {
  fetchTracks,
  deleteTrack,
  toggleTrackPublished,
} from './tracksThunks';
import type {Track} from './types';

interface TracksState {
  items: Track[];
  loading: boolean;
}

const initialState: TracksState = {
  items: [],
  loading: false,
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTracks.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteTrack.fulfilled, (state, {payload}) => {
        state.items = state.items.filter((track) => track._id !== payload);
      })
      .addCase(toggleTrackPublished.fulfilled, (state, {payload}) => {
        const foundTrack = state.items.find((track) => track._id === payload);

        if (foundTrack) {
          foundTrack.isPublished = !foundTrack.isPublished;
        }
      });
  },
});

export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTracksLoading = (state: RootState) => state.tracks.loading;

export default tracksSlice.reducer;