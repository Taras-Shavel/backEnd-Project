import { Router } from "express";

import { buyerController } from "../controllers/buyer.controller";
import { managerController } from "../controllers/manager.controller";
import { managerMiddleware } from "../middlewares/manager.middleware";

const router = Router();

router.get("/", managerController.findAll);
router.post("/", managerMiddleware.isCreateValid, buyerController.create);
router.get("/:id", managerController.findById);
router.put("/:id", managerController.create);
router.delete("/:id", managerController.deleteById);

export const managerRouter = router;
