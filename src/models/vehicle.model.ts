import { Schema, model, Types, Document } from "mongoose";

export interface IVehicle extends Document {
  type: string;
  energy: string;
  color: string;
  location: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  seats: number;
  freeseats: number;
  userId: Types.ObjectId;
}

export const vehicleSchema = new Schema<IVehicle>(
  {
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
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

const Vehicle = model<IVehicle>("Vehicle", vehicleSchema);
export default Vehicle;
