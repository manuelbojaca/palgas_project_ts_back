import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const AuthController = {

    async signup(req: Request, res: Response) {
        try {
            console.log("create", req.body, process.env.SECRET_KEY);
            const data = req.body;
            const encPassword = await bcrypt.hash(data.password, 8);
            const newUser = { ...data, password: encPassword };
            const user = await User.create(newUser);

            const token = jwt.sign({ id: user._id }, `${process.env.SECRET_KEY}`, {
                expiresIn: 60 * 60 * 24,
            });
            res.status(201).header('Authorization', token).json({
                message: "user created"
                ,
            });
        } catch (err) {
            res.status(400).json({ message: "user could not be created", data: err });
        }
    },

    async signin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("user or password invalid");
            }
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                throw new Error("user or password invalid");
            }
            const token = jwt.sign({ id: user._id }, `${process.env.SECRET_KEY}`, {
                expiresIn: 60 * 60 * 24,
            });
            res.status(201).header('Authorization', token).json({ message: "user login successfully" });
        } catch (e) {
            res.status(400).json({ message: "user cannot login", data: e });
        }
    },

    async profile(req: Request, res: Response) {
        try {
            const userid = req.userId;
            const user = await User.findById(userid).select("-password");
            res.status(200).json({ message: "User found", data: user });
        } catch (e) {
            res.status(404).json({ message: "User not found", data: e });
        }
    }
}

export default AuthController