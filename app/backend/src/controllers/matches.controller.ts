import { Request, Response } from 'express';
import validationsInputValues from '../middlewares/validationsInputValues';
import MatchesService from '../services/matches.service';
// import { UserJwt } from '../interfaces/all.interfaces';
// import validationsInputValues from '../middlewares/validationsInputValues';
// import TeamService from '../services/teams.service';
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
      //   console.log(team);
      return res.status(statusCodes.ok).json(result);
    } catch (error) {
      res.status(statusCodes.serverError).json({ error });
    }
  },

};

export default MatchesController;
