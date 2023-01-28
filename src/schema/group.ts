import Joi from 'joi'

const groupSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string())
})

export { groupSchema }
