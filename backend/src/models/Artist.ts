import {Schema, model} from 'mongoose';
import {ArtistFields} from '../types';

const ArtistSchema = new Schema<ArtistFields>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  information: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Artist = model<ArtistFields>('Artist', ArtistSchema);

export default Artist;