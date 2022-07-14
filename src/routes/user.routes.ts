const router = require('express').Router();
import userController from '../controllers/user.controller';
import auth from '../utils/auth';

router.route("/").get(userController.list);
router.route("/:userid").get(auth, userController.show);
router.route("/").post(userController.create);

export default router;