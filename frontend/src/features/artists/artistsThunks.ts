import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import type {Artist} from '../../types';

export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchArtists',
  async () => {
    const response = await axiosApi.get<Artist[]>('/artists');
    return response.data;
  }
);

export const deleteArtist = createAsyncThunk<string, string>(
  'artists/deleteArtist',
  async (id) => {
    await axiosApi.delete(`/artists/${id}`);
    return id;
  }
);

export const toggleArtistPublished = createAsyncThunk<string, string>(
  'artists/toggleArtistPublished',
  async (id) => {
    await axiosApi.patch(`/artists/${id}/togglePublished`);
    return id;
  }
);