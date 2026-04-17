import {NextFunction, Request, Response} from 'express';
import User from '../models/User';
import {RequestWithUser} from '../types';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get('Authorization');

    if (!token) {
      return res.status(401).send({error: 'No token provided'});
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.status(401).send({error: 'Wrong token'});
    }

    (req as RequestWithUser).user = user;
    return next();
  } catch (e) {
    return next(e);
  }
};

export default auth;