"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchemaMiddleware = void 0;
function validateSchemaMiddleware(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(422).send({ error: error.details.map(item => item.message) });
        }
        next();
    };
}
exports.validateSchemaMiddleware = validateSchemaMiddleware;
