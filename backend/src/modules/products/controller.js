import * as ProductService from "./service.js";

/**
 * @typedef {import('express').Request & {
 *   validatedBody?: any,
 *   validatedQuery?: any,
 *   validatedParams?: any
 * }} Request
 * @typedef {import('express').Response} Response
 */

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function getProducts(req, res) {
    const { name } = req.validatedQuery ?? {};
    const products = await ProductService.getProducts(name);
    res.status(200).json({
        status: "success",
        data: { products },
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function getProduct(req, res) {
    const product = await ProductService.getProduct(req.validatedParams.id);
    res.status(200).json({
        status: "success",
        data: { product },
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function createProduct(req, res) {
    const product = await ProductService.createProduct(req.validatedBody);
    res.status(201).json({
        status: "success",
        data: { product },
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function updateProduct(req, res) {
    const product = await ProductService.updateProduct(
        req.validatedParams.id,
        req.validatedBody,
    );
    res.status(200).json({
        status: "success",
        data: { product },
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function editProduct(req, res) {
    const product = await ProductService.updateProduct(
        req.validatedParams.id,
        req.validatedBody,
    );
    res.status(200).json({
        status: "success",
        data: { product },
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function deleteProduct(req, res) {
    await ProductService.deleteProduct(req.validatedParams.id);
    res.status(200).json({
        status: "success",
        message: "Produk berhasil dihapus",
    });
}
