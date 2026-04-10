import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../../features/users/usersSelectors';
import {logoutUser} from '../../features/users/usersThunks';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await dispatch(logoutUser()).unwrap();
    navigate('/login');
  };

  return (
    <header style={{display: 'flex', gap: '15px', padding: '20px', borderBottom: '1px solid #ccc'}}>
      <Link to="/">Artists</Link>
      <Link to="/albums">Albums</Link>
      <Link to="/tracks">Tracks</Link>

      {user ? (
        <>
          <Link to="/artists/new">Add artist</Link>
          <Link to="/albums/new">Add album</Link>
          <Link to="/tracks/new">Add track</Link>
          <span>{user.username} ({user.role})</span>
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