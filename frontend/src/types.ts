export interface User {
  _id: string;
  username: string;
  token: string;
  role: 'user' | 'admin';
  displayName: string;
  avatar: string | null;
  googleID?: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface UsersState {
  user: User | null;
  registerLoading: boolean;
  loginLoading: boolean;
  logoutLoading: boolean;
  registerError: string | null;
  loginError: string | null;
}