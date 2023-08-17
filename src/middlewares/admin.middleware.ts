import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { AdminValidator } from "../validators/admin.validator";

class AdminMiddleware {
  public isCreateValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = AdminValidator.create.validate(req.body);
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
export const adminMiddleware = new AdminMiddleware();
