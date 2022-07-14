import { Schema, model, Types } from "mongoose";

export interface IVehicle {
    type: String;
    location: String;
    brand: String;
    plate: String;
    seats: Number
    userId: Types.ObjectId;
}

export const vehicleSchema = new Schema<IVehicle>(
  {
    type: {
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
      type: Schema.Types.ObjectId, 
      ref: "User",
      require: true, 
    },
  },
  { timestamps: true }
);

const Vehicle = model<IVehicle>("Vehicle", vehicleSchema);
export default Vehicle;
