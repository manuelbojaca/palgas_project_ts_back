import { Router } from 'express';
import vehicleController from '../controllers/vehicle.controller';
import auth from '../utils/auth';
import { validateCreation, validateUpdateVehicle } from '../validators/vehicles'

const router = Router();

router.route("/").get(vehicleController.list);
router.route("/:vehicleid").get(auth, vehicleController.show);
router.route("/").post(auth, validateCreation, vehicleController.create);
router.route("/:vehicleid").put(auth, validateUpdateVehicle, vehicleController.update);
router.route("/:vehicleid").delete(auth, vehicleController.destroy);

export default router;