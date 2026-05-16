import { Router } from "express";

import authMiddleware from "../../shared/middlewares/auth_middleware.js";
import { validatePayload } from "../../shared/middlewares/validate_middleware.js";
import { createUser, deleteUser, getUsers, getUserById } from "./controller.js";
import { createUserSchema } from "./schema.js";

const routes = Router();

routes.post("/", validatePayload(createUserSchema), createUser);
routes.get("/", authMiddleware, getUsers);
routes.get("/:id", authMiddleware, getUserById);
routes.delete("/:id", authMiddleware, deleteUser);

export default routes;
