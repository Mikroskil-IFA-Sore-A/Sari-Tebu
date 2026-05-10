/**
 * pada Express 5, error yang di throw akan lgsg di propogate ke Error Middleware
 * sehingga kita bisa lgsg throw error tanpa diwajibkan untuk manually pass ke next()
 */

export function validatePayload(schema) {
    return function (req, res, next) {
        // pastikan jika req.query itu undefined passed in empty object,
        // karena joi akan menganggap undefined sebagai resource yabg valid
        const { value, error } = schema.validate(req.body ?? {});
        if (error) throw error;

        req.body = value;
        next();
    };
}

export function validateQuery(schema) {
    return function (req, res, next) {
        // pastikan jika req.query itu undefined passed in empty object,
        // karena joi akan menganggap undefined sebagai resource yabg valid
        const { value, error } = schema.validate(req.query ?? {});
        if (error) throw error;

        // properti query bersifat read only pada Express 5
        req.validatedQuery = value;
        next();
    };
}
