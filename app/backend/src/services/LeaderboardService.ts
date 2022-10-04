import ILeaderboard from '../interfaces/ILeaderboard';
import MatchesService from './MatchesService';
import { generateScoreHome, tiebreakerOrderHome } from '../shared/HomeLeaderboard.shared';
import { generateScoreAway, tiebreakerOrderHomeAway } from '../shared/AwayLeaderboard.shared';

export default class LeaderboardService {
  public getHomeLeaderboard = async (): Promise<ILeaderboard[]> => {
    // Instanciate the service Matches
    const matchesService = new MatchesService();
    const matches = await matchesService.getMatches();

    // Receive teams name inProgress false
    const matChesNotInProgress = matches.filter((match) => match.inProgress === false);
    const teams = matChesNotInProgress.map(({ teamHome }) => teamHome.teamName);

    // Filter teams by name without repetition
    const nameTeams = teams.filter((team, index) => teams.indexOf(team) === index);

    const scoresTeams = generateScoreHome(nameTeams, matChesNotInProgress);
    // Returns leaderboard in order | by: (totalPoints), totalVictories, goalsBalance, goalsFavor, goalsOwn.
    return tiebreakerOrderHome(scoresTeams);
  };

  public getAwayLeaderboard = async (): Promise<ILeaderboard[]> => {
    // Instanciate the service Matches
    const matchesService = new MatchesService();
    const matches = await matchesService.getMatches();

    // Receive teams name inProgress false
    const matChesNotInProgress = matches.filter((match) => match.inProgress === false);
    const teams = matChesNotInProgress.map(({ teamAway }) => teamAway.teamName);

    // Filter teams by name without repetition
    const nameTeams = teams.filter((team, index) => teams.indexOf(team) === index);

    const scoresTeams = generateScoreAway(nameTeams, matChesNotInProgress);
    // Returns leaderboard in order | by: (totalPoints), totalVictories, goalsBalance, goalsFavor, goalsOwn.
    return tiebreakerOrderHomeAway(scoresTeams);
  };
}
