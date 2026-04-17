import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../../features/users/usersSelectors';
import {logoutUser} from '../../features/users/usersThunks';
import {UPLOADS_URL} from '../../constants';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await dispatch(logoutUser()).unwrap();
    navigate('/login');
  };

  return (
    <header style={{display: 'flex', gap: '15px', padding: '20px', borderBottom: '1px solid #ccc', alignItems: 'center'}}>
      <Link to="/">Artists</Link>
      <Link to="/albums">Albums</Link>
      <Link to="/tracks">Tracks</Link>

      {user ? (
        <>
          {user.avatar && (
            <img
              src={user.avatar.startsWith('http') ? user.avatar : UPLOADS_URL + user.avatar}
              alt={user.displayName}
              style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%'}}
            />
          )}

          <span>{user.displayName}</span>
          <button type="button" onClick={logoutHandler}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </header>
  );
};

export default AppToolbar;