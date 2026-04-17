import axios from 'axios';
import type {Store} from '@reduxjs/toolkit';
import type {RootState} from './app/store';
import {API_URL} from './constants';

const axiosApi = axios.create({
  baseURL: API_URL,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const token = store.getState().users.user?.token;

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = token;
    }

    return config;
  });
};

export default axiosApi;