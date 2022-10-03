import { NextFunction, Request, Response } from 'express';
import Team from '../../database/models/Team';

export function authMatch(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  next();
}

export async function authTeam(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;

  const isHomeTeamValid = await Team.findByPk(homeTeam);
  const isAwayTeamValid = await Team.findByPk(awayTeam);

  if (!isHomeTeamValid || !isAwayTeamValid) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
}
