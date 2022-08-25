import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
//import { IGetUserAuthInfoRequest } from "../definitionFile";
import dotenv from "dotenv";

dotenv.config();


interface JwtPayload {
  id: string
}

function auth(req: Request, res: Response, next: NextFunction): void {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      throw new Error("expired session auth");
    }
    const [_, token] = authorization.split(" ");

    if (!token) {
      throw new Error("expired session token");
    }
    const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`) as JwtPayload;

    req.userId = decoded.id;

    next();
  } catch (err) {
    res.status(401).json({ message: "fail auth" });
  }
};

export default auth;