import dotenv from 'dotenv'; dotenv.config();
import { NextFunction, Request, Response } from 'express';
import * as jwt from '../utils/jwtUtils'


export async function ensureAuthenticatedMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers['authorization'];
  if (!authorization) throw { code: 'unauthorized'};

  const token = authorization.replace('Bearer ', '');
  if (!token) throw { code: 'unauthorized'};

  const result = jwt.verifyToken(token);
  if(!result) throw { code: 'unauthorized'};
}
