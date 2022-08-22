import User from "../models/user.model";
import Vehicle, { IVehicle } from "../models/vehicle.model"
import { Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config();

const vehicleController = {
  async list(_req: Request, res: Response) {
    try {
      const users = await Vehicle.find();
      res.status(200).json({ message: "Vehicles found", data: users });
    } catch (err) {
      res.status(404).json({ message: "Vehicles not found", data: err });
    }
  },

  //SHOW BY ID - GET
  async show(req: Request, res: Response) {
    try {
      const { vehicleid } = req.params;
      const vehicle = await Vehicle.findById(vehicleid);
      res.status(200).json({ message: "User found", data: vehicle });
    } catch (err) {
      res.status(404).json({ message: "User not found", data: err });
    }
  },

  //UPDATE
  async update(req: Request, res: Response) {
    try {
      const { vehicleid } = req.params;
      const vehicle = await Vehicle.findById(vehicleid);
      console.log('vehicle: ', vehicle);
      if (vehicle!.userId.toString() !== req.userId) {
        throw new Error("Vehicle id does not belong to the user");
      }
      await Vehicle.findByIdAndUpdate(vehicleid, req.body, {
        new: true,
        runValidators: true,
        context: "query",
      }).select("-password");
      res.status(200).json({ message: "Vehicle updated" });
    } catch (err) {
      let message
      if (err instanceof Error) message = err.message
      else message = String(err)
      res.status(400).json({ message: "Vehicle could not be updated", data: message });
    }
  },

  //DELETE
  async destroy(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      if (userid !== req.userId) {
        throw new Error();
      }
      const user = await User.findByIdAndDelete(userid);
      res.status(200).json({ message: "User deleted", data: user });
    } catch (err) {
      res.status(400).json({ message: "User could not be deleted", data: err });
    }
  },

  //CREATE - POST
  async create(req: Request, res: Response) {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error("Invalid user");
      }
      console.log('Vehicle:', user);
      const data = req.body;
      req.body.freeseats = req.body.seats;
      const vehicle: IVehicle = await Vehicle.create({ ...data, userId: user._id });
      console.log('vehicle', vehicle, ' ', typeof vehicle._id)
      user.vehicles.push(vehicle._id);
      await user.save({ validateBeforeSave: false });
      res.status(201).json({
        message: "vehicle created",
        data: { vehicle }
      });
    } catch (err) {
      res.status(400).json({ message: "vehicle could not be created", data: err });
    }
  },
};

export default vehicleController;