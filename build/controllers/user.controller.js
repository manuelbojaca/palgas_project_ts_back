"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/*const {
  transporter,
  recoverypassword,
  changepassword,
} = require("../utils/mailer");*/
const userController = {
    //LIST ALL - GET
    list(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.find();
                res.status(200).json({ message: "Users found", data: users });
            }
            catch (err) {
                res.status(404).json({ message: "User not found", data: err });
            }
        });
    },
    //SHOW BY ID - GET
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userid } = req.params;
                const user = yield user_model_1.default.findById(userid).select("-password");
                res.status(200).json({ message: "User found", data: user });
            }
            catch (err) {
                res.status(404).json({ message: "User not found", data: err });
            }
        });
    },
    //UPDATE
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                yield user_model_1.default.findByIdAndUpdate(userId, req.body, {
                    new: true,
                    runValidators: true,
                    context: "query",
                }).select("-password");
                res.status(200).json({ message: "User updated" });
            }
            catch (err) {
                res.status(400).json({ message: "User could not be updated", data: err });
            }
        });
    },
    //DELETE
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const user = yield user_model_1.default.findByIdAndDelete(userId);
                res.status(200).json({ message: "User deleted", data: user });
            }
            catch (err) {
                res.status(400).json({ message: "User could not be deleted", data: err });
            }
        });
    },
    /*
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
    changePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                let message = "Invalid old password";
                const { password, newpassword } = req.body;
                let authorization = false;
                const user = yield user_model_1.default.findById(userId);
                if (!user) {
                    throw new Error("User not found");
                }
                const isValid = yield bcrypt_1.default.compare(password, user.password);
                if (isValid) {
                    const encPassword = yield bcrypt_1.default.hash(newpassword, 8);
                    yield user_model_1.default.findByIdAndUpdate(userId, { password: encPassword }, { new: true, runValidators: true, context: "query" });
                    authorization = true;
                    message = "password update successfully";
                }
                res.status(201).json({
                    message: message,
                    data: authorization,
                });
            }
            catch (err) {
                res.status(400).json({ message: "password was not updated", data: err });
            }
        });
    },
    //AUTH
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                if (!req.body.photo) {
                    req.body.photo = 'https://res.cloudinary.com/palgas-project/image/upload/v1658523492/users/user_adu2no.jpg';
                }
                const user = new user_model_1.default(Object.assign({}, data));
                user.password = yield user.encryptPassword();
                const newUser = yield user.save();
                const token = jsonwebtoken_1.default.sign({ id: newUser._id }, `${process.env.SECRET_KEY}`, {
                    expiresIn: 60 * 60 * 24,
                });
                res.status(201).header('Authorization', token).json({
                    message: "user created"
                });
            }
            catch (e) {
                res.status(400).json({ message: "user could not be created", data: e });
            }
        });
    },
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_model_1.default.findOne({ email });
                if (!user) {
                    throw new Error("user or password invalid");
                }
                if (!user.validatePassword(password)) {
                    throw new Error("user or password invalid");
                }
                const token = jsonwebtoken_1.default.sign({ id: user._id }, `${process.env.SECRET_KEY}`, {
                    expiresIn: 60 * 60 * 24,
                });
                res.status(201).header('Authorization', token).json({ message: "user login successfully" });
            }
            catch (e) {
                res.status(400).json({ message: "user cannot login", data: e });
            }
        });
    },
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userid = req.userId;
                const user = yield user_model_1.default.findById(userid).select("-password");
                res.status(200).json({ message: "User found", data: user });
            }
            catch (e) {
                res.status(404).json({ message: "User not found", data: e });
            }
        });
    }
};
exports.default = userController;
//# sourceMappingURL=user.controller.js.map