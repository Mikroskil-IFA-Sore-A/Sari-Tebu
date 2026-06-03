import ClientError from "#/shared/exceptions/client_error.js";
import * as TokenManager from "#/shared/security/token_manager.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {void}
 * @throws {ClientError}
 */
export default function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw ClientError.badRequest(
            "Missing or malformed Authorization header structure",
        );
    }

    const token = authHeader.split(" ")[1];
    const decoded = TokenManager.verifyAccessToken(token);

    // @ts-ignore
    req.user = decoded; // { sub: userId }
    next();
}
