"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicle_controller_1 = __importDefault(require("../controllers/vehicle.controller"));
const auth_1 = __importDefault(require("../utils/auth"));
const vehicles_1 = require("../validators/vehicles");
const router = (0, express_1.Router)();
router.route("/").get(vehicle_controller_1.default.list);
router.route("/:vehicleid").get(auth_1.default, vehicle_controller_1.default.show);
router.route("/").post(auth_1.default, vehicles_1.validateAddVehicle, vehicle_controller_1.default.create);
router.route("/:vehicleid").put(auth_1.default, vehicles_1.validateUpdateVehicle, vehicle_controller_1.default.update);
router.route("/:vehicleid").delete(auth_1.default, vehicle_controller_1.default.destroy);
exports.default = router;
//# sourceMappingURL=vehicle.routes.js.map