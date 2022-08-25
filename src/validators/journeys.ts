import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import validateResult from './validateResult';

export const validateAddJourney = [
    check('type')
        .exists()
        .withMessage('Missing!')
        .isIn(['trip', 'routine']),
    check('name')
        .exists()
        .withMessage('Missing!')
        .isLength({ min: 3, max: 15 }),
    check('origin')
        .exists()
        .withMessage('Missing!')
        .isLatLong()
        .withMessage('No coordinates'),
    check('destination')
        .exists()
        .withMessage('Missing!')
        .isLatLong()
        .withMessage('No coordinates'),
    check('date')
        .optional()
        .isDate(),
    check('days.*')
        .optional()
        .isString(),
    check('time')
        .optional()
        .isString(),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
]

export const validateUpdateJourney = [
    check('name')
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    check('origin')
        .optional()
        .isLatLong(),
    check('destination')
        .optional()
        .isLatLong(),
    check('date')
        .optional()
        .isDate(),
    check('days')
        .optional()
        .isString(),
    check('time')
        .optional()
        .isString(),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
]
