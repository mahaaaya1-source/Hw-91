import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../users/usersSelectors';
import {deleteTrack, fetchTracks, toggleTrackPublished} from './tracksThunks';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector((state) => state.tracks.items);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchTracks(undefined));
  }, [dispatch]);

  const canDelete = (trackUserId: string, isPublished: boolean) => {
    if (!user) return false;
    if (user.role === 'admin') return true;

    return user._id === trackUserId && !isPublished;
  };

  return (
    <div>
      <h1>Tracks</h1>

      {tracks.map((track) => (
        <div key={track._id} style={{border: '1px solid #ccc', padding: '15px', marginBottom: '10px'}}>
          <h3>{track.number}. {track.title}</h3>
          <p>Duration: {track.duration}</p>

          {!track.isPublished && <p style={{color: 'red'}}>Неопубликовано</p>}

          {canDelete(track.user, track.isPublished) && (
            <button type="button" onClick={() => dispatch(deleteTrack(track._id))}>
              Delete
            </button>
          )}

          {user?.role === 'admin' && !track.isPublished && (
            <button
              type="button"
              onClick={() => dispatch(toggleTrackPublished(track._id))}
              style={{marginLeft: '10px'}}
            >
              Publish
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tracks;