import mongoose from 'mongoose';
import crypto from 'crypto';
import User from './models/User';

const run = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hw-82-music-api');

  await mongoose.connection.dropCollection('users').catch(() => {});

  await User.create(
    {
      username: 'user',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
    },
    {
      username: 'admin',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
    }
  );

  console.log('Fixtures created');
  await mongoose.connection.close();
};

run();