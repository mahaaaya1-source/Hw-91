import {Schema, model} from 'mongoose';
import {TrackFields} from '../types';

const TrackSchema = new Schema<TrackFields>({
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
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  youtubeLink: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Track = model<TrackFields>('Track', TrackSchema);

export default Track;