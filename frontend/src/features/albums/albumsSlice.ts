import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../../app/store';
import {
  fetchAlbums,
  deleteAlbum,
  toggleAlbumPublished,
} from './albumsThunks';
import type {Album} from './types';

interface AlbumsState {
  items: Album[];
  loading: boolean;
}

const initialState: AlbumsState = {
  items: [],
  loading: false,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteAlbum.fulfilled, (state, {payload}) => {
        state.items = state.items.filter((album) => album._id !== payload);
      })
      .addCase(toggleAlbumPublished.fulfilled, (state, {payload}) => {
        const foundAlbum = state.items.find((album) => album._id === payload);

        if (foundAlbum) {
          foundAlbum.isPublished = !foundAlbum.isPublished;
        }
      });
  },
});

export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsLoading = (state: RootState) => state.albums.loading;

export default albumsSlice.reducer;