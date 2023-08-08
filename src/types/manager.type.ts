import { Types } from "mongoose";

export interface IManager {
  _id: Types.ObjectId;
  name: string;
  surname: string;
  age: number;
  gender: string;
  email: string;
  password: string;
}
