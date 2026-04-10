import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import type { Album } from '../../types';

interface Props {
  album: Album;
}

const AlbumCard: React.FC<Props> = ({album}) => {
  return (
    <Card>
      <CardActionArea component={NavLink} to={`/albums/${album._id}/tracks`}>
        {album.coverImage ? (
          <CardMedia
            component="img"
            height="220"
            image={album.coverImage}
            alt={album.title}
          />
        ) : null}
        <CardContent>
          <Typography variant="h6">{album.title}</Typography>
          <Typography>Year: {album.year}</Typography>
          <Typography>Tracks: {album.tracksCount}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AlbumCard;