export interface Artist {
    _id: string;
    name: string;
    photo: string;
    information: string;
  }
  
  export interface Album {
    _id: string;
    title: string;
    artist: Artist;
    year: number;
    coverImage: string;
    tracksCount: number;
  }
  
  export interface Track {
    _id: string;
    title: string;
    album: string;
    number: number;
    duration: string;
  }
  
  export interface User {
    _id: string;
    username: string;
    token: string;
    role: 'user' | 'admin';
  }
  
  export interface RegisterMutation {
    username: string;
    password: string;
  }
  
  export interface LoginMutation {
    username: string;
    password: string;
  }
  
  export interface RegisterResponse {
    user: User;
    message: string;
  }
  
  export interface LoginResponse {
    message: string;
    user: User;
  }
  
  export interface ValidationError {
    errors: {
      [key: string]: {
        name: string;
        message: string;
      }
    };
    message: string;
    name: string;
    _message: string;
  }
  
  export interface TracksResponse {
    album: Album;
    tracks: Track[];
  }