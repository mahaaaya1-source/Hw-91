import express from 'express';
import Artist from '../models/Artist';
import auth, {RequestWithUser} from '../middleware/auth';
import authOptional from '../middleware/authOptional';
import permit from '../middleware/permit';

const artistsRouter = express.Router();

artistsRouter.get('/', authOptional, async (req, res, next) => {
  try {
    const request = req as RequestWithUser;

    if (request.user?.role === 'admin') {
      const artists = await Artist.find();
      return res.send(artists);
    }

    const artists = await Artist.find({isPublished: true});
    return res.send(artists);
  } catch (e) {
    next(e);
  }
});

artistsRouter.post('/', auth, async (req, res, next) => {
  try {
    const request = req as RequestWithUser;

    const artist = await Artist.create({
      user: request.user!._id,
      name: req.body.name,
      information: req.body.information,
      image: req.body.image || null,
      isPublished: false,
    });

    return res.send(artist);
  } catch (e) {
    next(e);
  }
});

artistsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const request = req as RequestWithUser;
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).send({error: 'Artist not found'});
    }

    if (!request.user) {
      return res.status(401).send({error: 'Unauthorized'});
    }

    const isAdmin = request.user.role === 'admin';
    const isOwner = artist.user && artist.user.toString() === request.user._id.toString();

    if (!isAdmin && !(isOwner && !artist.isPublished)) {
      return res.status(403).send({error: 'Forbidden'});
    }

    await Artist.findByIdAndDelete(req.params.id);

    return res.send({message: 'Artist deleted'});
  } catch (e) {
    next(e);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).send({error: 'Not found'});
    }

    const updated = await Artist.findByIdAndUpdate(
      req.params.id,
      {isPublished: !artist.isPublished},
      {new: true}
    );

    return res.send(updated);
  } catch (e) {
    next(e);
  }
});

export default artistsRouter;