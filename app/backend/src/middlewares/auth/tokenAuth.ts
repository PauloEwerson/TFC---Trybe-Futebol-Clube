import { NextFunction, Request, Response } from 'express';
import { validateJWTToken } from '../../shared/TokenGenerator';

export default function authToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    validateJWTToken(authorization);
  } catch (error) {
    console.log('error =>', error);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
}
