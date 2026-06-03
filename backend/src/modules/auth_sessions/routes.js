import { Router } from "express";

import { validatePayload } from "#/shared/middlewares/validate_middleware.js";

import { login, logout, refreshAccessToken } from "./controller.js";
import {
    createAuthSchema,
    renewAccessTokenSchema,
    logoutAuthSchema,
} from "./schema.js";

const routes = Router();

routes.post("/login", [validatePayload(createAuthSchema), login]);
routes.post("/refresh", [
    validatePayload(renewAccessTokenSchema),
    refreshAccessToken,
]);
routes.post("/logout", [validatePayload(logoutAuthSchema), logout]);

export default routes;
