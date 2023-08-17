import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { Buyer } from "../models/buyer.model";
import { buyerServices } from "../services/buyer.services";
import { IBuyer } from "../types/buyer.type";
import { BuyerValidator } from "../validators";

class BuyerController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IBuyer>> {
    try {
      const buyers = await buyerServices.findAll();
      return res.json(buyers);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IBuyer>> {
    try {
      const createBuyer = await buyerServices.create(req.res.locals as IBuyer);
      return res.status(201).json(createBuyer);
    } catch (e) {
      next(e);
    }
  }
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IBuyer>> {
    try {
      const buyer = await buyerServices.findById(req.params.id);
      return res.json(buyer);
    } catch (e) {
      next(e);
    }
  }
  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IBuyer>> {
    try {
      const { id } = req.params;
      const { error, value } = BuyerValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const updateBuyer = await Buyer.findOneAndUpdate(
        { _id: id },
        { ...value },
        { returnDocument: "after" },
      );
      return res.status(200).json(updateBuyer);
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
      await Buyer.deleteOne({ _id: id });
      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}
export const buyerController = new BuyerController();
