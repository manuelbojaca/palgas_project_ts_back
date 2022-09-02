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
const vehicle_model_1 = __importDefault(require("../models/vehicle.model"));
const vehicleController = {
    list(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield vehicle_model_1.default.find();
                res.status(200).json({ message: "Vehicles found", data: users });
            }
            catch (err) {
                res.status(404).json({ message: "Vehicles not found", data: err });
            }
        });
    },
    //SHOW BY ID - GET
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { vehicleid } = req.params;
                const vehicle = yield vehicle_model_1.default.findById(vehicleid);
                res.status(200).json({ message: "User found", data: vehicle });
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
                const { vehicleid } = req.params;
                const vehicle = yield vehicle_model_1.default.findById(vehicleid);
                if (!vehicle) {
                    throw new Error("Invalid vehicle id");
                }
                if (vehicle.userId.toString() !== req.userId) {
                    throw new Error("Vehicle id does not belong to the user");
                }
                yield vehicle_model_1.default.findByIdAndUpdate(vehicleid, req.body, {
                    new: true,
                    runValidators: true,
                    context: "query",
                }).select("-password");
                res.status(200).json({ message: "Vehicle updated" });
            }
            catch (err) {
                let message;
                if (err instanceof Error)
                    message = err.message;
                else
                    message = String(err);
                res.status(400).json({ message: "Vehicle could not be updated", data: message });
            }
        });
    },
    //DELETE
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userid } = req.params;
                if (userid !== req.userId) {
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
                const user = yield user_model_1.default.findById(req.userId);
                if (!user) {
                    throw new Error("Invalid user");
                }
                const data = req.body;
                req.body.freeseats = req.body.seats;
                const vehicle = yield vehicle_model_1.default.create(Object.assign(Object.assign({}, data), { userId: user._id }));
                user.vehicles.push(vehicle._id);
                yield user.save({ validateBeforeSave: false });
                res.status(201).json({
                    message: "vehicle created",
                    data: vehicle,
                });
            }
            catch (err) {
                res.status(400).json({
                    message: "vehicle could not be created",
                    data: err
                });
            }
        });
    },
};
exports.default = vehicleController;
//# sourceMappingURL=vehicle.controller.js.map