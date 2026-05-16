import ClientError from "../exceptions/client_error.js";
import * as TokenManager from "../security/token_manager.js";

export default function authMiddleware(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw ClientError.badRequest("Missing or malformed Authorization header structure");
    }

    const token = authHeader.split(" ")[1];
    const decoded = TokenManager.verifyAccessToken(token);

    req.user = decoded; // { sub: userId }
    next();
}
