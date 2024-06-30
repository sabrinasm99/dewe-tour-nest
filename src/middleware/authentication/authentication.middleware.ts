import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const header = req.header('Authorization');

      if (!header) {
        throw new UnauthorizedException('Access Denied');
      }
      const token = header.replace('Bearer ', '');
      const verified = verify(token, process.env.JWT_PASS);

      if (verified) {
        res.locals = { user: verified };
        next();
      }
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
