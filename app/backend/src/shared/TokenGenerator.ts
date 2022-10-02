import { sign, SignOptions, verify, JwtPayload } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'akldhkjladadhjksvdhj';

const jwtDefaultConfig: SignOptions = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

class TokenGenerator {
  constructor(private jwtConfig?: SignOptions) {
    if (!jwtConfig) {
      this.jwtConfig = jwtDefaultConfig;
    }
  }

  public generateJWTToken(email: string) {
    return sign({ email }, jwtSecret, this.jwtConfig);
  }

  public validateToken(authorization: string): JwtPayload {
    return verify(authorization, jwtSecret) as JwtPayload;
  }
}

export default TokenGenerator;
