"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleSchema = void 0;
const mongoose_1 = require("mongoose");
exports.vehicleSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
        enum: {
            values: ["truck", "car", "bike"],
            message: "invalid type",
        },
    },
    color: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    plate: {
        type: String,
        required: false,
    },
    seats: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
}, { timestamps: true });
const Vehicle = (0, mongoose_1.model)("Vehicle", exports.vehicleSchema);
exports.default = Vehicle;
//# sourceMappingURL=vehicle.model.js.map