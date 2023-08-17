import { model, Schema } from "mongoose";

import { EGender } from "../enums/user.enum";
const userSchema = new Schema({
  firstName: {
    type: String,
  },
  surName: {
    type: String,
  },
  gender: {
    type: String,
    enum: EGender,
  },
  age: {
    type: Number,
    min: [1, "Minimum value for age is 1"],
    max: [199, "Maximum value for age is 199"],
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowerCase: true,
  },
});
export const User = model("user", userSchema);
