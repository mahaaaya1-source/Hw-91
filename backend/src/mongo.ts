import mongoose from 'mongoose';

const mongoDb = 'mongodb://127.0.0.1:27017/hw-82-music-api';

const connectMongo = async (): Promise<void> => {
  await mongoose.connect(mongoDb);
};

export default connectMongo;