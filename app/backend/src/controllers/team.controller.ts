import { Request, Response } from 'express';
// import { UserJwt } from '../interfaces/all.interfaces';
// import validationsInputValues from '../middlewares/validationsInputValues';
import TeamService from '../services/team.service';
import statusCodes from '../utils/statusCodes';

const TeamController = {

  async getAll(req: Request, res: Response) {
    try {
      const dataOrders = await TeamService.getAll();
      res.status(statusCodes.ok).json(dataOrders);
    } catch (error) {
      res.status(statusCodes.serverError).json({ error });
    }
  },

};

export default TeamController;
