import { Router } from "express";

import requireAuth from "../../shared/middlewares/auth_middleware.js";
import { validatePayload } from "../../shared/middlewares/validate_middleware.js";
import {
    getItemFromCart,
    upsertCartItem,
    removeItemFromCart,
    deleteCart,
} from "./controller.js";
import { updateItemFromCartSchema } from "./schema.js";

const routes = Router();

routes.get("/:id", [requireAuth, getItemFromCart]);
routes.put("/:product_id", [
    requireAuth,
    validatePayload(updateItemFromCartSchema),
    upsertCartItem,
]);
routes.delete("/:id", [requireAuth, removeItemFromCart]);
routes.delete("/", [requireAuth, deleteCart]);

export default routes;
