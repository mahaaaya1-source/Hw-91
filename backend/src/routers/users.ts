import express from 'express';
import crypto from 'crypto';
import User from '../models/User';
import auth, {RequestWithUser} from '../middleware/auth';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      token: crypto.randomUUID(),
    });

    await user.save();
    return res.send(user);
  } catch (e) {
    next(e);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
      return res.status(400).send({error: 'Username not found'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({error: 'Password is wrong'});
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    next(e);
  }
});

usersRouter.delete('/sessions', auth, async (req, res, next) => {
  try {
    const request = req as RequestWithUser;

    if (!request.user) {
      return res.status(401).send({error: 'User not found'});
    }

    request.user.generateToken();
    await request.user.save();

    return res.send({message: 'Logged out successfully'});
  } catch (e) {
    next(e);
  }
});

export default usersRouter;