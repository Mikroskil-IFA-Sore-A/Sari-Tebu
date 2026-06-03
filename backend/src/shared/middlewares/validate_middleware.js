/**
 * @param {import("joi").ObjectSchema} schema
 * @param {string} source
 * @param {string} target
 */
function validate(schema, source, target) {
    // @ts-ignore
    return function (req, res, next) {
        const { value, error } = schema.validate(req[source], {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) throw error;

        req[target] = value;
        next();
    };
}

/**
 * @param {import("joi").ObjectSchema} schema
 */
export function validatePayload(schema) {
    return validate(schema, "body", "validatedBody");
}

/**
 * @param {import("joi").ObjectSchema} schema
 */
export function validateParams(schema) {
    return validate(schema, "params", "validatedParams");
}

/**
 * @param {import("joi").ObjectSchema} schema
 */
export function validateQuery(schema) {
    return validate(schema, "query", "validatedQuery");
}
