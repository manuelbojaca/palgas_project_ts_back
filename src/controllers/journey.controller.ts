import Journey from "../models/journey.model";
import User from '../models/user.model';
import Vehicle from "../models/vehicle.model";
import { Request, Response } from "express";

const journeyController = {
    async list(_req: Request, res: Response) {
        try {
            const users = await Journey.find();
            res.status(200).json({ message: "Journey found", data: users });
        } catch (err) {
            res.status(404).json({ message: "Journey not found", data: err });
        }
    },

    //SHOW BY ID - GET
    async show(req: Request, res: Response) {
        try {
            const { routeid } = req.params;
            const route = await Journey.findById(routeid);
            res.status(200).json({ message: "Route found", data: route });
        } catch (err) {
            res.status(404).json({ message: "Route not found", data: err });
        }
    },

    //UPDATE
    async update(req: Request, res: Response) {
        try {
            const { journeyid } = req.params;
            const journey = await Journey.findById(journeyid);
            if (!journey) {
                throw new Error("Invalid journey id");
            }
            if (journey.userId.toString() !== req.userId) {
                throw new Error("Vehicle id does not belong to the user");
            }
            await Journey.findByIdAndUpdate(journeyid, req.body, {
                new: true,
                runValidators: true,
                context: "query",
            });
            res.status(200).json({ message: "Journey updated" });
        } catch (err) {
            res
                .status(400)
                .json({ message: "Journey could not be updated", data: err });
        }
    },

    //DELETE
    async destroy(req: Request, res: Response) {
        try {
            const { journeyid } = req.params;
            const journey = await Journey.findById(journeyid);
            if (journeyid !== req.userId) {
                throw new Error();
            }
            await Journey.findByIdAndDelete(journeyid);
            res.status(200).json({ message: "Route deleted", data: journey });
        } catch (err) {
            res
                .status(400)
                .json({ message: "Route could not be deleted", data: err });
        }
    },

    //CREATE - POST
    async create(req: Request, res: Response) {
        try {
            const userId = req.userId;
            const { vehicleid } = req.params;
            const data = req.body;
            const vehicle = await Vehicle.findById(vehicleid);
            if (!vehicle) {
                throw new Error("Invalid user");
            }
            if (vehicle.userId.toString() !== userId) {
                throw new Error("Vehicle id does not belong to the user");
            }
            const journey = await Journey.create({
                ...data,
                vehicleId: vehicle._id,
                userId: userId,
            });
            vehicle.journeys.push(journey._id);
            await vehicle.save({ validateBeforeSave: false });

            res.status(201).json({
                message: "Route created",
                data: journey,
            });
        } catch (err) {
            res
                .status(400)
                .json({ message: "Route could not be created", data: err });
        }
    },

    async addJourneyUser(req: Request, res: Response) {
        try {
            const journeyid = req.params;
            const user = await User.findById(req.userId);
            const journey = await Journey.findById(journeyid);
            if (!(user && journey)) throw new Error('invalid journey')
            journey.users.push(user._id);
        } catch (err) {
            res
                .status(400)
                .json({ message: "Route could not be created", data: err });
        }
    }
};

export default journeyController;