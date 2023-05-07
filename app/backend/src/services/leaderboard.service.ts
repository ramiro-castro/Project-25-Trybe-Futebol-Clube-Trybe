import { MatchesInstance, teamLeaderboard } from '../interfaces/all.interfaces';
import Matches from '../database/models/matches.model';
import Team from '../database/models/teams.model';
// import { MatchesInterface, TeamInterface } from '../interfaces/all.interfaces';
// import MatchesService from './matches.service';

const LeaderboardService = {
  async getAllHome(id: number) : Promise<MatchesInstance[]> {
    const where = {
      inProgress: false,
      homeTeamId: id,
    };
    const data = await Matches.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      ],
      where,
    });

    return data as MatchesInstance[];
  },

  calculateValues(teams: teamLeaderboard[]) {
    // const newValues = { } as valuesLeaderboard;
    const obj = { totalPoints: 0, totalGames: 0, totalVictories: 0, totalDraws: 0, totalLosses: 0 };
    const obj2 = { goalsFavor: 0, goalsOwn: 0, goalsBalance: 0, efficiency: 0 };

    teams.forEach((team) => {
      obj.totalGames += 1;
      obj.totalVictories += team.homeTeamGoals > team.awayTeamGoals ? 1 : 0;
      obj.totalDraws += team.homeTeamGoals === team.awayTeamGoals ? 1 : 0;
      obj.totalLosses += team.homeTeamGoals < team.awayTeamGoals ? 1 : 0;
      obj2.goalsFavor += team.homeTeamGoals;
      obj2.goalsOwn += team.awayTeamGoals;
      obj2.goalsBalance += team.homeTeamGoals - team.awayTeamGoals;
      obj.totalPoints += team.homeTeamGoals > team.awayTeamGoals ? 3 : 0;
    });

    obj.totalPoints += obj.totalDraws;
    obj2.efficiency = Number(((obj.totalPoints / (obj.totalGames * 3)) * 100).toFixed(2));

    const resultValues = { ...obj, ...obj2 };
    return resultValues;
  },

  async getAllLeaderboardHome() {
    // const dataTeams = await Team.findAll();
    // const dataMatches = await LeaderboardService.getAllHome(true);

    const dataTeamsMatch = await Promise.all((await Team.findAll())
      .map(async ({ id }) => LeaderboardService.getAllHome(id)));

    const dataTeamsMatch2 = dataTeamsMatch.map((teams) => {
      const name = teams[0].homeTeam.teamName;

      const newValues = LeaderboardService.calculateValues(teams);
      const data = { name, ...newValues };
      return data;
    });

    return dataTeamsMatch2;
  },

};

export default LeaderboardService;
