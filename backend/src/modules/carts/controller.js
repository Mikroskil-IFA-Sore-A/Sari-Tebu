import * as CartService from "./service.js";

/**
 * @typedef {import('express').Request & {
 *     validatedBody  : any,
 *     validatedQuery : any,
 *     validatedParams: any
 * }} Request
 * @typedef {Request & {
 *     user: {
 *         sub: string,
 *         sid: string
 *     }
 * }} RequestWithAuth
 * @typedef {import('express').Response} Response
 */

/**
 * @param {Request} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function getItemFromCart(req, res) {
    const item = await CartService.getItemFromCart(req.validatedParams.id);
    res.status(200).json({
        status: "success",
        data: { item },
    });
}

/**
 * @param {RequestWithAuth} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function upsertCartItem(req, res) {
    const { quantity } = req.validatedBody;
    const { product_id } = req.validatedParams;
    await CartService.upsertCartItem(req.user.sub, product_id, quantity);
    res.status(200).json({
        status: "success",
        message: "Cart berhasil diperbarui",
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function removeItemFromCart(req, res) {
    await CartService.removeItemFromCart(req.validatedParams.id);
    res.status(200).json({
        status: "success",
        message: "Item pada cart berhasil dihapus",
    });
}

/**
 * @param {RequestWithAuth} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function deleteCart(req, res) {
    await CartService.deleteCart(req.user.sub);
    res.status(200).json({
        status: "success",
        message: "Cart berhasil dihapus",
    });
}
