import { Types } from "mongoose";
export interface IUser {
  _id: Types.ObjectId;
  name: string;
  surName: string;
  gender: string;
  age: number;
  password: string;
  email: string;
}
