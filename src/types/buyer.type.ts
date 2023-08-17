import { Types } from "mongoose";

export interface IBuyer {
  _id: Types.ObjectId;
  name?: string;
  age?: number;
  gender?: string;
  email: string;
  numbers?: number;
  password: string;
}
