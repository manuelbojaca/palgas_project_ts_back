import { Document, Types, Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  role: string;
  name1: string;
  name2: string;
  lastname1: string;
  lastname2: string;
  photo: string;
  phone: string;
  email: string;
  password: string;
  vehicles: [Types.ObjectId];
  encryptPassword(): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

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
    name1: {
      type: String,
      required: true,
      min: 3,
    },
    name2: {
      type: String,
      min: 3
    },
    lastname1: {
      type: String,
      required: true,
      min: 3
    },
    lastname2: {
      type: String,
      min: 3
    },
    email: {
      type: String,
      required: true,
      unique: true
      /*
      validate: [
        {
          validator(value: string) {
            return models.User.findOne({ email: value })
              .then((user: IUser) => !user)
              .catch(() => false);
          },
          message: "email already exist",
        },
      ],*/
    },
    password: {
      type: String,
      required: true
    },
    photo: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      //match: [phoneRegex, "number fortmat invalid"]
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

userSchema.methods.encryptPassword = async function (): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(this.password, salt);
}

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
}

const User = model<IUser>("User", userSchema);
export default User;