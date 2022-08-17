import { Types, Schema, model, models } from "mongoose";

export interface IUser {
  role: string;
  name: string;
  lastname: string;
  photo: string;
  phone: string;
  email: string;
  password: string;
  vehicles: [Types.ObjectId];
}

const nameRegex = new RegExp("(?:[a-zA-Z](?:[a-zA-Z]*[a-zA-Z]+$)+$)+$");
//const phoneRegex = new RegExp("\+[+]*[]{0,1}[0-9]{2}[]{0,1}[-\s\./0-9]{12}[)]*$")
const passRegex = new RegExp(
  "(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
);
export const userSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      required: true,
      enum: {
        values: ["admin", "driver", "passenger"],
        message: "invalid role",
      },
    },
    name: {
      type: String,
      required: true,
      match: [nameRegex, "name must contain only letters"],
      minlenght: [2, 'name too short'],
    },
    lastname: {
      type: String,
      required: true,
      match: [nameRegex, "name must contain only letters"],
      minlenght: [2, 'lastname too short'],
    },
    photo: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: true,
      //match: [phoneRegex, "number fortmat invalid"]
    },
    email: {
      type: String,
      required: true,
      validate: [
        {
          validator(value: any) {
            return models.User.findOne({ email: value })
              .then((user: any) => !user)
              .catch(() => false);
          },
          message: "email already exist",
        },
      ],
    },
    password: {
      type: String,
      required: true,
      match: [passRegex, "invalid password"]
    },
    vehicles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vehicle"
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;