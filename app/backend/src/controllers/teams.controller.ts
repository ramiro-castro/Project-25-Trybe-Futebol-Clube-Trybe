import { Request, Response } from 'express';
import TeamService from '../services/teams.service';
import statusCodes from '../utils/statusCodes';

const TeamController = {

  async getAll(req: Request, res: Response) {
    const dataTeams = await TeamService.getAll();
    return res.status(statusCodes.ok).json(dataTeams);
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const team = await TeamService.getById(Number(id));
      return res.status(statusCodes.ok).json(team);
    } catch (error) {
      res.status(statusCodes.serverError).json({ error });
    }
  },

};

export default TeamController;
