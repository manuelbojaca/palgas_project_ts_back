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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userController = {
    //LIST ALL - GET
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("List");
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
                if (userid !== req.user) {
                    throw new Error("Invalid user !!show");
                }
                console.log('show: ', userid);
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
                const { userid } = req.params;
                if (userid !== req.user) {
                    throw new Error();
                }
                const user = yield user_model_1.default.findByIdAndUpdate(userid, req.body, {
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
                const { userid } = req.params;
                if (userid !== req.user) {
                    throw new Error();
                }
                const user = yield user_model_1.default.findByIdAndDelete(userid);
                res.status(200).json({ message: "User deleted", data: user });
            }
            catch (err) {
                res.status(400).json({ message: "User could not be deleted", data: err });
            }
        });
    },
    //CREATE - POST
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("create", req.body, process.env.SECRET_KEY);
                const data = req.body;
                const encPassword = yield bcrypt_1.default.hash(data.password, 8);
                const newUser = Object.assign(Object.assign({}, data), { password: encPassword });
                const user = yield user_model_1.default.create(newUser);
                const token = jsonwebtoken_1.default.sign({ id: user._id }, `${process.env.SECRET_KEY}`, {
                    expiresIn: 60 * 60 * 24,
                });
                res.status(201).json({
                    message: "user created",
                    data: { token },
                });
            }
            catch (err) {
                res.status(400).json({ message: "user could not be created", data: err });
            }
        });
    },
    //SIGNIN - POST
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_model_1.default.findOne({ email });
                if (!user) {
                    throw new Error("user or password invalid");
                }
                const isValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isValid) {
                    throw new Error("user or password invalid");
                }
                const token = jsonwebtoken_1.default.sign({ id: user._id }, `${process.env.SECRET_KEY}`, {
                    expiresIn: 60 * 60 * 24,
                });
                res.status(201).json({ message: "user login successfully", data: token });
            }
            catch (err) {
                res.status(400).json({ message: "user cannot login" });
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
                const { userid } = req.params;
                if (userid !== req.user) {
                    throw new Error();
                }
                let message = "Invalid old password";
                const { password, newpassword } = req.body;
                let authorization = false;
                const user = yield user_model_1.default.findById(userid);
                if (!user) {
                    throw new Error("User not found");
                }
                const isValid = yield bcrypt_1.default.compare(password, user.password);
                if (isValid) {
                    const encPassword = yield bcrypt_1.default.hash(newpassword, 8);
                    const user = yield user_model_1.default.findByIdAndUpdate(userid, { password: encPassword }, { new: true, runValidators: true, context: "query" });
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
};
exports.default = userController;
//# sourceMappingURL=user.controller.js.map