import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import message from '../shared/message';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public getTeams = async (_req: Request, res: Response) => {
    try {
      const response = await this.teamsService.getTeams();
      return res.status(200).json(response);
    } catch (error) {
      console.log('error =>', error);
      return res.status(500).json({ message: message.serverError });
    }
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const response = await this.teamsService.getById(id);
      if (!response) return res.status(404).json({ message: 'Team not found' });
      return res.status(200).json(response);
    } catch (error) {
      console.log('error =>', error);
      return res.status(500).json({ message: message.serverError });
    }
  };
}
