import Joi from "joi";

export const createuserchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    fullname: Joi.string().required(),
});
