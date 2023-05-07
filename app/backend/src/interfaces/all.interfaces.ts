import { Model } from 'sequelize';
import Team from '../database/models/teams.model';

export interface TeamInterface {
  id: number // id e orderId são opcionais aqui na interface, pois sao preenchidos automaticamente no BD
  teamName: string
}

export interface UserInterface {
  id?: number
  username: string
  role: string
  email: string
  password: string
}

export interface UserConfidentialInterface extends UserInterface {
  password: string
}

export interface LoginInterface {
  email: string
}

export interface MatchesInterface {
  id?: number
  homeTeamId: number
  awayTeamId: number
  homeTeamGoals: number
  awayTeamGoals: number
  inProgress: boolean
}

export interface ExtendsMatchesInterface extends MatchesInterface {
  homeTeam: { teamName: string }
}

export interface whereInProgress {
  inProgress: unknown
}

export interface MatchesInstance extends Model<MatchesInterface>,
  MatchesInterface {
  homeTeam: Team;
  awayTeam: Team;
  teamName?: string;
}

export interface MatchWithTeam extends MatchesInterface {
  homeTeam: Team;
}

export interface valuesLeaderboard {
  totalPoints: number
  totalGames: number
  totalVictories: number
  totalDraws: number
  totalLosses: number
  goalsFavor: number
  goalsOwn: number
  goalsBalance: number
  efficiency: number
}

export interface teamLeaderboard {
  id?: number
  homeTeamId: number
  awayTeamId: number
  homeTeamGoals: number
  awayTeamGoals: number
  inProgress: boolean
//   homeTeam: Team
//   awayTeam: Team
}
