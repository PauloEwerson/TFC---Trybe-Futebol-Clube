import { sign, SignOptions, verify, JwtPayload } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'akldhkjladadhjksvdhj';

const jwtDefaultConfig: SignOptions = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

export function generateJWTToken(email: string) {
  return sign({ email }, jwtSecret, jwtDefaultConfig);
}

export function validateJWTToken(authorization: string): JwtPayload {
  return verify(authorization, jwtSecret) as JwtPayload;
}
