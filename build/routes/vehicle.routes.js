"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const vehicle_controller_1 = __importDefault(require("../controllers/vehicle.controller"));
const auth_1 = __importDefault(require("../utils/auth"));
router.route("/").get(vehicle_controller_1.default.list);
router.route("/:userid").get(auth_1.default, vehicle_controller_1.default.show);
router.route("/").post(auth_1.default, vehicle_controller_1.default.create);
router.route("/:userid").put(auth_1.default, vehicle_controller_1.default.update);
router.route("/:userid").delete(auth_1.default, vehicle_controller_1.default.destroy);
exports.default = router;
//# sourceMappingURL=vehicle.routes.js.map