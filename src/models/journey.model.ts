import { Document, Types, Schema, model } from "mongoose";

export interface IJourney extends Document {
    type: string;
    name: string;
    origin: string;
    destination: string;
    date: string;
    days: string;
    time: string;
    state: boolean;
    users: [Types.ObjectId];
    vehicleId: Types.ObjectId;
    userId: Types.ObjectId;
}

export const journeySchema = new Schema<IJourney>(
    {
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
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        vehicleId: {
            type: Schema.Types.ObjectId,
            ref: "Vehicle",
            require: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
    },
    { timestamps: true }
);

const Journey = model<IJourney>('Journey', journeySchema);
export default Journey;