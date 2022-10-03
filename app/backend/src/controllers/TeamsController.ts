import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public getTeams = async (_req: Request, res: Response) => {
    try {
      const response = await this.teamsService.getTeams();
      if (!response) return res.status(500).json({ message: 'Server error' });
      return res.status(200).json(response);
    } catch (error) {
      console.log('error =>', error);
      return res.send(error);
    }
  };
}
