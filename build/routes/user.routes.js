"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = __importDefault(require("../utils/auth"));
const users_1 = require("../validators/users");
const router = (0, express_1.Router)();
router.route("/signin").post(users_1.validateSignin, user_controller_1.default.signin);
router.route("/signup").post(users_1.validateSignup, user_controller_1.default.signup);
router.route("/profile").get(auth_1.default, user_controller_1.default.profile);
router.route("/").get(user_controller_1.default.list);
router.route("/:userid").get(auth_1.default, user_controller_1.default.show);
router.route("/").put(auth_1.default, users_1.validateUpdate, user_controller_1.default.update);
router.route("/:userid").delete(auth_1.default, user_controller_1.default.destroy);
exports.default = router;
//# sourceMappingURL=user.routes.js.map