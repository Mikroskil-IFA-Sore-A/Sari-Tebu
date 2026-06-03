import * as AuthSessionService from "./service.js";

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
export async function login(req, res) {
    const { emailAddress, password } = req.validatedBody;
    const token = await AuthSessionService.login(emailAddress, password);
    res.status(200).json({
        status: "success",
        data: token,
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function refreshAccessToken(req, res) {
    const { refreshToken } = req.validatedBody;
    const accessToken =
        await AuthSessionService.refreshAccessToken(refreshToken);

    res.status(200).json({
        status: "success",
        data: {
            accessToken,
        },
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function logout(req, res) {
    const { refreshToken } = req.validatedBody;
    await AuthSessionService.logout(refreshToken);
    res.status(200).json({
        status: "success",
        message: "Berhasil menghapus sesi login",
    });
}
