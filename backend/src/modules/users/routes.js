import { createUser, deleteUser, getUsers } from "./controller.js";
import { Router } from "express";

import { validatePayload } from "../../shared/middlewares/validate_middleware.js";
import { createUserSchema } from "./schema.js";
import authMiddleware from "../../shared/middlewares/auth_middleware.js";

const routes = Router();

routes.post("/users", validatePayload(createUserSchema), createUser);
routes.get("/users", authMiddleware, getUsers);
routes.delete("/users/:id", authMiddleware, deleteUser);

export default routes;
