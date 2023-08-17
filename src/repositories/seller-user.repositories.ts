import { User } from "../models/seller-user.model";
import { IUser } from "../types/seller-user.type";

class SellerUserRepositories {
  public async create(data: IUser): Promise<IUser> {
    return User.create(data);
  }
}
export const sellerUserRepositories = new SellerUserRepositories();
