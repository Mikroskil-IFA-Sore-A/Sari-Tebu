import express from "express";
import cors from "cors";

import usersRoutes from "./modules/users/routes.js";
import authenticationsRoutes from "./modules/authentications/routes.js";
import productRoutes from "./modules/products/routes.js";
import cartsRoutes from "./modules/carts/routes.js";
import errorMiddleware from "./shared/middlewares/error_middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", usersRoutes);
app.use("/", authenticationsRoutes);
app.use("/", productRoutes);
app.use("/", cartsRoutes);

// error middleware harus berada pada urutan terakhir
app.use(errorMiddleware);

export default app;