import IMatch from '../interfaces/IMatch';
import ILeaderboard from '../interfaces/ILeaderboard';

// - `P`: Total de Pontos;
const totalPoints = (matches: IMatch[]) => {
  let totalP = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      totalP += 3;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      totalP += 1;
    }
  });
  return totalP;
};

// - `J`: Total de Jogos;
const totalGames = (matches: IMatch[]) => matches.length;

// - `V`: Total de Vitórias;
const totalVictories = (matches: IMatch[]) => {
  let totalV = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      totalV += 1;
    }
  });
  return totalV;
};

// - `E`: Total de Empates;
const totalDraws = (matches: IMatch[]) => {
  let totalE = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      totalE += 1;
    }
  });
  return totalE;
};

// - `D`: Total de Derrotas;
const totalLosses = (matches: IMatch[]) => {
  let totalD = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      totalD += 1;
    }
  });
  return totalD;
};

// - `GP`: Gols marcados a favor;
const goalsFavor = (matches: IMatch[]) => {
  let goalsGP = 0;
  matches.forEach((match) => {
    goalsGP += match.homeTeamGoals;
  });
  return goalsGP;
};

// - `GC`: Gols sofridos;
const goalsOwn = (matches: IMatch[]) => {
  let goalsGC = 0;
  matches.forEach((match) => {
    goalsGC += match.awayTeamGoals;
  });
  return goalsGC;
};

// - `SG`: Saldo total de gols; | GP - GC
const goalsBalance = (matches: IMatch[]) => goalsFavor(matches) - goalsOwn(matches);

// Aproveitamento do time (%) | P/(J*3)*100
const efficiency = (matches: IMatch[]) => {
  const totalP = totalPoints(matches);
  const totalJ = totalGames(matches);
  const rating = ((totalP / (totalJ * 3)) * 100).toFixed(2);
  return Number(rating);
};

const generateScore = (nameTeams: string[], matches: IMatch[]) => {
  const leaderboard = [] as ILeaderboard[];

  nameTeams.forEach((name) => {
    const result = matches.filter(({ teamHome }) => teamHome.teamName === name);
    leaderboard.push({
      name,
      totalPoints: totalPoints(result),
      totalGames: totalGames(result),
      totalVictories: totalVictories(result),
      totalDraws: totalDraws(result),
      totalLosses: totalLosses(result),
      goalsFavor: goalsFavor(result),
      goalsOwn: goalsOwn(result),
      goalsBalance: goalsBalance(result),
      efficiency: efficiency(result),
    });
  });

  return leaderboard;
};

const tiebreakerOrder = (scoresTeams: ILeaderboard[]) => {
  scoresTeams.sort((a, b) => {
    if (a.totalPoints === b.totalPoints) {
      if (a.totalVictories === b.totalVictories) {
        if (a.goalsBalance === b.goalsBalance) {
          if (a.goalsFavor === b.goalsFavor) {
            return a.goalsOwn - b.goalsOwn;
          }
          return b.goalsFavor - a.goalsFavor;
        }
        return b.goalsBalance - a.goalsBalance;
      }
      return b.totalVictories - a.totalVictories;
    }
    return b.totalPoints - a.totalPoints;
  });
  return scoresTeams;
};

export {
  generateScore,
  tiebreakerOrder,
};
