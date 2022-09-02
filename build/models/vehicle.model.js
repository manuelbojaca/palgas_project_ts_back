"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleSchema = void 0;
const mongoose_1 = require("mongoose");
exports.vehicleSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    energy: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    plate: {
        type: String,
        required: false,
    },
    seats: {
        type: Number,
        required: true,
    },
    freeseats: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    journeys: [
        {
            type: String,
            ref: "Journey",
        }
    ],
}, { timestamps: true });
const Vehicle = (0, mongoose_1.model)("Vehicle", exports.vehicleSchema);
exports.default = Vehicle;
//# sourceMappingURL=vehicle.model.js.map