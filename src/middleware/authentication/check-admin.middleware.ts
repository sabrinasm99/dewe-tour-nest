import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CheckAdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const isAdmin = res.locals.user.isAdmin;

    if (!isAdmin) {
      throw new UnauthorizedException('Access Denied');
    }

    next();
  }
}
