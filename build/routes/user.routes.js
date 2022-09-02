"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = __importDefault(require("../utils/auth"));
const router = express_1.default.Router();
//const router = express.Router();
router.route("/").get(user_controller_1.default.list);
router.route("/:userid").get(auth_1.default, user_controller_1.default.show);
router.route("/").post(user_controller_1.default.create);
router.route("/:userid").put(auth_1.default, user_controller_1.default.update);
router.route("/:userid").delete(auth_1.default, user_controller_1.default.destroy);
router.route("/signin").post(user_controller_1.default.signin);
exports.default = router;
//# sourceMappingURL=user.routes.js.map