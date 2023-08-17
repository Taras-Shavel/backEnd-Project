import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { Administrator } from "../models/administrator.model";
import { Buyer } from "../models/buyer.model";
import { adminServices } from "../services/admin.services";
import { IAdministrator } from "../types/administrator.type";
import { AdminValidator } from "../validators/admin.validator";

class AdminController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IAdministrator>> {
    try {
      const admins = await adminServices.findAll();
      return res.json(admins);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IAdministrator>> {
    try {
      const createAdmin = await adminServices.create(
        req.res.locals as IAdministrator,
      );
      return res.status(201).json(createAdmin);
    } catch (e) {
      next(e);
    }
  }
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IAdministrator>> {
    try {
      const admin = await adminServices.findById(req.params.id);
      return res.json(admin);
    } catch (e) {
      next(e);
    }
  }
  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IAdministrator>> {
    try {
      const { id } = req.params;
      const { error, value } = AdminValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const updateAdmin = await Buyer.findOneAndUpdate(
        { _id: id },
        { ...value },
        { returnDocument: "after" },
      );
      return res.status(200).json(updateAdmin);
    } catch (e) {
      next(e);
    }
  }
  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const { id } = req.params;
      await Administrator.deleteOne({ _id: id });
      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}
export const adminController = new AdminController();
