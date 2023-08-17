import { ApiError } from "../errors";
import { Buyer } from "../models/buyer.model";
import { IBuyer } from "../types/buyer.type";

class BuyerServices {
  public async findAll(): Promise<IBuyer[]> {
    try {
      return Buyer.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async create(data: IBuyer): Promise<IBuyer> {
    return Buyer.create(data);
  }
  public async findById(id: string): Promise<IBuyer> {
    return Buyer.findById(id);
  }
}
export const buyerServices = new BuyerServices();
