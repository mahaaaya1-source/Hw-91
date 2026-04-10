export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: 'user' | 'admin';
}

export interface ArtistFields {
  user: Types.ObjectId;
  name: string;
  image: string | null;
  information: string;
  isPublished: boolean;
}

export interface AlbumFields {
  user: Types.ObjectId;
  artist: Types.ObjectId;
  title: string;
  releaseYear: number;
  image: string | null;
  isPublished: boolean;
}

export interface TrackFields {
  user: Types.ObjectId;
  artist: Types.ObjectId;
  album: Types.ObjectId;
  title: string;
  duration: string;
  number: number;
  youtubeLink?: string;
  isPublished: boolean;
}