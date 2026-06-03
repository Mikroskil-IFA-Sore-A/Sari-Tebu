import { Router } from "express";

import requireAuth from "#/shared/middlewares/auth_middleware.js";
import {
    validatePayload,
    validateQuery,
} from "#/shared/middlewares/validate_middleware.js";

import {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    editProduct,
    deleteProduct,
} from "./controller.js";
import {
    createProductSchema,
    editProductSchema,
    updateProductSchema,
    getProductsQuerySchema,
} from "./schema.js";

const routes = Router();

routes.get("/", [
    requireAuth,
    validateQuery(getProductsQuerySchema),
    getProducts,
]);
routes.get("/:id", [requireAuth, getProduct]);
routes.post("/", [
    requireAuth,
    validatePayload(createProductSchema),
    createProduct,
]);
routes.put("/:id", [
    requireAuth,
    validatePayload(updateProductSchema),
    updateProduct,
]);
routes.patch("/:id", [
    requireAuth,
    validatePayload(editProductSchema),
    editProduct,
]);
routes.delete("/:id", [requireAuth, deleteProduct]);

export default routes;
