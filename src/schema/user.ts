import Joi from 'joi'

export const createUpdateSchema = Joi.object({
    id: Joi.string().required(),
    email: Joi.string().pattern(/^([a-zA-Z]|[0-9])(\w|-)+@epam+\.(com)$/).required(),
    password: Joi.string().pattern(/^(?=.{5,16})(?=.*[a-zA-Z])(?=.*[\d]).*$/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required(),
    login: Joi.string().required()
})

export const loginInfoSchema = Joi.object({
    email: Joi.string().pattern(/^([a-zA-Z]|[0-9])(\w|-)+@epam+\.(com)$/).required(),
    password: Joi.string().pattern(/^(?=.{5,16})(?=.*[a-zA-Z])(?=.*[\d]).*$/).required(),
})
