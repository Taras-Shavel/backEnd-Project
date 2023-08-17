import { ApiError } from "../errors";
import { Administrator } from "../models/administrator.model";
import { IAdministrator } from "../types/administrator.type";

class AdminServices {
  public async findAll(): Promise<IAdministrator[]> {
    try {
      return Administrator.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async create(data: IAdministrator): Promise<IAdministrator> {
    return Administrator.create(data);
  }
  public async findById(id: string): Promise<IAdministrator> {
    return Administrator.findById(id);
  }
}
export const adminServices = new AdminServices();
