import {NextFunction, Request, Response} from 'express';
import User from '../models/User';

export interface RequestWithUser extends Request {
  user?: any;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.get('Authorization');

  if (!token) {
    return res.status(401).send({error: 'No token presented'});
  }

  const user = await User.findOne({token});

  if (!user) {
    return res.status(401).send({error: 'Wrong token'});
  }

  (req as RequestWithUser).user = user;
  next();
};

export default auth;