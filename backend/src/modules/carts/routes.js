import { Router } from "express";

import requireAuthentication from "#/shared/middlewares/authentication.js";
import requireValidation from "#/shared/middlewares/validation.js";

import {
    createCart,
    listCarts,
    getCart,
    deleteCart,
    addItemToCart,
    updateItem,
    removeItem,
} from "./controller.js";
import { updateItemSchema, addItemSchema } from "./schema.js";

const routes = Router();

routes.post("/", [requireAuthentication(), createCart]);
routes.get("/", [requireAuthentication(), listCarts]);
routes.get("/:cartId", [requireAuthentication(), getCart]);
routes.delete("/:cartId", [requireAuthentication(), deleteCart]);

routes.post("/:cartId/items", [
    requireAuthentication(),
    requireValidation("body", addItemSchema),
    addItemToCart,
]);
routes.patch("/:cartId/items/:productId", [
    requireAuthentication(),
    requireValidation("body", updateItemSchema),
    updateItem,
]);
routes.delete("/:cartId/items/:productId", [
    requireAuthentication(),
    removeItem,
]);

export default routes;
