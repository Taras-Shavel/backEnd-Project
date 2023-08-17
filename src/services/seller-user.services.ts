import { ApiError } from "../errors";
import { User } from "../models/seller-user.model";
import { sellerUserRepositories } from "../repositories/seller-user.repositories";
import { IUser } from "../types/seller-user.type";

class SellerUserServices {
  public async findAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async create(data: IUser): Promise<IUser> {
    return sellerUserRepositories.create(data);
  }
  public async findById(id: string): Promise<IUser> {
    return User.findById(id);
  }
}
export const sellerUserServices = new SellerUserServices();
