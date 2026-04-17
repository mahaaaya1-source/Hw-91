import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import type {LoginMutation, RegisterMutation, User} from '../../types';

export const registerUser = createAsyncThunk<User, RegisterMutation>(
  'users/registerUser',
  async (userData) => {
    const formData = new FormData();

    formData.append('username', userData.username);
    formData.append('password', userData.password);
    formData.append('displayName', userData.displayName);

    if (userData.avatar) {
      formData.append('avatar', userData.avatar);
    }

    const response = await axiosApi.post<User>('/users', formData);
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

export const googleLogin = createAsyncThunk<User, string>(
  'users/googleLogin',
  async (credential) => {
    const response = await axiosApi.post<{message: string; user: User}>(
      '/users/google',
      {credential}
    );

    return response.data.user;
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  'users/logoutUser',
  async () => {
    await axiosApi.delete('/users/sessions');
  }
);