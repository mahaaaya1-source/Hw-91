import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosApi from '../../axiosApi';

const NewArtist = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    information: '',
    image: '',
  });

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await axiosApi.post('/artists', form);
    navigate('/');
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px'}}
    >
      <h2>New artist</h2>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={changeHandler}
        placeholder="Artist name"
      />

      <textarea
        name="information"
        value={form.information}
        onChange={changeHandler}
        placeholder="Information"
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

export default NewArtist;