import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../users/usersSelectors';
import {deleteArtist, fetchArtists, toggleArtistPublished} from './artistsThunks';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector((state) => state.artists.items);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const canDelete = (artistUserId: string, isPublished: boolean) => {
    if (!user) return false;
    if (user.role === 'admin') return true;

    return user._id === artistUserId && !isPublished;
  };

  return (
    <div>
      <h1>Artists</h1>

      {artists.map((artist) => (
        <div key={artist._id} style={{border: '1px solid #ccc', padding: '15px', marginBottom: '10px'}}>
          <h3>{artist.name}</h3>
          <p>{artist.information}</p>

          {!artist.isPublished && <p style={{color: 'red'}}>Неопубликовано</p>}

          {canDelete(artist.user, artist.isPublished) && (
            <button type="button" onClick={() => dispatch(deleteArtist(artist._id))}>
              Delete
            </button>
          )}

          {user?.role === 'admin' && !artist.isPublished && (
            <button
              type="button"
              onClick={() => dispatch(toggleArtistPublished(artist._id))}
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

export default Artists;