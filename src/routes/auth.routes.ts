import authController from '../controllers/auth.controller';
import { Router } from 'express';
import auth from '../utils/auth'

const router: Router = Router();

router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.signin);
router.route('/profile').get(auth, authController.profile);

export default router;

