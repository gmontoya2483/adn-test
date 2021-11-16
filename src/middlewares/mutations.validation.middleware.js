import Joi from "@hapi/joi";

const schemas = {
    new: Joi.object().keys({
        dna:  Joi.array().items(Joi.string()).required()
    })
};

/**
 * This middleware validates that the requests receives just a dna string array.
 * It returns a HTTP 422 - Unprocessable Entity in case the body is not a valid dna array
 * @param req
 * @param res
 * @param next
 */
export const validateNewDna = (req, res, next) => {
    const { error, value } = schemas.new.validate(req.body);
    error ? res.status(422).json({
            ok: false,
            message: error.details[0].message.replace(/['"]+/g, "")
        })
        : next();
}
