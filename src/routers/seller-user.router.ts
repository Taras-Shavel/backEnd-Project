import { Router } from "express";

import { sellerUserController } from "../controllers/seller-user.controller";
import { sellerUserMiddleware } from "../middlewares/seller-user.middleware";

const router = Router();

router.get("/", sellerUserController.findAll);

router.post(
  "/",
  sellerUserMiddleware.isCreateValid,
  sellerUserController.create,
);
router.get("/:id", sellerUserController.findById);
router.put("/:id", sellerUserController.updateById);
router.delete("/:id", sellerUserController.deleteById);

export const sellerUserRouter = router;
