import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import type { Artist } from '../../types';

interface Props {
  artist: Artist;
}

const ArtistCard: React.FC<Props> = ({artist}) => {
  return (
    <Card>
      <CardActionArea component={NavLink} to={`/artists/${artist._id}/albums`}>
        {artist.photo ? (
          <CardMedia
            component="img"
            height="200"
            image={artist.photo}
            alt={artist.name}
          />
        ) : null}
        <CardContent>
          <Typography variant="h6">{artist.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArtistCard;