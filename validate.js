const Joi = require('joi')

function validateUser(user) {
    // console.log('validate')
    const JoiSchema = Joi.object({

        email: Joi.string()
            .email()
            .min(5)
            .max(15)
            .required(),

        password: Joi.string()
            .min(6)
            .max(15)
            .required(),
            
        name: Joi.string()
            .required(),

        phone: Joi.string()
            .optional(),
    }).options({ abortEarly: false });

    return JoiSchema.validate(user)
}

module.exports = validateUser