import cors from "cors";
import express from "express";

import authenticationsRoutes from "./modules/authentications/routes.js";
import cartsRoutes from "./modules/carts/routes.js";
import productRoutes from "./modules/products/routes.js";
import transactionsRoutes from "./modules/transactions/routes.js";
import usersRoutes from "./modules/users/routes.js";
import errorMiddleware from "./shared/middlewares/error_middleware.js";
import reqlog from "./shared/middlewares/reqlog_middleware.js";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ALLOWED_ORIGINS?.split(","),
    }),
);
app.use(express.json({ limit: '250kb' }));                       // agar dapat parse `Content-Type: application/json`
app.use(express.urlencoded({ extended: true, limit: '250kb' })); // agar dapat parse `Content-Type: application/x-www-form-urlencoded`
app.use(reqlog({ pretty: true }));

app.use("/api/users", usersRoutes);
app.use("/api/authentications", authenticationsRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/api/transactions", transactionsRoutes);

// NOTE: Error middleware harus berada pada urutan terakhir
app.use(errorMiddleware);

export default app;
