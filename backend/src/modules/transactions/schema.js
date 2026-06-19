import Joi from "joi";

export const checkoutSchema = Joi.object({
    product_id: Joi.string()
        .pattern(/^transaction-[A-Za-z0-9_-]{21}$/)
        .required(),
});
