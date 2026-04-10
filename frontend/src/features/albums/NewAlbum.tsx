import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchArtists} from '../artists/artistsThunks';
import {selectArtists} from '../artists/artistsSlice';
import axiosApi from '../../axiosApi';

const NewAlbum = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artists = useAppSelector(selectArtists);

  const [form, setForm] = useState({
    artist: '',
    title: '',
    releaseYear: '',
    image: '',
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

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

    if (!form.artist || !form.title || !form.releaseYear) {
      alert('Заполни все поля');
      return;
    }

    await axiosApi.post('/albums', {
      artist: form.artist,
      title: form.title,
      releaseYear: Number(form.releaseYear),
      image: form.image,
    });

    navigate('/albums');
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px'}}
    >
      <h2>New album</h2>

      <select name="artist" value={form.artist} onChange={changeHandler}>
        <option value="">Select artist</option>
        {artists.map((artist) => (
          <option key={artist._id} value={artist._id}>
            {artist.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={changeHandler}
        placeholder="Album title"
      />

      <input
        type="text"
        name="releaseYear"
        value={form.releaseYear}
        onChange={changeHandler}
        placeholder="Release year"
      />

      <input
        type="text"
        name="image"
        value={form.image}
        onChange={changeHandler}
        placeholder="Image URL"
      />

      <button type="submit">Create</button>
    </form>
  );
};

export default NewAlbum;