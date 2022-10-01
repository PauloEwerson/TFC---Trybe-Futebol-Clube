import * as bcrypt from 'bcryptjs';
import TokenGenerator from '../shared/TokenGenerator';
import User from '../database/models/User';
import ILogin from '../interfaces/ILogin';
import IUser from '../interfaces/IUser';

export default class LoginService {
  public login = async (login: ILogin): Promise<IUser | null> => {
    const response = await User.findOne({ where: { email: login.email } });
    if (!response) return null;

    const decrypt = bcrypt.compareSync(login.password, response.password);
    if (!decrypt) return null;

    const { id, username, role, email } = response;

    const tokenGenerator = new TokenGenerator();
    const token = tokenGenerator.generateJWTToken(email);

    return {
      user: { id, username, role, email },
      token,
    };
  };
}
