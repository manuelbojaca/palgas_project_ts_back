"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import { IGetUserAuthInfoRequest } from "../definitionFile";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function auth(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new Error("expired session auth");
        }
        const [_, token] = authorization.split(" ");
        if (!token) {
            throw new Error("expired session token");
        }
        const decoded = jsonwebtoken_1.default.verify(token, `${process.env.SECRET_KEY}`);
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "fail auth" });
    }
}
;
exports.default = auth;
//# sourceMappingURL=auth.js.map