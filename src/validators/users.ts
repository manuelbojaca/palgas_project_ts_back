import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import validateResult from './validateResult';

export const validateSignup = [
    check('role')
        .exists()
        .isIn(['admin', 'driver', 'passenger']),
    check('name1')
        .exists()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    check('name2')
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    check('lastname1')
        .exists()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    check('lastname2')
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    check('email')
        .exists()
        .isEmail(),
    check('password')
        .exists()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }),
    check('city')
        .exists()
        .isIn(['Bogota', 'Cali', 'Medellin']),
    check('photo')
        .exists(),
    check('phone')
        .exists()
        .matches(/^(\+573[0-5]\d{8})+$/),
    check('vehicles')
        .optional(),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
];

export const validateSignin = [
    check('email')
        .exists()
        .isEmail(),
    check('password')
        .exists()
        .isString(),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
];

export const validateUpdate = [
    check('role')
        .optional()
        .isIn(['admin', 'driver', 'passenger']),
    check('name1')
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    check('name2')
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    check('lastname1')
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    check('lastname2')
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    check('city')
        .optional()
        .isIn(['Bogota', 'Cali', 'Medellin']),
    check('phone')
        .optional()
        .matches(/^(\+573[0-5]\d{8})+$/),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
];