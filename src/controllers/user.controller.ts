import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
/*const {
  transporter,
  recoverypassword,
  changepassword,
} = require("../utils/mailer");*/

const userController = {

  //LIST ALL - GET
  async list(_req: Request, res: Response) {
    try {
      const users = await User.find();
      res.status(200).json({ message: "Users found", data: users });
    } catch (err) {
      res.status(404).json({ message: "User not found", data: err });
    }
  },

  //SHOW BY ID - GET
  async show(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      const user = await User.findById(userid).select("-password");
      res.status(200).json({ message: "User found", data: user });
    } catch (err) {
      res.status(404).json({ message: "User not found", data: err });
    }
  },

  //UPDATE
  async update(req: Request, res: Response) {
    try {
      const userId = req.userId;
      await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
        context: "query",
      }).select("-password");
      res.status(200).json({ message: "User updated" });
    } catch (err) {
      res.status(400).json({ message: "User could not be updated", data: err });
    }
  },

  //DELETE
  async destroy(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User deleted", data: user });
    } catch (err) {
      res.status(400).json({ message: "User could not be deleted", data: err });
    }
  },
  /*
    //CREATE - POST
    async create(req: Request, res: Response) {
      try {
        console.log("create", req.body, process.env.SECRET_KEY);
        const data = req.body;
        const encPassword = await bcrypt.hash(data.password, 8);
        const newUser = { ...data, password: encPassword };
        const user = await User.create(newUser);
  
        const token = jwt.sign({ id: user._id }, `${process.env.SECRET_KEY}`, {
          expiresIn: 60 * 60 * 24,
        });
        res.status(201).header('auth-token', token).json({
          message: "user created"
          ,
        });
      } catch (err) {
        res.status(400).json({ message: "user could not be created", data: err });
      }
    },
  
    //SIGNIN - POST
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
        res.status(201).json({ message: "user login successfully", data: token });
      } catch (err) {
        res.status(400).json({ message: "user cannot login" });
      }
    },
    
    
    //RECOVERY - POST
    async recoveryPass(req: Request, res: Response) {
      try {
        const { email } = req.body;
        const user = await User.findOne(email);
        if (!user) {
          throw new Error("Email not found");
        }
        await transporter.sendMail(recoverypassword(user.email, user.name));
        res.status(201).json({ message: "email sent" });
      } catch (err) {
        res.status(400).json({ message: "email was not sent" });
      }
    },
    */


  //CHANGE - PUT
  async changePass(req: Request, res: Response) {
    try {
      const userId = req.userId;
      let message = "Invalid old password";
      const { password, newpassword } = req.body;
      let authorization = false;
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const encPassword = await bcrypt.hash(newpassword, 8);
        await User.findByIdAndUpdate(
          userId,
          { password: encPassword },
          { new: true, runValidators: true, context: "query" }
        );
        authorization = true;
        message = "password update successfully";
      }
      res.status(201).json({
        message: message,
        data: authorization,
      });
    } catch (err) {
      res.status(400).json({ message: "password was not updated", data: err });
    }
  },

  //AUTH

  async signup(req: Request, res: Response) {
    try {
      const data = req.body;
      if (!req.body.photo) {
        req.body.photo = 'https://res.cloudinary.com/palgas-project/image/upload/v1658523492/users/user_adu2no.jpg';
      }
      const user: IUser = new User({ ...data });
      user.password = await user.encryptPassword();
      const newUser = await user.save();
      const token = jwt.sign({ id: newUser._id }, `${process.env.SECRET_KEY}`, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(201).header('Authorization', token).json({
        message: "user created"
      });
    } catch (e) {
      res.status(400).json({ message: "user could not be created", data: e });
    }
  },

  async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user: IUser | null = await User.findOne({ email });
      if (!user) {
        throw new Error("user or password invalid");
      }
      if (!user.validatePassword(password)) {
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
};

export default userController;
