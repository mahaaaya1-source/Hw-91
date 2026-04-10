import { ListItem, ListItemText } from '@mui/material';
import type { Track } from '../../types';

interface Props {
  track: Track;
}

const TrackItem: React.FC<Props> = ({track}) => {
  return (
    <ListItem divider>
      <ListItemText
        primary={`${track.number}. ${track.title}`}
        secondary={track.duration}
      />
    </ListItem>
  );
};

export default TrackItem;
