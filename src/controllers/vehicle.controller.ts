import User from "../models/user.model";
import Vehicle from "../models/vehicle.model"
import { Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config();

const vehicleController = {
  async list(_req: Request, res: Response) {
    try {
      console.log("List")
      const users = await Vehicle.find();
      res.status(200).json({ message: "Users found", data: users });
    } catch (err) {
      res.status(404).json({ message: "User not found", data: err });
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
      const { userid } = req.params;
      if (userid !== req.userId) {
        throw new Error();
      }
      await User.findByIdAndUpdate(userid, req.body, {
        new: true,
        runValidators: true,
        context: "query",
      }).select("-password");
      res.status(200).json({ message: "User updated" });
    } catch (err) {
      res.status(400).json({ message: "User could not be updated", data: err });
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
      const vehicle = await Vehicle.create({ ...data, userId: user._id });
      await user.vehicles.push(vehicle._id);
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