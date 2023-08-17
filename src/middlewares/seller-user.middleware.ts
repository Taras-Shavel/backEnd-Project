import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { SellerUserValidator } from "../validators";

class SellerUserMiddleware {
  public isCreateValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = SellerUserValidator.create.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.res.locals = value;
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const sellerUserMiddleware = new SellerUserMiddleware();
