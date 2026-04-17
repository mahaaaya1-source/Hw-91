import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {GoogleLogin} from '@react-oauth/google';
import {useAppDispatch} from '../../app/hooks';
import {googleLogin, loginUser} from './usersThunks';

const Login = () => {
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

    await dispatch(loginUser(form)).unwrap();
    navigate('/');
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px'}}
    >
      <h2>Login</h2>

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

      <button type="submit">Login</button>

      <div style={{paddingTop: '12px'}}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              void googleLoginHandler(credentialResponse.credential);
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </form>
  );
};

export default Login;