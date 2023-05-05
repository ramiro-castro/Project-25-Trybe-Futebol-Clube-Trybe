import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const router = Router();

router.get('/', MatchesController.getAll);

export default router;
