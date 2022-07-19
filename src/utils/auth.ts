import jwt from "jsonwebtoken";
import { Response, NextFunction} from "express";
import { IGetUserAuthInfoRequest } from "../definitionFile";
import { env } from 'process';
import dotenv from "dotenv";

dotenv.config();

const auth = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  interface JwtPayload {
    id: string
  }
  try {
    const { authorization } = req.headers;
    //console.log("Auth: ", authorization);
    if (!authorization) {
      throw new Error("expired session auth");
    }

    const [_, token] = authorization.split(" ");

    if (!token) {
      throw new Error("expired session token");
    }
    console.log("UserCre1: ");
    const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`) as JwtPayload;
    console.log("UserCre: ", decoded.id);
    
    req.user = decoded.id;

    next();
  } catch (err) {
    res.status(401).json({ message: "fail auth" });
  }
};

export default auth;