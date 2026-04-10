import express from 'express';
import Album from '../models/Album';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import {RequestWithUser} from '../types';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const user = req.user;
    let filter: any = {};

    if (!user || user.role !== 'admin') {
      filter.isPublished = true;
    }

    if (req.query.artist) {
      filter.artist = req.query.artist;
    }

    const albums = await Album.find(filter).populate('artist');
    return res.send(albums);
  } catch (e) {
    next(e);
  }
});

albumsRouter.post('/', auth, async (req, res, next) => {
  try {
    const request = req as RequestWithUser;

    const album = new Album({
      user: request.user!._id,
      artist: req.body.artist,
      name: req.body.name,
      releaseYear: req.body.releaseYear,
    });

    await album.save();
    return res.send(album);
  } catch (e) {
    next(e);
  }
});

albumsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    await Album.findByIdAndDelete(req.params.id);
    return res.send({message: 'Deleted'});
  } catch (e) {
    next(e);
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).send({error: 'Not found'});
    }

    const updated = await Album.findByIdAndUpdate(
      req.params.id,
      {isPublished: !album.isPublished},
      {new: true}
    );

    return res.send(updated);
  } catch (e) {
    next(e);
  }
});

export default albumsRouter;