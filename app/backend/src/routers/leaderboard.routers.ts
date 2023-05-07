import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controllers';

const router = Router();

router.get('/home', LeaderboardController.getAllLeaderboardHome);
router.get('/away', LeaderboardController.getAllLeaderboardAway);

export default router;
