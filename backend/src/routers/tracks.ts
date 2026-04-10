import express from 'express';
import Track from '../models/Track';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import {RequestWithUser} from '../types';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    const user = req.user;
    let filter: any = {};

    if (!user || user.role !== 'admin') {
      filter.isPublished = true;
    }

    if (req.query.album) {
      filter.album = req.query.album;
    }

    const tracks = await Track.find(filter).populate('album');
    return res.send(tracks);
  } catch (e) {
    next(e);
  }
});

tracksRouter.post('/', auth, async (req, res, next) => {
  try {
    const request = req as RequestWithUser;

    const track = new Track({
      user: request.user!._id,
      album: req.body.album,
      name: req.body.name,
      duration: req.body.duration,
    });

    await track.save();
    return res.send(track);
  } catch (e) {
    next(e);
  }
});

tracksRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    await Track.findByIdAndDelete(req.params.id);
    return res.send({message: 'Deleted'});
  } catch (e) {
    next(e);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).send({error: 'Not found'});
    }

    const updated = await Track.findByIdAndUpdate(
      req.params.id,
      {isPublished: !track.isPublished},
      {new: true}
    );

    return res.send(updated);
  } catch (e) {
    next(e);
  }
});

export default tracksRouter;