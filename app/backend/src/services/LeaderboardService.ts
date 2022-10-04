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

  public concatAllLeaderboard = async (): Promise<ILeaderboard[]> => {
    const home = await this.getHomeLeaderboard();
    const away = await this.getAwayLeaderboard();
    return home.concat(away);
  };

  public totalAllLeaderboard = async (): Promise<ILeaderboard[]> => {
    const allLeaderboard = await this.concatAllLeaderboard();
    const leaderboard = [] as ILeaderboard[];
    allLeaderboard.forEach((team) => {
      const result = leaderboard.find(({ name }) => name === team.name);
      if (result) {
        result.totalPoints += team.totalPoints;
        result.totalGames += team.totalGames;
        result.totalVictories += team.totalVictories;
        result.totalDraws += team.totalDraws;
        result.totalLosses += team.totalLosses;
        result.goalsFavor += team.goalsFavor;
        result.goalsOwn += team.goalsOwn;
        result.goalsBalance += team.goalsBalance;
        result.efficiency = Number(
          ((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2),
        );
      } else { leaderboard.push(team); }
    }); return leaderboard;
  };

  public sortAllLeaderboard = async (): Promise<ILeaderboard[]> => {
    const allLeaderboard = await this.totalAllLeaderboard();
    return allLeaderboard.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn,
    );
  };
}
