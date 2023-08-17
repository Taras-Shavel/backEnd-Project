import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { Manager } from "../models/manager.model";
import { managerServices } from "../services/manager.services";
import { IManager } from "../types/manager.type";
import { ManagerValidator } from "../validators/manager.validator";

class ManagerController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IManager>> {
    try {
      const managers = await managerServices.findAll();
      return res.json(managers);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IManager>> {
    try {
      const createManager = await managerServices.create(
        req.res.locals as IManager,
      );
      return res.status(201).json(createManager);
    } catch (e) {
      next(e);
    }
  }
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IManager>> {
    try {
      const manager = await managerServices.findById(req.params.id);
      return res.json(manager);
    } catch (e) {
      next(e);
    }
  }
  public async updateDyId(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IManager>> {
    try {
      const { id } = req.params;
      const { error, value } = ManagerValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const updateManager = await Manager.findOneAndUpdate(
        { _id: id },
        { ...value },
        { returnDocument: "after" },
      );
      return res.status(200).json(updateManager);
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
      await Manager.deleteOne({ _id: id });
      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}
export const managerController = new ManagerController();
