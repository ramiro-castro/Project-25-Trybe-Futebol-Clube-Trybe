import { Request, Response } from 'express';
import LeaderboardServiceHome from '../services/leaderboardHome.service';
import LeaderboardServiceAway from '../services/leaderboardAway.service';
import LeaderboardService from '../services/leaderboard.service';
import statusCodes from '../utils/statusCodes';

const LeaderboardController = {

  async getAllLeaderboardHome(req: Request, res: Response) {
    const dataTeams = await LeaderboardServiceHome.getAllLeaderboardHome();
    return res.status(statusCodes.ok).json(dataTeams);
  },

  async getAllLeaderboardAway(req: Request, res: Response) {
    const dataTeams = await LeaderboardServiceAway.getAllLeaderboardAway();
    return res.status(statusCodes.ok).json(dataTeams);
  },

  async getAllLeaderboard(req: Request, res: Response) {
    const dataTeams = await LeaderboardService.getAllLeaderboard();
    return res.status(statusCodes.ok).json(dataTeams);
  },

};

export default LeaderboardController;
