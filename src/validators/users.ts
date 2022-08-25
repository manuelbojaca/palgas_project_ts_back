import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import validateResult from './validateResult';

export const validateSignup = [
    check('role')
        .exists()
        .withMessage('Missing!')
        .isIn(['admin', 'driver', 'passenger']),
    check('name1')
        .exists()
        .withMessage('Missing!')
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
        .withMessage('Missing!')
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
        .withMessage('Missing!')
        .isEmail(),
    check('password')
        .exists()
        .withMessage('Missing!')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }),
    check('city')
        .exists()
        .withMessage('Missing!')
        .isIn(['Bogota', 'Cali', 'Medellin']),
    check('photo')
        .exists()
        .withMessage('Missing!'),
    check('phone')
        .exists()
        .withMessage('Missing!')
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
        .withMessage('Missing!')
        .isEmail(),
    check('password')
        .exists()
        .withMessage('Missing!')
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