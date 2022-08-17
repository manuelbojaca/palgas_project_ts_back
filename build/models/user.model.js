"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const nameRegex = new RegExp("(?:[a-zA-Z](?:[a-zA-Z]*[a-zA-Z]+$)+$)+$");
//const phoneRegex = new RegExp("\+[+]*[]{0,1}[0-9]{2}[]{0,1}[-\s\./0-9]{12}[)]*$")
const passRegex = new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
exports.userSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: true,
        enum: {
            values: ["admin", "driver", "passenger"],
            message: "invalid role",
        },
    },
    name: {
        type: String,
        required: true,
        match: [nameRegex, "name must contain only letters"],
        minlenght: [2, 'name too short'],
    },
    lastname: {
        type: String,
        required: true,
        match: [nameRegex, "name must contain only letters"],
        minlenght: [2, 'lastname too short'],
    },
    photo: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true,
        //match: [phoneRegex, "number fortmat invalid"]
    },
    email: {
        type: String,
        required: true,
        validate: [
            {
                validator(value) {
                    return mongoose_1.models.User.findOne({ email: value })
                        .then((user) => !user)
                        .catch(() => false);
                },
                message: "email already exist",
            },
        ],
    },
    password: {
        type: String,
        required: true,
        match: [passRegex, "invalid password"]
    },
    vehicles: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Vehicle"
        },
    ],
}, { timestamps: true });
const User = (0, mongoose_1.model)("User", exports.userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map