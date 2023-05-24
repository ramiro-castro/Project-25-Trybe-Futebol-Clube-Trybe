import { Request, Response } from 'express';
import validationsInputValues from '../middlewares/validationsInputValues';
import MatchesService from '../services/matches.service';
import statusCodes from '../utils/statusCodes';

const MatchesController = {

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const auxInProgress = typeof inProgress === 'string'
      ? JSON.parse(inProgress) : undefined;
    const dataMatches = await MatchesService.getAll(auxInProgress);
    return res.status(statusCodes.ok).json(dataMatches);
  },

  async getByIdFishish(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const token = req.headers.authorization || '';

      const resultCheckToken = await validationsInputValues.checkToken(token);
      if (resultCheckToken.type) {
        return res.status(resultCheckToken.type).json({ message: resultCheckToken.message });
      }

      const result = await MatchesService.getByIdFinish(id);
      return res.status(statusCodes.ok).json(result);
    } catch (error) {
      res.status(statusCodes.serverError).json({ error });
    }
  },

  async getByIdUpdateGoals(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;

      const token = req.headers.authorization || '';

      const resultCheckToken = await validationsInputValues.checkToken(token);
      if (resultCheckToken.type) {
        return res.status(resultCheckToken.type).json({ message: resultCheckToken.message });
      }

      const result = await MatchesService.getByIdUpdateGoals(id, homeTeamGoals, awayTeamGoals);
      return res.status(statusCodes.ok).json(result);
    } catch (error) {
      res.status(statusCodes.serverError).json({ error });
    }
  },

  async insert(req: Request, res: Response) {
    try {
      const dataInsert = req.body;
      dataInsert.inProgress = true;

      const token = req.headers.authorization || '';

      const resultCheckToken = await validationsInputValues.checkToken(token);
      if (resultCheckToken.type) {
        return res.status(resultCheckToken.type).json({ message: resultCheckToken.message });
      }

      const resultCheckTeam = await validationsInputValues
        .checkTeam(dataInsert.homeTeamId, dataInsert.awayTeamId);
      if (resultCheckTeam.type) {
        return res.status(resultCheckTeam.type).json({ message: resultCheckTeam.message });
      }

      const result = await MatchesService.insert(dataInsert);
      return res.status(statusCodes.created).json(result);
    } catch (error) {
      res.status(statusCodes.serverError).json({ error });
    }
  },

};

export default MatchesController;
