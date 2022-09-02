"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.journeySchema = void 0;
const mongoose_1 = require("mongoose");
exports.journeySchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
    days: [
        {
            type: String,
        },
    ],
    time: [
        {
            type: String,
            required: true,
        },
    ],
    state: {
        type: Boolean,
        default: false,
    },
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    vehicleId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Vehicle",
        require: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
}, { timestamps: true });
const Journey = (0, mongoose_1.model)('Journey', exports.journeySchema);
exports.default = Journey;
//# sourceMappingURL=journey.model.js.map