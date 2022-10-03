import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public getMatches = async (req: Request, res: Response) => {
    try {
      const response = await this.matchesService.getMatches();
      if (!response) return res.status(500).json({ message: 'Server error' });
      return res.status(200).json(response);
    } catch (error) {
      console.log('error =>', error);
      return res.send(error);
    }
  };
}
