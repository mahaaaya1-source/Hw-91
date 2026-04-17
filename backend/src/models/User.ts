import mongoose, {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import {UserFields} from '../types';

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = mongoose.Model<UserFields, {}, UserMethods>;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<UserFields, UserModel, UserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin'],
  },
  displayName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  googleID: {
    type: String,
    default: null,
  },
});

UserSchema.pre('save', async function() {
  const user = this;

  if (!user.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  user.password = await bcrypt.hash(user.password, salt);
});

UserSchema.methods.checkPassword = async function(password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
  this.token = crypto.randomUUID();
};

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = model<UserFields, UserModel>('User', UserSchema);

export default User;