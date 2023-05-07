import { Request, Response } from 'express';
import LeaderboardServiceHome from '../services/leaderboardHome.service';
import LeaderboardServiceAway from '../services/leaderboardAway.service';
// import { UserJwt } from '../interfaces/all.interfaces';
// import validationsInputValues from '../middlewares/validationsInputValues';
// import TeamService from '../services/teams.service';
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

  //   async getById(req: Request, res: Response) {
  //     try {
  //       const { id } = req.params;

  //       const team = await TeamService.getById(Number(id));
  //       //   console.log(team);
  //       return res.status(statusCodes.ok).json(team);
  //     } catch (error) {
  //       res.status(statusCodes.serverError).json({ error });
  //     }
  //   },

};

export default LeaderboardController;
