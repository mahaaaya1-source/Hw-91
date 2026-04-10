import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import type {Album} from '../../types';

export const fetchAlbums = createAsyncThunk<Album[], string | undefined>(
  'albums/fetchAlbums',
  async (artistId) => {
    const query = artistId ? `?artist=${artistId}` : '';
    const response = await axiosApi.get<Album[]>(`/albums${query}`);
    return response.data;
  }
);

export const deleteAlbum = createAsyncThunk<string, string>(
  'albums/deleteAlbum',
  async (id) => {
    await axiosApi.delete(`/albums/${id}`);
    return id;
  }
);

export const toggleAlbumPublished = createAsyncThunk<string, string>(
  'albums/toggleAlbumPublished',
  async (id) => {
    await axiosApi.patch(`/albums/${id}/togglePublished`);
    return id;
  }
);