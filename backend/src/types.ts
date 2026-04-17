import {Request} from 'express';
import {Types} from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: 'user' | 'admin';
  displayName: string;
  avatar: string | null;
  googleID?: string | null;
}

export interface RequestWithUser extends Request {
  user?: {
    _id: Types.ObjectId | string;
    username: string;
    password: string;
    token: string;
    role: 'user' | 'admin';
    displayName: string;
    avatar: string | null;
    googleID?: string | null;
    generateToken: () => void;
    save: () => Promise<unknown>;
  };
}