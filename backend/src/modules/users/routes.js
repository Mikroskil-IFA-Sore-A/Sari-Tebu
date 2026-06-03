import { Router } from "express";

import requireAuth from "#/shared/middlewares/auth_middleware.js";
import {
    validatePayload,
    validateQuery,
} from "#/shared/middlewares/validate_middleware.js";

import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    editUser,
    deleteUser,
} from "./controller.js";
import {
    createUserSchema,
    updateUserSchema,
    searchUserSchema,
    editUserSchema,
} from "./schema.js";

const routes = Router();

routes.post("/", [validatePayload(createUserSchema), createUser]);
routes.get("/", [requireAuth, validateQuery(searchUserSchema), getUsers]);
routes.get("/:id", [requireAuth, getUserById]);
routes.put("/:id", [
    requireAuth,
    validatePayload(updateUserSchema),
    updateUser,
]);
routes.patch("/:id", [requireAuth, validatePayload(editUserSchema), editUser]);
routes.delete("/:id", [requireAuth, deleteUser]);

export default routes;
