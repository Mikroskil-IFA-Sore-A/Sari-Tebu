import ClientError from "../exceptions/client_error.js";

export function validatePayload(schema) {
    return function (req, res, next) {

        // Pastikan request body hanya dapat berupa `application/json` MIME Type
        if (!req.is("application/json")) {
            throw ClientError.unsupportedMediaType("Content-Type must be application/json"); 
        }

        const { value, error } = schema.validate(req.body);
        if (error) throw error;

        req.body = value;
        next();
    };
}

export function validateQuery(schema) {
    return function (req, res, next) {
        const { value, error } = schema.validate(req.query);
        if (error) throw error;

        // properti query bersifat read only pada Express 5
        req.validatedQuery = value;
        next();
    };
}