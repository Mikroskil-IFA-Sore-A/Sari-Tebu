import { Router } from "express";

import authMiddleware from "../../shared/middlewares/auth_middleware.js";
import { validatePayload } from "../../shared/middlewares/validate_middleware.js";
import { checkout, getTransactions, getTransaction } from "./controller.js";
import { checkoutSchema } from "./schema.js";

const routes = Router();

routes.post("/", authMiddleware, validatePayload(checkoutSchema), checkout);
routes.get("/", authMiddleware, getTransactions);
routes.get("/:id", authMiddleware, getTransaction);

export default routes;
