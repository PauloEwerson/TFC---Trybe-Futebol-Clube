import ILeaderboard from '../interfaces/ILeaderboard';
import MatchesService from './MatchesService';
import { generateScore, tiebreakerOrder } from '../shared/Leaderboard.shared';

export default class LeaderboardService {
  public getLeaderboard = async (): Promise<ILeaderboard[]> => {
    // Instanciate the service Matches
    const matchesService = new MatchesService();
    const matches = await matchesService.getMatches();

    // Receive teams name inProgress false
    const matChesNotInProgress = matches.filter((match) => match.inProgress === false);
    const teams = matChesNotInProgress.map(({ teamHome }) => teamHome.teamName);

    // Filter teams by name without repetition
    const nameTeams = teams.filter((team, index) => teams.indexOf(team) === index);

    const scoresTeams = generateScore(nameTeams, matChesNotInProgress);
    // Returns leaderboard in order | by: (totalPoints), totalVictories, goalsBalance, goalsFavor, goalsOwn.
    return tiebreakerOrder(scoresTeams);
  };
}
