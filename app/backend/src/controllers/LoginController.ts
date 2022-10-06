import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import message from '../shared/message';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response) => {
    try {
      const response = await this.loginService.login(req.body);
      if (!response) return res.status(401).json({ message: 'Incorrect email or password' });
      return res.status(200).json(response);
    } catch (error) {
      console.log('error =>', error);
      return res.status(500).json({ message: message.serverError });
    }
  };

  public validate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    try {
      const response = await this.loginService.getRole(authorization as string);
      if (!response) return res.status(401).json({ message: 'User does not exist' });
      return res.status(200).json({ role: response });
    } catch (error) {
      console.log('error =>', error);
      return res.status(500).json({ message: message.serverError });
    }
  };
}
