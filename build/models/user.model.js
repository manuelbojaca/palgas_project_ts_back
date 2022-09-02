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
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: true,
        enum: {
            values: ["admin", "driver", "passenger"],
            message: "invalid role",
        },
    },
    name1: {
        type: String,
        required: true,
        min: 3,
    },
    name2: {
        type: String,
        min: 3
    },
    lastname1: {
        type: String,
        required: true,
        min: 3
    },
    lastname2: {
        type: String,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
        /*
        validate: [
          {
            validator(value: string) {
              return models.User.findOne({ email: value })
                .then((user: IUser) => !user)
                .catch(() => false);
            },
            message: "email already exist",
          },
        ],*/
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        //match: [phoneRegex, "number fortmat invalid"]
    },
    vehicles: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Vehicle"
        },
    ],
}, { timestamps: true });
exports.userSchema.methods.encryptPassword = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        return bcrypt_1.default.hash(this.password, salt);
    });
};
exports.userSchema.methods.validatePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
const User = (0, mongoose_1.model)("User", exports.userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map