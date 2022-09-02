"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const journey_controller_1 = __importDefault(require("../controllers/journey.controller"));
const auth_1 = __importDefault(require("../utils/auth"));
const journeys_1 = require("../validators/journeys");
const router = (0, express_1.Router)();
router.route("/").get(journey_controller_1.default.list);
router.route("/:journeyid").get(auth_1.default, journey_controller_1.default.show);
router.route("/:vehicleid").post(auth_1.default, journeys_1.validateAddJourney, journey_controller_1.default.create);
router.route("/:journeyid").put(auth_1.default, journeys_1.validateUpdateJourney, journey_controller_1.default.update);
router.route("/:journeyid").delete(auth_1.default, journey_controller_1.default.destroy);
exports.default = router;
//# sourceMappingURL=journey.routes.js.map