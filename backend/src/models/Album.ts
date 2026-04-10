import {Schema, model} from 'mongoose';
import {AlbumFields} from '../types';

const AlbumSchema = new Schema<AlbumFields>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  image: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Album = model<AlbumFields>('Album', AlbumSchema);

export default Album;