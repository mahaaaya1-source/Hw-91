import express from 'express';
import crypto from 'crypto';
import {OAuth2Client} from 'google-auth-library';
import User from '../models/User';
import auth from '../middleware/auth';
import imagesUpload from '../middleware/imagesUpload';
import config from '../config';
import {RequestWithUser} from '../types';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      token: crypto.randomUUID(),
      role: 'user',
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null,
    });

    await user.save();
    return res.send(user);
  } catch (e) {
    return next(e);
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
    return next(e);
  }
});

usersRouter.delete('/sessions', auth, async (req, res, next) => {
  try {
    const request = req as RequestWithUser;

    if (!request.user) {
      return res.status(401).send({error: 'User not found'});
    }

    const user = await User.findById(request.user._id);

    if (!user) {
      return res.status(401).send({error: 'User not found'});
    }

    user.generateToken();
    await user.save();

    return res.send({message: 'Logged out successfully'});
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({error: 'Google login error'});
    }

    const email = payload.email;
    const id = payload.sub;
    const displayName = payload.name;
    const avatar = payload.picture || null;

    if (!email || !id || !displayName) {
      return res.status(400).send({error: 'Not enough user data to continue'});
    }

    let user = await User.findOne({googleID: id});

    if (!user) {
      user = new User({
        username: email,
        password: crypto.randomUUID(),
        token: crypto.randomUUID(),
        role: 'user',
        googleID: id,
        displayName,
        avatar,
      });
    }

    user.generateToken();
    await user.save();

    return res.send({message: 'Login with Google successful!', user});
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;