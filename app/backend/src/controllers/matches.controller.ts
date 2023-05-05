import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
// import { UserJwt } from '../interfaces/all.interfaces';
// import validationsInputValues from '../middlewares/validationsInputValues';
// import TeamService from '../services/teams.service';
import statusCodes from '../utils/statusCodes';

const MatchesController = {

  async getAll(req: Request, res: Response) {
    const dataMatches = await MatchesService.getAll();
    return res.status(statusCodes.ok).json(dataMatches);
  },

  //   async getById(req: Request, res: Response) {
  //     try {
  //       const { id } = req.params;

  //       const team = await TeamService.getById(id);
  //       //   console.log(team);
  //       return res.status(statusCodes.ok).json(team);
  //     } catch (error) {
  //       res.status(statusCodes.serverError).json({ error });
  //     }
  //   },

};

export default MatchesController;
