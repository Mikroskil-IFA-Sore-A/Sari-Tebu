import { nanoid } from "nanoid";

import { prisma } from "../../shared/database/index.js";

class CartRepository {
    async findOrCreate(userId) {
        const exists = await prisma.cart.findUnique({
            where: { user_id: userId },
        });

        if (exists) {
            return exists.id;
        }

        const cart = await prisma.cart.create({
            data: {
                id: `cart-${nanoid()}`,
                user_id: userId,
            },
        });
        return cart.id;
    }

    async getCartById(cartItemId) {
        return await prisma.cart.findUnique({
            where: { id: cartItemId },
        });
    }

    async getItemFromCart(cartItemId) {
        return await prisma.cartItem.findUnique({
            where: { id: cartItemId },
            select: {
                id: true,
                quantity: true,
                product: {
                    select: {
                        name: true,
                        price: true,
                    },
                },
            },
        });
    }

    async upsertCartItem(cartId, productId, quantity) {
        if (quantity === 0) {
            return await prisma.cartItem.deleteMany({
                where: { cart_id: cartId, product_id: productId },
            });
        }

        const exists = await prisma.cartItem.findFirst({
            where: { cart_id: cartId, product_id: productId },
        });

        if (exists) {
            return await prisma.cartItem.update({
                where: { id: exists.id },
                data: { quantity: quantity },
            });
        }

        return await prisma.cartItem.create({
            data: {
                id: `cart_item-${nanoid()}`,
                cart_id: cartId,
                product_id: productId,
                quantity: quantity,
            },
        });
    }

    async updateItemFromCart(cartItemId, quantity) {
        return await prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity: quantity },
        });
    }

    async removeItemFromCart(cartItemId) {
        return await prisma.cartItem.delete({
            where: { id: cartItemId },
        });
    }

    async deleteCart(userId) {
        return await prisma.cart.delete({
            where: { user_id: userId },
        });
    }
}

export default new CartRepository();
