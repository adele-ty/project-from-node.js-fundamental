import Joi from 'joi'

export const createUpdateSchema = Joi.object({
    id: Joi.string().required(),
    password: Joi.string().pattern(/^(?=.{5,16})(?=.*[a-zA-Z])(?=.*[\d]).*$/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    login: Joi.string().required(),
    isDeleted: Joi.boolean().required()
})
