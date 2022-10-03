import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public getMatches = async (_req: Request, res: Response) => {
    try {
      const response = await this.matchesService.getMatches();
      if (!response) return res.status(404).json({ message: 'Not found' });
      return res.status(200).json(response);
    } catch (error) {
      console.log('error =>', error);
      return res.send(error);
    }
  };

  public createMatch = async (req: Request, res: Response) => {
    try {
      const response = await this.matchesService.createMatch(req.body);
      if (!response) {
        return res.status(400).json(
          { message: 'Body must be an expected JSON object' },
        );
      }
      return res.status(201).json(response);
    } catch (error) {
      return res.send(error);
    }
  };

  public patchMyMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const response = await this.matchesService.patchMyMatch(id);
      if (!response) return res.status(404).json({ message: 'Not found' });
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.send(error);
    }
  };
}
