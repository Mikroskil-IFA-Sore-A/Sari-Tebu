import { Router } from "express";

import authMiddleware from "../../shared/middlewares/auth_middleware.js";
import { validatePayload } from "../../shared/middlewares/validate_middleware.js";
import {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "./controller.js";
import { createProductSchema, updateProductSchema } from "./schema.js";

const routes = Router();

routes.get("/", authMiddleware, getProducts);
routes.get("/:id", authMiddleware, getProduct);
routes.post(
    "/",
    authMiddleware,
    validatePayload(createProductSchema),
    createProduct,
);
routes.put(
    "/:id",
    authMiddleware,
    validatePayload(updateProductSchema),
    updateProduct,
);
routes.delete("/:id", authMiddleware, deleteProduct);

export default routes;
