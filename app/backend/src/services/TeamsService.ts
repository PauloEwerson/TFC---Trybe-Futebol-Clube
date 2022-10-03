import Team from '../database/models/Team';
import ITeam from '../interfaces/ITeam';

export default class TeamsService {
  public getTeams = async (): Promise<ITeam[]> => {
    const response = await Team.findAll();
    return response;
  };
}
