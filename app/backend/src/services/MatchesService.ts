import IMatch, { IBodyMatch, IDataMatch } from '../interfaces/IMatch';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

export default class MatchesService {
  public getMatches = async (): Promise<IMatch[]> => {
    const response = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome' },
        { model: Team, as: 'teamAway' },
      ],
    });
    return response;
  };

  public createMatch = async (match: IBodyMatch): Promise<IDataMatch | null> => {
    const create = await Match.create({
      homeTeam: match.homeTeam,
      homeTeamGoals: match.homeTeamGoals,
      awayTeam: match.awayTeam,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    });

    if (!create) return null;
    return create;
  };

  public patchMyMatch = async (id: string): Promise<boolean> => {
    await Match.update(
      { inProgress: false },
      { where: { id: Number(id) } },
    );
    return true;
  };
}
