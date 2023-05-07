import LeaderboardServiceHome from './leaderboardHome.service';
import LeaderboardServiceAway from './leaderboardAway.service';
import { valuesLeaderboard } from '../interfaces/all.interfaces';
// import Matches from '../database/models/matches.model';
import Team from '../database/models/teams.model';

const LeaderboardService = {

  calculateValues(teamAway: valuesLeaderboard, teamHome: valuesLeaderboard) {
    // const newValues = { } as valuesLeaderboard;
    const obj = { totalPoints: 0, totalGames: 0, totalVictories: 0, totalDraws: 0, totalLosses: 0 };
    const obj2 = { goalsFavor: 0, goalsOwn: 0, goalsBalance: 0, efficiency: 0 };

    obj.totalGames = teamAway.totalGames + teamHome.totalGames;
    obj.totalVictories = teamAway.totalVictories + teamHome.totalVictories;
    obj.totalDraws = teamAway.totalDraws + teamHome.totalDraws;
    obj.totalLosses = teamAway.totalLosses + teamHome.totalLosses;
    obj2.goalsFavor = teamAway.goalsFavor + teamHome.goalsFavor;
    obj2.goalsOwn = teamAway.goalsOwn + teamHome.goalsOwn;
    obj2.goalsBalance = teamAway.goalsBalance + teamHome.goalsBalance;
    obj.totalPoints = teamAway.totalPoints + teamHome.totalPoints;

    obj2.efficiency = Number(((obj.totalPoints / (obj.totalGames * 3)) * 100).toFixed(2));

    const resultValues = { ...obj, ...obj2 };
    return resultValues;
  },

  async processLeaderboard() {
    const dataTeams = await Team.findAll();
    // const dataMatches = await LeaderboardService.getAllHome(true);

    // const dataTeamsMatch = await Promise.all((await Team.findAll())
    //   .map(async ({ id }) => LeaderboardServiceAway.getAllAway(id)));

    const dataTeamsAway = await LeaderboardServiceAway.getAllLeaderboardAway();
    const dataTeamHome = await LeaderboardServiceHome.getAllLeaderboardHome();

    const dataValues = dataTeams.map((team) => {
      const name = team.teamName;

      const teamHome = dataTeamHome.filter((item) => item.name === name);
      const teamAway = dataTeamsAway.filter((item) => item.name === name);

      const newValues = LeaderboardService.calculateValues(teamAway[0], teamHome[0]);
      const data = { name, ...newValues };
      return data;
    });

    return dataValues;
  },

  async getAllLeaderboard() {
    // const dataTeams = await Team.findAll();
    // const dataMatches = await LeaderboardService.getAllHome(true);

    const data = await LeaderboardService.processLeaderboard();

    return data.sort((a, b) => {
      // Critério de ordenação: pontos
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints; // ordenação decrescente
      }

      // Critério de desempate: saldo de gols
      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories; // ordenação decrescente
      }

      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }

      // Critério de desempate: número de gols marcados
      return b.goalsFavor - a.goalsFavor; // ordenação decrescente
    });
  },

};

export default LeaderboardService;
