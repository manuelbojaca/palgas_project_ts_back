"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateJourney = exports.validateAddJourney = void 0;
const express_validator_1 = require("express-validator");
const validateResult_1 = __importDefault(require("./validateResult"));
exports.validateAddJourney = [
    (0, express_validator_1.check)('type')
        .exists()
        .withMessage('Missing!')
        .isIn(['trip', 'routine']),
    (0, express_validator_1.check)('name')
        .exists()
        .withMessage('Missing!')
        .isLength({ min: 3, max: 15 }),
    (0, express_validator_1.check)('origin')
        .exists()
        .withMessage('Missing!')
        .isLatLong()
        .withMessage('No coordinates'),
    (0, express_validator_1.check)('destination')
        .exists()
        .withMessage('Missing!')
        .isLatLong()
        .withMessage('No coordinates'),
    (0, express_validator_1.check)('date')
        .optional()
        .isDate(),
    (0, express_validator_1.check)('days.*')
        .optional()
        .isString(),
    (0, express_validator_1.check)('time')
        .optional()
        .isString(),
    (req, res, next) => {
        (0, validateResult_1.default)(req, res, next);
    }
];
exports.validateUpdateJourney = [
    (0, express_validator_1.check)('name')
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    (0, express_validator_1.check)('origin')
        .optional()
        .isLatLong(),
    (0, express_validator_1.check)('destination')
        .optional()
        .isLatLong(),
    (0, express_validator_1.check)('date')
        .optional()
        .isDate(),
    (0, express_validator_1.check)('days')
        .optional()
        .isString(),
    (0, express_validator_1.check)('time')
        .optional()
        .isString(),
    (req, res, next) => {
        (0, validateResult_1.default)(req, res, next);
    }
];
//# sourceMappingURL=journeys.js.map