import express from 'express';
import cors from 'cors';

import usersRouter from './routers/users';
import artistsRouter from './routers/artists';
import albumsRouter from './routers/albums';
import tracksRouter from './routers/tracks';

import mongoDb from './mongo';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));


app.use('/users', usersRouter);
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);

const port = 8009;

const run = async () => {
  await mongoDb();

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

void run();

export default app;
