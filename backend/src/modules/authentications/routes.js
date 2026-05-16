import { Router } from "express";

import { validatePayload } from "../../shared/middlewares/validate_middleware.js";
import { login, logout, refreshAccessToken } from "./controller.js";
import {
    createAuthSchema,
    renewAccessTokenSchema,
    logoutAuthSchema,
} from "./schema.js";

const routes = Router();

routes.post("/", validatePayload(createAuthSchema), login);
routes.post("/logout", validatePayload(logoutAuthSchema), logout);
routes.put("/", validatePayload(renewAccessTokenSchema), refreshAccessToken);

export default routes;
