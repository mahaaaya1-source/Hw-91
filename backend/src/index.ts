import express from 'express';
import cors from 'cors';
import connectMongo from './mongo';
import artistsRouter from './routers/artists';
import albumsRouter from './routers/albums';
import tracksRouter from './routers/tracks';
import usersRouter from './routers/users';
import trackHistoryRouter from './routers/trackHistory';

const app = express();
const port = 8009;

app.use(cors());
app.use(express.json());

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', trackHistoryRouter);

const start = async () => {
  try {
    await connectMongo();

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

void start();