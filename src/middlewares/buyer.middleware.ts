import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { BuyerValidator } from "../validators";

class BuyerMiddleware {
  public isCreateValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = BuyerValidator.create.validate(req.body);
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
export const buyerMiddleware = new BuyerMiddleware();
