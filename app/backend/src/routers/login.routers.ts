import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const router = Router();

router.post('/', LoginController.login);
router.get('/role', LoginController.loginRole);

export default router;
