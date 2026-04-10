import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import type {Track} from '../../types';

export const fetchTracks = createAsyncThunk<Track[], string | undefined>(
  'tracks/fetchTracks',
  async (albumId) => {
    const query = albumId ? `?album=${albumId}` : '';
    const response = await axiosApi.get<Track[]>(`/tracks${query}`);
    return response.data;
  }
);

export const deleteTrack = createAsyncThunk<string, string>(
  'tracks/deleteTrack',
  async (id) => {
    await axiosApi.delete(`/tracks/${id}`);
    return id;
  }
);

export const toggleTrackPublished = createAsyncThunk<string, string>(
  'tracks/toggleTrackPublished',
  async (id) => {
    await axiosApi.patch(`/tracks/${id}/togglePublished`);
    return id;
  }
);