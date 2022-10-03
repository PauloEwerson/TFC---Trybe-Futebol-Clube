import { Model, STRING } from 'sequelize';
import db from '.';
import Match from './Match';

class Team extends Model {
  public id: number;
  public teamName: string;
}

Team.init({
  teamName: STRING,
}, {
  underscored: true,
  sequelize: db,
  // Por padrão o modelName é o nome da Classe
  // modelName: 'Team',
  tableName: 'teams',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Team;
