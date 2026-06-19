import { Router } from "express";

import requireAuthentication from "#/shared/middlewares/authentication.js";
import requireValidation from "#/shared/middlewares/validation.js";

import { checkout, listTransactions, getTransaction } from "./controller.js";
import { checkoutSchema } from "./schema.js";

const routes = Router();

routes.post(
    "/",
    requireAuthentication(),
    requireValidation("body", checkoutSchema),
    checkout,
);
routes.get("/", requireAuthentication(), listTransactions);
routes.get("/:transactionId", requireAuthentication(), getTransaction);

export default routes;
