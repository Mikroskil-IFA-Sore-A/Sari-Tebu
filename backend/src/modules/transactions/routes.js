import { Router } from "express";

import requireAuth from "../../shared/middlewares/auth_middleware.js";
import { validatePayload } from "../../shared/middlewares/validate_middleware.js";
import { checkout, getTransactions, getTransaction } from "./controller.js";
import { checkoutSchema } from "./schema.js";

const routes = Router();

routes.post("/", requireAuth, validatePayload(checkoutSchema), checkout);
routes.get("/", requireAuth, getTransactions);
routes.get("/:id", requireAuth, getTransaction);

export default routes;
