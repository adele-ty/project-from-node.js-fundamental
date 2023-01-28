import Joi from 'joi'

const userAssigSchema = Joi.object({
    UserIds: Joi.array().items(Joi.string()),
    GroupId: Joi.string().required()
})

export { userAssigSchema }
