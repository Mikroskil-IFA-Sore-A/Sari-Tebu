/**
 * ClientError bertindak sebagai namespace untuk error HTTP 4xx.
 * @extends {Error}
 */
export default class ClientError extends Error {
    /**
     * Constructor ini seharusnya bersifat private, gunakan static method
     * @param {string} message - Pesan error
     * @param {number} statusCode - HTTP status code (4xx)
     */
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * **400** (Bad Request)
     * @param {string} [message="Bad Request"]
     * @returns {ClientError}
     */
    static badRequest(message = "Bad Request") {
        return new ClientError(message, 400);
    }

    /**
     * **401** (Unauthorized)
     * @param {string} [message="Unauthorized"]
     * @returns {ClientError}
     */
    static unauthorized(message = "Unauthorized") {
        return new ClientError(message, 401);
    }

    /**
     * **403** (Forbidden)
     * @param {string} [message="Forbidden"]
     * @returns {ClientError}
     */
    static forbidden(message = "Forbidden") {
        return new ClientError(message, 403);
    }

    /**
     * **404** (Not Found)
     * @param {string} [message="Not Found"]
     * @returns {ClientError}
     */
    static notFound(message = "Not Found") {
        return new ClientError(message, 404);
    }

    /**
     * **409** (Conflict)
     * @param {string} [message="Conflict"]
     * @returns {ClientError}
     */
    static conflict(message = "Conflict") {
        return new ClientError(message, 409);
    }

    /**
     * **415** (Unsupported Media Type)
     * @param {string} [message="Unsupported Media Type"]
     * @returns {ClientError}
     */
    static unsupportedMediaType(message = "Unsupported Media Type") {
        return new ClientError(message, 415);
    }

    /**
     * **429** (Too Many Requests)
     * @param {string} [message="Too Many Requests"]
     * @returns {ClientError}
     */
    static tooManyRequests(message = "Too Many Requests") {
        return new ClientError(message, 429);
    }
}
