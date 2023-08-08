import { model, Schema } from "mongoose";

import { EGender } from "../enums/user.enum";

const buyerSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
    min: [1, "Minimum value for age 1"],
    max: [199, "Maximum value for  age 199"],
  },
  gender: {
    type: String,
    enum: EGender,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowerCase: true,
  },
  numbers: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
});
export const Buyer = model("buyer", buyerSchema);
