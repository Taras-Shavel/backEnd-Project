import { model, Schema } from "mongoose";

import { EGender } from "../enums/user.enum";

const managerSchema = new Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  age: {
    type: Number,
    min: [1, "Minimum value for age is 1"],
    max: [199, "Maximum value for age is 199"],
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
  password: {
    type: String,
    required: true,
  },
});
export const Manager = model("manager", managerSchema);
