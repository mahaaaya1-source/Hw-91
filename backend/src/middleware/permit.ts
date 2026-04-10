import {NextFunction, Request, Response} from 'express';
import {RequestWithUser} from './auth';

const permit = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const request = req as RequestWithUser;

    if (!request.user) {
      return res.status(401).send({message: 'Unauthenticated'});
    }

    if (!roles.includes(request.user.role)) {
      return res.status(403).send({message: 'Unauthorized'});
    }

    next();
  };
};

export default permit;