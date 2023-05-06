import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const router = Router();

router.get('/', MatchesController.getAll);
router.patch('/:id/finish', MatchesController.getByIdFishish);
router.patch('/:id', MatchesController.getByIdUpdateGoals);

export default router;
