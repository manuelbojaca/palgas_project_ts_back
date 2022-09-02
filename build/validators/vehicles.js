"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateVehicle = exports.validateAddVehicle = void 0;
const express_validator_1 = require("express-validator");
const validateResult_1 = __importDefault(require("./validateResult"));
exports.validateAddVehicle = [
    (0, express_validator_1.check)("type")
        .exists()
        .isIn(["micro", "sedan", "suv", "cuv", "hatchback", "roadster", "pickup", "coupe", "supercar", "minivan", "van", "bike"]),
    (0, express_validator_1.check)("energy")
        .exists()
        .isIn(["gasoline", "ngv", "diesel", "electricity", "hybrid"]),
    (0, express_validator_1.check)("color")
        .exists()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    (0, express_validator_1.check)("brand")
        .exists()
        .isAlpha()
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    (0, express_validator_1.check)("model")
        .exists()
        .isLength({ min: 3, max: 15 }),
    (0, express_validator_1.check)("year")
        .exists()
        .isInt({ min: 1969, max: 2024 }),
    (0, express_validator_1.check)("plate")
        .exists()
        .matches(/^[A-Z]{3}\d{2}[A-Z0-9]$/),
    (0, express_validator_1.check)("seats")
        .exists()
        .isInt({ min: 1, max: 8 }),
    (req, res, next) => {
        (0, validateResult_1.default)(req, res, next);
    }
];
exports.validateUpdateVehicle = [
    (0, express_validator_1.check)("type")
        .optional()
        .isIn(["micro", "sedan", "suv", "cuv", "hatchback", "roadster", "pickup", "coupe", "supercar", "minivan", "van", "bike"]),
    (0, express_validator_1.check)("energy")
        .optional()
        .isIn(["gasoline", "gnv", "diesel", "electricity"]),
    (0, express_validator_1.check)("color")
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    (0, express_validator_1.check)("brand")
        .optional()
        .isAlpha()
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    (0, express_validator_1.check)("model")
        .optional()
        .isLength({ min: 3, max: 15 }),
    (0, express_validator_1.check)("year")
        .optional()
        .isInt({ min: 1969, max: 2024 }),
    (0, express_validator_1.check)("plate")
        .optional()
        .matches(/^[A-Z]{3}\d{2}[A-Z0-9]$/),
    (0, express_validator_1.check)("seats")
        .optional()
        .isInt({ min: 1, max: 8 }),
    (req, res, next) => {
        (0, validateResult_1.default)(req, res, next);
    }
];
//# sourceMappingURL=vehicles.js.map