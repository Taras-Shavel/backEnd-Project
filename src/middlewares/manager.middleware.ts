import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { ManagerValidator } from "../validators/manager.validator";

class ManagerMiddleware {
  public isCreateValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = ManagerValidator.create.validate(req.body);
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
export const managerMiddleware = new ManagerMiddleware();