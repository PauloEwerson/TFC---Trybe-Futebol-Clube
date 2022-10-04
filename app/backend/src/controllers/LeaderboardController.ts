import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public getHomeLeaderboard = async (_req: Request, res: Response) => {
    try {
      const response = await this.leaderboardService.getHomeLeaderboard();
      return res.status(200).json(response);
    } catch (error) {
      console.log('error =>', error);
      res.send(error);
    }
  };

  public getAwayLeaderboard = async (_req: Request, res: Response) => {
    try {
      const response = await this.leaderboardService.getAwayLeaderboard();
      if (!response) return res.status(404).json({ message: 'Not found' });
      return res.status(200).json(response);
    } catch (error) {
      console.log('error =>', error);
      res.send(error);
    }
  };

  public getAllLeaderboard = async (_req: Request, res: Response) => {
    try {
      const response = await this.leaderboardService.sortAllLeaderboard();
      if (!response) return res.status(404).json({ message: 'Not found' });
      return res.status(200).json(response);
    } catch (error) {
      console.log('error =>', error);
    }
  };
}
