import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchArtists} from '../artists/artistsThunks';
import {selectArtists} from '../artists/artistsSlice';
import {fetchAlbums} from '../albums/albumsThunks';
import {selectAlbums} from '../albums/albumsSlice';
import axiosApi from '../../axiosApi';

const NewTrack = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);

  const [artistId, setArtistId] = useState('');
  const [form, setForm] = useState({
    album: '',
    title: '',
    duration: '',
    number: '',
    youtubeLink: '',
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
    if (artistId) {
      dispatch(fetchAlbums(artistId));
    }
  }, [artistId, dispatch]);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    await axiosApi.post('/tracks', {
      album: form.album,
      title: form.title,
      duration: form.duration,
      number: Number(form.number),
      youtubeLink: form.youtubeLink,
    });

    navigate('/tracks');
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px'}}
    >
      <h2>New track</h2>

      <select value={artistId} onChange={(e) => {
        setArtistId(e.target.value);
        setForm((prev) => ({...prev, album: ''}));
      }}>
        <option value="">Select artist</option>
        {artists.map((artist) => (
          <option key={artist._id} value={artist._id}>
            {artist.name}
          </option>
        ))}
      </select>

      <select name="album" value={form.album} onChange={changeHandler}>
        <option value="">Select album</option>
        {albums.map((album) => (
          <option key={album._id} value={album._id}>
            {'title' in album ? album.title : (album as any).name}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={changeHandler}
        placeholder="Track title"
      />

      <input
        type="text"
        name="duration"
        value={form.duration}
        onChange={changeHandler}
        placeholder="Duration"
      />

      <input
        type="text"
        name="number"
        value={form.number}
        onChange={changeHandler}
        placeholder="Track number"
      />

      <input
        type="text"
        name="youtubeLink"
        value={form.youtubeLink}
        onChange={changeHandler}
        placeholder="Youtube link"
      />

      <button type="submit">Create</button>
    </form>
  );
};

export default NewTrack;