import { Types } from "mongoose";
export interface IUser {
  _id: Types.ObjectId;
  firstName?: string;
  surName?: string;
  gender?: string;
  age?: number;
  password: string;
  email: string;
}
