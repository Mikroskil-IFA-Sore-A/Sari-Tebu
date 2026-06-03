import { nanoid } from "nanoid";

import { prisma } from "../../shared/database/index.js";
import ClientError from "../../shared/exceptions/client_error.js";

/**
 * Mencari cart milik user, jika tidak ada maka akan dibuat baru
 * @param {string} userId - ID pengguna
 * @returns {Promise<string>} ID cart
 */
async function findOrCreateCart(userId) {
    const exists = await prisma.cart.findFirst({
        where: { user_id: userId },
        select: { id: true },
    });

    if (exists) return exists.id;

    const cart = await prisma.cart.create({
        data: {
            id: `cart-${nanoid()}`,
            user_id: userId,
        },
    });
    return cart.id;
}

/**
 * Dapatkan detail item pada cart berdasarkan ID item
 * @param {string} cartItemId - ID cart item
 * @returns {Promise<{ id: string, quantity: number, product: { name: string, price: number } }>} Detail cart item
 * @throws {ClientError} **404** (Not Found) - jika cart item tidak ditemukan
 */
export async function getItemFromCart(cartItemId) {
    const item = await prisma.cartItem.findUnique({
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

    if (!item) throw ClientError.notFound("Cart item tidak ditemukan");
    return item;
}

/**
 * Menambah atau memperbarui item pada cart. Jika quantity 0, item akan dihapus
 * Jika cart belum ada, akan dibuat otomatis.
 * @param {string} userId
 * @param {string} productId
 * @param {number} quantity
 * @returns {Promise<void>}
 */
export async function upsertCartItem(userId, productId, quantity) {
    const cartId = await findOrCreateCart(userId);

    if (quantity === 0) {
        await prisma.cartItem.deleteMany({
            where: { cart_id: cartId, product_id: productId },
        });
        return;
    }

    const exists = await prisma.cartItem.findFirst({
        where: { cart_id: cartId, product_id: productId },
    });

    if (exists) {
        await prisma.cartItem.update({
            where: { id: exists.id },
            data: { quantity },
        });
        return;
    }

    await prisma.cartItem.create({
        data: {
            id: `cart_item-${nanoid()}`,
            cart_id: cartId,
            product_id: productId,
            quantity,
        },
    });
}

/**
 * Menghapus item dari cart berdasarkan ID item
 * @param {string} cartItemId - ID cart item
 * @returns {Promise<void>}
 * @throws {ClientError} **404** (Not Found) - jika cart item tidak ditemukan
 */
export async function removeItemFromCart(cartItemId) {
    try {
        await prisma.cartItem.delete({
            where: { id: cartItemId },
        });
    } catch (err) {
        if (err.code === "P2025")
            throw ClientError.notFound("Cart item tidak ditemukan");
        throw err;
    }
}

/**
 * Menghapus seluruh cart milik pengguna beserta semua item di dalamnya
 * @param {string} userId - ID pengguna
 * @returns {Promise<void>}
 * @throws {ClientError} **404** (Not Found) - jika cart tidak ditemukan
 */
export async function deleteCart(userId) {
    try {
        await prisma.cart.delete({
            where: { user_id: userId },
        });
    } catch (err) {
        if (err.code === "P2025")
            throw ClientError.notFound("Cart tidak ditemukan");
        throw err;
    }
}
