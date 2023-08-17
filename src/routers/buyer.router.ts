import { Router } from "express";

import { buyerController } from "../controllers/buyer.controller";
import { buyerMiddleware } from "../middlewares/buyer.middleware";

const router = Router();

router.get("/", buyerController.findAll);

router.post("/", buyerMiddleware.isCreateValid, buyerController.create);
router.get("/:id", buyerController.findById);
router.put("/:id", buyerController.create);
router.delete("/:id", buyerController.deleteById);

export const buyerRouter = router;
