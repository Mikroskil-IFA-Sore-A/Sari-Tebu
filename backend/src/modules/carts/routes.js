import { Router } from "express";
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "./controller.js";
import { validatePayload } from "../../shared/middlewares/validate_middleware.js"
import authMiddleware from "../../shared/middlewares/auth_middleware.js";
import { addCartSchema, updateCartSchema } from "./schema.js";

const routes = Router();

routes.get('/cart', authMiddleware, getCart);
routes.post('/cart', authMiddleware, validatePayload(addCartSchema), addToCart);
routes.put('/cart/:id', authMiddleware, validatePayload(updateCartSchema), updateCartItem);
routes.delete('/cart/:id', authMiddleware, removeFromCart);
routes.delete('/cart', authMiddleware, clearCart);

export default routes;