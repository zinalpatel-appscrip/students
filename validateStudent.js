const Joi = require('joi')

function validateStudent(student) {
    // console.log('validate')
    const JoiSchema = Joi.object({
        name: Joi.string()
            .required(),

        email: Joi.string()
            .email()
            .min(5)
            .max(15)
            .required(),
            
        phone: Joi.string()
                .optional(),

        preferedSubject: Joi.array()
            .required(),

        age: Joi.number().required()

    }).options({ abortEarly: false });

    return JoiSchema.validate(user)
}

module.exports = validateUser