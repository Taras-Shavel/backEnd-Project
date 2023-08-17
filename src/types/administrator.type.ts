import { Types } from "mongoose";

export interface IAdministrator {
  _id: Types.ObjectId;
  name?: string;
  age?: number;
  gender?: string;
  email: string;
  password: string;
}
