import { Router } from 'express';
import journeyController from '../controllers/journey.controller';
import auth from '../utils/auth';
import { validateAddJourney, validateUpdateJourney } from '../validators/journeys'

const router = Router();

router.route("/").get(journeyController.list);
router.route("/:journeyid").get(auth, journeyController.show);
router.route("/:vehicleid").post(auth, validateAddJourney, journeyController.create);
router.route("/:journeyid").put(auth, validateUpdateJourney, journeyController.update);
router.route("/:journeyid").delete(auth, journeyController.destroy);

export default router;