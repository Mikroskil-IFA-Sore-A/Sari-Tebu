import { Router } from "express";

import authMiddleware from "../../shared/middlewares/auth_middleware.js";
import { validatePayload } from "../../shared/middlewares/validate_middleware.js";
import {
    getItemFromCart,
    upsertCartItem,
    removeItemFromCart,
    deleteCart,
} from "./controller.js";
import { updateItemFromCartSchema } from "./schema.js";

const routes = Router();

routes.get("/:id", [authMiddleware, getItemFromCart]);
routes.put("/:product_id", [
    authMiddleware,
    validatePayload(updateItemFromCartSchema),
    upsertCartItem,
]);
routes.delete("/:id", [authMiddleware, removeItemFromCart]);
routes.delete("/", [authMiddleware, deleteCart]);

export default routes;
