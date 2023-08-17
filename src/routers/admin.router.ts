import { Router } from "express";

import { adminController } from "../controllers/admin.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

router.get("/", adminController.findAll);

router.post("/", adminMiddleware.isCreateValid, adminController.create);
router.get("/:id", adminController.findById);
router.put("/:id", adminController.create);
router.delete("/:id", adminController.deleteById);

export const adminRouter = router;
