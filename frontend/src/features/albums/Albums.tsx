import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../users/usersSelectors';
import {deleteAlbum, fetchAlbums, toggleAlbumPublished} from './albumsThunks';

const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector((state) => state.albums.items);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchAlbums(undefined));
  }, [dispatch]);

  const canDelete = (albumUserId: string, isPublished: boolean) => {
    if (!user) return false;
    if (user.role === 'admin') return true;

    return user._id === albumUserId && !isPublished;
  };

  return (
    <div>
      <h1>Albums</h1>

      {albums.map((album) => (
        <div key={album._id} style={{border: '1px solid #ccc', padding: '15px', marginBottom: '10px'}}>
          <h3>{album.title}</h3>
          <p>Year: {album.releaseYear}</p>

          {!album.isPublished && <p style={{color: 'red'}}>Неопубликовано</p>}

          {canDelete(album.user, album.isPublished) && (
            <button type="button" onClick={() => dispatch(deleteAlbum(album._id))}>
              Delete
            </button>
          )}

          {user?.role === 'admin' && !album.isPublished && (
            <button
              type="button"
              onClick={() => dispatch(toggleAlbumPublished(album._id))}
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

export default Albums;