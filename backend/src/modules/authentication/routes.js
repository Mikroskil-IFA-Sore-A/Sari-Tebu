import { Router } from "express";
import { login, logout, refreshAccessToken } from "./controller.js";
import {
    createAuthSchema,
    renewAccessTokenSchema,
    deleteAuthSchema,
} from "./schema.js";
import { validatePayload } from "../../shared/middlewares/validate_middleware.js";

const routes = Router();

routes.post("/authentication", validatePayload(createAuthSchema), login);
routes.put(
    "/authentication",
    validatePayload(renewAccessTokenSchema),
    refreshAccessToken,
);
routes.delete("/authentication", validatePayload(deleteAuthSchema), logout);

export default routes;
