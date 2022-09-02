"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdate = exports.validateSignin = exports.validateSignup = void 0;
const express_validator_1 = require("express-validator");
const validateResult_1 = __importDefault(require("./validateResult"));
exports.validateSignup = [
    (0, express_validator_1.check)('role')
        .exists()
        .withMessage('Missing!')
        .isIn(['admin', 'driver', 'passenger']),
    (0, express_validator_1.check)('name1')
        .exists()
        .withMessage('Missing!')
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    (0, express_validator_1.check)('name2')
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    (0, express_validator_1.check)('lastname1')
        .exists()
        .withMessage('Missing!')
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    (0, express_validator_1.check)('lastname2')
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    (0, express_validator_1.check)('email')
        .exists()
        .withMessage('Missing!')
        .isEmail(),
    (0, express_validator_1.check)('password')
        .exists()
        .withMessage('Missing!')
        .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }),
    (0, express_validator_1.check)('city')
        .exists()
        .withMessage('Missing!')
        .isIn(['Bogota', 'Cali', 'Medellin']),
    (0, express_validator_1.check)('photo')
        .exists()
        .withMessage('Missing!'),
    (0, express_validator_1.check)('phone')
        .exists()
        .withMessage('Missing!')
        .matches(/^(\+573[0-5]\d{8})+$/),
    (0, express_validator_1.check)('vehicles')
        .optional(),
    (req, res, next) => {
        (0, validateResult_1.default)(req, res, next);
    }
];
exports.validateSignin = [
    (0, express_validator_1.check)('email')
        .exists()
        .withMessage('Missing!')
        .isEmail(),
    (0, express_validator_1.check)('password')
        .exists()
        .withMessage('Missing!')
        .isString(),
    (req, res, next) => {
        (0, validateResult_1.default)(req, res, next);
    }
];
exports.validateUpdate = [
    (0, express_validator_1.check)('role')
        .optional()
        .isIn(['admin', 'driver', 'passenger']),
    (0, express_validator_1.check)('name1')
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    (0, express_validator_1.check)('name2')
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    (0, express_validator_1.check)('lastname1')
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    (0, express_validator_1.check)('lastname2')
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    (0, express_validator_1.check)('city')
        .optional()
        .isIn(['Bogota', 'Cali', 'Medellin']),
    (0, express_validator_1.check)('phone')
        .optional()
        .matches(/^(\+573[0-5]\d{8})+$/),
    (req, res, next) => {
        (0, validateResult_1.default)(req, res, next);
    }
];
//# sourceMappingURL=users.js.map