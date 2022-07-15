const router = require('express').Router();
import vehicleController from '../controllers/vehicle.controller';
import auth from '../utils/auth';

router.route("/").get (vehicleController.list);
router.route("/:userid").get(auth, vehicleController.show);
router.route("/").post (auth, vehicleController.create);
router.route("/:userid").put(auth, vehicleController.update);
router.route("/:userid").delete(auth, vehicleController.destroy);

export default router;