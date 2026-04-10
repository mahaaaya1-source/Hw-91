import {Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import {useAppSelector} from './app/hooks';
import {selectUser} from './features/users/usersSelectors';
import Artists from './features/artists/Artists';
import Albums from './features/albums/Albums';
import Tracks from './features/tracks/Tracks';
import NewArtist from './features/artists/NewArtist';
import NewAlbum from './features/albums/NewAlbum';
import NewTrack from './features/tracks/NewTrack';
import Register from './features/users/Register';
import Login from './features/users/Login';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Artists />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/artists/new"
          element={(
            <ProtectedRoute isAllowed={!!user}>
              <NewArtist />
            </ProtectedRoute>
          )}
        />

        <Route
          path="/albums/new"
          element={(
            <ProtectedRoute isAllowed={!!user}>
              <NewAlbum />
            </ProtectedRoute>
          )}
        />

        <Route
          path="/tracks/new"
          element={(
            <ProtectedRoute isAllowed={!!user}>
              <NewTrack />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </Layout>
  );
};

export default App;