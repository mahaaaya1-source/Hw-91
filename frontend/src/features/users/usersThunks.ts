import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import type {LoginMutation, RegisterMutation, User} from '../../types';

export const registerUser = createAsyncThunk<User, RegisterMutation>(
  'users/registerUser',
  async (userData) => {
    const response = await axiosApi.post<User>('/users', userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk<User, LoginMutation>(
  'users/loginUser',
  async (userData) => {
    const response = await axiosApi.post<User>('/users/sessions', userData);
    return response.data;
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  'users/logoutUser',
  async () => {
    await axiosApi.delete('/users/sessions');
  }
);