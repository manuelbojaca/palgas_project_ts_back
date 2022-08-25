import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

function validateResult(req: Request, res: Response, next: NextFunction) {
    try {
        validationResult(req).throw();
        return next();
    } catch (e) {
        res.status(403);
        res.send({ errors: e })
    }
}

export default validateResult;