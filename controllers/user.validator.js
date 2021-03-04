const db = require("../db.json");
const debug = require("debug");
const Joi = require("joi");

validatorDebugger = debug("app:user.validator");

const schema = Joi.object({
    name: Joi.string()
    .min(3)
    .required(),
    id: Joi.number()
});

exports.validateUserName = (req, res, next) => {

    validatorDebugger("Validating user name...");
    const { error } = schema.validate(req.body);
    validatorDebugger(req.body);
    validatorDebugger("Error:", error);
    if (error) return res.status(400).send(error.message);
    next();

};