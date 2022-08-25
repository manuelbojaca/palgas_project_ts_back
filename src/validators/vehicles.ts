import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import validateResult from './validateResult';

export const validateAddVehicle = [
    check("type")
        .exists()
        .isIn(["micro", "sedan", "suv", "cuv", "hatchback", "roadster", "pickup", "coupe", "supercar", "minivan", "van", "bike"]),
    check("energy")
        .exists()
        .isIn(["gasoline", "ngv", "diesel", "electricity", "hybrid"]),
    check("color")
        .exists()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    check("brand")
        .exists()
        .isAlpha()
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    check("model")
        .exists()
        .isLength({ min: 3, max: 15 }),
    check("year")
        .exists()
        .isInt({ min: 1969, max: 2024 }),
    check("plate")
        .exists()
        .matches(/^[A-Z]{3}\d{2}[A-Z0-9]$/),
    check("seats")
        .exists()
        .isInt({ min: 1, max: 8 }),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
]

export const validateUpdateVehicle = [
    check("type")
        .optional()
        .isIn(["micro", "sedan", "suv", "cuv", "hatchback", "roadster", "pickup", "coupe", "supercar", "minivan", "van", "bike"]),
    check("energy")
        .optional()
        .isIn(["gasoline", "gnv", "diesel", "electricity"]),
    check("color")
        .optional()
        .isAlpha('es-ES')
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    check("brand")
        .optional()
        .isAlpha()
        .isLength({ min: 3, max: 12 })
        .matches(/^[A-Z]{1}[a-z]+$/),
    check("model")
        .optional()
        .isLength({ min: 3, max: 15 }),
    check("year")
        .optional()
        .isInt({ min: 1969, max: 2024 }),
    check("plate")
        .optional()
        .matches(/^[A-Z]{3}\d{2}[A-Z0-9]$/),
    check("seats")
        .optional()
        .isInt({ min: 1, max: 8 }),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
]