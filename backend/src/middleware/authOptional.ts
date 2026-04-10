import {NextFunction, Request, Response} from 'express';
import User from '../models/User';
import {RequestWithUser} from './auth';

const authOptional = async (req: Request, _res: Response, next: NextFunction) => {
  const token = req.get('Authorization');

  if (!token) {
    return next();
  }

  const user = await User.findOne({token});

  if (user) {
    (req as RequestWithUser).user = user;
  }

  return next();
};

export default authOptional;