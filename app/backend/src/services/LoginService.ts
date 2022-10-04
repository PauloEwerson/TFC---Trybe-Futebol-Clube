import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import ILogin from '../interfaces/ILogin';
import IUser from '../interfaces/IUser';
import { generateJWTToken, validateJWTToken } from '../shared/TokenGenerator';

export default class LoginService {
  public login = async (login: ILogin): Promise<IUser | null> => {
    const response = await User.findOne({ where: { email: login.email } });
    if (!response) return null;

    const decrypt = bcrypt.compareSync(login.password, response.password);
    if (!decrypt) return null;

    const { id, username, role, email } = response;

    const token = generateJWTToken(email);

    return {
      user: { id, username, role, email },
      token,
    };
  };

  public getRole = async (authorization: string): Promise<string | null> => {
    const { email } = validateJWTToken(authorization);

    const response = await User.findOne(({ where: { email } }));
    if (!response) return null;
    return response.role;
  };
}
