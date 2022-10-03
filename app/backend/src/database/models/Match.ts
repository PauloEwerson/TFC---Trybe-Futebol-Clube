import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

class Match extends Model {
  public id: number;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
  public teamHome: { teamName: string };
  public teamAway: { teamName: string };
}

Match.init({
  homeTeam: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeam: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: BOOLEAN,
}, {
  underscored: true,
  sequelize: db,
  // Por padrão o modelName é o nome da Classe
  // modelName: 'Match',
  tableName: 'matches',
  timestamps: false,
});

export default Match;
