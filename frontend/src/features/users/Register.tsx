import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {registerUser} from './usersThunks';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(registerUser(form)).unwrap();
    navigate('/');
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px'}}
    >
      <h2>Register</h2>

      <input
        type="text"
        name="username"
        value={form.username}
        onChange={changeHandler}
        placeholder="Username"
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={changeHandler}
        placeholder="Password"
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;