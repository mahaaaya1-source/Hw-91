import {createSlice} from '@reduxjs/toolkit';
import {loginUser, logoutUser, registerUser} from './usersThunks';
import type {UsersState, User} from '../../types';

const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    return null;
  }
};

const initialState: UsersState = {
  user: getStoredUser(),
  registerLoading: false,
  loginLoading: false,
  logoutLoading: false,
  registerError: null,
  loginError: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, {payload}) => {
        state.registerLoading = false;
        state.user = payload;
        localStorage.setItem('user', JSON.stringify(payload));
      })
      .addCase(registerUser.rejected, (state) => {
        state.registerLoading = false;
        state.registerError = 'Registration failed';
      })

      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, {payload}) => {
        state.loginLoading = false;
        state.user = payload;
        localStorage.setItem('user', JSON.stringify(payload));
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginLoading = false;
        state.loginError = 'Login failed';
      })

      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutLoading = false;
        state.user = null;
        localStorage.removeItem('user');
      })
      .addCase(logoutUser.rejected, (state) => {
        state.logoutLoading = false;
      });
  },
});

export default usersSlice.reducer;