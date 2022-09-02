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
const journey_model_1 = __importDefault(require("../models/journey.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const vehicle_model_1 = __importDefault(require("../models/vehicle.model"));
const journeyController = {
    list(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield journey_model_1.default.find();
                res.status(200).json({ message: "Journey found", data: users });
            }
            catch (err) {
                res.status(404).json({ message: "Journey not found", data: err });
            }
        });
    },
    //SHOW BY ID - GET
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { routeid } = req.params;
                const route = yield journey_model_1.default.findById(routeid);
                res.status(200).json({ message: "Route found", data: route });
            }
            catch (err) {
                res.status(404).json({ message: "Route not found", data: err });
            }
        });
    },
    //UPDATE
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { journeyid } = req.params;
                const journey = yield journey_model_1.default.findById(journeyid);
                if (!journey) {
                    throw new Error("Invalid journey id");
                }
                if (journey.userId.toString() !== req.userId) {
                    throw new Error("Vehicle id does not belong to the user");
                }
                yield journey_model_1.default.findByIdAndUpdate(journeyid, req.body, {
                    new: true,
                    runValidators: true,
                    context: "query",
                });
                res.status(200).json({ message: "Journey updated" });
            }
            catch (err) {
                res
                    .status(400)
                    .json({ message: "Journey could not be updated", data: err });
            }
        });
    },
    //DELETE
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { journeyid } = req.params;
                const journey = yield journey_model_1.default.findById(journeyid);
                if (journeyid !== req.userId) {
                    throw new Error();
                }
                yield journey_model_1.default.findByIdAndDelete(journeyid);
                res.status(200).json({ message: "Route deleted", data: journey });
            }
            catch (err) {
                res
                    .status(400)
                    .json({ message: "Route could not be deleted", data: err });
            }
        });
    },
    //CREATE - POST
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const { vehicleid } = req.params;
                const data = req.body;
                const vehicle = yield vehicle_model_1.default.findById(vehicleid);
                if (!vehicle) {
                    throw new Error("Invalid user");
                }
                if (vehicle.userId.toString() !== userId) {
                    throw new Error("Vehicle id does not belong to the user");
                }
                const journey = yield journey_model_1.default.create(Object.assign(Object.assign({}, data), { vehicleId: vehicle._id, userId: userId }));
                vehicle.journeys.push(journey._id);
                yield vehicle.save({ validateBeforeSave: false });
                res.status(201).json({
                    message: "Route created",
                    data: journey,
                });
            }
            catch (err) {
                res
                    .status(400)
                    .json({ message: "Route could not be created", data: err });
            }
        });
    },
    addJourneyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const journeyid = req.params;
                const user = yield user_model_1.default.findById(req.userId);
                const journey = yield journey_model_1.default.findById(journeyid);
                if (!(user && journey))
                    throw new Error('invalid journey');
                journey.users.push(user._id);
            }
            catch (err) {
                res
                    .status(400)
                    .json({ message: "Route could not be created", data: err });
            }
        });
    }
};
exports.default = journeyController;
//# sourceMappingURL=journey.controller.js.map