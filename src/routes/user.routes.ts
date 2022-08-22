import { Router } from 'express';
import userController from '../controllers/user.controller';
import auth from '../utils/auth';
import { validateSignup, validateSignin, validateUpdate } from '../validators/users';

const router = Router();

router.route("/signin").post(validateSignin, userController.signin);
router.route("/signup").post(validateSignup, userController.signup);
router.route("/profile").get(auth, userController.profile);
router.route("/").get(userController.list);
router.route("/:userid").get(auth, userController.show);
router.route("/").put(auth, validateUpdate, userController.update);
router.route("/:userid").delete(auth, userController.destroy);

export default router;