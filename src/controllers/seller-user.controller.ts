import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { User } from "../models/seller-user.model";
import { sellerUserServices } from "../services/seller-user.services";
import { IUser } from "../types/seller-user.type";
import { SellerUserValidator } from "../validators";

class SellerUserController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await sellerUserServices.findAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const createUser = await sellerUserServices.create(
        req.res.locals as IUser,
      );
      return res.status(201).json(createUser);
    } catch (e) {
      next(e);
    }
  }
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const user = await sellerUserServices.findById(req.params.id);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const { id } = req.params;
      const { error, value } = SellerUserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { ...value },
        { returnDocument: "after" },
      );
      return res.status(200).json(updatedUser);
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
      await User.deleteOne({ _id: id });
      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}
export const sellerUserController = new SellerUserController()
