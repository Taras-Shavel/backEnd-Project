import { ApiError } from "../errors";
import { Buyer } from "../models/buyer.model";
import { Manager } from "../models/manager.model";
import { IManager } from "../types/manager.type";

class ManagerServices {
  public async findAll(): Promise<IManager[]> {
    try {
      return Manager.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async create(data: IManager): Promise<IManager> {
    return Buyer.create(data);
  }
  public async findById(id: string): Promise<IManager> {
    return Buyer.findById(id);
  }
}
export const managerServices = new ManagerServices();
