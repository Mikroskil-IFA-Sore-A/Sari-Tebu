import { createUser } from "./controller.js";
import { Router } from "express";

import { validatePayload } from "../../shared/middlewares/validate_middleware.js";
import { createuserchema } from "./schema.js";

const routes = Router();

routes.post("/user", validatePayload(createuserchema), createUser);

export default routes;
