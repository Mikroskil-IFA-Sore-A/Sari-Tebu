import express from "express";
import cors from "cors";

import userRoutes from "./modules/user/routes.js";
import authenticationRoutes from "./modules/authentication/routes.js";
import errorMiddleware from "./shared/middlewares/error_middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", authenticationRoutes);

// error middleware harus berada pada urutan terakhir
app.use(errorMiddleware);

export default app;
