import ClientError from "../../shared/exceptions/client_error.js";
import CartRepository from "./repository.js";

// async function verifyCartOwner(cart_id, user_id) {
//     const cart = await CartRepository.getCartById(cart_id);
//     if (!cart) {
//         throw ClientError.notFound();
//     }

//     if (cart.user_id !== user_id) {
//         throw ClientError.forbidden();
//     }

//     return cart;
// }

export async function getItemFromCart(req, res) {
    const items = await CartRepository.getItemFromCart(req.params.id);
    if (!items) {
        throw ClientError.notFound();
    }

    res.status(200).json({
        status: "success",
        data: {
            items,
        },
    });
}

export async function upsertCartItem(req, res) {
    const { quantity } = req.body;
    const { product_id } = req.params;
    const cartId = await CartRepository.findOrCreate(req.user.sub);
    await CartRepository.upsertCartItem(cartId, product_id, quantity);

    res.status(200).json({
        status: "suceess",
        message: "Cart updated",
    });
}

export async function removeItemFromCart(req, res) {
    try {
        await CartRepository.removeItemFromCart(req.params.id);
        res.status(200).json({
            status: "success",
            messsage: "item pada cart tsb berhasil dihapus",
        });
    } catch (err) {
        if (err.code === "P2025")
            throw ClientError.notFound("cart tidak ditemukan");
        throw err;
    }
}

export async function deleteCart(req, res) {
    try {
        await CartRepository.deleteCart(req.user.sub);
        res.status(200).json({
            status: "success",
            message: "cart berhasil dihapus",
        });
    } catch (err) {
        if (err.code === "P2025")
            throw ClientError.notFound("cart tidak ditemukan");
        throw err;
    }
}
