import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import message from '../shared/message';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public getMatches = async (_req: Request, res: Response) => {
    try {
      const response = await this.matchesService.getMatches();
      if (!response) return res.status(404).json({ message: 'Not found' });
      return res.status(200).json(response);
    } catch (error) {
      console.log('error =>', error);
      return res.status(500).json({ message: message.serverError });
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
      console.log('error =>', error);
      return res.status(500).json({ message: message.serverError });
    }
  };

  public patchMyMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const response = await this.matchesService.patchMyMatch(id);
      if (!response) return res.status(404).json({ message: 'Not found' });
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      console.log('error =>', error);
      return res.status(500).json({ message: message.serverError });
    }
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await this.matchesService.updateMatch(id, req.body);
      return res.status(200).json({ message: 'Match updated successfully' });
    } catch (error) {
      console.log('error =>', error);
      return res.status(500).json({ message: message.serverError });
    }
  };
}
