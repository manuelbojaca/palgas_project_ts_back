import express from 'express';
import userController from '../controllers/user.controller';
import auth from '../utils/auth';

const router = express.Router();

//const router = express.Router();

router.route("/").get(userController.list);
router.route("/:userid").get(auth, userController.show);
router.route("/").post(userController.create);
router.route("/:userid").put(auth, userController.update);
router.route("/:userid").delete(auth, userController.destroy);
router.route("/signin").post(userController.signin);

export default router;